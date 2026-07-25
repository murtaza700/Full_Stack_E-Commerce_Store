import React from 'react';
import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
    const baseTitle = "Scentsô | Luxury Fragrances Boutique";
    const defaultDesc = "Explore high-fidelity, luxury boutique fragrance formulations and artisan perfume collections custom-crafted for exquisite profiles.";
    const defaultKeywords = "luxury perfume, boutique scents, custom fragrance formulations, maison scents, premium colognes";

    return (
        <Helmet>
            <title>{title ? `${title} | Scentsô` : baseTitle}</title>
            <meta name="description" content={description || defaultDesc} />
            <meta name="keywords" content={keywords || defaultKeywords} />

            <meta property="og:title" content={title ? `${title} | Scentsô` : baseTitle} />
            <meta property="og:description" content={description || defaultDesc} />
            <meta property="og:type" content="website" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title ? `${title} | Scentsô` : baseTitle} />
            <meta name="twitter:description" content={description || defaultDesc} />
        </Helmet>
    );
};

export default Meta;