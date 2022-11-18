import { z } from "zod";
import { router, publicProcedure } from "../../trpc";

export const querryPosts=router({
        forIndexPage:publicProcedure
        .query(async({ctx})=>{
            return await ctx.prisma.post.findMany({
               
                take:20,
                orderBy:{
                    date:'desc'
                }
            })
        })
        
       

})