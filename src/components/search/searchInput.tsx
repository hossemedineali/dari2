
import Select from "react-select";
import {  useFormInput} from "../../store/searchFormInput";
import { useRouter } from 'next/router'
import {cities,governorates, type MygovernorateType} from '../../utils/cities'
import { useState } from "react";
import { useLanguage } from "../../store/store";
import type { State } from "../../types/typeshelper";




  
    const SearchInput:React.FC = () => {
        const style = {
            control: () => ({
              display:'flex',
              border: '0',
              // This line disable the blue border
              boxShadow:  '0',
              "&:hover": {
                border:  '0'
              }
            }),
            background: "#023950",
          }; 
    
          const [selectedGovernorate, setselectedGovernorate] = useState<State>({label:'',value:'',position:[0,0]})
          const [selectedMunicipality, setselectedMunicipality] = useState<State>({label:'',value:'',position:[0,0]})
          const munoptions=cities[selectedGovernorate.label]

    const [selectedMunError]=useState('')
   
    const filter=useFormInput()    
    
    const Language=useLanguage()

    const router =useRouter()
   
    const hundelgovchange=(e:MygovernorateType)=>{
      setselectedGovernorate({label:e.label,value:e.value as string,position:e.position as [number,number]})
      setselectedMunicipality({label:'',value:'',position:[0,0]})
      filter.setgovernorate(e.label)
      filter.setmunicipality('')
  }


  const hundelmunchange=(e:MygovernorateType)=>{

      setselectedMunicipality({label:e.label,value:e.value as string,position:e.position as [number,number]})  
     filter.setmunicipality(e.label)
  }

    const hundelclicksearch=()=>{
        
            router.push('/search')
      
    }


    return (   
    
    <div>

        <div className={`mt-4  min-h-[40px] flex flex-col xs:flex-row  pt-6 xs:pt-0 pb-3 xs:pb-0 md:max-w-full  gap-4  border border-primary1 mx-auto  rounded-2xl px-4 ${selectedMunError?'border-red':'border-devider'}`}>

        <div className="flex-grow flex bg-red relative xs:w-1/2">
          <h1 className={`absolute z-10 text-lg font-semibold  left-0 py-0 ${!!selectedGovernorate.label?'top-[-18px] bg-white':'top-0 bg-devider'}	transition-all duration-500 `}	 >{Language.lng=='ENG'?'Governorate':'Gouvernorat'}</h1>

          <Select
            styles={style}
            value={selectedGovernorate}
            id='governorate'
            instanceId='governorate'
            options={governorates}
            onChange={(e)=>{hundelgovchange(e as MygovernorateType)}}            
            placeholder=''
            className="bg-devider   w-full mr-auto"
            />
              
          </div>

          <div className="flex-grow flex relative xs:w-1/2">
            
          <h1 className={`absolute z-10 text-lg font-semibold  left-0 py-0 ${!!selectedMunicipality.label?'top-[-18px] bg-white':'top-0 bg-devider'}	transition-all duration-500 `}>{Language.lng=='ENG'?'Municipality':'Municipalité'}</h1>     
          <Select
            styles={style}
            id='Municipality'
            instanceId='Municipality'
            value={selectedMunicipality as MygovernorateType}
            options={munoptions}
            onChange={(e)=>{hundelmunchange(e as MygovernorateType)}}
           
            placeholder=' Municipality'
            className=" bg-devider   w-full mr-auto "
            />
              
        </div>
            
        <button onClick={hundelclicksearch} className="hover:scale-105 active:scale-95 text-red my-auto rounded-full flex xs:border-none border-2  items-center mt-auto mx-auto ">
          <p  className="xs:hidden px-2 text-lg  ">Search</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-full">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>   
        </div>   
    </div>
 );
}
 
export default SearchInput;