import { protectedProcedure, router } from "../../trpc";


export const modify=router({
    mdf:protectedProcedure
    .mutation(async({ctx})=>{
        return await ctx.prisma.post.deleteMany({
           where:{
            propertyType:'House',
            announcementtype:'Sell'
           }
        })  
    })
})