import Head from "next/head";

const PageMeta = ({ title = "Reddit 2.0" }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default PageMeta;
