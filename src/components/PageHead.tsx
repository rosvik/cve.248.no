import Head from "next/head";

type PageHeadProps = {
  title?: string;
  children?: React.ReactNode;
};

export function PageHead(props: PageHeadProps) {
  return (
    <Head>
      <title>{props.title ?? "cve.248.no"}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      {props.children}
    </Head>
  );
}
