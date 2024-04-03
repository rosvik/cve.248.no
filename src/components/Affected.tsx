import { Fragment } from "react";
import { Affected, Product, Version } from "../types/v5-cve";
import styles from "./affected.module.css";

export function Affected({ affected }: { affected: Affected }) {
  const groups = getAffectedGroups(affected);
  return (
    <div className={styles.affected}>
      {groups.map(({ vendor, products }) => (
        <Fragment key={vendor}>
          {vendor && vendor !== "n/a" && <h4>{vendor}</h4>}
          <div className={styles.products}>
            {products.map((product, i) => (
              <div className={styles.product} key={i}>
                {product.product && product.product !== "n/a" && (
                  <h4>{product.product}</h4>
                )}
                {product.versions?.map((version, i) => (
                  <Version key={i} version={version} />
                ))}
              </div>
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
}

function Version({ version }: { version: Version }) {
  let versionDesc = version.version;
  if (version.lessThan) {
    versionDesc = "< " + version.lessThan;
  } else if (version.lessThanOrEqual) {
    versionDesc = "<= " + version.lessThanOrEqual;
  }
  return (
    <p>
      {versionDesc} - {version.status.toUpperCase()}
    </p>
  );
}

type ProductGroup = {
  vendor: string | undefined;
  products: Product[];
};
function getAffectedGroups(affected: Affected): ProductGroup[] {
  // Create a list of all vendors in the affected list
  const vendors = affected.map((o) => o.vendor);
  // Remove duplicates
  const uniqueVendors = [...new Set(vendors)];
  // Create a list of affected products for each vendor
  return uniqueVendors.map((vendor) => ({
    vendor: vendor,
    products: affected.filter((o) => o.vendor === vendor),
  }));
}
