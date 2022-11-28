import { createWSClient } from "@trpc/client";
import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";


export const Listing=router({
    Listing:protectedProcedure
    .input(z.object({
        page:z.number(),
        itemPerpage:z.number(),
    }))
    .query(async({ctx,input})=>{
        if(!ctx.session.user){
            throw new Error('unothorized')
        }else{
            return await ctx.prisma.post.findMany({
                where:{
                    auther:ctx.session.user.id
                },
                take:input.itemPerpage,
                skip:input.itemPerpage*(input.page-1),
                orderBy:{
                  date:'desc'
                }
            })
        }
    }),

    delete:protectedProcedure
    .input(z.object({
        id:z.string()
    }))
    .mutation(async({ctx,input})=>{
        if(!ctx.session.user){
            throw new Error('unothorized')
        }
        else{
            return await ctx.prisma.post.delete({
                where:{
                    id:input.id
                }
            })
        }
    })
})