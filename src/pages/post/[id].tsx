import { useRouter } from 'next/router'
import { useState } from 'react'
import { trpc } from '../../utils/trpc'
import {motion } from 'framer-motion'

import Image from 'next/image'
import MapWithNoSSR from '../../components/maps/mapWithNoSSR'

import ReactTimeAgo from 'react-time-ago'
import TimeAgo  from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)



const Post = () => {
   const router=useRouter()
   
   const id=Object.values(router.query)[0]
     const post =trpc.querryPosts.onePost.useQuery({id:id as string})

    return ( <div className='relative h-64 lg:mx-[10vw] top-0 '>

        
           {/* photos section */}
            <div className=' h-[50vh] md:h-[80vh]  w-full md:w-full relative top-20'> 
                <Photos images={post.data?.images}/>
            </div>



            {/* info and map */}
            <div className='flex flex-col md:flex-row mt-20'>
            {/* info section */}

                <div className='  md:w-2/6    h-full  pt-14 my-auto'> 
                    <Info propertyType={post.data?.propertyType} announcementtype={post.data?.announcementtype} 
                    governorate={post.data?.governorate} municipalities={post.data?.municipality} size={post.data?.size} 
                    rooms={post.data?.rooms} price={post.data?.price} priceper={post.data?.pricePer} date={post.data?.date as Date} authername={post.data?.authername }/>
                    <div className='hidden md:block  my-auto'>
                                        <Features Garage={post.data?.Garage} Balcony={post.data?.Balcony} OutdoorArea={post.data?.OutdoorArea} SolarHotwater={post.data?.SolarHotwater} SwimmingPool={post.data?.SwimmingPool} UndercoverParking={post.data?.UndercoverParking} airConditioning={post.data?.airConditioning} solarPanels={post.data?.solarPanels}/>
                    </div>
                </div>
        
            {/* map */}
                {post.data?.isposition&&<div className='  md:pt-6 w-full md:w-4/6 md:h-[85vh] h-[45vh] flex '>
                 <div className='w-full '><MapWithNoSSR setposition={()=>{return null}} position={[post.data?.lng as number,post.data?.lat as number]}/></div>
                </div>}
            </div>
       
       
        <div className='w-full  md:hidden '>
            <h1 className='text-2xl '>Features </h1>
        <Features Garage={post.data?.Garage} Balcony={post.data?.Balcony} OutdoorArea={post.data?.OutdoorArea} SolarHotwater={post.data?.SolarHotwater} SwimmingPool={post.data?.SwimmingPool} UndercoverParking={post.data?.UndercoverParking} airConditioning={post.data?.airConditioning} solarPanels={post.data?.solarPanels}/>
        </div>
        


        <div className='mt-5'>

        <div>
            <h1>Description:</h1>
            <p className=' border  p-4 rounded-xl my-2'> {post.data?.description}</p>
        </div>
        <div className='text-center'>
            <h1>
            Contact the owner :
            </h1>
          <div className='flex  md:p-4  m-auto max-w-max '>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" text-green w-8 h-8 mr-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span>{post.data?.contact}</span>
          </div>
        </div>

        </div>
    </div> );
}






const Photos:React.FC<{images:string|null|undefined}>=({images})=>{

    console.log(images)
    const photos=images?.split(',')
    const [currentPhoto,setcurrentPhoto]=useState(0)


let url
    if(photos){
        url="https://res.cloudinary.com/dtdexrrpj/image/upload/v1668643348/"+photos[currentPhoto]+".jpg"
      //  url="https://res.cloudinary.com/dou8jjade/image/upload/v1665870510/"+photos[currentPhoto]+".jpg"

    }
    
    const forWard=()=>{

        if(photos){
            if(currentPhoto<photos.length-1){
                setcurrentPhoto(currentPhoto+1)
            }
            if(currentPhoto==photos.length-1){
                setcurrentPhoto(0)
            }
        }
    }

    const backWord=()=>{

        if(photos){
            if(currentPhoto>0){
                setcurrentPhoto(currentPhoto-1)
            }
            if(currentPhoto==0){
                setcurrentPhoto(photos.length-1)
            }
        }
    }


return <div className=' w-full h-full  absolute '>

    {photos&& 
    <>
    <span className='absolute top-10 z-10 right-5 font-medium text-2xl' >{currentPhoto +1 }/{photos?.length}</span>
        <span onClick={backWord}  className='absolute top-[50%] z-10'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 cursor-pointer hover:text-smallText">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
        </span>
        <motion.div draggable>
 {  <Image  src={url as string} fill sizes='100' alt='image' />     } 

        </motion.div >  

        <span onClick={forWard} className='absolute top-[50%]  right-0'> 

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 cursor-pointer hover:text-smallText">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>

        </span>
    </>
        }
     </div>
}


