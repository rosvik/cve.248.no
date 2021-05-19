from sqlite3 import connect
from pandas import read_csv

def main():
	csvfile = "cve.csv"
	table_name = "t"
	sqlite3_location = r"cve.db"

	source_csv = open("allitems.csv", "r", encoding="latin-1")

	f = open(csvfile, "w")

	writestring = ""
	title = True

	for i, line in enumerate(source_csv):
		# Skip empty lines
		if "** RESERVED **" in line[:50]: continue
		if "** REJECT **" in line[:50]: continue

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

	conn = connect(sqlite3_location)
	df = read_csv(csvfile)
	df.to_sql(table_name, conn, if_exists='replace', index=False, dtype=dtypes)

if __name__ == '__main__':
	main()

