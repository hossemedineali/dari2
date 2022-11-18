import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import hero2 from '../../public/hero2.png'
import Searchwrapper from "../components/search/searchwrapper";
import CardCarrousel from "../components/ui/cardcarrousel";
import { trpc } from "../utils/trpc";


const Home: NextPage = () => {

  
  const [IsLoading, setIsLoading] = useState(false)

  return (
    <>
      <Head>
        <title>Dari </title>
        <meta name="description" content="Buy Rent or Sell properties" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" ">

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

        <h1 className="text-primary1 font-bold pl-5 text-2xl my-5">Latest announcement</h1>

           <CardCarrousel setIsLoading={setIsLoading} /> 
        



     


        
      
      </main>
    </>
  );
};

export default Home;


