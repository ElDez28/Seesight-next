import Profile from "@/components/Profile";
import { useSelector, useDispatch } from "react-redux";

import { useEffect } from "react";
import { userActions } from "@/store/store";
const MyProfile = (props) => {
  const user = JSON.parse(props.user);

  return <Profile user={user}></Profile>;
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
  return {
    props: { user, expDate },
  };
}
