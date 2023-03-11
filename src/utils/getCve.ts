import { ErrorObject } from "ajv";
import { prisma } from "../server/db";
import { Published } from "../types/v5-cve";
import { validateUnknown } from "./validator";

export type CveResponse = {
  cve?: Published;
  errorObject?: ErrorObject[];
  errorMessage?: string;
};

export async function getCve(id: string): Promise<CveResponse> {
  const data = await prisma.cVE.findFirst({
    where: {
      id,
    },
  });

  if (!data)
    return {
      errorMessage: "Unknown error fetching data.",
    };

  const cve = validateUnknown(data.json);

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
  if (cve.state !== "PUBLISHED")
    return {
      errorMessage: "Only published CVEs supported (for now)",
    };

  return { cve: cve.data };
}
