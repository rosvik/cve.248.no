import requests
import sqlite3
import csv
import pandas
from sqlite3 import Error
from time import perf_counter as pc
from sqlalchemy.types import NVARCHAR, Integer

csvfile = "cve.csv"
table_name = "t"
sqlite3_location = r"cve.db"
source_csv = "https://cve.mitre.org/data/downloads/allitems.csv"

r = requests.get(source_csv, stream=True)

if r.encoding is None:
	r.encoding = 'utf-8'

f = open(csvfile, "w")


dt = pc()

# Init timers array
dd = [0 for _ in range(6)]
writestring = ""
title = True

for i, line in enumerate(r.iter_lines(decode_unicode=True)):
	d = pc()
	if "** RESERVED **" in line[:50]:
		continue
	if "** REJECT **" in line[:50]:
		continue
	dd[0] = dd[0] + (pc() - d)

	d = pc()
	if i <= 10:
		if line.endswith(",,,,,"):
			continue
	dd[1] = dd[1] + (pc() - d)
	
	d = pc()
	if title: 
		title = False
		f.write('"id",' + line)
		continue
	dd[2] = dd[2] + (pc() - d)

	d = pc()
	if not i % 10000:
		print(i)
		# break
	dd[3] = dd[3] + (pc() - d)

	d = pc()
	writestring += '\n' + str(i) + ',' + line
	dd[4] = dd[4] + (pc() - d)

	d = pc()
	if not i % 100:
		f.write(writestring)
		writestring = ''
	dd[5] = dd[5] + (pc() - d)

for i, val in enumerate(dd):
	print(f'{i}: {(val/sum(dd))*100:.1f}% \t{val/1e6:.3f} ms')

print(f" + CSV download: {(pc()-dt)/1e6:.3f} ms")

dt = pc()

dtypes = {
	"id": "Integer",
	"Name": "NVARCHAR",
	"Status": "NVARCHAR",
	"Description": "NVARCHAR",
	"References": "NVARCHAR",
	"Phase": "NVARCHAR",
	"Votes": "NVARCHAR",
	"Comments": "NVARCHAR",
}

conn = sqlite3.connect(sqlite3_location)
df = pandas.read_csv(csvfile)
df.to_sql(table_name, conn, if_exists='replace', index=False, dtype=dtypes)

print(f" + Sqlite import: {(pc()-dt)/1e6:.3f} ms")
