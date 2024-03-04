import ContainerWrapper from "./UI/ContainerWrapper"
import Report from "./Report";
import Capture from "./Capture";
import { useRef,useState } from "react";
import Map from "./Map";

const Main = ()=>{
  const videoRef = useRef(null);
  const [capture,setCapture] = useState(false);
  const [uploadedImage,setUploadedImage] = useState('');
  const [uploadImage,setUploadImage] = useState(false);
  const [apiResponse,setApiResponse] = useState('');
  const [location,setLocation] = useState('');
  const [fetching,setFetching] = useState(false);
  const [mapDetail,setMapDetail] = useState(false);

  const closeHandler = ()=>{
    setMapDetail(false);
    var map = document.getElementById('map');
    map.innerHTML = '';
  }
  return(
    <ContainerWrapper>
      <Report setMapDetail={setMapDetail} fetching={fetching} location={location} apiResponse={apiResponse} uploadImage={uploadImage} uploadedImage={uploadedImage} imageData={videoRef.current} capture={capture} setCapture={setCapture}/>
      <Capture setFetching={setFetching} setLocation={setLocation} apiResponse={apiResponse} setApiResponse={setApiResponse} uploadedImage={uploadedImage} ref={videoRef} setCapture={setCapture} setUploadImage={setUploadImage} setUploadedImage={setUploadedImage}/>
      {/* <Map/> */}
      {
        mapDetail?<><div className="mapOverlay"><button onClick={closeHandler} className="close-button">X</button></div>{Map()}</>:''  
      }
    </ContainerWrapper>
  )
}
export default Main;