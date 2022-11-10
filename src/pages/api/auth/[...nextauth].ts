import NextAuth, { Session, User, type NextAuthOptions } from "next-auth";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import { randomBytes, randomUUID } from "crypto";


export const authOptions: NextAuthOptions = {
  
  // Include user.id on session



  session:{
    strategy:"jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    }
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
       password: { label: "Password", type: "password" }
      },  
      
      
      async authorize(credentials) {
       
        const email:string|undefined=credentials?.email
        const password=credentials?.password
      const user= await prisma.user.findUnique({
          where:{
            email
          },
          select:{
            id:true,
            email:true,
            phone:true,
            password:true,
            name:true,
            emailisverfied:true
            }
        })
       if(!user){
        throw new Error('email or password incorrect')
       }
       const isMatch=await  signInUser(password as string,user.password)
       if(!isMatch){
        throw new Error('email or password incorrect')
       }else{
        return user
       }
      }
    })
    // ...add more providers here
  ],
  callbacks:{
    async signIn(user:any){      
      console.log('################################################################################')
      console.log('################################################################################')
      console.log('################################################################################')
      console.log('################################################################################')

      try
      {
          //the user object is wrapped in another user object so extract it
          user=user.user
          if (typeof user.id !== typeof undefined)
          
          {
              if (user )
              {
                
               return user;
              }
              else
              {
                // console.log("User is not active")
                  return false;
              }
          }
          else
          {
             // console.log("User id was undefined")
              return false;
          }
      }
      catch (err)
      {
         // console.error("Signin callback error:", err);
      }
    },
 
  async session({session,user,token}){
    
    console.log('-----------Session---------------')
      console.log('session------:',session )
     console.log('user------:',user )
      console.log('token------:',token )
      console.log(session.user?.emailisverfied)

      
      if(session.user){
        if(token.emailisverfied){
          session.user.emailisverfied=token.emailisverfied as boolean
  
        }
      
      }
      

  // console.log(session.user)
      return session
  },
  async jwt({ user,token}) {

  //  console.log('---------------JWt----------')
    //console.log("JWT callback. Got Token: ", token);
    if(user){
      //console.log("JWT callback. Got User: ", user);
      //console.log('email is verified :',user.emailisverfied)
      token.emailisverfied = user.emailisverfied;
    }
   
        
     
    return token;
}  

,

 
  },
 


};


//
const signInUser=async(password:string,userPassword:string)=>{
 const isMatch= await bcrypt.compare(password,userPassword)
 /* if(!isMatch){
  throw new Error('email or password incorrect')
 }
 const userprofile={
  id:user.id,
  email:user.email,
  phone:user.phone,
  name:user.name,
  liked:user.liked,
  posts:user.posts,
  emailisverfied:user.emailisverfied,

 } */
 return isMatch
}

export default NextAuth(authOptions);
