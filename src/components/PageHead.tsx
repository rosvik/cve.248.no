import Head from "next/head";
import { env } from "../env.mjs";

type PageHeadProps = {
  title?: string;
  children?: React.ReactNode;
};

export function PageHead(props: PageHeadProps) {
  return (
    <Head>
      <title>{props.title ?? env.NEXT_PUBLIC_PAGE_TITLE}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      {props.children}
    </Head>
  );
}
