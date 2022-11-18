import { z } from "zod";
import { router, publicProcedure } from "../../trpc";
import {cloudinary} from '../../../../../cloudinary-config'


export const addPost=router({
    add:publicProcedure
    .input(z.object({
        auther:z.string(),
        propertyType:z.string(), //house or Land
        announcementtype:z.string(), //sell Rent CoRental
        landtype:z.string(),         //buildable land or farmland
        price:z.number(),
        pricePer:z.string().optional(),
        size:z.number(),
        rooms:z.number(),


        Garage: z.boolean().default(false),
        Balcony: z.boolean().default(false),
        OutdoorArea: z.boolean().default(false),
        SwimmingPool: z.boolean().default(false),
        UndercoverParking: z.boolean().default(false),
        airConditioning: z.boolean().default(false),
        solarPanels: z.boolean().default(false),
        SolarHotwater: z.boolean().default(false),
        isposition:z.boolean().default(false),

        governorate:z.string(),
        municipality:z.string(),

        lng:z.number(),
        lat:z.number(),

        images :z.array(z.unknown()),

        contact:z.string(),
        description:z.string().optional()

    }))
    .mutation(async({ctx,input})=>{

        console.log('user from add post router :',ctx.session?.user?.id)
        if(!ctx.session?.user?.id){
            throw new Error('Unothorized')
        }else{

            const addimage=async()=>{
                let newimagesformat=''
              
                for (let i=0 ;i<input.images.length &&i<9;i++){
                    await   cloudinary.uploader.upload(input.images[i] as string).then((result)=>{
                        console.log(result.public_id)
                        if(i==8){
                            newimagesformat=newimagesformat + result.public_id
                        }
                        else{
                            newimagesformat=newimagesformat + result.public_id+',' 
                        }
                       console.log('newimagesformat !::',newimagesformat)
                    })
                   }
                  return newimagesformat
            }
              
            const newimagesdata= await addimage()
            
            const post= await ctx.prisma.post.create({
            data:{
                ...input,
                auther :ctx.session.user.id,
                images:newimagesdata,
                description:'This is a Fake post for testing',
                authername:ctx.session.user.name as string 
            }
        })
        
        return post
    }
               
    })
})


/*
 if(ctx.session?.user){
                    const addimage=async()=>{
                        let newimagesformat=''
                      
                        for (let i=0 ;i<input.images.length &&i<9;i++){
                            await   cloudinary.uploader.upload(input.images[i] as string).then((result)=>{
                                console.log(result.public_id)
                                if(i==input.images.length-1){
                                    newimagesformat=newimagesformat + result.public_id
                                }
                                else{
                                    newimagesformat=newimagesformat + result.public_id+',' 
                                }
                               console.log('newimagesformat !::',newimagesformat)
                            })
                           }
                          return newimagesformat
                    }
                      
                    const newimagesdata= await addimage()
    
                    return ctx.prisma.post.create({
                        data:{
                            ...input,
                            images:newimagesdata ,
                            auther:ctx.session.user.name as string,
                            description:'This is a Fake post for testing',
                            authername:ctx.session?.user?.name as string ||ctx.session?.user?.email as string ||"Unknown User"
                        }
                    })
                }else{
                    throw new Error('unothorized')
                }
*/

