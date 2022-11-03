import { motion } from "framer-motion"
import Link from "next/link";
//import { useFormInput } from "../../store/store";

const links=[


    {value:'Buy',label:'Sell'},{value:'Rent',label:'Rent'},{value:'Find coRental',label:'CoRental'}
  ]
 interface Props{
    togglemenu:boolean,
    settogglemenu:(settogglemenu:boolean)=>void
 }

const MobileMenu:React.FC<Props> = ({togglemenu,settogglemenu}) => {

   // const formInput=useFormInput()


    return (
        <div className=" absolute top-0 left-0 bottom-0  min-h-screen  bg-primary1 backdrop-sepia  md:hidden " >
        {togglemenu&&<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer mt-5" onClick={()=>{settogglemenu(false)}}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
         </svg>}
        
        <motion.aside
             initial={{ width: 0 }} 
             animate={{ width: 300 }}
             exit={{width:0}}
             transition={{easeInOut: [0.17]}}
            >

            <ul className="p-16 flex flex-col gap-5">
                {links.map((link,index)=>(
                <Link href='/search' key={index}>
{/*                     <li onClick={()=>{formInput.setannouncementtype(link.label);settogglemenu(false)}}  className='cursor-pointer hover:text-secondary2'> {link.value}</li>
 */}                    </Link>
                    
                
                    ))}
            </ul>
                    </motion.aside>
    </div> 
            
    );
}
 
export default MobileMenu;




 

