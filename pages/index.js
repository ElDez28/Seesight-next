import Head from "next/head";
import Hero from "../components/Hero";
import List from "@/components/List";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
export default function HomePage(props) {
  const user = JSON.parse(props.user);

  return (
    <>
      <Head>
        <title>BIH Locations</title>
        <meta name="description" content="Most beautifle locations in BIH" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </Head>
      <Hero user={user}></Hero>
      <List locations={props.locations.data}></List>
      <Services></Services>
      <Footer></Footer>
    </>
  );
}
export async function getServerSideProps({ req }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tours?isFeatured=true`
  );
  const data = await res.json();
  const user = req.cookies.user || null;

  return { props: { locations: data, user } };
}
