from flask import Flask, g, render_template, jsonify
import sqlite3
import os
import re
import urllib
from markupsafe import Markup

DATABASE = "./cve.db"

# Create app
app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'super-secret'

# helper method to get the database since calls are per thread,
# and everything function is a new thread when called
def get_db():
	db = getattr(g, '_database', None)
	if db is None:
		db = g._database = sqlite3.connect(DATABASE)
		db.row_factory = dict_factory
	return db

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


# helper to close
@app.teardown_appcontext
def close_connection(exception):
	db = getattr(g, '_database', None)
	if db is not None:
		db.close()

@app.route("/")
def index():
	db = get_db()
	data = db.execute('SELECT * FROM t WHERE Name = "CVE-1999-0001"').fetchall()

	return jsonify(data)


@app.route("/CVE-<int:year>-<int:number>.json")
def cve_api(year, number):
	db = get_db()
	data = db.execute(f'SELECT * FROM t WHERE Name = "CVE-{year}-{number}"').fetchone()

	return jsonify(data)

@app.route("/CVE-<int:year>-<int:number>")
@app.route("/CVE-<int:year>-<int:number>.html")
def cve_frontend(year, number):
	db = get_db()
	data = db.execute(f'SELECT * FROM t WHERE Name = "CVE-{year}-{number}"').fetchone()

	data['References'] = data['References'].split('   |   ')

	for i, reference in enumerate(data['References']):
		formula = 'https://'
		p = re.compile(formula)
		rep = p.sub(' https://', reference)
		data['References'][i] = rep

	return render_template(r"cve.html", title=f"CVE-{year}-{number}", data=data)

if __name__ == "__main__":
	"""
	Use python sqlite3 to create a local database, insert some basic data and then
	display the data using the flask templating.
	
	http://flask.pocoo.org/docs/0.12/patterns/sqlite3/
	"""
	app.run()