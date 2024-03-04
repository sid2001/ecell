import { forwardRef, useEffect,useRef } from "react";

import identifyDisease from "../scripts/api";
const Capture = forwardRef((props,ref)=>{

  var myObj = {};

  const successHandle = (stream)=>{
    
    ref.current.srcObject = stream;
  }
  useEffect(()=>{
    navigator.mediaDevices.getUserMedia(
      {
        video:true
      }
    )
    .then(successHandle)
    .catch(console.error)

    
  },[])
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((pos)=>{
      props.setLocation(`lat:${pos.coords.latitude} lon:${pos.coords.longitude}`);
    },console.error,{enableHighAccuracy:true})
  })
  const imageUploadHandler = async(e)=>{
    if(e.target.files&&e.target.files[0]){
      props.setApiResponse('');
      console.log(e.target.files);
      const file = e.target.files[0];
      // const blob = new Blob(, { type: file.type })
      props.setUploadedImage(URL.createObjectURL(e.target.files[0]));
      props.setCapture(false);
      props.setUploadImage(true);
      const reader = new FileReader();
      reader.onload = async (e)=>{
        const base64String =  e.target.result;
        console.log(base64String);
        console.log('fetching');
        props.setFetching(true);
        const r = await identifyDisease(base64String,myObj);
        const resCh = setInterval(()=>{
          if(myObj){
            props.setApiResponse(myObj.data.predictions[0]);
            console.log(myObj.data.predictions[0]);
            props.setFetching(false);
            clearInterval(resCh);
          }
        },1000);
      }
      reader.readAsDataURL(file);
      
    }
  }
  const captureHandle = async (event)=>{
    props.setApiResponse('');
    props.setCapture(true);
    props.setUploadedImage('');
    props.setUploadImage(false);
    identifyDisease(props.uploadedImage).then(res=>{
      console.log('fetching!!');
      props.setApiResponse(res);
      console.log(res);
    })
  }
  return(
    <div className="video-wrapper">
      {/* <canvas hidden id='storage'></canvas> */}
      <div className="video-frame">
      <video width={400} height={600} ref={ref} id='local-video' autoPlay playsInline muted></video>
      </div>
      <div className="input-wrapper">
      <button className="capture-button" onClick={captureHandle}>
        <div className="ring">
        <div className="cricle"></div>
        </div>
      </button>
      <input id='image-upload' onChange={imageUploadHandler} type="file" name='plantImage' />
      </div>
    </div>
  )
})

Capture.displayName = 'CaptureComponent';
// Capture.propTypes = myPropTypes;
export default Capture;