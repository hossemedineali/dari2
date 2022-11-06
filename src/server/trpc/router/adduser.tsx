import { z } from "zod";
import { router, publicProcedure } from "../trpc";


export const  adduser=router({
   

    adduser: publicProcedure
    .input(
        z.object({
            name:z.string(),
            email:z.string(),
            phone:z.string().optional(),
            password:z.string()
        })
    )
    .mutation ( async({ input,ctx }) => {
             
           

        return ctx.prisma.user.create({
            data:{
                ...input
            }
        });
      }),

      checkemail:publicProcedure
      .input(
        z.object({
            email:z.string().email({message:'please enter a valid email'})
        })
      )
      .query ( async({ input,ctx }) => {
             
           return await ctx.prisma.user.findUnique({
            where:{
                email:input.email
            }
           })

        
      }),

      
   
})