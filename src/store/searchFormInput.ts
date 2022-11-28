import create from 'zustand'
import { FilterInputType } from '../types/typeshelper';

interface Form {
    form:FilterInputType,
    setgovernorate:(value:string)=>void,
    setmunicipality:(value:string)=>void,
    setannouncementtype:(value:string)=>void,
    setform:(value:FilterInputType)=>void,
    reset:()=>void
}

export const useFormInput=create<Form>((set)=>({
    form:{

        governorate:'',
        municipality:'',
        propertyType:'',                 //  house or land
        announcementtype:'Sell', // sell Rent Corental
        landtype:'',        //buildable land or farmland
        maxprice:null,
        minprice:null,
        pricePer:'',
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
},
setmunicipality(value:string){
    this.form.municipality=value,
    set(()=>({
     
    }))
},
setgovernorate(value:string){
    this.form.governorate=value,
    set(()=>({
     
    }))
},

setannouncementtype(value:string){
    this.form.announcementtype=value,
    set(()=>({
     
    }))
},

setform(value:FilterInputType){
    this.form=value
},
reset(){
    this.form={
        

            governorate:'',
            municipality:'',
            propertyType:'',                 //  house or land
            announcementtype:'Sell', // sell Rent Corental
            landtype:'',        //buildable land or farmland
            maxprice:null,
            minprice:null,
            pricePer:'',
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
}

}))


type ShowFilter={

    show:boolean;
    
    setShowFilter:(x:boolean)=>void
}
export const useShowFilter=create<ShowFilter>()(
    (set)=>({
        show:false,
        setShowFilter:(x)=>set({show:x})
    })
)

type ModeState={
    mode:string;
    setmode:(text:string)=>void
}

export const useMode=create<ModeState>((set)=>({
    mode:'Sell',
    setmode(text) {
        set(()=>({
            mode:text

        }))
    },
}))
