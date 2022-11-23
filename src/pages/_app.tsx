import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AnimatePresence } from "framer-motion"

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import Layout from "../components/layout/layout";
import { useLikedPosts } from "../store/favorits";
import { useEffect } from "react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const likedPosts=trpc.favorites.getLiked.useQuery()
  const favorites=useLikedPosts()

  useEffect(()=>{
    if(likedPosts.data){
      favorites.setliked(likedPosts.data.likedPosts)
    }


  },[likedPosts.data?.likedPosts])

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
