import Profile from "@/components/Profile";
import { useEffect } from "react";
import { useHttp } from "@/hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@/store/store";
const MyProfile = (props) => {
  const user = JSON.parse(props.user);
  const dispatch = useDispatch();
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const { wishlist } = useSelector((state) => state.user);

  useEffect(() => {
    user.myWishlist.forEach(async (id) => {
      const { data } = await sendRequest(
        "get",
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tours/${id}`
      );
      if (wishlist.find((item) => item._id === data.data._id)) {
        return;
      } else {
        dispatch(userActions.addItem(data.data));
      }
    });
  }, []);

  return (
    <Profile wishlist={wishlist} orders={props.orders} user={user}></Profile>
  );
};

export default MyProfile;
export async function getServerSideProps({ req, res }) {
  const user = req.cookies.user || null;
  const expDate = req.cookies.expDate || null;
  if (user === null) {
    return {
      redirect: {
        permanent: true,
        destination: "/signin",
      },
    };
  }
  const parsedUser = JSON.parse(user);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders?user=${parsedUser.id}`
  );

  const { data } = await response.json();
  if (!data) {
    return {
      props: { user, expDate },
    };
  }
  return {
    props: { user, expDate, orders: data },
  };
}
