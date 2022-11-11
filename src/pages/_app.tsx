import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AnimatePresence } from "framer-motion"

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import Layout from "../components/layout/layout";
import { useEffect } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  const getuser=trpc.getuser.getuserForSettingPage.useMutation()

  useEffect(()=>{
    getuser.mutate()
    console.log(getuser)
  },[])

  return (
    <SessionProvider session={session}>
      <AnimatePresence>
      <Layout>

      <Component {...pageProps} />
      </Layout>
      </AnimatePresence>

    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
