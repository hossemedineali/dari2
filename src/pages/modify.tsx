import { trpc } from "../utils/trpc";

const Modify = () => {
    const modify=trpc.modify.mdf.useMutation()
    return ( <div className="flex ">
        <button onClick={()=>{modify.mutate()}}  className="w-40 h-40 m-auto">Modify</button>
    </div> );
}
 
export default Modify;