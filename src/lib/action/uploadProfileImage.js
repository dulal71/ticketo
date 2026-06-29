'use server'

 const IMGBB_API_KEY=process.env. NEXT_PUBLIC_IMAGE_API_KEY

 export const uploadUserImage = async(file)=>{
    const formData = new FormData()
    formData.append('image',file)
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`  ,
      {
        method: "POST",
      body: formData, 
      } 
      
    )
const data =await res.json()
console.log(data);
return data.data.url
 }