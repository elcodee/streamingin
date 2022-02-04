import { NextUIProvider } from "@nextui-org/react";
import "antd/dist/antd.css";
import { UserProvider } from "../contex/user";

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </NextUIProvider>
  );
}

export default MyApp;
