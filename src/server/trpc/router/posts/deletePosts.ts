import { router, publicProcedure } from "../../trpc";


export const deletePost=router({
    deleteOne:publicProcedure
    .mutation(async({ctx})=>{

        console.log('DElete post router')
console.log(ctx.session?.user)
        return ctx.session?.user
    })
})