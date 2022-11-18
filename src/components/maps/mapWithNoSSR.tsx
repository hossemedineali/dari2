
import dynamic from 'next/dynamic';


const MapWithNossr = dynamic(() => import('./map'), {
  ssr: false,
});


type Props={
  position:[number,number]|undefined,
  setposition:(p:[number,number]) => void
}

const MapWithNoSSR:React.FC<Props> = ({position,setposition}) => {


    return ( <MapWithNossr position={position} setposition={setposition}  /> );
}
 
export default MapWithNoSSR;