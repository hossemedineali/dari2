import { z } from "zod";
import { router, publicProcedure } from "../../trpc";

export const querryPosts=router({
        forIndexPage:publicProcedure
        .query(async({ctx})=>{
            return await ctx.prisma.post.findMany({
               where:{
                propertyType:'House',
                announcementtype:'Rent'
               },
                take:20,
                orderBy:{
                    date:'desc'
                }
            })
        })
        
       

})