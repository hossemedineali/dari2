import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import bcrypt from "bcrypt";



export const  adduser=router({
   

    adduser: publicProcedure
    .input(
        z.object({
            name:z.string(),
            email:z.string(),
            phone:z.string().optional(),
            password:z.string(),
        
        })
    )
    .mutation ( async({ input,ctx }) => {
             let user
        
       await bcrypt.hash(input.password, 10).then(function(hash) {
           user=  ctx.prisma.user.create({
                data:{
                    ...input,
                    password:hash
                }
            })
        });
        
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