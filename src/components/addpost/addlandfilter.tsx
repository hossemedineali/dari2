import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { MygovernorateType } from "../../utils/cities";
import MapWithNoSSR from "../maps/mapWithNoSSR";
import Switch from "../ui/switch";
import Image from 'next/image'
import { trpc } from "../../utils/trpc";
import { motion } from "framer-motion";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useRouter } from 'next/router'
import { useSession } from "next-auth/react"



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

type FProps={
    selectedMunicipality:MygovernorateType,
    selectedGovernorate:MygovernorateType
}

const imgtype=z.array(z.string())
type Imgtype=z.infer<typeof imgtype>

const form =z.object({
    landtype:z.string().default('Buildable land'),
    price:z.number({
        required_error:'required'
    }),
    size:z.number({
        required_error:'required'
    }),
    contact:z.string({required_error:'required'}),
    description:z.string().optional()
})

type Form =z.infer<typeof form>


const LandFilters:React.FC<FProps> = ({selectedMunicipality,selectedGovernorate}) => {

    const router=useRouter()

    const addPost=trpc.addPost.add.useMutation()
    const {data:sesssion}=useSession()

    const [showMap,setshowMap]=useState(false)
    const [images, setImages] = useState([]);

    const [location, setLocation] = useState<Location>({
        loaded: false,
        coordinates: { lat:null  , lng:null },
    });

    const [position,setposition]=useState<[number,number]>([0,0])

    const [imagedata,setimagedata]=useState<Imgtype>([])

    const {  handleSubmit,setValue ,formState:{errors} } = useForm<Form>({ 
        resolver:zodResolver(form)
    });

    const submit =async(data:Form)=>{
        let isposition=false
        if(position[0]!=0 ||position[1]!=0){
            isposition=true
        }

            
           
        
        const postData={
            ...data,
            
            governorate:selectedGovernorate.value as string,
            municipality:selectedMunicipality.value as string,
            announcementtype:'Sell',
            isposition,
            lng:position[0],
            lat:position[1],
            images:imagedata,
        }

            
    addPost.mutate({
             ...postData,
            auther:sesssion?.user?.id as string,
            propertyType:'land',
            rooms:0 ,     
        }) }


    if (addPost.data){
        setTimeout(() => {
            router.replace('/')
        }, (2500));}


    useEffect(() => {
        if(selectedMunicipality.label!=''){
            setposition(selectedMunicipality.position as [number,number])
        }

       }, [selectedMunicipality.label])
   
    const hundelFileInput=(imageList:ImageListType)=>{
        setimagedata([])
        setImages(imageList as never[])
        imageList.map(item=>{
            setimagedata(prev=> [...prev,item.dataURL as string]
            )
        })
    }

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




            return ( 

                <form className="w-full mb-12" onSubmit={(handleSubmit(submit))}>

                    <label>Type</label>

                    <div className="flex w-full flex-col md:flex-row ">
                        <div className=" md:mr-8">
                            <input className="mr-2" onChange={(e)=>{if(e.currentTarget.checked){setValue('landtype','Buildable land')}}} type='radio' name="pricePer" id="mounth" value='mounth'/> 

                            <label>Buildable land</label>
                        </div>

                        <div>


                            <input className="mr-2" onChange={(e)=>{if(e.currentTarget.checked){setValue('landtype','farmland')}}} type='radio' name="pricePer" id="day" value='day'/>

                            <label>Farmland </label>
                        </div>
                    </div>
                    <div className="border border-devider my-3  "></div>
                    

                    {/* --------Price and Land size */}
                    <div className="flex flex-col md:flex-row">

                        <div className="w-full md:w-1/2">
                            <h5 className={`font-medium mb-1 ${errors.price?.message? 'text-red':'' }`} >Price : {errors.price?.message? errors.price.message : ''}</h5>

                            <label htmlFor="price" className={`relative text-gray-400 focus-within:text-gray-600 block   border-2 rounded ${errors.price?.message? 'border-red':'border-devider'} `}>

                            <p  className=" pointer-events-none w-8 h-6 absolute top-1/2 transform -translate-y-1/2 right-2"> Tnd</p>


                            <input name="price" type="number"  id="price"  step="0.01" placeholder="price" className="form-input px-1 w-full h-[38px]" 
                            onChange={(e)=>setValue('price',parseFloat(e.currentTarget.value))}/>
                            </label>
                        </div>

                        <div className="w-full md:w-1/2">
                            <h5 className={`font-medium mb-1 ${errors.size?.message? 'text-red':'' }`}>Land size : {errors.size?.message? errors.size?.message:''}</h5>
                            <label htmlFor="landsize" className={`relative text-gray-400 focus-within:text-gray-600 block   border-2 rounded ${errors.size?.message? 'border-red':'border-devider'} `}>


                            <input type='number' id='size'  placeholder=" property size " className="w-full h-[38px] rounded-md px-1"
                            onChange={(e)=>setValue('size',parseFloat(e.currentTarget.value )  )}
                            />

                            <p  className=" pointer-events-none w-8 h-6 absolute top-1/2 transform -translate-y-1/2 right-4"> m2</p>

                            </label>
                        </div>
                    </div>
                    <div className="border border-devider my-3  "></div>


                    {/* ----------------Images---------------- */}


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
                                errors
                                }) => (
                                // write your building UI
                                <div className="upload__image-wrapper mx-auto ">
                                    <div className="flex flex-wrap gap-2 mx-auto">

                                    <span
                                    style={isDragging ? { color: "red" } : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    className="cursor-pointer border w-max p-1 rounded-lg hover:scale-95 active:scale-105"
                                    >
                                    Add images(Max 9)
                                    </span>
                                    &nbsp;
                                
                                    <span onClick={onImageRemoveAll} className="cursor-pointer border w-max p-1 rounded-lg hover:scale-95 active:scale-105">Remove all images</span>
                                        </div>
                                    <br/>
                                    <span className="mt-4"> {images.length } images selected </span>
                                        {errors&&<div className="text-red font-bold">
                                        {errors.maxNumber && <span>Maximum images number allowed is 9</span>}
                                        {errors.maxFileSize && <span>Maximum image size must be less then 9mb</span>}
                                        </div>}
                                    <div className="flex flex-wrap gap-2 mx-auto">

                                    {imageList.map((image, index) => (
                                        <div key={index} className=" border p-2 mx-auto">
                                        <Image src={image.dataURL as string} alt="" width="150" height="120" className="relative" />
                                        
                                        <div>

                                        <span  onClick={() => onImageUpdate(index)} className="absloute mr-2 cursor-pointer border w-max p-1 rounded-lg hover:bg-red">Update</span>
                                        <span onClick={() => onImageRemove(index)} className="cursor-pointer border w-max p-1 rounded-lg hover:border-red ">Remove</span>
                                        </div>
                                    </div>
                                    ))}
                                    </div>
                                </div>
                                )}
                                </ImageUploading>
                     </div>


                     <div className="border border-devider my-3  "></div>

                    {/* -----------Map----------------- */}
                    <div>
                    <div className="flex ">

                            <Switch showMap={showMap } setshowMap={setshowMap}/>
                            <p className="ml-4">Set location</p>
                            </div>

                            {showMap&&<div>

                            <h3>Plase set the property location on the map <br/> <span className="font-bold" >or <span onClick={getDevicePosition} className="  text-red px-1  rounded-2xl cursor-pointer">use</span> the device location</span>(device location work better on devices with GPS) </h3>
                            <div className="w-full h-[60vh] z-0">
                                {location.error?.message&&<p className="text-secondary2 ">Enabel GPS on your device </p>}

                            <MapWithNoSSR position={position[0]!=0?position :selectedMunicipality.position} setposition={setposition}  />



                            </div>
                            </div>}
                    </div>


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

                        <button type="submit" className="self-center bg-secondary1 p-1 hover:scale-105 active:scale-95 mb-1 rounded-3xl m-auto  ">{!addPost.isLoading? 'Add Announcment' : 'Sending data...'}</button>
                            </div>




                        { addPost.isSuccess&&   <motion.div
                            initial={{x:'-100%'}}
                            animate={{x:'0'}}
                            transition={{duration:1}}
                            className=" flex  border border-red text-red-700 px-4 py-3 rounded absolute z-2000 bottom-40  left-0 bg-devider" role="alert">
                        <strong className="font-bold mr-1">Post added  </strong>
                        <span className="block sm:inline"> Rederecting to Home page.</span>
                        </motion.div>}

                        { addPost.isError&&   <motion.div
                            initial={{x:'-100%'}}
                            animate={{x:'0'}}
                            transition={{duration:1}}
                            className=" flex flex-col md:flex-row border border-red text-red-700 px-4 py-3 rounded absolute z-2000 bottom-20  left-0 bg-devider" role="alert">
                        <strong className="font-bold mr-1">Oops , somthing went wrong  </strong>
                        <span className="block sm:inline"> Please retry again later</span>
                        </motion.div>}
                                            
                </form>
             );
        }
        
        export default LandFilters;