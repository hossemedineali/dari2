import { useRouter } from 'next/router'
import { useState } from 'react'
import { trpc } from '../../utils/trpc'
import {motion } from 'framer-motion'

import Image from 'next/image'
import MapWithNoSSR from '../../components/maps/mapWithNoSSR'

import ReactTimeAgo from 'react-time-ago'
import TimeAgo  from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import fr from 'javascript-time-ago/locale/fr.json'
import Slider from 'react-slick'
import { Loader } from '../../components/ui/loader'
import ImagesSlider from '../../components/ui/imagesslider'
import { useLanguage } from '../../store/store'

TimeAgo.addLocale(en)
TimeAgo.addLocale(fr)




 
const Post = () => {

    const router=useRouter()
    
   
   const id=Object.values(router.query)[0]
   if(id){
    
    return <PostContent id={id as string}/>
   }
    return ( <Loader/> );
}
 
const PostContent:React.FC<{id:string}>=({id})=>{

    const post =trpc.querryPosts.onePost.useQuery({id})
    const Language=useLanguage()
  

    const featuresToshow={'Balcony':{isTrue:post.data?.Balcony as boolean,eng:'Balcony',fr:'Balcon'},'Garage':{isTrue:post.data?.Garage,eng:'Garage',fr:'Garage'},'OutdoorArea':{isTrue:post.data?.OutdoorArea,eng:'Outdoor area',fr:'Jaridn'},'SolarHotwater':{isTrue:post.data?.SolarHotwater,eng:'Solar hot water',fr:'Chauffeau solaire'},'SwimmingPool':{isTrue:post.data?.SwimmingPool,eng:'Swiming pool',fr:'Piscine'},'UndercoverParking':{isTrue:post.data?.UndercoverParking,eng:'Undercover parking',fr:'parking couvert'},'solarPanels':{isTrue:post.data?.solarPanels,eng:'SolarPanels',fr:'Panneau solaire'},'airConditioning':{isTrue:post.data?.airConditioning,eng:'AirConditioning',fr:'Climatisé'}}
    console.log(featuresToshow)
    return <div className=' overflow-clip pb-10'>
                {post.isLoading&&<div className=" absolute top-0 bottom-0 left-0 right-0 z-10 flex justify-center "><div className="w-40 h-40  m-auto"><Loader /></div></div>}
                {post.data&&<div>
                     {post.data?.images&&<ImagesSlider images={post.data.images} id={post.data.id}/>} 
                    
                    <div className=' flex md:flex-row flex-col m gap-2    mt-12 lg:px-10 md:px-4 '>
                        <div className=' lg:w-5/12 w-full min-h-[412px] order-1 rounded-xl border-devider border-4 p-4 flex flex-col gap-4'>
                                
                            {/* title : property type && announcment type */}
                            <div className='flex justify-center'>
                                {post.data.propertyType=='Land'&&<div>
                                    <p className='text-2xl font-bold'>{Language.lng=='ENG'?'Land for ':'Terrain '}{post.data.announcementtype=='Sell'?(Language.lng=='ENG'?'sell':'à vendre'):(Language.lng=='ENG'?"rent":"pour location")}</p> 
                                    </div>}
                                {post.data.propertyType=='house'&&<div className=''>
                                    {post.data.announcementtype=='Sell'&&<p className='text-2xl font-bold '>
                                            {Language.lng=='ENG'?'House for sell':' Maison à vendre'}
                                        </p>}
                                    {post.data.announcementtype=='Rent'&&<p className='text-2xl font-bold '>
                                            {Language.lng=='ENG'?'House for rent':' Maison pour location'}
                                        </p>}
                                    {post.data.announcementtype=='CoRental'&&<p className='text-2xl font-bold '>
                                            {Language.lng=='ENG'?'Looking for Flatmates':' Cherche un colocataires'}
                                        </p>}
                                    </div>}
                            </div>
                                    {/* ------------------------------------------- */}

                            <div className='flex sm:justify-evenly  flex-row flex-wrap  gap-4 sm:gap-0'>

                                    {/* municipality */}
                                <div className='flex'>   
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                        <p className='text-lg'>{post.data.municipality} {post.data.governorate!=post.data.municipality?`-${post.data.governorate}`:''}</p>
                                </div>
                                {/* ------------------------------------------- */}

                                {/* price */}
                                <div className='flex gap-1 '>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className='text-red font-medium text-lg'>{post.data.price} dt{post.data.pricePer=='Daily'&&(Language.lng=='ENG'?'/day':'/jour')}{post.data.pricePer=='Mounthly'&&(Language.lng=='ENG'?'/mounth':'/mois')}</p>
                                </div>
                            </div>
                                     {/* ------------------------------------------ */}





                               

                                <div className='h-[2px] bg-devider'></div>

                                    <div className="flex justify-evenly bg-white px-4 py-1 space-x-5 rounded-lg overflow-hidden ">
                            
                                        {post.data.propertyType=='house'&& <p className="flex items-center font-medium text-gray-800">
                                                <svg className="w-5 h-5  fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M480,226.15V80a48,48,0,0,0-48-48H80A48,48,0,0,0,32,80V226.15C13.74,231,0,246.89,0,266.67V472a8,8,0,0,0,8,8H24a8,8,0,0,0,8-8V416H480v56a8,8,0,0,0,8,8h16a8,8,0,0,0,8-8V266.67C512,246.89,498.26,231,480,226.15ZM64,192a32,32,0,0,1,32-32H208a32,32,0,0,1,32,32v32H64Zm384,32H272V192a32,32,0,0,1,32-32H416a32,32,0,0,1,32,32ZM80,64H432a16,16,0,0,1,16,16v56.9a63.27,63.27,0,0,0-32-8.9H304a63.9,63.9,0,0,0-48,21.71A63.9,63.9,0,0,0,208,128H96a63.27,63.27,0,0,0-32,8.9V80A16,16,0,0,1,80,64ZM32,384V266.67A10.69,10.69,0,0,1,42.67,256H469.33A10.69,10.69,0,0,1,480,266.67V384Z"></path></svg>
                                                {post.data.rooms}
                                            </p>}
                                            <p className="flex items-center font-medium text-gray-800">                                           
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                                                </svg>
                                                {post.data.size} m2
                                            </p>
                                    </div>

                                <div className='h-[2px] bg-devider justify-between'></div>
                                    <div className='flex flex-wrap sm:flex-row flex-col justify-between sm:px-2'>
                                        {Object.values(featuresToshow).map((value)=>{
                                            if(value.isTrue){
                                                return <span key={value.eng} className='border-devider border-2 min-w-[150px] place-self-center	 sm:w-2/5 text-center mb-2 font-medium py-2 '>
                                                    {Language.lng=='ENG'?value.eng:value.fr}
                                                </span>
                                                            }
                                            return null
                                        })}
                                    </div>



                        </div>
                        
                        <div className='lg:w-7/12  w-full h-[412px] order-2'><MapWithNoSSR setposition={()=>{return null}} position={[post.data?.lng as number,post.data?.lat as number]}/></div>
                    </div>


                    <div className='flex md:flex-row flex-col  gap-4 mt-10   lg:px-10 md:px-4 '>
                        <div className='w-full lg:w-5/12 border-4 border-devider rounded-xl h-20 relative py-4 flex justify-center'>
                            <p className='absolute  top-[-17px] bg-white  left-5 text-lg font-medium'>Contact</p>
                            <span className='flex gap-2 px-2 text-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green">
                                < path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                </svg>
                                <p className='text-lg'>{post.data.contact}</p>
                            </span>
                        </div>

                        <div className='w-full lg:w-7/12 border-4 min-h-20 border-devider rounded-xl relative py-4 pl-2'>

                            <p className='absolute  top-[-17px] bg-white  left-5 text-lg font-medium'>Description</p>
                            <span className='  '>
                                {post.data.description} 
                            </span>
                        </div>

                    </div>
                    </div>}

         </div>
}


export default Post;



