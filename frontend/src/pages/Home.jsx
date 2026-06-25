import React from 'react'
import HeroSlider from '../sections/HeroSlider'
import BrandManifesto from '../sections/BrandManifesto'
import CollectionCuration from '../sections/CollectionCuration'
import FeaturedProducts from '../sections/FeaturedProducts'
import NoteExplorer from '../sections/NoteExplorer'
import TrustBadges from '../sections/TrustBadges'
import HomeExtensions from '../sections/HomeExtensions'

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