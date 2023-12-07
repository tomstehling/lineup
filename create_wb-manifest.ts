interface File {
  revision: string | null;
  url: string;
}
function randomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");
}

export const wb_manifest: File[] = [];
export function create_wb_manifest(
  manifestArr: string[],
  manifestStatic: string[]
): File[] {
  let manifestArrNr = [...new Set(manifestArr)];
  manifestArrNr.map((path) => {
    wb_manifest.push({ revision: randomString(12), url: `_nuxt/${path}` });
  });
  manifestStatic.map((path) => {
    wb_manifest.push({ revision: randomString(12), url: path });
  });
  console.log("creat", wb_manifest);
  return wb_manifest;
}
