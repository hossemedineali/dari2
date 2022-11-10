import { z } from "zod";
import { router, publicProcedure } from "../trpc";


export const add=router({
    add:publicProcedure
    
    .query ( async({ ctx }) => {
       
         if(ctx.session?.user){
           
                
              
            
            
            return 'ok'
         }
         
         return 'return'
        
    }),

})