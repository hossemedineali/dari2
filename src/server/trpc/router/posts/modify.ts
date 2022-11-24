import { protectedProcedure, router } from "../../trpc";


export const modify=router({
    mdf:protectedProcedure
    .mutation(async({ctx})=>{
        return await ctx.prisma.post.updateMany({
            where:{
                propertyType:'house'
            },
            data:{
                propertyType:'House'
            }
        })
    })
})