import React, {useEffect } from 'react'
import Hero from './Hero'
import LookingDrippy from './LookingDrippy'
import OurProducts from './OurProducts'
import Hot from './Hot'
import OurOutlet from './OurOutlet';
import Giveaway from './Giveaway';
import ReachUs from './ReachUs'
import WhyUs from './WhyUs'
function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
        <Hero/>
        <LookingDrippy/>
        <OurProducts/>
        <Hot/>
        <WhyUs/>
        <OurOutlet/>
        <ReachUs/>
        <Giveaway/>

    </div>
  )
}

export default Home