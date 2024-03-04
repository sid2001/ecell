import { useRef,useEffect } from 'react';
import '/src/styles/Report.css';
import { Circles } from 'react-loader-spinner';
const Report = ({setMapDetail,fetching,location, apiResponse,uploadImage,uploadedImage, imageData,setCaptureImage,capture,setCapture})=>{

  const canvas = useRef(null);
   useEffect(()=>{
    if(capture===true){
      const ctx = canvas.current.getContext('2d');
      ctx.clearRect(0,0,100,100);
    ctx.drawImage(imageData,0,0,200,150);
    setCapture(false);
    }
  },[capture,uploadImage,uploadedImage]);

  const mapDetailHandler=()=>{
    setMapDetail(true);
  }
  return(

    <div className="report-card">
    <p className='heading'style={{ height:20,fontFamily:'sans-serif',fontWeight:'bold'}}>Plant Report Card</p>
    <div className="image-container">
      {capture||uploadImage===false?<canvas ref ={canvas} id="plantImage"></canvas>:<img id="plantImage2" src={uploadedImage} alt="Plant Image Placeholder" />}
      
    </div>
    <div className='info-wrapper'>
      {fetching?
      <>
      <div className='overlay'></div>
      <Circles
    height="80"
    width="80"
    color="#4fa94d"
    ariaLabel="circles-loading"
    wrapperStyle={{}}
    wrapperClass="loader"
    visible={true}
    />
      </>:''}
      
    <div className="left-card">
      <p><strong>Plant Name:</strong> <span id="plantName">Plant Name Placeholder</span></p>
      <p><strong>Species:</strong> <span id="species">Species Placeholder</span></p>
      <p><strong>Type:</strong> <span id="type">{{...apiResponse}.class_id}</span></p>
    </div>
    <div className="right-card">
      <p><strong>Disease Name:</strong> <span id="diseaseName">{{...apiResponse}.class}</span></p>
      <p><strong>Location Tag:</strong> <span id="locationTag">{location}</span></p>      
      <p><strong>Place:</strong> <span id="place">Place Placeholder</span></p>
    </div>
    </div>
    <button onClick={mapDetailHandler}>map detail</button>
  </div>
  )
}

export default Report;
