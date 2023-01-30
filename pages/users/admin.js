import React from "react";

function Admin() {
  return <div>Admin</div>;
}
export async function getServerSideProps({ req }) {
  const userId = req.cookies.userId || null;
  if (!userId) {
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
  const orders = parsedOrderRes.data;
  const complaintRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`
  );
  const parsedComplaintRes = await orderRes.json();
  const complaints = parsedComplaintRes.data;
  return {
    props: { user, orders },
  };
}
export default Admin;
