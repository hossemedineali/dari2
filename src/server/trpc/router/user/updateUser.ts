import { z } from 'zod'
import {router, publicProcedure} from '../../trpc'


export const updateUser=router({
    updateAccount:publicProcedure
    .input(z.object({
        name:z.string({required_error:'nice try please enter a valid name'}),
       // email:z.string({required_error:'nice , please provide the email'}),
        phone:z.string(),
    }))
    .mutation(async({input,ctx})=>{
        if(ctx.session?.user){
            return await ctx.prisma.user.update({
                where:{
                    id:ctx.session.user.id,
                    email:ctx.session.user.email as string
                },
                data:{
                    name:input.name,
                    phone:input.phone
                }
            })
        }
    })
})