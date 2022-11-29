


import {  useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from 'next/image'

import MapWithNoSSR from "../maps/mapWithNoSSR";

import  ImageUploading, {type ImageListType } from "react-images-uploading";


import { useMode } from "../../store/searchFormInput";
import Switch from "../ui/switch";
import { trpc } from "../../utils/trpc";
import { motion } from "framer-motion";


import {form} from '../../pages/add'
import type { MygovernorateType } from "../../utils/cities";
import {Loader} from "../ui/loader";
import { useNotifiaction } from "../../store/notification";
import { useLanguage } from "../../store/store";

        type FProps={
            selectedMunicipality:MygovernorateType,
            selectedGovernorate:MygovernorateType,
            
        }

        type Location={
            loaded:boolean,
            coordinates?:{
            lat:number|null,
            lng:number|null
            },
            error? :{
                code?:number,
                message?:string
            }
            
        }

        type LocationType={
            coords:{accuracy: number,
                altitude: number|null, //|null
                altitudeAccuracy: number |null, //|null
                heading: number |null, //|null
                latitude: number,
                longitude: number,
                speed: number|null  ,   // |null
            }
        }






        type Form =z.infer<typeof form>;

        const imgtype=z.array(z.string())
        type Imgtype=z.infer<typeof imgtype>

        const HouseFilters:React.FC<FProps> = ({selectedMunicipality,selectedGovernorate}) => {

           
                const notification=useNotifiaction()
                const Language=useLanguage()
                const [imagedata,setimagedata]=useState<Imgtype>([])
                const addPost =trpc.addPost.add.useMutation()
                const mode =useMode()
                const [position,setposition]=useState<[number,number]>([0,0])
                const [images, setImages] = useState([]);



            const [showMap,setshowMap]=useState(false)

            const {  handleSubmit,setValue ,reset,formState:{errors} } = useForm<Form>({ 
                resolver:zodResolver(form)
            });

                const submit =async(data:Form)=>{

                    let isposition=false
                    if(position[0]!=0 ||position[1]!=0){
                        isposition=true
                    }

                        const checkmode =()=>{
                            if (mode.mode =="Rent"){
                                setValue('pricePer','')
                            }
                        }
                        checkmode()
                    
                    
                    const postData={
                        ...data,
                        
                        governorate:selectedGovernorate.label as string,
                        municipality:selectedMunicipality.label as string,
                        announcementtype:mode.mode,
                        isposition,
                        lng:position[0],
                        lat:position[1],
                        images:imagedata,
                    }

                        
                addPost.mutate({
                        ...postData,
                        propertyType:'house',
                        landtype:'',
                        auther:'clajcygei0000u6uolul4quku'
                    }) }
             if (addPost.isSuccess){
                notification.setMeassage('Announcement added successfully','Votre annonce a ete ajoutée',true)
                  reset()
                
                } 
                if(addPost.isError){
                    notification.setMeassage('Sorry something went wrong',"Désolé quelque chose s'est mal passé",false)
                }
            
        
                const hundelFileInput=(imageList:ImageListType)=>{
                    setimagedata([])
                    setImages(imageList as never[])
                    imageList.map(item=>{
                        setimagedata(prev=> [...prev,item.dataURL as string]
                        )
                    })
                }
                    
            
                useEffect(() => {
                    if(selectedMunicipality.label!=''){
                        setposition(selectedMunicipality.position as [number,number])
                    }
        
                }, [selectedMunicipality.label,selectedMunicipality.position])
                
                const [location, setLocation] = useState<Location>({
                    loaded: false,
                    coordinates: { lat:null  , lng:null },
                });
            
            const getDevicePosition=()=>{
                const onSuccess = (location :LocationType) => {


                    setposition([location.coords.latitude,location.coords.longitude])
                    
                
            };


            const onError = (err: any) => {


                setLocation({
                    loaded: true,
                    error: {
                        code: err.code ,
                        message: err.message,
                    },
                });
            };

        
                if (!("geolocation" in navigator)) {
                    onError({
                        code: 0,
                        message: "Geolocation not supported",
                    });
                }

                navigator.geolocation.getCurrentPosition(onSuccess, onError);

            }

                
                    


                    return(
                        <form className="w-full h-full " onSubmit={(handleSubmit(submit))} >


                <div className="flex justify-between flex-col md:flex-row">
                    <div className='w-full mt-2 md:mt-0  md:w-[30%]'>
                    {/* -------------- Price Input---------------------- */}
                    <h5 className={`font-medium mb-1 ${errors.price?.message? 'text-red':'' }`} >{Language.lng=='ENG'?'Price':'Prix'} : {errors.price?.message? errors.price.message : ''}</h5>

                        <label htmlFor="price" className={`relative text-gray-400 focus-within:text-gray-600 block   border-2 rounded ${errors.price?.message? 'border-red':'border-devider'} `}>

                        <p  className=" pointer-events-none w-8 h-6 absolute top-1/2 transform -translate-y-1/2 right-2"> Tnd</p>


                        <input name="price" type="number"  id="price"  step="0.01" placeholder="price" className="form-input px-1 w-full h-[38px]" 
                        onChange={(e)=>setValue('price',parseFloat(e.currentTarget.value))}
                        />
                        
                    
                        </label>
                        
                        {mode.mode==='Rent' &&<div className="flex gap-2">

                        <input onChange={(e)=>{if(e.currentTarget.checked){setValue('pricePer','mounth')}}} type='radio' name="pricePer" id="mounth" value='mounth'/> 

                        <label>{Language.lng=='ENG'?'Mounthly':'Par mois'}</label>

                        <input onChange={(e)=>{if(e.currentTarget.checked){setValue('pricePer','day')}}} type='radio' name="pricePer" id="day" value='day'/>

                        <label>{Language.lng=='ENG'?'Dayli':'Par jour'}</label>

                        </div>
                            }
                        
                        <div className="border border-devider my-2 md:hidden"></div>
                    </div>
                        
                            {/* Land size Input  */}
                    <div className='w-full  md:w-[30%]'>

                        <h5 className={`font-medium mb-1 ${errors.size?.message? 'text-red':'' }`}>{Language.lng=='ENG'?'Size':'Surface'} : {errors.size?.message? errors.size?.message:''}</h5>
                        <label htmlFor="landsize" className={`relative text-gray-400 focus-within:text-gray-600 block   border-2 rounded ${errors.size?.message? 'border-red':'border-devider'} `}>


                        <input type='number' id='size'  placeholder={Language.lng=='ENG'?" property size ":'Surface'} className="w-full h-[38px] rounded-md px-1"
                        onChange={(e)=>setValue('size',parseFloat(e.currentTarget.value )  )}
                        />

                        <p  className=" pointer-events-none w-8 h-6 absolute top-1/2 transform -translate-y-1/2 right-4"> m2</p>

                        </label>

                        <div className="border border-devider my-2 md:hidden"></div>



                    </div>

                    <div className='w-full  md:w-[30%]'>
                            {/* Rooms Number Input  */}

                        <h5 className={`font-medium mb-1 ${errors.rooms?.message? 'text-red':'' }`}>{Language.lng=='ENG'?'Bed rooms':'Chambres'} : {errors.rooms?.message? errors.rooms.message:''}</h5>
                        <label  htmlFor="rooms" className={`relative text-gray-400 focus-within:text-gray-600 block   border-2 rounded ${errors.rooms?.message? 'border-red':'border-devider'} `}>
                        <input type='number' id='size'  placeholder={Language.lng=='ENG'?" Rooms number " :'Nombre de chambres'}className="w-full h-[38px] rounded-md px-1"
                        onChange={(e)=>setValue('rooms',parseFloat(e.currentTarget.value ))}
                        />


                        </label>


                        <div className="border border-devider my-2 md:hidden"></div>
                    </div>
                        
                    



                </div>


                <div className="border border-devider my-2  hidden md:block"></div>



                <div className="flex flex-col md:flex-row justify-arround">

                            {/* outdoor Features */}

                <div className=" px-8 py-8 md:w-1/2">
                <h3 className="font-medium mb-1"> features :</h3> 
                <>
                <div className=" flex ">
                <input onChange={(e)=>{setValue('Garage',e.currentTarget.checked)}} type='checkbox' id='Garage' name='Garage' value='Garage' className="mr-4 "/>
                <label  htmlFor='Garage' >Garage</label> <br/>
                </div>

                <div className=" flex ">
                <input onChange={(e)=>{setValue('Balcony',e.currentTarget.checked)}} type='checkbox' id='Balcony' name='Balcony' value='Balcony' className="mr-4 "/>
                <label htmlFor='Balcony' >{Language.lng=='ENG'?'Balcony':'Balcon'}</label> <br/>
                </div>


                <div className=" flex ">
                <input onChange={(e)=>{setValue('OutdoorArea',e.currentTarget.checked)}} type='checkbox' id='Outdoor area' name='Outdoor area' value='Outdoor area' className="mr-4 "/>
                <label htmlFor='Outdoor area' >{Language.lng=='ENG'?'OutdoorArea':'Jardin'}</label> <br/>
                </div>

                <div className=" flex ">
                <input onChange={(e)=>{setValue('SwimmingPool',e.currentTarget.checked)}} type='checkbox' id='Swimming pool' name='Swimming pool' value='Swimming pool' className="mr-4 "/>
                <label htmlFor='Swimming pool' >{Language.lng=='ENG'?'SwimmingPool':'Piscine'}</label> <br/>
                </div>

                <div className=" flex ">
                <input onChange={(e)=>{setValue('UndercoverParking',e.currentTarget.checked)}} type='checkbox' id='Undercover parking' name='Undercover parking' value='Undercover parking' className="mr-4 "/>
                <label htmlFor='Undercover parking' >{Language.lng=='ENG'?'Parking':'Parking couvet'}</label> <br/>
                </div>
                </>
                </div>

                <div className="border border-devider my-2 md:hidden "></div>


                {/* Climat control and energy filter*/}


                <div className=" px-8 py-8 md:w-1/2">
                <h3 className="font-medium mb-1">{Language.lng=='ENG'?'Climate control & energy':'Climat et energie'} :</h3> <br/>

                        <div className=" flex">
                        <input onChange={(e)=>{setValue('airConditioning',e.currentTarget.checked)}} type='checkbox' id='Air conditioning' name='Air conditioning' value='Air conditioning' className="mr-4 "/>
                        <label htmlFor='Air conditioning' >{Language.lng=='ENG'?'Air Conditioning':'Climatiseur'}</label> <br/>
                        </div>

                        <div className=" flex">
                        <input onChange={(e)=>{setValue('solarPanels',e.currentTarget.checked)}} type='checkbox' id='Solar panels' name='Solar panels' value='Solar panels' className="mr-4 "/>
                        <label htmlFor='Solar panels' >{Language.lng=='ENG'?'Solar Panels':'Panneaux solaires'}</label> <br/>
                        </div>


                        <div className=" flex">
                        <input onChange={(e)=>{setValue('SolarHotwater',e.currentTarget.checked)}} type='checkbox' id='Solar hot water' name='Solar hot water' value='Solar hot water' className="mr-4 "/>
                        <label htmlFor='Solar hot water' >{Language.lng=='ENG'?'Solar Hotwater':'Chauffeau solaire'}</label> <br/>
                        </div>
                </div>
                </div>

                <div className="border border-devider my-2 mx-auto  "></div>

                            <div className="flex flex-col">
                            
                            <ImageUploading
                                multiple
                                value={images}
                                onChange={hundelFileInput}
                                maxNumber={9}
                                maxFileSize={9437184}
                                >
                {({
                
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
                errors,
               
                }) => (
                // write your building UI
                
                <div className="upload__image-wrapper mx-auto ">
                    
                    <div className="flex flex-wrap gap-2 mx-auto">

                    <span
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                    className="cursor-pointer border border-primary1 text-primary1 w-max p-1 rounded-lg hover:scale-95 active:scale-105"
                    >
                    {Language.lng=='ENG'?'Add images':'Ajoutre des images'}(Max 9)
                    </span>
                    &nbsp;
                
                    <span onClick={onImageRemoveAll} className="cursor-pointer border-red text-red border w-max p-1 rounded-lg hover:scale-95 active:scale-105">Remove all images</span>
                        </div>
                    <br/>
                    <span className="mt-4"> {images.length } {Language.lng=='ENG'?'images selected':'Images'} </span>
                    {errors&&<div className="text-red font-bold">
                        {errors.maxNumber && <span>{Language.lng=='ENG'?'Maximum images number allowed is 9':'Nombre maximal autorisée est 9'}</span>}
                        {errors.maxFileSize && <span>{Language.lng=='ENG'?'Maximum image size must be less then 9mb':"Taille maximum d'un image ne peut pas passer 9mb"}</span>}
                    </div>}
                    <div className="flex flex-wrap gap-2 mx-auto">

                    {imageList.map((image, index) => (
                        <div key={index} className=" border p-2 mx-auto">
                        <Image src={image.dataURL as string} alt="" width="150" height="120" className="relative" />
                        
                        <div>

                        <span  onClick={() => onImageUpdate(index)} className="absloute mr-2 cursor-pointer border w-max p-1 rounded-lg hover:bg-red">{Language.lng=='ENG'?'Update':'Modifier'}</span>
                        <span onClick={() => onImageRemove(index)} className="cursor-pointer border w-max p-1 rounded-lg hover:border-red ">{Language.lng=='ENG'?'Remove':'Retirer'}</span>
                        </div>
                    </div>
                    ))}
                    </div>
                </div>
                )}
                </ImageUploading>
                            </div>

                        <div className="border border-devider my-2  "></div>
                        
                        
                        
                        <div className="flex ">

                            <Switch showMap={showMap } setshowMap={setshowMap}/>
                            <p className="ml-4">{Language.lng=='ENG'?'Set location':"Definir l'emplacement"}</p>
                        </div>



                {showMap&&<div>
                    
                    <h3>{Language.lng=='ENG'?'Plase set the property location on the map':"SVP choisire l'emplacement sur la carte"} <br/> <span className="font-bold" >or <span onClick={getDevicePosition} className="  text-red px-1  rounded-2xl cursor-pointer">use</span> the device location</span>(device location work better on devices with GPS) </h3>
                    <div className="w-full h-[60vh] z-0">
                            {location.error?.message&&<p className="text-red ">{Language.lng=='ENG'?'Enabel GPS on your device':'Activer le GPS'} </p>}
                    
                        <MapWithNoSSR position={position[0]!=0?position :selectedMunicipality.position} setposition={setposition}  />

                    
                    
                    </div>
                </div>}


                {/* Contact */}

                <div className="px-4 py-8"  >
                    <label className={`font-medium mb-1 ${errors.contact?.message? 'text-red':'' }`}>Contact : {errors.contact&&errors.contact.message}</label>
                    <div className="flex justify-between mt-2">
                        <input onChange={(e)=>{setValue('contact',e.currentTarget.value )}} type='tel' id="contact" name="contact"  placeholder="Contact" className="border h-16 w-full rounded-md pl-2"/>
                    </div>

                </div>

                {/* Keywords filter */}
                <div className="px-4 py-8  ">
                    <label>Description</label>
                    <div className="flex justify-between mt-2">
                        <input onChange={(e)=>{setValue('description',e.currentTarget.value)}} type='text'  placeholder="Description" className="border h-16 w-full rounded-md pl-2"/>
                    </div>
                    
                </div>


                <div className=" flex justify-center" >

                        {!addPost.isLoading&&<button type="submit"  className="self-center bg-primary1 p-1 hover:scale-105 active:scale-95 mb-1 rounded-3xl m-auto w-44 ">{!addPost.isLoading? (Language.lng=='ENG'?'Add Announcment':'Ajouter une annconce') : ''} 
                        </button>}
                    {addPost.isLoading&& <span className="mx-auto "><Loader /></span>}
                </div>


                
                

        { addPost.isSuccess&&   <motion.div
            initial={{x:'-100%'}}
            animate={{x:'0'}}
            transition={{duration:1}}
            className="   fixed border border-red text-red-700 px-4 py-3 rounded  z-2000 top-[50vh] left-0 bg-devider" role="alert">
        <strong className="font-bold mr-1">{Language.lng=='ENG'?'Announcment added':'Annonce ajouter'}  </strong>
        <span className="block sm:inline"> {Language.lng=='ENG'?'Rederecting to Home page':"Redireger to page d'acceuil"}.</span>
        </motion.div>}

        { addPost.isError&&   <motion.div
            initial={{x:'-100%'}}
            animate={{x:'0'}}
            transition={{duration:1}}
            className=" flex flex-col md:flex-row border border-red text-red-700 px-4 py-3 rounded absolute z-2000 bottom-20  left-0 bg-devider" role="alert">
        <strong className="font-bold mr-1">Oops , {Language.lng=='ENG'?'somthing went wrong':"Quelque chose s'est mal passé"}  </strong>
        <span className="block sm:inline"> {Language.lng=='ENG'?'Please retry again later':'Veuillez réessayer plus tard'}</span>
        </motion.div>}




                        </form>
                    )

                }
                
                export default HouseFilters;