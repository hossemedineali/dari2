import { z } from "zod";
import { router, publicProcedure } from "../../trpc";
import bcrypt from "bcrypt";
import { mailer } from "../auth/mailer";



export const  adduser=router({
   

    adduser: publicProcedure
    .input(
        z.object({
            name:z.string({required_error:'nice try please enter a valid name'}),
            email:z.string().email(),
            phone:z.string().optional(),
            password:z.string().min(1,{message:'field required'})
            .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,{message:'Minimum eight characters, at least one letter and one number:'}),
        
        })
    )
    .mutation ( async({ input,ctx }) => {
             let user
        
       await bcrypt.hash(input.password, 10).then(async function(hash) {
           user= await ctx.prisma.user.create({
                data:{
                    ...input,
                    password:hash
                }
            })

            await bcrypt.hash(user.id,10).then(async function (hash) {
                
                await ctx.prisma.user.update({

                    where:{
                        email:input.email
                    },
                    data:{
                        hashedId:hash
                    }
                })
            })
            
            await bcrypt.hash(user.id,10).then(async function (hash) {
                mailer(input.email,hash)
                
            })
            
        });
        
        
        console.log('user',user)
      
        return user

      }),

      checkemail:publicProcedure
      .input(
        z.object({
            email:z.string().email({message:'please enter a valid email'})
        })
      )
      .query ( async({ input,ctx }) => {
             
         const check= await ctx.prisma.user.findUnique({
            where:{
                email:input.email
            }
           })
           
           if (check){
            return true
           }       
           else{
            return false
           }
      }),

      
   
})