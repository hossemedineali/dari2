import NextAuth, {  type NextAuthOptions } from "next-auth";
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


       const isMatch=await signInUser(password as string,user.password)
       if(!isMatch){
        throw new Error('email or password incorrect')
       }else{
        if(user.emailisverfied==false){
          throw new Error('Email not verified')
        }
        return user
       }
      }
    })
    // ...add more providers here
  ],
  callbacks:{
    async signIn({user}){      
      
      if(user){
        console.log(user)
      }
         return true
    
      
    },
 
  async session({session,user,token}){
    
    console.log('-----------Session---------------')
      console.log('session------:',session )
      console.log('user------:',user )
      console.log('token------:',token )
      if(session.user){
       
      session.user={
          ...user,
          ...token,
        }  
        session.user.id=token.sub as string
      }
      

   
      return session
  },
  async jwt({ user,token}) {

    
    
    console.log('---------------JWt----------')
    console.log("JWT callback. Got User: ", user);
    console.log("JWT callback. Got Token: ", token);
 
    if(user){
      token.sub=user.id
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
