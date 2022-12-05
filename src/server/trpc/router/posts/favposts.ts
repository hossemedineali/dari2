
import { createWSClient } from "@trpc/client";
import { z } from "zod";
import { router,protectedProcedure, publicProcedure } from "../../trpc";


export const favorites=router({
    add:protectedProcedure
    .input(z.object({
      postid:z.string()
    }))
    
    .mutation ( async({ ctx,input }) => {
       console.log('--------API ----------')
        console.log(ctx.session)
         if(ctx.session?.user){
         const add=  await ctx.prisma.user.update({
            where:{
               id:ctx.session.user.id
            },
            data:{
                  likedposts:{
                    connect:{
                      id:input.postid
                    }
                  }
               }
             })
          if(add){
            return 'added'
           }
           else{
            throw new Error ('error')
           }
         }
          return 'not authenticated'
    }),

    delete:protectedProcedure
    .input(z.object({
      postid:z.string()
    }))
    .mutation(async({ctx,input})=>{
        if(ctx.session?.user){
          return ctx.prisma.user.update({
            where:{
              id:ctx.session.user.id
            },
            data:{
              likedposts:{
                disconnect:{
                  id:input.postid
                }
              }
            }
          })
        }
    }),
  
    getLiked:publicProcedure
    .query(async({ctx})=>{
      if(!ctx.session?.user){
        return {likedPosts:['']}
      }
      const likedposts:string[]=[]
      const liked= await ctx.prisma.user.findFirst({
        where:{
          id:ctx.session.user.id
        },
        select:{
          likedposts:{
              select:{
                id:true
              }
          },        
        }
      })

      
        liked?.likedposts.map(item=>{
          likedposts.push(item.id)
        })
      

      return {likedPosts:likedposts}
    }),
    favoritesposts:protectedProcedure
    
    .query(async({input,ctx})=>{
      if(!ctx.session.user){
        throw new Error('unothorized')
    }else{
        return await ctx.prisma.user.findFirst({
          where:{
            id:ctx.session.user.id
          },
          select:{
            likedposts:true
          }
        })
    }
    })
})