import { useSelector } from "react-redux"

const slowApi = (val)=> {
   return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("----ASD--AS-D-AS-D-AS-D--------SD-2-3--23-")
            resolve(val+1);
        },5000)
    })
}
export default slowApi;
