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
    maxprice:z.number().optional().nullish().default(null),
    minprice:z.number().optional().nullish().default(null),
    pricePer:z.string().optional().nullish().default(null),
    minrooms:z.number().optional().nullish().default(null),
    maxrooms:z.number().optional().nullish().default(null),
    minsize:z.number().optional().nullish().default(null),
    maxsize:z.number().optional().nullish().default(null),
    Garage: z.boolean().optional(),
    Balcony: z.boolean().optional(),
    OutdoorArea: z.boolean().optional(),
    SwimmingPool: z.boolean().optional(),
    UndercoverParking: z.boolean().optional(),
    airConditioning: z.boolean().optional(),
    solarPanels: z.boolean().optional(),
    SolarHotwater: z.boolean().optional()
 
})

export const initialFilterInput={
    governorate:'',
    municipality:'',
    propertyType:'',                 //  house or land
    announcementtype:'', // sell Rent Corental
    landtype:'',        //buildable land or farmland
    maxprice:null,
    minprice:null,
    pricePer:null,
    minrooms:null,
    maxrooms:null,
    minsize:null,
    maxsize:null,
    Garage: false,
    Balcony: false,
    OutdoorArea: false,
    SwimmingPool: false,
    UndercoverParking: false,
    airConditioning: false,
    solarPanels: false,
    SolarHotwater: false
}

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

export type Post={
    Balcony:boolean, 

Garage: boolean,
OutdoorArea:boolean,

SolarHotwater:boolean, 
SwimmingPool:boolean,
UndercoverParking:boolean,
airConditioning:boolean,
announcementtype:string,
auther:string,
authername:string,
contact: string,
date:Date, 
description:string,
governorate:string,
id:string,
images:string,
isposition: boolean,
landtype:string,
lat:number,
lng:number,
municipality:string,
price:number,
pricePer:string,
propertyType:string,
rooms:number,
size:number,
solarPanels:boolean,
userId:string
}