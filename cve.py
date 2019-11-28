import requests
import sqlite3
from sqlite3 import Error


r = requests.get(
    "https://cve.mitre.org/data/downloads/allitems.csv", stream=True)

if r.encoding is None:
    r.encoding = 'utf-8'

con = db_setup(r"cve.db")

for i, line in enumerate(r.iter_lines(decode_unicode=True)):
    if line.endswith(",,,,,"):
        continue

    print(line)

    if i > 10:
        break


def db_setup(file_name):
    db = db_handler()

    # create a database connection
    db.create_connection(file_name)

    sql_create_projects_table = """ CREATE TABLE IF NOT EXISTS projects (
										id integer PRIMARY KEY,
										Name,
										Status,
										Description,
										References,
										Phase,
										Votes,
										Comments
									); """

    # create tables
    if conn is not None:
        # create projects table
        db.create_table(conn, sql_create_projects_table)
    else:
        print("Error! cannot create the database connection.")

    return conn


class db_handler():

    @staticmethod
    def create_connection(db_file):
        """ create a database connection to a SQLite database """
        conn = None
        try:
            conn = sqlite3.connect(db_file)
            print(sqlite3.version)
        except Error as e:
            print(e)
        finally:
            if conn:
                conn.close()

    @staticmethod
    def create_table(conn, create_table_sql):
        """ create a table from the create_table_sql statement
        :param conn: Connection object
        :param create_table_sql: a CREATE TABLE statement
        :return:
        """
        try:
            c = conn.cursor()
            c.execute(create_table_sql)
        except Error as e:
            print(e)
