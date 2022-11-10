
import { NextApiRequest, NextApiResponse } from 'next';



export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const { id  } = req.query 
    

  const finduser=  await prisma?.user.findFirst({
      where:{
        hashedId:id as string
      }
    })
    res.end(finduser?.email||'what?')
    
    if(finduser){
      await prisma?.user.update({
        where:{
          email:finduser.email as string
        },
        data:{
          emailisverfied:true
        }
      })

      res.end('ok')
      
    }

    else{
      res.end('not ok')
    }
    
    

  
  }