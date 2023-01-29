import CompleteList from "@/components/CompleteList";
import ListHero from "@/components/ListHero";
import React, { useCallback, useState } from "react";
import Head from "next/head";
import {
  faBridgeWater,
  faSailboat,
  faWater,
  faVideo,
  faMosque,
  faWind,
  faHeart,
  faBook,
  faCampground,
} from "@fortawesome/free-solid-svg-icons";

function Index(props) {
  const user = props.user;
  const [trips, setTrips] = useState(props.locations.data);
  const icons = [
    faBridgeWater,
    faSailboat,
    faWater,
    faVideo,
    faMosque,
    faWind,
    faHeart,
    faBook,
    faCampground,
  ];
  const settingTripsFn = useCallback((trips) => {
    setTrips(trips);
  }, []);

  return (
    <>
      <Head>
        <title>All locations</title>
      </Head>
      <ListHero
        user={user}
        locations={props.locations.data}
        setTrips={settingTripsFn}
        trips={props.locations.data}
      ></ListHero>
      <CompleteList icons={icons} trips={trips}></CompleteList>
    </>
  );
}
export async function getServerSideProps({ req }) {
  const responseOne = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tours`
  );
  const data = await responseOne.json();

  const userId = req.cookies.userId;
  if (!userId) {
    return {
      props: {
        locations: data,
      },
    };
  }
  const responseTwo = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/getMe`
  );
  const parsedRes = await responseTwo.json();
  const user = parsedRes.data;

  return { props: { locations: data, user } };
}
export default Index;
