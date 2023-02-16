<img src="docs/248-logo.svg" width="150" alt="248">

# cve.248.no

This is the project files for [cve.248.no](https://cve.248.no), a simple CVE browser and database.

## T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [tRPC](https://trpc.io)

### Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available)

<!-- ### How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information. -->

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

