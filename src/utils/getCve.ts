import { validateUnknown } from "./validator";

export async function getCve(id: string) {
  const url = `/api/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  const cve = validateUnknown(data);

  if (!cve) {
    throw new Error("Unknown error parsing data.");
  }
  if (Array.isArray(cve)) {
    throw new Error("Invalid JSON format\n" + JSON.stringify(cve, null, 2));
  }
  if (cve.version !== 5) {
    throw new Error("Unsupported data version");
  }
  if (cve.state !== "PUBLISHED") {
    throw new Error("Only published CVEs supported");
  }

  return cve.data;
}
