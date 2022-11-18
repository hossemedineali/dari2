import { z} from "zod";


export const addpost=z.object({
    //mode:z.string(),
    //governorate:z.string(),
    //municipality:z.string(),
    price:z.number(),
    land_size:z.number().optional(),
    bed_rooms:z.number().optional(),
    outdoor_Featfures:z.string().array().optional(),
    Climate_control_energy:z.string().array().optional(),
    discription:z.string().optional()
})



export const FilterInput =z.object({
    governorate:z.string().optional(),
    municipality:z.string().optional(),
    propertyType:z.string().optional(),                 //  house or land
    announcementtype:z.string().optional(), // sell Rent Corental
    landtype:z.string().optional(),        //buildable land or farmland
    maxprice:z.number().optional().nullish(),
    minprice:z.number().optional().nullish(),
    pricePer:z.string().optional().nullish(),
    minrooms:z.number().optional().nullish(),
    maxrooms:z.number().optional().nullish(),
    minsize:z.number().optional().nullish(),
    maxsize:z.number().optional().nullish(),
    Garage: z.boolean().optional(),
    Balcony: z.boolean().optional(),
    OutdoorArea: z.boolean().optional(),
    SwimmingPool: z.boolean().optional(),
    UndercoverParking: z.boolean().optional(),
    airConditioning: z.boolean().optional(),
    solarPanels: z.boolean().optional(),
    SolarHotwater: z.boolean().optional()
 
})

export type FilterInputType=z.infer<typeof FilterInput>


export interface Filter {
    governorate?:string,
    municipality?:string,
    
    propertyType?:string,
    announcementtype?:string,
    landtype?:string,
    
    price?:{
        gt?:number,
        lt?:number
    },
    rooms?:{
        gt?:number,
        lt?:number
    },
   
    size?:{
        gt?:number,
        lt?:number
    },
    Garage?: boolean,
    Balcony?: boolean,
    OutdoorArea?: boolean,
    SwimmingPool?: boolean,
    UndercoverParking?: boolean,
    airConditioning?: boolean,
    solarPanels?: boolean,
    SolarHotwater?: boolean,
}



export type State={
    value?:string
    ,label:string,
    position?:[number,number],
    
}