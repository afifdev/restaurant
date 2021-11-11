import Head from "next/head";
import Navbar from "@components/Navbar";
import Banner from "@components/Banner";
import Container from "@components/Container";
import BodyContainer from "@components/BodyContainer";
import HomeFoodCard from "@components/atoms/HomeFoodCard";
import Footer from "@components/Footer";

export default function Home() {
  return (
    <div className="font-cool font-medium">
      <Head>
        <title>Siresta | Restaurant. Everyone. Easy.</title>
      </Head>
      <Container>
        <Navbar />
        <BodyContainer>
          <Banner />
          <div className="py-16 text-center font-bold">
            <span className="rounded-xl border-2 border-black py-4 px-6">
              Discover
            </span>
          </div>
          <div className="my-8">
            <p className="font-bold text-3xl sm:text-5xl">Our Favorites</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-12 mt-8">
              <HomeFoodCard
                imageUrl="/images/1.jpg"
                name="Delicious Food"
                rating={5}
              />
              <HomeFoodCard
                imageUrl="/images/2.jpg"
                name="Delicious Food"
                rating={5}
              />
              <HomeFoodCard
                imageUrl="/images/3.jpg"
                name="Delicious Food"
                rating={5}
              />
              <HomeFoodCard
                imageUrl="/images/4.jpg"
                name="Delicious Food"
                rating={5}
              />
              <HomeFoodCard
                imageUrl="/images/5.jpg"
                name="Delicious Food"
                rating={5}
              />
              <HomeFoodCard
                imageUrl="/images/6.jpg"
                name="Delicious Food"
                rating={5}
              />
              <HomeFoodCard
                imageUrl="/images/7.jpg"
                name="Delicious Food"
                rating={5}
              />
              <HomeFoodCard
                imageUrl="/images/8.jpg"
                name="Delicious Food"
                rating={5}
              />
            </div>
          </div>
        </BodyContainer>
        <Footer />
      </Container>
    </div>
  );
}
