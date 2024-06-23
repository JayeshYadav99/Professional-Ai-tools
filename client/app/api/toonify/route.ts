
import axios from "axios";

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const astriaApiKey = process.env.ASTRIA_API_KEY;
const astriaTestModeIsOn = process.env.ASTRIA_TEST_MODE === "true";
// For local development, recommend using an Ngrok tunnel for the domain



export async function POST(request: Request) {
  const payload = await request.json();

console.log("payload", payload)

const {prompt}=payload;
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
const response = await axios.post('https://api.astria.ai/tunes/625155/prompts',bodydata, {
    headers: {  
   'Content-Type': 'application/json', 
    'Authorization': 'Bearer sd_oyFr7XogbrcorbksXT89Lpdpt67jTJ',
    },
  });

  console.log(response.data)

  return NextResponse.json(
    {
      message: "success",

    },
    { status: 200 }
  );
}
