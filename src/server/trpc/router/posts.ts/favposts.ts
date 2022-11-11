
import { z } from "zod";
import { router, publicProcedure } from "../../trpc";


export const favorites=router({
    add:publicProcedure
    .input(z.object({
      postid:z.string()
    }))
    
    .mutation ( async({ ctx,input }) => {
       console.log('--------API ----------')
        console.log(ctx.session)
         if(ctx.session?.user){
           return ctx.prisma.user.update({
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
         }
          return 'not authenticated'
    }),

    delete:publicProcedure
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
    })

})