import Profile from "@/components/Profile";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "@/store/store";
function Admin(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(adminActions.setUsers(props.users));
    dispatch(adminActions.setReservations(props.orders));
    dispatch(adminActions.setComplaints(props.complaints));
  }, []);
  return (
    <Profile
      users={props.users}
      orders={props.orders}
      user={props.user}
      complaints={props.complaints}
    >
      Admin
    </Profile>
  );
}
export async function getServerSideProps({ req }) {
  const userId = req.cookies.userId || null;
  if (!userId || userId === "null") {
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

  if (user.role !== "admin") {
    return {
      redirect: {
        permanent: true,
        destination: "/",
      },
    };
  }
  const orderRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`);
  const parsedOrderRes = await orderRes.json();
  const orders = parsedOrderRes.data.sort(
    (a, b) => new Date(a.startingDate) - new Date(b.startingDate)
  );
  const complaintRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/complaints`
  );
  const parsedComplaintRes = await complaintRes.json();
  const complaints = parsedComplaintRes.data;
  const usersRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`);
  const parsedUsersRes = await usersRes.json();
  const users = parsedUsersRes.data;

  return {
    props: { user, orders, complaints, users },
  };
}
export default Admin;
