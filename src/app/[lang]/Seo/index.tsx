import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  image: string;
  url: string;
}

const SEO = ({ title, description, keywords, image, url }: SEOProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Achei!" />
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <link rel="icon" href="/favicon.ico" type="image/png" />
    </Head>
  );
};

SEO.defaultProps = {
  title: "Achei Solutions - Business Services in Massachusetts",
  description:
    "Achei Solutions provides comprehensive business services in Massachusetts, including business formation, compliance, and digital solutions.",
  keywords:
    "business services, massachusetts, company formation, compliance, digital solutions, achei",
  image: "/src/assets/home-banner.jpg",
  url: "https://www.acheisolutions.com/",
};

export default SEO;
