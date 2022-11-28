

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState } from "react";
import Tooltip from "./tooltip";
import { useLikedPosts } from "../../store/favorits";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import { useSignInModal } from "../../store/store";


const ImagesSlider:React.FC<{images:string,id:string}> = ({images,id}) => {

        const addToFav=trpc.favorites.add.useMutation()
        const DeleteFromFav=trpc.favorites.delete.useMutation()
        const favorites=useLikedPosts()
        const session=useSession()
        const SignInModal=useSignInModal()

        const imagesArray=images.split(',')
       
        const slider = useRef<Slider>(null);
        const [currentImageIndex,setCurrentImageIndex]=useState(1)
        const baseUrl="https://res.cloudinary.com/dtdexrrpj/image/upload/v1668643348/"
       
    // Add to faorites functions
    const addPostToFavorites=(id:string)=>{
            
        addToFav.mutate({postid:id})
        favorites.addPost(id)
     }

     const removePostFromFavorites=(id:string)=>{
         DeleteFromFav.mutate({postid:id})
         favorites.deletePost(id)
     }

     const hundelFavorites=(id:string)=>{

         if(session.status=='authenticated'){

             
             if(favorites.liked.includes(id)){
                 removePostFromFavorites(id)

             }else{
                 addPostToFavorites(id)
                 
             }
         }else{
          SignInModal.toggleShow()
         }

     }
  
    
    //setting for slick slider 
    const settings = {
        
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade:true,
        beforeChange: (current:number) => {setCurrentImageIndex(current+1)}
      };
    return ( <div className="min-h-max mt-10  ">
                
                   
            <div className="relative">
                <button className='absolute  z-10 hidden md:block  md:top-1/2 md:left-10 ' onClick={() => slider?.current?.slickPrev()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button> 
                <div className="relative  max-w-[560px] m-auto">

                    {/* current photo index */}
                <div>
                    <p className="text-xl font-bold absolute left-5 top-5 z-10 bg-devider rounded-full p-1">
                        {currentImageIndex}/{imagesArray.length}
                    </p>
                </div>

                <div>
                    <span className="text-xl font-bold absolute right-5 top-5 z-10  rounded-full ">
                    <Tooltip text='add to favorites' >
                    <svg onClick={()=>hundelFavorites(id)} xmlns="http://www.w3.org/2000/svg" fill={favorites.liked.includes(id)?'red':'transparent'} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`cursor-pointer  w-10 h-10  ${favorites.liked.includes(id)?'text-red':'text-black'}`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                    </Tooltip>
                    </span>
                </div>

                <Slider {...settings} ref={slider} className='mx-auto'>

                    {imagesArray.map(item=>{
                        return <div key={item} className=''>
                            <img className="mx-auto" style={{width:'100%' ,maxWidth:'560px' ,height:'auto',maxHeight:'400px'}} alt="image" src={baseUrl+item+'.jpg'}/>
                        </div>
                    })}
                    
                </Slider>
                    </div>
                <button className='absolute hidden md:block z-10  md:top-1/2 right-10 ' onClick={() => slider?.current?.slickNext()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button> 
            </div>
    </div> );
}
 
export default ImagesSlider;