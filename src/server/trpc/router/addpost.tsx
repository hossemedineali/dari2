import { z } from "zod";
import { router, publicProcedure } from "../trpc";


export const add=router({
    add:publicProcedure
    
    .query ( async({ ctx }) => {
           console.log(ctx.session?.user?.emailisverfied)
       
         if(ctx.session){
            if(typeof ctx.session.user?.emailisverfied== typeof Boolean)
                
                console.log('add post api ',ctx.session.user?.emailisverfied)
            
            
            return 'ok'
         }
         
         return 'return'
        
    }),

})