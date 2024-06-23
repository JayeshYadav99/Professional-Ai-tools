"use client"
import { useState } from 'react';
import {UploadToVercelStorage} from '../../../../lib/BlobStorage';
import axios from 'axios';
import { useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
export default function ImageUploadForm() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [transformedImage, setTransformedImage] = useState(null);
  const [uploading, setUploading] =useState(false);

  // const handleToonify = async ()=>{

  //   if (!selectedImage) {
  //     alert('Please select an image first.');
  //     return;
  //   }



  //   try {

  //     const{data,success}=await      UploadToVercelStorage(file);
  //     const response = await axios.post('/api/toonify', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });

  //     // Assuming the API returns a URL of the processed image
  //     setTransformedImage(response.data.imageUrl);
  //   } catch (error) {
  //     console.error('Error processing image:', error);
  //     // Handle error, show message, etc.
  //   }



  // }

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/png": [".png"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
        const file = acceptedFiles[0];
        setSelectedImage(URL.createObjectURL(file));
        if (file.size > 10 * 1024 * 1024) {
          // bigger than 10mb!
          toast.error("File too large");
          return;
        }

        try
        {
            setUploading(true);
            console.log("Uploading file")
          
            // const{data,success}=await      UploadToVercelStorage(file);
// console.log(data);
let bodydata = JSON.stringify({
  "prompt": {
    "text": "Generate cartoon image from input image",
    "negative_prompt": "Generate cartoon image from input image",
    "super_resolution": true,
    "num_images": 1,
    "face_correct": true,
    "controlnet_conditioning_scale": 0,
    "controlnet_txt2img": false,
    "denoising_strength": 0.1,
    "input_image_url": "https://xf6s4f8pcrct3qte.public.blob.vercel-storage.com/hackathon/1719138170616toonify-input-66c7836358b6b2985ca6a595275d8448-B2pdknA6scm8FCIJNNg3oeaTBCwXXr.png",
    "callback": "https://headshot.loca.lt/api/prompt-webhook?user_id=1"
  }
});

const response = await axios.post('/api/toonify',bodydata, {
    headers: {  
   'Content-Type': 'application/json', 
    'Authorization': 'Bearer sd_oyFr7XogbrcorbksXT89Lpdpt67jTJ',
    },
  });
  console.log(response);
              toast.success("Image created!");
           
       
        }
        catch (error)
        {
        toast.error("Error creating chat");
        console.error(error);
        }
        finally{
            setUploading(false);
        }
    },
  });

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Image Upload and Transformation</h1>
      
      <div className="flex w-full max-w-4xl">
        <div className="flex-1 p-4 bg-white shadow-md rounded-lg mr-2">
          <h2 className="text-2xl font-semibold mb-4 text-center">Original Image</h2>
          <div className="p-2 bg-white rounded-xl">
            {!selectedImage ? (
             <div
             {...getRootProps({
               className:
                 "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
             })}
           >
             <input {...getInputProps()} />
             </div>
            ) : (
              <img src={selectedImage} alt="Selected" className="max-h-full max-w-full object-contain" />
            )}
          </div>
        </div>

        <div className="flex-1 p-4 bg-white shadow-md rounded-lg ml-2">
          <h2 className="text-2xl font-semibold mb-4 text-center">Transformed Image</h2>
          <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg flex justify-center items-center h-64">
            {!transformedImage ? (
              <img src={"https://sdbooth2-production.s3.amazonaws.com/nlxs36u815s289f2u00osto7jknf"} alt="Transformed" className="max-h-full max-w-full object-contain" />
            ) : (
              <p className="text-center text-gray-500">Transformed Image</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex mt-6 space-x-4">
        <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded transition" >
          Apply Transformation
        </button>
        <button className="bg-purple-800 hover:bg-purple-900 text-white py-2 px-6 rounded transition">
          Save Image
        </button>
      </div>
    </div>
  );
}
