import { Post } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loader } from "../components/ui/loader";
import OneCard from "../components/ui/onecard";
import { useLikedPosts } from "../store/favorits";
import { useLanguage } from "../store/store";
import { trpc } from "../utils/trpc";

const Saved = () => {

    const itemPerpage=20
    const [page,setPage]=useState(1)
    const [post,setPost]=useState<Post[]>([])
    const data=trpc.favorites.favoritesposts.useQuery()
    const favorites=useLikedPosts()
    
    
    const session=useSession()
    const router=useRouter()
    const Language=useLanguage()
    useEffect(()=>{
    
        console.log(post)
        if(data.data){
    
            const newdata=[...post,...data.data.likedposts]
        
            setPost(newdata as Post[])
        }
        
    },[data.data&&page])

    useEffect(()=>{
    
        const newData=post.filter(obj=>favorites.liked.includes(obj.id))
        setPost(newData)
    
},[favorites.liked])


    if(session.status!='loading'&&session.status!='authenticated'){
        router.push('/')
    }else{
        const hundelLoadMore=()=>{
            setPage(page+1)
        
        }
      
        
        
        return (<div>
                    <h1 className="pl-3 mt-2 text-2xl text-medium">{Language.lng=='ENG'?'My announcments':'Mes annonces'}</h1>

                        
                    <div className="mt-10 flex flex-wrap w-full   justify-center gap-5  md:gap-10 ">

                        {post.map((itm,index)=>{
                            return <div key={index} className="w-full sm:w-max mx-auto flex flex-col justify-center">
                                <OneCard  id={itm.id} images={itm.images as string} announcementtype={itm.announcementtype} price={itm.price} pricePer={itm.pricePer as string} governorate={itm.governorate} municipality={itm.municipality} rooms={itm.rooms} size={itm.size} propertyType={itm.propertyType}  date={itm.date}/>                                
                                </div>
                            
                        })}
                    </div>

                    {post.length==0&&!data.isLoading&&(
                <div className="flex justify-center content-center items-center " >
                    <h1 className="md:text-2xl font-medium  mx-4 text-xl">You don&#39;t have any saved announcement yet! </h1>
                </div>
            )}

                    
                    {data.isLoading&&<div className="h-20 w-20 mx-auto"><Loader/></div>}
                </div>  );
            }
}

export default Saved;


