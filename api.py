from flask import Flask, g, render_template, jsonify, request
import sqlite3
import os
import re
import urllib
from markupsafe import Markup
from werkzeug.routing import BaseConverter

DATABASE = "./cve.db"

# Create app
app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'super-secret'
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False

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

class RegexConverter(BaseConverter):
	def __init__(self, url_map, *items):
		super(RegexConverter, self).__init__(url_map)
		self.regex = items[0]

app.url_map.converters['regex'] = RegexConverter

# helper to close
@app.teardown_appcontext
def close_connection(exception):
	db = getattr(g, '_database', None)
	if db is not None:
		db.close()

@app.route("/")
def index():
	db = get_db()
	data = db.execute('SELECT Name FROM t ORDER BY id DESC limit 100').fetchall()
	return render_template(r"index.html", title="CVE lookup", data=data)

@app.route("/search.json")
def all_json():
	query = request.args.get('q')

	formula = "(C|^)(V|^)(E|^)(-|^)([0-9]{1,4}|^)(-|^)[0-9]{4,}$"
	if not re.search(formula, query):
		content = {'please move along': 'nothing to see here'}
		
		return jsonify({'statuscode': 404, 'message': 'No results found'}), 200, {'Content-Type': 'application/json; charset=utf-8'}

	db = get_db()
	data = db.execute(f'SELECT Name FROM t WHERE Name LIKE \"%{query}%\"').fetchall()
	return jsonify({'statuscode': 200, 'message': 'success', 'data': data}), 200, {'Content-Type': 'application/json; charset=utf-8'}

@app.route('/CVE-<regex("[0-9]+"):year>-<regex("[0-9]+"):number>.json')
def cve_api(year, number):
	db = get_db()
	data = db.execute(f'SELECT * FROM t WHERE Name = "CVE-{year}-{number}"').fetchone()
	return jsonify(data)

@app.route('/CVE-<regex("[0-9]+"):year>-<regex("[0-9]+"):number>')
@app.route('/CVE-<regex("[0-9]+"):year>-<regex("[0-9]+"):number>.html')
def cve_frontend(year, number):
	db = get_db()
	data = db.execute(f'SELECT * FROM t WHERE Name = "CVE-{year}-{number}"').fetchone()

	if data['References']: data['References'] = data['References'].split('   |   ')
	if data['Comments']: data['Comments'] = data['Comments'].replace(' | ', ' \n ')
	if data['Votes']: data['Votes'] = data['Votes'].split(' | ')

	for i, reference in enumerate(data['References']):
		formula = 'http[s]?://'
		p = re.compile(formula)
		rep = p.sub(' https://', reference)
		data['References'][i] = rep

	return render_template(r"cve.html", title=f"CVE-{year}-{number}", data=data)

def main():
	app.run()

if __name__ == "__main__":
	app.run()