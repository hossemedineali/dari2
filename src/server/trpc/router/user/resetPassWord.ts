import { off } from "process";
import { string, z } from "zod";
import { router,publicProcedure } from "../../trpc";
import { mailer } from "../auth/mailer";
import bcrypt from 'bcrypt'
import { randomBytes } from "crypto";

export const reset=router({
    sendResetEmail:publicProcedure
    .input(z.object({
        email:z.string()
    }))
    .mutation(async({input,ctx})=>{

        const checkUser=await ctx.prisma.user.findUnique({
            where:{email:input.email}
        })

        if(!checkUser){
            throw new Error('not found')
        }

        const rand = () => {
            return Math.random().toString(36).substr(2);
          };
          
          const token = () => {
            return rand() + rand();
          };

          const randomtoken=token()
        const Update=await  ctx.prisma.user.update({
            where:{email:input.email},
            data:{
                hashedId:randomtoken
            }
          })
          
         const info= await mailer(input.email,randomtoken,'rest/','rest password')
         
         if(info&&Update){
             return 'ok'
         }
         else{
            throw new Error('Somthing went wrong')
         }
    })
,
    ResetPassWord:publicProcedure
    .input(z.object({
        hashedId:string(),
        password:z.string()
    .min(1,{message:'field required'})
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,{message:'Minimum eight characters, at least one letter and one number:'}),
confpassword:z.string()
    .min(1,{message:'field required'})
    }).refine((data) => data.password === data.confpassword, {
        message: "Passwords don't match",
        path: ["confpassword"]
      }))
    .mutation(async({input,ctx})=>{
        const TokenIsValid=await ctx.prisma.user.findFirst({
            where:{hashedId:input.hashedId}
        })

        if(!TokenIsValid?.id){
            throw new Error('Invalid token')
        }
        else{
            if(TokenIsValid.id){
                const rand = () => {
                    return Math.random().toString(36).substr(2);
                  };
                  
                  const token = () => {
                    return rand() + rand();
                  };
        
                  const randomtoken=token()
                await bcrypt.hash(input.password,10).then(hash=>{
                    console.log('jasj',hash)
                return    ctx.prisma.user.update({
                        where:{
                            id:TokenIsValid.id
                        },
                        data:{
                            password:hash,
                            hashedId:randomtoken
                        }
                    })
                })
            }
        }
    })
})