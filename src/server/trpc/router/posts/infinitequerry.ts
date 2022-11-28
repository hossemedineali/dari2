import { z } from "zod";
import { publicProcedure, router } from "../../trpc";


export const infinteQuerry=router({
    infinite:publicProcedure
    .input(z.object({
        page:z.number(),
        itemPerpage:z.number(),
    }))
    .query(async({ input,ctx }) => {
       
       return await ctx.prisma.post.findMany({
        take:input.itemPerpage,
        skip:input.itemPerpage*(input.page-1),
        orderBy:{
          date:'desc'
        }
       })
    
        
      })
})