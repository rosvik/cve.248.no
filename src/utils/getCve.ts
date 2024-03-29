import { ErrorObject } from "ajv";
import { env } from "../env.mjs";
import { Published, Rejected } from "../types/v5-cve";
import { validateUnknown } from "./validator";

const API_BASE_URL = env.API_BASE_URL;

export type CveResponse = {
  cve?: Published | Rejected;
  errorObject?: ErrorObject[];
  errorMessage?: string;
};

export async function getCve(id: string): Promise<CveResponse> {
  const data = await fetch(`${API_BASE_URL}cve?id=${id}`);
  if (!data.ok)
    return {
      errorMessage: "Unknown error fetching data.",
    };
  return toCve(await data.json());
}

export function toCve(input: any): CveResponse {
  const cve = validateUnknown(input);

  if (!cve)
    return {
      errorMessage: "Unknown error parsing data.",
    };
  if (Array.isArray(cve))
    return {
      errorMessage: "Invalid JSON format.",
      errorObject: cve,
    };
  if (cve.version !== 5)
    return {
      errorMessage: "Unsupported data version",
    };

  return { cve: cve.data };
}
