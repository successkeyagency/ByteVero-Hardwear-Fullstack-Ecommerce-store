import React from "react";
import AfterHomeVid from "@/components/AfterHomeVid";
import Container from "@/components/Container";
import Guarantee from "@/components/Guarantee";
import HomeProducts from "@/components/HomeProducts";
import HomeVid1 from "@/components/HomeVid1";
import LatestOnConstruction from "@/components/LatestOnConstruction";
import OurBrands from "@/components/OurBrands";
import ClientLoader from "@/components/ClientLoader"; 

const Home = () => {
  return (
    <ClientLoader>
      <HomeVid1 />
      <Guarantee />
      <Container>
        <HomeProducts />
        <OurBrands />
      </Container>
      <LatestOnConstruction />
    </ClientLoader>
  );
};

export default Home;
