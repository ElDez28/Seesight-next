import Profile from "@/components/Profile";

const MyProfile = (props) => {
  const user = JSON.parse(props.user);

  return <Profile orders={props.orders} user={user}></Profile>;
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
