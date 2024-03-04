import axios from 'axios';

// const promiseObject = new Promise((resolve,reject))

const identifyDisease = async (image,myObj)=>{

await axios({
    method: "POST",
    url: "https://detect.roboflow.com/plant-disease-detection-v2-2nclk/1",
    params: {
        api_key: "mw7kk5eGRQpwoRg0Rvun"
    },
    data: image,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})
.then(function(response) {
  // console.log(response.data);
  myObj.data = response.data;
  console.log(myObj);
})
.catch(function(error) {
    console.log(error.message);
});
}
export default identifyDisease;