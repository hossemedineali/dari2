

import { useFormInput } from "../../store/searchFormInput";
import SearchInput from "./searchInput";






const Searchwrapper = () => {

    const filter=useFormInput()    


        

       
      
    return ( 
        <div className="relative lg:w-3/5 md:w-10/12  w-full item-center flex flex-col justify-center  xs:h-40 h-52 py-4   rounded-2xl mb-4   ">
           <div  className="flex flex-wrap justify-around w-full mb-4">
           <p onClick={()=>filter.setannouncementtype('Sell')} id='Buy' className={`${filter.form.announcementtype=='Sell'?'border-red':'border-transparent'} text-center py-2 border-b-2 transition ease-in-out duration-1150 cursor-pointer text-xl` } >Buy</p>
            <p onClick={()=>filter.setannouncementtype('Rent')} id='Rent' className={`${filter.form.announcementtype=='Rent'?'border-red':'border-transparent'}   text-center py-2 border-b-2 transition ease-in-out duration-1150 cursor-pointer text-xl`  }>Rent</p>
            <p onClick={()=>filter.setannouncementtype('CoRental')}  className={`${filter.form.announcementtype=='CoRental'?'border-red':'border-transparent'}   text-center py-2 border-b-2 transition ease-in-out duration-1150 cursor-pointer text-xl` }>CoRental</p>
           </div>

           
            <SearchInput/>

        </div>
     );
}
 
export default Searchwrapper;



