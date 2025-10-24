import { createClient } from "redis";
import { env } from "../env.mjs";

export async function getRedisClient() {
  if (!env.REDIS_URL) return null;
  const client = await createClient({
    url: env.REDIS_URL,
  })
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();
  return client;
}

export async function addToRedis(key: string, value: string) {
  const client = await getRedisClient();
  if (!client) return null;
  console.info("REDIS: adding", key);
  return client.set(key, value, {
    expiration: {
      type: "EX",
      value: 60 * 60 * 24 * 7, // 7 days
    },
  });
}

export async function getFromRedis(key: string) {
  const client = await getRedisClient();
  if (!client) return null;
  console.info("REDIS: getting", key);
  return client.get(key);
}

export async function deleteFromRedis(key: string) {
  const client = await getRedisClient();
  if (!client) return null;
  console.info("REDIS: deleting", key);
  return client.del(key);
}

/**
 * Returns the cached value if it exists, otherwise calls `fn` and caches the
 * result in Redis.
 *
 * On my machine with Redis running in a docker container:
 * - `getFromRedis` takes between 5 and 20ms
 * - `addToRedis` takes around 300ms (but is not blocking)
 * - Fetching from the GitHub API takes around 300ms
 */
export async function cached<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const cached = await getFromRedis(key);
  if (cached) {
    return JSON.parse(cached);
  }
  const value = await fn();
  addToRedis(key, JSON.stringify(value)).catch(console.error);
  return value;
}

export const cveKey = (cveId: string) => {
  return `cve:${cveId}`;
};
export const githubAdvisoriesKey = (cveId: string) => {
  return `github_advisories:${cveId}`;
};
export const openGraphDataKey = (url: string) => {
  return `open_graph_data:${url}`;
};
