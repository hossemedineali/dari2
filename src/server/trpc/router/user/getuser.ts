import { router,publicProcedure } from "../../trpc";

export const getUser=router({
    getuserForSettingPage:publicProcedure
    .mutation(async({ctx})=>{
        if(ctx.session?.user?.email){
            return await ctx.prisma.user.findFirst({
                where:{
                    email:ctx.session.user?.email 
                },
                select:{
                    id:true,
                    email:true,
                    name:true,
                    phone:true,  
                }
            })
        }
        else{
            throw new Error('Unothorized')
        }
    })
})