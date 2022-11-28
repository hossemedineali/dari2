import { z } from "zod";
import { publicProcedure, router } from "../../trpc";
import { type Filter, FilterInput } from "../../../../types/typeshelper";



export const querryFiltred =router({
    q:publicProcedure
    .input(z.object({
        FilterInput,
        page:z.number(),
        itemPerpage:z.number(),

    }))
    .query(async({input,ctx})=>{
        
        const filter:Filter={   
        }
        if(input.FilterInput.governorate){

            filter.governorate=input.FilterInput.governorate
        }

        if(!!input.FilterInput.municipality){
            filter.municipality=input.FilterInput.municipality
        }

        
        if(input.FilterInput.propertyType){ //house or land
            filter.propertyType=input.FilterInput.propertyType
        }

        if(input.FilterInput.announcementtype){ //sell rent corental 
            filter.announcementtype=input.FilterInput.announcementtype
        }

        if(input.FilterInput.landtype){      //buildable land or farmland
                filter.landtype=input.FilterInput.landtype
        }

        if(input.FilterInput.maxprice ){
            
            filter.price={
                ...filter.price,
                    lt:input.FilterInput.maxprice

            }
        }


        if(input.FilterInput.minprice){
            filter.price={
                ...filter.price,
                gt:input.FilterInput.minprice
        
            }
       }
               
        if(input.FilterInput.minrooms){
            filter.rooms={
                ...filter.rooms,
                gt:input.FilterInput.minrooms
            }
         }

           
        if(input.FilterInput.maxrooms){
            filter.rooms={
                ...filter.rooms,
                lt:input.FilterInput.maxrooms
        
            }
        }
               

        if(input.FilterInput.minsize){
            
            filter.size={
                ...filter.size,
                gt:input.FilterInput.minsize
            
            }
        }

        if(input.FilterInput.maxsize){
            
            filter.size={
                ...filter.size,
                lt:input.FilterInput.maxsize
            
            }
        }


        if(input.FilterInput.Garage){
            filter.Garage=input.FilterInput.Garage

        }

        if(input.FilterInput.Balcony){

            filter.Balcony=input.FilterInput.Balcony
        }
        
        if(input.FilterInput.OutdoorArea){

            filter.OutdoorArea=input.FilterInput.OutdoorArea
        }
        
        if(input.FilterInput.SwimmingPool){

            filter.SwimmingPool=input.FilterInput.SwimmingPool
        }
        
        if(input.FilterInput.UndercoverParking){

            filter.UndercoverParking=input.FilterInput.UndercoverParking
        }
        
        if(input.FilterInput.airConditioning){

            filter.airConditioning=input.FilterInput.airConditioning
        }
        
        if(input.FilterInput.solarPanels){

            filter.solarPanels=input.FilterInput.solarPanels
        }
                
        if(input.FilterInput.SolarHotwater){

            filter.SolarHotwater=input.FilterInput.SolarHotwater
        }



        
       return await ctx.prisma.post.findMany({
            where:{...filter},
            take:input.itemPerpage,
        skip:input.itemPerpage*(input.page-1),
        orderBy:{
          date:'desc'
        }
        })

        
    })
})