
import {governorates,cities, type MygovernorateType} from '../../utils/cities'

import Select from 'react-select'
import {type ChangeEvent, useEffect, useState } from 'react'


import {FilterInputType, FilterInput,  State} from '../../types/typeshelper'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormInput, useShowFilter } from '../../store/searchFormInput';




const initialFilterInput={
    governorate:'',
    municipality:'',
    propertyType:'',                 
    announcementtype:'', 
    landtype:'',        
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


type Props={
    setfilterInput:  (value: FilterInputType)  => void;
}

const SearchFilter:React.FC<Props> = ({setfilterInput}) => {
    
    const [selectedGovernorate, setselectedGovernorate] = useState<State>({label:'',value:'',position:[0,0]})
    const [selectedMunicipality, setselectedMunicipality] = useState<State>({label:'',value:'',position:[0,0]})
    const munoptions=cities[selectedGovernorate.label]
    const [data, setdata] = useState<FilterInputType>()


    const forminput=useFormInput()
    const show=useShowFilter()


    const { register,watch,handleSubmit,setValue,reset, getValues,formState } = useForm< FilterInputType>({ 
        resolver:zodResolver(FilterInput) ,
     

        defaultValues:forminput.form
       
    });
  const onSubmit = handleSubmit((data) => {
    
    //forminput.setform(data)
    setfilterInput(data)
    show.setShowFilter(false)
    
        });

        


useEffect(() => {
    console.log('filter input run')
    reset()

    forminput.reset()
    setfilterInput(initialFilterInput)
    const subscription = watch((value, { name, type }) => {
        const data=getValues()
        setdata(data)

    });
    return () => subscription.unsubscribe();

}, [watch,getValues])

 
const hundelresetfilters=()=>{
    setselectedGovernorate({label:'',value:'',position:[0,0]})
    setselectedMunicipality({label:'',value:'',position:[0,0]})

    console.log('before reset:',data)
    reset()
 //   setrez(!rez)
   // rez
    console.log('after reset :',data)
}




    const hundelgovchange=(e:MygovernorateType)=>{
        reset()
        setfilterInput(initialFilterInput)
        setselectedGovernorate({label:e.label,value:e.value as string,position:e.position as [number,number]})
        setselectedMunicipality({label:'',value:'',position:[0,0]})
        setValue('governorate',e.value as string)
        setValue('municipality','')
    }


    const hundelmunchange=(e:MygovernorateType)=>{

        setselectedMunicipality({label:e.label,value:e.value as string,position:e.position as [number,number]})  
        setValue('municipality',e.value as string)
    }

    const hundelminpricechange=(e:ChangeEvent<HTMLInputElement>)=>{
        if(e.currentTarget.value==''){
           
            setValue('minprice',0)
        }
        else{
            setValue('minprice',parseInt(e.currentTarget.value, 10))
        }
    }

    const hundelmaxpricechange=(e:ChangeEvent<HTMLInputElement>)=>{
        if(e.currentTarget.value==''){
          
            setValue("maxprice",null)
          
           
        }
        else{
            setValue('maxprice',parseInt(e.currentTarget.value, 10))
        }
    }


    const hundelminsizechange=(e:ChangeEvent<HTMLInputElement>)=>{
        if(e.currentTarget.value==''){
            
            setValue('minsize',0)
         
           
        }
        else{
            setValue('minsize',parseInt(e.currentTarget.value, 10))
        }
    }

    const hundelmaxsizechange=(e:ChangeEvent<HTMLInputElement>)=>{
        if(e.currentTarget.value==''){
          
            setValue('maxsize',null)
          
           
        }
        else{
            setValue('maxsize',parseInt(e.currentTarget.value, 10))
        }
    }

    const hundelminroomschange=(e:ChangeEvent<HTMLInputElement>)=>{
        if(e.currentTarget.value==''){
            console.log('null')
            setValue('minrooms',0)
          
           
        }
        else{
            setValue('minrooms',parseInt(e.currentTarget.value, 10))
        }
    }

    const hundelmaxroomschange=(e:ChangeEvent<HTMLInputElement>)=>{
        if(e.currentTarget.value==''){
          
            setValue('maxrooms',null)
          
           
        }
        else{
            setValue('maxrooms',parseInt(e.currentTarget.value, 10))
        }
    }

    return ( 
    <div  className=" rounded-xl " >
        

              <div className="h-[35px] shadow-md mb-2 flex bg-white fixed rounded-t-xl  z-50 w-full ">
                    <p className="flex-grow text-center">Filters</p>
                    <svg onClick={()=>{reset();show.setShowFilter(false)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 mr-4 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
              <form onSubmit={onSubmit} className='mx-auto mb-5 pt-12 pb-14 rounded-xl'>

                                {formState.errors.governorate&&<p>{formState.errors.governorate.message}</p>}
                    <div className='flex flex-col md:flex-row gap-2  px-1  '>

                        <div className='w-full sm:w-1/2 self-center'>

                    <label htmlFor="governorate" className="font-medium">Governorate</label>
                    
                        <Select
                        value={selectedGovernorate}
                        id='governorate'
                        instanceId='governorate'
                        options={governorates}
                        onChange={(e)=>{hundelgovchange(e as MygovernorateType)}}
                        
                        placeholder=' Governorate'
                        />
                        </div>
                        
                        <div className='w-full sm:w-1/2 self-center'>

                        <label htmlFor=" municipalities" className="font-medium">Municipality</label>
                        <Select
                        id='Municipality'
                        instanceId='Municipality'
                        value={selectedMunicipality as MygovernorateType}
                        options={munoptions}
                        onChange={(e)=>{hundelmunchange(e as MygovernorateType)}}
                        className=' self-center'
                        placeholder=' Municipality'
                        />
                        </div>
                    </div>

                    <div className="border rounded-xl border-white my-2 "></div>

                    <div className=' flex w-full sm:w-1/2 md:w-full gap-2  mx-auto px-[10%] justify-around'>

                        <div className='w-full sm:w-1/3 self-center  text-left'>
                            <input  onChange={(e)=>{reset();setValue('propertyType',e.currentTarget.id)}} id='House' type='radio' name='property type' checked={data?.propertyType=='House'?true:false}/>
                            <label  htmlFor='House' >House</label>
                        </div>
                        
                        <div className='w-full sm:w-1/3 self-center text-center'>

                            <input  onChange={(e)=>{reset();setValue('propertyType',e.currentTarget.id); setValue('announcementtype','Sell');}} id='Land' type='radio' name='property type' checked={data?.propertyType=='Land'?true:false}/>
                            <label htmlFor='Land'>Land</label>
                        </div>

                        <div className='w-full sm:w-1/3 self-center text-right'>

                            <input  onChange={(e)=>{setValue('propertyType',e.currentTarget.id)}} id='' type='radio' name='property type' checked={data?.propertyType==''?true:false}/>
                            <label htmlFor='Any'>Any</label>
                        </div>

                    </div>



                    {data?.propertyType=='Land'?<>
                    <div className="border border-white my-2 "></div>

                        <p className='font-medium text-lg'> Land type :</p>
                    <div className='flex  w-full sm:w-1/2 md:w-full gap-2  mx-auto px-[10%] justify-around'>

                        <div> 
                            <input onChange={(e)=>{if(e.currentTarget.checked){setValue('landtype','Buildable land')}} } id='Buildable land' type='radio' name='landtype' value='Buildable land' checked={data?.landtype=='Buildable land'?true:false}/>
                            <label htmlFor='Sell' >Buildable land</label>
                        </div>

                        <div> 
                            <input onChange={(e)=>{if(e.currentTarget.checked){setValue('landtype','farmland')}}} id='farmland' type='radio' name='landtype' value='farmland' checked={data?.landtype=='farmland'?true:false} />
                            <label htmlFor='farmland' >Farm land</label>
                        </div>   
                    </div>
                    </>:null}





                    <div className="border border-white my-2 "></div>

                        <p className='font-medium text-lg'> Property for :</p>
                    <div className='flex  w-full sm:w-1/2 md:w-full gap-2  mx-auto px-[10%] justify-around'>

                        <div> 
                            <input onChange={(e)=>{if(e.currentTarget.checked){setValue('announcementtype','Sell')} setValue('pricePer','')} } id='Sell' type='radio' name='announcment type' value='Sell' checked={data?.announcementtype=='Sell'?true:false}/>
                            <label htmlFor='Sell' >Sell</label>
                        </div>

                        <div> 
                            <input onChange={(e)=>{if(e.currentTarget.checked){setValue('announcementtype','Rent')}}} id='Rent' type='radio' name='announcment type' value='Rent' checked={data?.announcementtype=='Rent'?true:false} disabled={data?.propertyType=='Land'}/>
                            <label htmlFor='Rent' >Rent</label>
                        </div>

                        <div> 
                            <input onChange={(e)=>{if(e.currentTarget.checked){setValue('announcementtype','CoRental')} setValue('pricePer','')}} id='CoRental' type='radio' name='announcment type' value='CoRental' checked={data?.announcementtype=='CoRental'?true:false} disabled={data?.propertyType=='Land'}/>
                            <label htmlFor='CoRental' >CoRental</label>
                        </div>
                    </div>

                    <div className="border border-white my-2 "></div>


                    <p className='font-medium text-lg'> Price :</p>

                        <div className='flex  w-full sm:w-1/2 md:w-full gap-2  mx-auto px-[10%] justify-around'>
                          
                            <div className='w-1/2'>
                                <label  htmlFor='min'>min</label><br/>
                                <input  onChange={(e)=>{hundelminpricechange( e)}} id='min' type='number' className='w-full'/>
                            </div>

                            <div className='w-1/2'>
                                <label htmlFor='max'>max</label><br/>
                                <input  onChange={(e)=>{hundelmaxpricechange( e)}} id='max' type='number' className='w-full'/>
                                
                            </div>
                            
                        </div>
                        
                        {data?.announcementtype=='Rent'&&<div className='flex  w-full sm:w-1/2 md:w-full gap-2  mx-auto px-[10%] justify-around' >
                                <div> 
                                    <input  onChange={(e)=>{setValue("pricePer",e.currentTarget.id)}} id='Mounth' type='radio' name='pricePer' checked={data?.pricePer=='Mounth'?true:false}/>
                                    <label  htmlFor='Mounth' >Mounth</label>
                                </div>

                                <div> 
                                    <input id='Day' type='radio' name='pricePer' onChange={(e)=>{setValue("pricePer",e.currentTarget.id)}} checked={data?.pricePer=='Day'?true:false}/>
                                    <label htmlFor='Day' >Day</label>
                                </div>
                            </div>}




                            <div className="border border-white my-2 "></div>

                        <p className='font-medium text-lg'> Size  m2 :</p>

                        <div className='flex  w-full sm:w-1/2 md:w-full gap-2  mx-auto px-[10%] justify-around'>
                            <div className='w-1/2'>
                                <label  htmlFor='minsize'>min</label><br/>
                                <input {...register('minsize',{valueAsNumber:true})} onChange={(e)=>{hundelminsizechange(e)}} id='minsize' type='number' className='w-full'/>
                            </div>

                            <div className='w-1/2'>
                                <label htmlFor='maxsize'>max</label><br/>
                                <input {...register('maxsize',{valueAsNumber:true})} onChange={(e)=>{hundelmaxsizechange(e)}} id='maxsize' type='number' className='w-full'/>
                            </div>

                        </div>

                        <div className="border border-white my-2 "></div>

                   {data?.propertyType!=='Land'? (
                   <>
                   <p className='font-medium text-lg'> Rooms </p>

                    <div className='flex  w-full sm:w-1/2 md:w-full gap-2  mx-auto px-[10%] justify-around'>
                            <div className='w-1/2'>
                                <label htmlFor='minrooms'>min</label><br/>
                                <input {...register('minrooms',{valueAsNumber:true})} onChange={(e)=>{hundelminroomschange(e)}} id='minrooms' type='number' className='w-full'/>
                            </div>

                            <div className='w-1/2'>
                                <label htmlFor='maxrooms'>max</label><br/>
                                <input {...register('maxrooms',{valueAsNumber:true})} onChange={(e)=>{hundelmaxroomschange(e)}} id='maxrooms' type='number' className='w-full'/>
                            </div>

                        </div></>):null}
                    

                        <div className="border border-white my-2 "></div>
                    {data?.propertyType!='Land'?<>
                    <p className='font-medium text-lg'> Features </p>

                    <div className='flex justify-evenly'>
                        <div>
                                <div> 
                                    <input onChange={(e)=>{setValue('Garage',e.currentTarget.checked)}} id='Garage' type='checkbox' checked={data?.Garage}/>
                                    <label htmlFor='Garage' >Garage</label>
                                </div>

                                <div> 
                                    <input onChange={(e)=>{setValue('Balcony',e.currentTarget.checked)}} id='Balcony' type='checkbox' checked={data?.Balcony}/>
                                    <label htmlFor='Balcony' >Balcony</label>
                                </div>

                                <div> 
                                    <input onChange={(e)=>{setValue('OutdoorArea',e.currentTarget.checked)}} id='OutdoorArea' type='checkbox' checked={data?.OutdoorArea}/>
                                    <label htmlFor='OutdoorArea' >OutdoorArea</label>
                                </div>

                                <div> 
                                    <input onChange={(e)=>{setValue('SwimmingPool',e.currentTarget.checked)}} id='SwimmingPool' type='checkbox' checked={data?.SwimmingPool}/>
                                    <label htmlFor='SwimmingPool' >SwimmingPool</label>
                                </div>
                            
                        </div>
                        <div>

                                <div> 
                                    <input onChange={(e)=>{setValue('UndercoverParking',e.currentTarget.checked)}} id='UndercoverParking' type='checkbox' checked={data?.UndercoverParking}/>
                                    <label htmlFor='UndercoverParking' >Parking</label>
                                </div>

                                <div> 
                                    <input onChange={(e)=>{setValue('airConditioning',e.currentTarget.checked)}} id='airConditioning' type='checkbox' checked={data?.airConditioning}/>
                                    <label htmlFor='airConditioning' >air Conditioning</label>
                                </div>

                                <div> 
                                    <input onChange={(e)=>{setValue('solarPanels',e.currentTarget.checked)}} id='solarPanels' type='checkbox' checked={data?.solarPanels}/>
                                    <label htmlFor='solarPanels' >solar Panels</label>
                                </div>

                                <div> 
                                    <input onChange={(e)=>{setValue('SolarHotwater',e.currentTarget.checked)}} id='SolarHotwater' type='checkbox' checked={data?.SolarHotwater}/>
                                    <label htmlFor='SolarHotwater' >Solar Hotwater</label>
                                </div>

                        </div>

                    </div>
                    </>:null}
                       
     
                    
                    <div style={{boxShadow: '1px -4px 6px -5px rgb(0 0 0 / 0.1), 0 -2px -4px -2px rgb(0 0 0 / 0.1)'}} className="flex fixed z-50 h-[45px] bg-white bottom-0 w-full rounded-b-xl pt-2	 ">
                        <div className="flex-grow  text-center ">
                    <button  type="submit" value="Submit" className="px-4 bg-primary1 py-1 rounded hover:scale-105 active:scale-95">Search</button>
                    </div>

                    <p onClick={hundelresetfilters} className="cursor-pointer text-red  mr-4">Reset filters</p>

                    </div>
                        </form>

           
            </div> );
}
 
export default SearchFilter;