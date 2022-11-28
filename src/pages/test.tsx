import { useEffect, useState } from "react";
import { Loader } from "../components/ui/loader";
import OneCard from "../components/ui/onecard";
import { Post } from "../types/typeshelper";
import { trpc } from "../utils/trpc";


const Test = () => {

    const itemPerpage=20
    const [page,setPage]=useState(1)
    const [post,setPost]=useState<Post[]>([])
const posts=trpc.infinte.infinite.useQuery({page,itemPerpage:itemPerpage})

useEffect(()=>{
    
    console.log(post)
    if(posts.data){

        const newdata=[...post,...posts.data]
      
        setPost(newdata as Post[])
    }
    
},[posts.data&&page])

const hundelLoadMore=()=>{
    setPage(page+1)
  
}

const disabled=(post.length<page*itemPerpage)
return ( <div>
        
        <div className="mt-32 flex flex-wrap w-full   justify-center  md:gap-10 ">

            {post.map((itm,index)=>{
                return  <OneCard key={index} id={itm.id} images={itm.images as string} announcementtype={itm.announcementtype} price={itm.price} pricePer={itm.pricePer as string} governorate={itm.governorate} municipality={itm.municipality} rooms={itm.rooms} size={itm.size} propertyType={itm.propertyType}  date={itm.date}/>
            })}
            </div>
        
        {!disabled&&!posts.isLoading&&<p  className='  text-xl text-center text-smallText mt-10 cursor-pointer' onClick={hundelLoadMore}>Load more</p>}
        {posts.isLoading&&<div className="h-20 w-20 mx-auto"><Loader/></div>}
    </div> );
}
 
export default Test;