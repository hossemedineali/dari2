import { z } from "zod";
import { router, publicProcedure } from "../../trpc";

export const querryPosts=router({
        forIndexPage:publicProcedure
        .input(z.object({
            propertyType:z.string()
        }))
        .query(async({ctx,input})=>{
            return await ctx.prisma.post.findMany({
               where:{
                propertyType:input.propertyType,
                
               },
                take:20,
                orderBy:{
                    date:'desc'
                }
            })
        })
        ,

        onePost:publicProcedure
        .input(z.object({
            id:z.string()
        }))
        .query(async({ctx,input})=>{
            return await ctx.prisma.post.findFirst({
                where:{
                    id:input.id
                }
            })
        }),

       
       

})