import Gallery from "@/components/Gallery";
import TripHero from "@/components/TripHero";
import Location from "@/components/Location";
import TripFooter from "@/components/TripFooter";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@/store/store";
import { useHttp } from "@/hooks/useHttp";
function Travel(props) {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.user);
  const [location, setLocation] = useState(props.location[0]);
  const { error, sendRequest, isLoading, clearError } = useHttp();
  const user = JSON.parse(props.user);
  useEffect(() => {
    user.myWishlist.forEach(async (id) => {
      const { data } = await sendRequest(
        "get",
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tours/${id}`
      );
      if (wishlist.some((item) => item._id === data.data._id)) {
        return;
      } else {
        dispatch(userActions.addItem(data.data));
      }
    });
  }, []);
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
        item={location}
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

export default Travel;
