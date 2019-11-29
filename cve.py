import requests
import sqlite3
import csv
import pandas
from sqlite3 import Error
from time import perf_counter_ns as pc
from sqlalchemy.types import NVARCHAR

csvfile = "cve.csv"
table_name = "t"
sqlite3_location = r"cve.db"

dt = pc()

r = requests.get(
    "https://cve.mitre.org/data/downloads/allitems.csv", stream=True)

if r.encoding is None:
    r.encoding = 'utf-8'

f = open(csvfile, "w")

for i, line in enumerate(r.iter_lines(decode_unicode=True)):
    if line.endswith(",,,,,"):
        continue

    # if i > 200: break

    if not i % 1000:
        print(i)


    f.write(line + "\n")

print(f" + CSV download: {(pc()-dt)/1e6:.3f} ms")

dt = pc()

conn = sqlite3.connect(sqlite3_location)
df = pandas.read_csv(csvfile)
df.to_sql(table_name, conn, if_exists='replace', index=False, dtype={col_name: "NVARCHAR" for col_name in df})

print(f" + Sqlite import: {(pc()-dt)/1e6:.3f} ms")
