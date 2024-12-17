import React from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  schema?: object;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Digitális Névjegykártya Készítés | Modern Üzleti Megoldás | QRNevjegy',
  description = 'Digitális névjegykártya készítés egyszerűen és gyorsan. Modern, környezetbarát és költséghatékony megoldás üzleti kapcsolataihoz. Készítse el saját digitális névjegyét most!',
  image = 'https://qrnevjegy.hu/og-image.jpg',
  article = false,
  schema,
}) => {
  const { pathname } = useLocation();
  const url = `https://qrnevjegy.hu${pathname}`;

  // Default schema data
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "QRNevjegy",
    "url": "https://qrnevjegy.hu",
    "description": "Professzionális digitális névjegykártya készítő szolgáltatás. Környezetbarát és modern megoldás üzleti kapcsolataihoz.",
    "keywords": [
      "digitális névjegykártya",
      "elektronikus névjegy",
      "online névjegykártya",
      "üzleti névjegy",
      "digitális kapcsolatépítés",
      "modern névjegy",
      "környezetbarát névjegykártya"
    ],
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://qrnevjegy.hu/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "QRNevjegy",
    "url": "https://qrnevjegy.hu",
    "description": "Digitális névjegykártya készítő szolgáltatás - Modern megoldás üzleti kapcsolatépítéshez",
    "logo": "https://qrnevjegy.hu/logo.png",
    "sameAs": [
      "https://facebook.com/qrnevjegy",
      "https://twitter.com/qrnevjegy",
      "https://linkedin.com/company/qrnevjegy"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+36-30-355-1793",
      "email": "info@qrnevjegy.hu",
      "contactType": "customer service",
      "availableLanguage": "Hungarian"
    },
    "offers": {
      "@type": "Offer",
      "name": "Digitális Névjegykártya Szolgáltatás",
      "description": "Professzionális digitális névjegykártya készítés vállalkozásoknak és magánszemélyeknek",
      "priceCurrency": "HUF",
      "price": "5990",
      "validFrom": "2024-01-01",
      "url": "https://qrnevjegy.hu/vcard"
    }
  };

  return (
    <>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="QRNevjegy" />
      <meta property="og:locale" content="hu_HU" />
      
      {/* Facebook App ID */}
      <meta property="fb:app_id" content="your-fb-app-id" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta name="twitter:site" content="@qrnevjegy" />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="Hungarian" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="QRNevjegy" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </>
  );
};

export default SEO;