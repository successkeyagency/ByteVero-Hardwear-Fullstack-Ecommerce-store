import Container from "@/components/Container";
import HomeVid1 from "@/components/HomeVid1";
import { Button } from "@/components/ui/button";
import React from "react";

const Home = () => {
  return (
    <>
      
      <HomeVid1 />
      
      <Container>
        <h2>Home</h2>
        <p>lambo on the docs frl</p>
        <Button variant="ghost">clicked me</Button>
      </Container>
    </>
  );
};

export default Home;
