import requests
import sqlite3
import csv
import pandas
from apscheduler.schedulers.background import BackgroundScheduler
from sqlite3 import Error
from time import perf_counter as pc
from time import sleep
from sqlalchemy.types import NVARCHAR, Integer

def main():
	generate()
	# while True:
	# 	generate()
	# 	sleep(3600)
	# print("started")

def generate():
	csvfile = "cve.csv"
	table_name = "t"
	sqlite3_location = r"cve.db"

	source_csv = open("allitems.csv", "r", encoding="latin-1")

	f = open(csvfile, "w")

	writestring = ""
	title = True

	for i, line in enumerate(source_csv):
		# Skip empty lines
		if "** RESERVED **" in line[:50]:
			continue
		if "** REJECT **" in line[:50]:
			continue

		# Handle headers
		if i <= 10:
			if line.strip().endswith(",,,,,"):
				continue
			if title: 
				title = False
				f.write('"id",' + line)
				continue

		# Print progress to console
		if i % 10000 == 0: print(i)

		writestring += f"{str(i)}, {line}"

		# Write string to file every 100 lines
		if i % 100 == 0:
			f.write(writestring)
			writestring = ''

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

if __name__ == '__main__':
	main()

