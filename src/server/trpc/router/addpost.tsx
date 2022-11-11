
import { router, publicProcedure } from "../trpc";


export const add=router({
    add:publicProcedure
    
    .query ( async({ ctx }) => {
       console.log('--------API ----------')
        console.log(ctx.session)
         if(ctx.session?.user){
           
                
              
            
            
            return 'ok'
         }
         
         return 'return'
        
    }),

})