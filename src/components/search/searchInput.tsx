
import Select from "react-select";
import {  useFormInput} from "../../store/searchFormInput";
import { useRouter } from 'next/router'
import {groupedcities,filterOption} from '../../utils/cities'
import { useState } from "react";





  
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

    const [selectedMunError,setselectedMunError]=useState('')
    const filter=useFormInput()    
    const router =useRouter()
    const hundelchange=(e:string)=>{
        if(e){
            console.log('e :',e)
            setselectedMunError('')
            filter.setmunicipality(e)

            console.log('filter.form.municipality',filter.form)
        }
    }
    const hundelclicksearch=()=>{
        
            router.push('/search')
      
    }
    return (   
        <div className={`mt-4 flex  relative gap-4 bg-selectGrey border   rounded-2xl px-4 ${selectedMunError?'border-red':''}`}>           
        <div className="flex-grow">      
        <Select 
            styles={style}
            instanceId=" municipalities"
            id=" municipalities"
            options={groupedcities}
            filterOption={filterOption}
            className=" border-none border-red  w-full mr-auto bg-devider" 
            placeholder={filter.form.governorate||filter.form.municipality?  filter.form.governorate +'-' +filter.form.municipality :'Enter a City '}
            />
        </div>
            
        <button onClick={hundelclicksearch} className="text-red my-auto rounded-full flex items-center mt-auto ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-full">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
        </button>   
        </div>   
 );
}
 
export default SearchInput;