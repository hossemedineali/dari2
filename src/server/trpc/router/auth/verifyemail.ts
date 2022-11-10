import { z } from "zod";
import { router, publicProcedure } from "../../trpc";
import { mailer } from "./mailer";
import bcrypt from "bcrypt";

export const verifyEmail=router({
    SendEmail:publicProcedure
    .input(
        z.object({
            email:z.string()
        })
    )
    .mutation(async({input,ctx})=>{

      
        
        const registred =await ctx.prisma.user.findFirst({
            where:{
                email:input.email,
                
            }
        })

      if(!registred){
        throw new Error('email not found   ')
      }

      if(registred.emailisverfied==true){
        throw new Error('Email already verified')
      }
      console.log(registred)
let info
     await bcrypt.hash(registred.id,10).then(async function(hash){
      console.log('hashing ; the id is',registred.id)
        console.log('the hash is :',hash)
        console.log('the saved hash is ',registred.hashedId)
        await ctx.prisma.user.update({
          where:{
            email:input.email
          },
          data:{
            hashedId:hash
          }
        })
         info=mailer(input.email,hash)
        
      })
    return info
    }),

    verify:publicProcedure
    .input(
        z.object({
            hashedId:z.string()
        })
    )
    .mutation(async({input,ctx})=>{

      console.log('hash reseived from verificarion ',input.hashedId)
   
        const user=await  ctx.prisma.user.findFirst({
          where:{
            hashedId:input.hashedId
          }
        })
        console.log(user)
        if(!user){
          throw new Error('invalid token')
        }
        if(user.email){

          return await ctx.prisma.user.update({
            where:{
              email:user.email
            },
            data:{
              emailisverfied:true
            }
          })
        }
       
      
      return {message:'somthing went wrong'}
        
        
    }),

    

})




