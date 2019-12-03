<img src="docs/248-logo.svg" width="150" alt="248">

# cve.248.no

This is the project files for [cve.248.no](https://cve.248.no), a simple CVE browser and database. The site keeps a local copy of data from [cve.mitre.org](https://cve.mitre.org/data/downloads/index.html), and serves it through an API and search interface.

## Installation

If you want to run the website on you own, download the project files and run this command to generate the database.

```
python3 cve.py
```

To start the server, run

```
python3 api.py
```

Go to [localhost:5000](http://localhost:5000)

