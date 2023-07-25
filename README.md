# cve.248.no

This is the project files for [cve.248.no](https://cve.248.no), a simple CVE browser and database.

### Installation

Clone the repo, copy `.env.example` to `.env` and populate it with your database credentials. Instructions and code to set up a database is in progress... <!-- :fidget_spinner: -->

Then run

- `yarn`
- `yarn dev`

## Python scripts

The legacy python project keeps a local copy of data from [cve.mitre.org](https://cve.mitre.org/data/downloads/index.html), and serves it through an API and search interface. You can find it in [scripts/](scripts/).

### Installation

If you want to run the website on you own, download the project files and run this command to generate the database.

```
python3 cve.py
```

To start the server, run

```
python3 api.py
```

Go to [localhost:5000](http://localhost:5000)

<div align="right"><img src="public/favicon.svg" width="32" alt="248"></div>
