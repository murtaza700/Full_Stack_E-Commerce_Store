import React from 'react'
import HeroSlider from '../sections/HomeSections/HeroSlider'
import BrandManifesto from '../sections/HomeSections/BrandManifesto'
import CollectionCuration from '../sections/HomeSections/CollectionCuration'
import FeaturedProducts from '../sections/HomeSections/FeaturedProducts'
import NoteExplorer from '../sections/HomeSections/NoteExplorer'
import HomeExtensions from '../sections/HomeSections/HomeExtensions'
import TrustBadges from '../sections/HomeSections/TrustBadges'

const Home = () => {
    return (
        <>
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