// https://pm2.keymetrics.io/docs/usage/application-declaration/

module.exports = {
  apps: [
    {
      name: "CVE frontend",
      script: "yarn build && yarn start --port 3016",
      max_memory_restart: "500M",
    },
  ],
};
