        import { Post } from "@prisma/client";
        import { useSession } from "next-auth/react";
        import { useRouter } from "next/router";
        import { useEffect, useState } from "react";
        import { Loader } from "../components/ui/loader";
        import OneCard from "../components/ui/onecard";
        import { useLanguage } from "../store/store";
        import { trpc } from "../utils/trpc";

        const Listing = () => {

            const itemPerpage=20
            const [page,setPage]=useState(1)
            const [post,setPost]=useState<Post[]>([])
            const data=trpc.Listing.Listing.useQuery({page,itemPerpage:itemPerpage})
            const Delete=trpc.Listing.delete.useMutation()

            const session=useSession()
            const router=useRouter()
            const Language=useLanguage()
            useEffect(()=>{
            
                console.log(post)
                if(data.data){
            
                    const newdata=[...post,...data.data]
                
                    setPost(newdata as Post[])
                }
                
            },[data.data&&page])



            if(session.status!='loading'&&session.status!='authenticated'){
                router.push('/')
            }else{
                const hundelLoadMore=()=>{
                    setPage(page+1)
                
                }
                const hundelDelete=(e:string)=>{
                    Delete.mutate({id:e})
                   
                    setPost(prv=>prv.filter(obj=>obj.id!=e))
                    
                }
                
                const disabled=(post.length<page*itemPerpage)
                return (<div>
                            <h1 className="pl-3 mt-2 text-2xl text-medium">{Language.lng=='ENG'?'My announcments':'Mes annonces'}</h1>

                                
                            <div className="mt-10 flex flex-wrap w-full   justify-center gap-5  md:gap-10 ">

                                {post.map((itm,index)=>{
                                    return <div key={index} className="w-full sm:w-max mx-auto flex flex-col justify-center">
                                        <OneCard  id={itm.id} images={itm.images as string} announcementtype={itm.announcementtype} price={itm.price} pricePer={itm.pricePer as string} governorate={itm.governorate} municipality={itm.municipality} rooms={itm.rooms} size={itm.size} propertyType={itm.propertyType}  date={itm.date}/>
                                        <button onClick={()=>{hundelDelete(itm.id)}} className="px-2 mt-3 mx-auto border-2 border-red rounded-xl text-xl text-red hover:text-white hover:bg-red active:scale-95">{Language.lng=='ENG'?'Delete':'Supprimer'}</button>
                                        
                                        </div>
                                    
                                })}
                            </div>

                            {!disabled&&!data.isLoading&&<p  className='  text-xl text-center text-smallText mt-10 cursor-pointer' onClick={hundelLoadMore}>Load more</p>}
                            {data.isLoading&&<div className="h-20 w-20 mx-auto"><Loader/></div>}
                        </div>  );
                    }
        }
        
        export default Listing;


     