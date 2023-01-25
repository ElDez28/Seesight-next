import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "../store/store";

import NProgress from "nprogress";
import NextNProgress from "nextjs-progressbar";
import { useDispatch } from "react-redux";
import { userActions } from "../store/store";
export default function App({ Component, pageProps }) {
  NProgress.configure({ showSpinner: false });
  // const user = JSON.parse(pageProps.user);
  // const dispatch = useDispatch();
  // dispatch(userActions.setUser(user));
  return (
    <>
      <NextNProgress color="#FF5733" />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
export async function getServerSideProps({ req }) {
  const user = req.cookies.user || null;

  return { pageProps: { user } };
}
