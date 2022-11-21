import { type NextPage } from "next";
import { isLocalURL } from "next/dist/shared/lib/router/router";
import Head from "next/head";
import { useState } from "react";

import hero2 from '../../public/hero2.png'
import Searchwrapper from "../components/search/searchwrapper";
import CardCarrousel from "../components/ui/cardcarrousel";
import { Loader } from "../components/ui/loader";
import { useLanguage } from "../store/store";
import { trpc } from "../utils/trpc";


const Home: NextPage = () => {

  
  const Language=useLanguage()
  const houses=trpc.querryPosts.forIndexPage.useQuery({propertyType:'house'})
  const lands=trpc.querryPosts.forIndexPage.useQuery({propertyType:'land'})
 // const [IsLoading, setIsLoading] = useState(false)
  const IsLoading=houses.isLoading&&lands.isLoading
  


  return (
    <>
      <Head>
        <title>Dari </title>
        <meta name="description" content="Buy Rent or Sell properties" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        {IsLoading&&<div className=" absolute top-0 bottom-0 left-0 right-0 z-10 flex justify-center "><div className="w-40 h-40  m-auto"><Loader /></div></div>}
      {!IsLoading&&<main >
        <div className="  pt-10 md:px-3  lg:px:6">
          <h1 className=" text-center font-mono md:text-xl">Finding your next home , never been easier!</h1>
          <div style={{
            backgroundImage: `url(${hero2.src})`,
      
            backgroundSize:'contain' ,
            backgroundPosition: 'center', 
            backgroundRepeat:'no-repeat',
            
            }}    className="mt-0 h-[60vh] md:h-[80vh] w-full flex justify-center ">
            <Searchwrapper/>
          </div>
        </div>

        <h1 className="text-primary1 font-bold pl-5 text-2xl my-5">{Language.lng==''?'Latest announcement':'Dernières annonces'}</h1>
           <CardCarrousel type="house" dataa={houses.data}/> 
            <CardCarrousel type="land" dataa={lands.data}/> 
      </main>}
    </>
  );
};

export default Home;


