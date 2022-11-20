
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState } from "react";


const ImagesSlider:React.FC<{images:string}> = ({images}) => {

        const imagesArray=images.split(',')
        const slider = useRef<Slider>(null);
        const [currentImageIndex,setCurrentImageIndex]=useState(1)
    const baseUrl="https://res.cloudinary.com/dtdexrrpj/image/upload/v1668643348/"
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

                <p className="text-2xl font-semibold absolute right-5 top-5 z-10">{currentImageIndex}/{imagesArray.length}</p>
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