

type Props={
    showMap:boolean,
    setshowMap:(x:boolean)=>void
}


const Switch:React.FC<Props> = ({showMap,setshowMap}) => {

   

   

        return ( 
            <div className="md:w-14 md:h-7 w-12 h-6 flex items-center bg-devider rounded-full p-1 cursor-pointer"
            onClick={() => {
                setshowMap(!showMap);
              }}
            >

                <div className={`md:w-6 md:h-6 h-5 w-5  rounded-full shadow-md transform duration-300 ease-in-out ${!showMap?'bg-red ' : 'bg-primary1 transform translate-x-6'}`} ></div>
            </div>
         );
    }
    
    export default Switch;


    