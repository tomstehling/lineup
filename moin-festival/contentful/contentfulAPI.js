import * as contentful from "contentful";
import config from "./config.json";
import { mapEntry } from "./mapping";

export const client = contentful.createClient({
  accessToken: config.accessToken,
  space: config.space,
  environment: config.environment,
});

const DEFAULT_OPTIONS = {
  include: 10,
};

export async function getEntry(id) {
  const res = await client.getEntry(id, { ...DEFAULT_OPTIONS });
  return mapEntry(res);
}

export async function getEntries(query) {
  const res = await client.getEntries({ ...DEFAULT_OPTIONS, ...query });
  return res.items.map((item) => mapEntry(item));
}

export async function getConfig() {
  return await getEntry(config.configId);
}
