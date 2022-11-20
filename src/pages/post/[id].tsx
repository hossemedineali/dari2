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

TimeAgo.addLocale(en)
TimeAgo.addLocale(fr)




 
const Post = () => {

    const router=useRouter()
   
   const id=Object.values(router.query)[0]
   if(id){
    console.log(id ,typeof(id))
    return <PostContent id={id as string}/>
   }
    return ( <Loader/> );
}
 
const PostContent:React.FC<{id:string}>=({id})=>{

    const post =trpc.querryPosts.onePost.useQuery({id})


    return <div className=' overflow-clip pb-10'>
                    {post.data?.images&&<ImagesSlider images={post.data.images}/>}

    </div>
}


export default Post;