type Info={
    propertyType?:string |undefined,
    announcementtype?:string |undefined,
    governorate?:string |undefined,
    municipalities?:string |undefined,
    size?:number|undefined,
    rooms?:number|undefined,
    price?:number|undefined,
    priceper?:string|undefined|null,
    date:Date,
    authername?:string
}

const Info:React.FC<Info>=( {propertyType,announcementtype,governorate,municipalities,size,rooms ,price,priceper,date,authername})=>{
  
    return(
        <div className='h-full  w-full md:pt-10 pl-10 mb-12 md:mb-0  '>
                    {/* announcement type  */}
                    <p className='md:text-2xl text:xl '>Aded By:<span className='md:text-2xl text:xl text-primary1'>{authername}</span></p>
            <p className='md:text-2xl text:xl '><span className='font-semibold' >{propertyType} For :</span> {announcementtype}</p>
            
                        {/* Location  */}
            <div className='mt-2 text-xl flex gap-2 '>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>

                <p> {governorate} {municipalities?.toLocaleLowerCase()!=governorate?.toLocaleLowerCase()?','+municipalities:''} </p>
                </div>

            {/* size and rooms */}

            <div className='flex  gap-4 w-full  '>
           
               
               <div className='mt-2 text-xl flex gap-2'>
                <svg className="inline-block w-6 h-6 xl:w-4 xl:h-4 mr-3 fill-current text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M399.959 170.585c-4.686 4.686-4.686 12.284 0 16.971L451.887 239H60.113l51.928-51.444c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0l-84.485 84c-4.686 4.686-4.686 12.284 0 16.971l84.485 84c4.686 4.686 12.284 4.686 16.97 0l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L60.113 273h391.773l-51.928 51.444c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l84.485-84c4.687-4.686 4.687-12.284 0-16.971l-84.485-84c-4.686-4.686-12.284-4.686-16.97 0l-7.07 7.071z"></path></svg>
                <p>{size} m2</p>
               </div>

              {propertyType=="house"&& <div className='mt-2 text-xl flex gap-2 '>
               <svg className="w-6 h-6  fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M480,226.15V80a48,48,0,0,0-48-48H80A48,48,0,0,0,32,80V226.15C13.74,231,0,246.89,0,266.67V472a8,8,0,0,0,8,8H24a8,8,0,0,0,8-8V416H480v56a8,8,0,0,0,8,8h16a8,8,0,0,0,8-8V266.67C512,246.89,498.26,231,480,226.15ZM64,192a32,32,0,0,1,32-32H208a32,32,0,0,1,32,32v32H64Zm384,32H272V192a32,32,0,0,1,32-32H416a32,32,0,0,1,32,32ZM80,64H432a16,16,0,0,1,16,16v56.9a63.27,63.27,0,0,0-32-8.9H304a63.9,63.9,0,0,0-48,21.71A63.9,63.9,0,0,0,208,128H96a63.27,63.27,0,0,0-32,8.9V80A16,16,0,0,1,80,64ZM32,384V266.67A10.69,10.69,0,0,1,42.67,256H469.33A10.69,10.69,0,0,1,480,266.67V384Z"></path></svg>
                <p>{rooms} rooms</p>
               </div>}
            </div>

            {/* price */}
            <div className='mt-2 flex justify-between'>
                <p className='text-2xl text-red' >{price} Tnd{announcementtype=='Rent'?<span> {price?'/'+priceper:""}</span>:null}</p>
                {date && <ReactTimeAgo date={date} className='mr-1'/>}
            </div>

        </div>
    )
}


type Featuresprops={
    Balcony:boolean|undefined,
    Garage:boolean|undefined,
    OutdoorArea:boolean|undefined,
    SolarHotwater:boolean|undefined,
    SwimmingPool:boolean|undefined,
    UndercoverParking:boolean|undefined,
    airConditioning:boolean|undefined,
    solarPanels:boolean|undefined,

}

const Features:React.FC<Featuresprops>=(props)=>{

const show=props.Garage||props.Balcony||props.OutdoorArea||props.SolarHotwater||props.SwimmingPool||props.UndercoverParking||props.airConditioning||props.solarPanels

if(show)  {return<div className='flex flex-wrap gap-6 mt-6 justify-center content-end '>
        {Object.entries(props).map((key,index)=>{
                if(key[1]==true)return <div className='border w-2/5 text-center py-2 break-all' key={index}>
                {key[0]}
</div>
                
        })}
</div>}
else{return null}
}
 
export default Post;



