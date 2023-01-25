import Gallery from "@/components/Gallery";
import TripHero from "@/components/TripHero";
import Location from "@/components/Location";
import TripFooter from "@/components/TripFooter";
import { useState } from "react";
function Travel(props) {
  const [location, setLocation] = useState(props.location[0]);
  const user = JSON.parse(props.user);
  console.log(location);
  const coordinates = location.locations.map((item) => {
    return {
      lng: item.coordinates[0],
      lat: item.coordinates[1],
      name: item.name,
    };
  });
  return (
    <>
      <TripHero
        price={location.price}
        title={location.title}
        desc={location.desc}
        id={location._id}
        user={user}
      ></TripHero>
      <Gallery images={location.images}></Gallery>
      <Location
        lng={location.finalLocation.coordinates[0]}
        lat={location.finalLocation.coordinates[1]}
        coordinates={coordinates}
        name={location.title}
        duration={location.tripDuration}
        price={location.price}
      ></Location>
      <TripFooter></TripFooter>
    </>
  );
}
export async function getServerSideProps(context) {
  const { params } = context;
  const { req } = context;
  const title = params.title;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tours?title=${title}`
  );

  const { data } = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      location: data,
      user: req.cookies.user || null,
    },
  };
}

// export async function getStaticPaths() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tours`);
//   const { data } = await res.json();

//   const titles = data.map((item) => item.title);
//   const params = titles.map((title) => ({ params: { title } }));
//   return {
//     paths: params,
//     fallback: false,
//   };
// }
export default Travel;
