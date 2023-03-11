import { ErrorObject } from "ajv";
import { Published } from "../types/v5-cve";
import { validateUnknown } from "./validator";

export type CveResponse = {
  cve?: Published;
  errorObject?: ErrorObject[];
  errorMessage?: string;
  apiPath?: string;
};

export async function getCve(id: string): Promise<CveResponse> {
  const url = `https://cveawg.mitre.org/api/cve/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  const cve = validateUnknown(data);

  if (!cve) {
    return {
      errorMessage: "Unknown error parsing data.",
      apiPath: url,
    };
  }
  if (Array.isArray(cve)) {
    return {
      errorMessage: "Invalid JSON format.",
      errorObject: cve,
      apiPath: url,
    };
  }
  if (cve.version !== 5) {
    return {
      errorMessage: "Unsupported data version",
      apiPath: url,
    };
  }
  if (cve.state !== "PUBLISHED") {
    return {
      errorMessage: "Only published CVEs supported (for now)",
      apiPath: url,
    };
  }

  return { cve: cve.data, apiPath: url };
}
