import { useNotifiaction } from "../../store/notification";
import { useLanguage } from "../../store/store";
import {AnimatePresence, motion} from 'framer-motion'


const Notification = () => {

    const notification=useNotifiaction()
    const Language=useLanguage()

   

    return (
        <AnimatePresence>

        <motion.div initial={{scale:0 }} animate={{scale:1}} exit={{x:0}} transition={{duration:0.2}} className="bg-white flex justify-center items-center text-sm md:text-lg  lg:text-2xl font-bold rounded-xl border border-devider shadow-md shadow-black absolute  top-[20vh] left-[5vw] right-[5vw] bottom-[50vh]">

            <svg onClick={()=>{notification.toggleShow(false),notification.setMeassage("","",true)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 cursor-pointer hover:bg-devider position absolute top-4 right-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
             </svg>


            <div>
                {notification.message.success&&<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10  h-10 text-green mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                }


                {!notification.message.success&&<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-red mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
}

            <p className="px-2 text-center">{Language.lng=='ENG'?notification.message.ENG:notification.message.FRA}</p>
            </div>

    </motion.div> 
        </AnimatePresence>
    );
}
 
export default Notification;