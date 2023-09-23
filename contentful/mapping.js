import * as contentful from "contentful";

const getKeys = (obj) => Object.keys(obj);

function getValue(value) {
  if (Array.isArray(value)) {
    return value.map(getValue);
  }

  if (value && value.sys) {
    return mapEntry(value);
  }
  return value;
}

export function mapEntry(entry) {
  if (entry.sys.type === "Asset") return mapAsset(entry);

  const result = {
    id: entry.sys.id,
    type: (
      entry.sys.contentType?.sys.id ||
      entry.sys.type ||
      "[unknown]"
    ).toLowerCase(),
  };

  for (const fieldName of getKeys(entry.fields)) {
    result[fieldName] = getValue(entry.fields[fieldName]);
  }

  switch (result.type) {
    case "page":
      if (result.slug && result.slug[0] !== "/") {
        result.slug = "/" + result.slug;
      }
      break;
  }

  return result;
}

function mapAsset(entry) {
  const fields = entry.fields;
  if (!fields.file) return null;
  return {
    id: entry.sys.id,
    type: "asset",
    name: fields.title,
    ...(fields.description && { description: fields.description }),
    url: fields.file?.url || null,
    ...(fields.file?.details?.image || {}),
  };
}
