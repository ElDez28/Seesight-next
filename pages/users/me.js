import Profile from "@/components/Profile";
import { useEffect } from "react";
import { useHttp } from "@/hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@/store/store";
const MyProfile = (props) => {
  const dispatch = useDispatch();
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const { wishlist } = useSelector((state) => state.user);

  useEffect(() => {
    props.user.myWishlist.forEach(async (id) => {
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

  return (
    <Profile
      wishlist={wishlist}
      orders={props.orders}
      user={props.user}
    ></Profile>
  );
};

export default MyProfile;
export async function getServerSideProps({ req }) {
  const userId = req.cookies.userId || null;
  if (userId === null) {
    return {
      redirect: {
        permanent: true,
        destination: "/signin",
      },
    };
  }

  const responseOne = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/getMe`
  );
  const parsedRes = await responseOne.json();
  const user = parsedRes.data;
  const responseTwo = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders?user=${userId}`
  );

  const { data } = await responseTwo.json();
  if (!user) {
    return {
      props: {
        user: null,
      },
    };
  } else if (!data) {
    return {
      props: { user },
    };
  }
  return {
    props: { user, orders: data },
  };
}
