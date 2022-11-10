import { z } from "zod";
import { router, publicProcedure } from "../trpc";


export const add=router({
    add:publicProcedure
    
    .query ( async({ ctx }) => {
           console.log(ctx.session?.user?.emailisverfied)
       
         if(ctx.session?.user?.emailisverfied){
           
                
              
            
            
            return 'ok'
         }
         
         return 'return'
        
    }),

})