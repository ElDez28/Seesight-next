import Gallery from "@/components/Gallery";
import TripHero from "@/components/TripHero";
import Location from "@/components/Location";
import TripFooter from "@/components/TripFooter";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@/store/store";
import { useHttp } from "@/hooks/useHttp";
import Modal from "@/components/Modal";
import Reviews from "../../components/Reviews";
import UAParser from "ua-parser-js";
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
        dispatch(userActions.addItem(data.data));
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
          user={user}
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
      <Reviews reviews={props.reviews} deviceType={props.deviceType}></Reviews>
      <Location
        lng={location.finalLocation.coordinates[0]}
        lat={location.finalLocation.coordinates[1]}
        coordinates={coordinates}
        name={location.title}
        duration={location.tripDuration}
        price={location.price}
      ></Location>
      <TripFooter user={props.user} setOpen={setIsOpen}></TripFooter>
    </>
  );
}
export async function getServerSideProps(context) {
  const { params } = context;
  const { req } = context;

  let userAgent;
  if (req) {
    userAgent = req.headers["user-agent"];
  } else {
    userAgent = navigator.userAgent;
  }
  const parser = new UAParser();
  parser.setUA(userAgent);
  const result = parser.getResult();
  const deviceType = (result.device && result.device.type) || "desktop";
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
  const tripId = data[0]._id;
  const reviewsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/${tripId}/tripReviews`
  );
  const reviewDate = await reviewsRes.json();
  const reviews = reviewDate.data;
  const userId = req.cookies.userId;
  if (!userId) {
    return {
      props: {
        location: data,
        deviceType,
        reviews,
      },
    };
  } else {
    const responseTwo = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/getMe`
    );
    const parsedRes = await responseTwo.json();
    const user = parsedRes.data;

    return { props: { location: data, user, deviceType, reviews } };
  }
}

export default Travel;
