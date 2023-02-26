#!/usr/bin/env bash

json2ts src/schemas/json/CVE_JSON_5.0_bundled.json src/types/v5-cve.ts
json2ts src/schemas/json/CVE_JSON_4.0_reject.json src/types/v4-cve-reject.ts
json2ts src/schemas/json/CVE_JSON_4.0_reserved.json src/types/v4-cve-reserved.ts
json2ts src/schemas/json/CVE_JSON_4.0_public.json src/types/v4-cve-public.ts
