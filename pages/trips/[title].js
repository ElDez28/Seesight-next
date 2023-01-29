import Gallery from "@/components/Gallery";
import TripHero from "@/components/TripHero";
import Location from "@/components/Location";
import TripFooter from "@/components/TripFooter";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@/store/store";
import { useHttp } from "@/hooks/useHttp";
import Modal from "@/components/Modal";
function Travel(props) {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.user);
  const [location, setLocation] = useState(props.location[0]);
  const { error, sendRequest, isLoading, clearError } = useHttp();
  const [isOpen, setIsOpen] = useState(false);
  const user = props.user;

  useEffect(() => {
    if (user) {
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
    }
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
      {isOpen && (
        <Modal
          location={location}
          setOpen={setIsOpen}
          open={isOpen}
          price={location.price}
        ></Modal>
      )}
      <TripHero
        price={location.price}
        title={location.title}
        desc={location.desc}
        id={location._id}
        user={user}
        item={location}
        setOpen={setIsOpen}
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

  const userId = req.cookies.userId;
  if (userId === null) {
    return {
      props: {
        location: data,
      },
    };
  }
  const responseTwo = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/getMe`
  );
  const parsedRes = await responseTwo.json();
  const user = parsedRes.data;

  return { props: { location: data, user } };
}

export default Travel;
