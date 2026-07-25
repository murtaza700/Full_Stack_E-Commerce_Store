import React from 'react'
import HeroSlider from '../sections/HomeSections/HeroSlider'
import BrandManifesto from '../sections/HomeSections/BrandManifesto'
import CollectionCuration from '../sections/HomeSections/CollectionCuration'
import FeaturedProducts from '../sections/HomeSections/FeaturedProducts'
import NoteExplorer from '../sections/HomeSections/NoteExplorer'
import HomeExtensions from '../sections/HomeSections/HomeExtensions'
import TrustBadges from '../sections/HomeSections/TrustBadges'

import Meta from '../components/Meta'

const Home = () => {
    return (
        <>
            <Meta
                title="Boutique Storefront"
                description="Indulge your senses in unmatched artisanal fragrance profiles formulated by world-class luxury maestros."
                keywords="oud fragrances, signature luxury scent profile, maison oils catalog"
            />

            <HeroSlider />
            <BrandManifesto />
            <CollectionCuration />
            <FeaturedProducts />
            <NoteExplorer />
            <HomeExtensions />
            <TrustBadges />
        </>
    )
}

export default Home