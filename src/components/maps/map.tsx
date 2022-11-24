import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";










type Props={
  position:[number,number]|undefined,
  setposition:(p: [number,number]) => void
}





const Map:React.FC<Props> = ({position,setposition}) => {

 
const Updateposition =()=>{
  const map=useMap()
      map.setView(position as [number,number])
  return(null)
}

 
 
  const LocationFinder = () => {
     useMapEvents({
        click(e) {
           setposition([e.latlng.lat,e.latlng.lng])
               },
    });
    return null;
  };

  
  return (
    <>
    {position && <MapContainer
      zoomControl={true}
      center={position }
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%",zIndex:0 ,position:'relative' ,borderRadius:'10px'}}
      
      >
      <TileLayer
         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
         <Marker position={position}></Marker>
      
      <LocationFinder  />
      <Updateposition/>
    </MapContainer>}
         </>
  );
};

export default Map;
