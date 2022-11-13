import { z } from 'zod'
import {router, publicProcedure} from '../../trpc'

import bcrypt from 'bcrypt'

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
    }),

    updatePassword:publicProcedure
    .input(z.object({
        oldPassword:z.string({required_error:'required'}).min(2,{message:'field required'}),
        password:z.string()
                .min(1,{message:'field required'})
                .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,{message:'Minimum eight characters, at least one letter and one number:'}),
        confpassword:z.string()
                .min(1,{message:'field required'})
        
    }).refine((data) => data.password === data.confpassword, {
        message: "Passwords don't match",
        path: ["confpassword"]
      })
    ).
    mutation(async({ctx,input})=>{
        if(ctx.session?.user?.email){
            console.log(ctx.session.user.email)
            const checkpassword= await ctx.prisma.user.findFirst({
                where:{
                    email:ctx.session.user.email
                }
            })

            const passWordMatch=await bcrypt.compare(input.oldPassword,checkpassword?.password as string)
            if(!passWordMatch){
                throw new Error('wrong password')
                
            }
            
            await bcrypt.hash(input.password,10).then(async function (hash){
            const update=    await ctx.prisma.user.update({
                    where :{
                        email:ctx.session?.user?.email as string
                    },
                    data:{
                        password:hash
                    }
                })
                console.log("update :: ",update)

                if(update.id){
                    return update
                }else{
                    throw new Error('error')
                }
              

            })
        }else{

            throw new Error('Unothorized')
            
        }

    })
})