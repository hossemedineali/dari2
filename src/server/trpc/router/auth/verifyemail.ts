import { now } from "next-auth/client/_utils";
import { z } from "zod";
import { router, publicProcedure } from "../../trpc";

export const verifyEmail=router({
    verify:publicProcedure
    .input(
        z.object({
            id:z.string()
        })
    )
    .mutation(async({input,ctx})=>{
        
        
            return await ctx.prisma.user.update({

                where:{
                    id:'cla7zksgi0000u6u8jrpt7sjp'
                },
                data:{
                    emailVerified:new Date()
                }
            })
        
        
    })
})