import { now } from "next-auth/client/_utils";
import { z } from "zod";
import { router, publicProcedure } from "../../trpc";
import nodemailer from 'nodemailer'

export const verifyEmail=router({
    verify:publicProcedure
    .input(
        z.object({
            email:z.string()
        })
    )
    .mutation(async({input,ctx})=>{
        
        const registred =await ctx.prisma.user.findFirst({
            where:{
                email:input.email
            }
        })

      if(!registred){
        throw new Error('email not found  ')
      }

        //let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
         // host: "smtp.ethereal.email",
         service:'Gmail',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'dari.app.test@gmail.com', // generated ethereal user
            pass: 'cadsnbwazqikpvqo', // generated ethereal password
          },
        });
          

          
           let info = await transporter.sendMail({
            from: 'dari.app.test@gmail.com', // sender address
            to: input.email, // list of receivers
            subject: "Account verification ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
          }); 
         
        
console.log(info)

          return info
        
        
    })
})