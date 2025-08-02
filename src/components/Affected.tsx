import { Fragment } from "react";
import type {
  Affected as TAffected,
  Product as TProduct,
  Version as TVersion,
} from "../types/v5-cve";
import styles from "./affected.module.css";

export function Affected({ affected }: { affected: TAffected }) {
  const groups = getAffectedGroups(affected);
  return (
    <div className={styles.affected}>
      {groups.map(({ vendor, products }) => (
        <Fragment key={vendor}>
          {vendor && vendor !== "n/a" && <h3>{vendor}</h3>}
          <div className={styles.products}>
            {products.map((product, i) => (
              <Product key={i} product={product} />
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
}

function Product({ product }: { product: TProduct }) {
  return (
    <div className={styles.product}>
      {product.product && product.product !== "n/a" && <b>{product.product}</b>}
      {product.versions?.map((version, i) => (
        <Version key={i} version={version} />
      ))}
    </div>
  );
}

function Version({ version }: { version: TVersion }) {
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
  products: TProduct[];
};
function getAffectedGroups(affected: TAffected): ProductGroup[] {
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
