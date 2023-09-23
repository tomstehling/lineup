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

// const client = contentful.createClient({
//   // This is the space ID. A space is like a project folder in Contentful terms
//   space: "ixag5qb4t22m",
//   // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
//   accessToken: "nfsG9YP5teGkDu1pFeB_J0ARMdHjpPcTY1gDm-adenE",
// });
// // This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token
// client
//   .getEntry("CLf93ZUT2Qa3efQGUa6jk")
//   .then((entry) => console.log(entry))
//   .catch((err) => console.log(err));
