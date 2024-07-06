import { useState } from "react";

const useBackgroundRemover =(file)=>{
    const [removeBg,setRemoveBg] = useState('')

   const backgroundRemove = async () => {
        e.preventDefault();
        const api_key = process.env.REACT_APP_API_BG;
        const apiUrl = "https://api.remove.bg/v1.0/removebg";
        const formData = new FormData();
        formData.append("image_file", file, file.name);
        formData.append("size", 'auto');
        try {
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'X-Api-Key': api_key
                },
                body: formData
            });
            const bgData = await res.blob();
            setRemoveBg(bgData);
           
        } 
      catch (error) 
        {
            console.log(error);
            backgroundRemove();
        }
    };
    backgroundRemove();
    
  return {removeBg};
}
export default useBackgroundRemover;