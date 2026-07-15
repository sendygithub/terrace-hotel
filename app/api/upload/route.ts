import {put, del} from "@vercel/blob";
import { NextResponse } from "next/server";
import { blob } from "stream/consumers";

export const PUT =async (request: Request) =>{
    const form =await request.formData();
    const file = form.get("file") as File;
// jika ukuran file sama dengan 0 (||atau)
    if(file.size=== 0|| file.size === undefined)
    {return NextResponse.json({message:"file is required"}, {status:400});
}
    if(file.size > 4000000)
       {return NextResponse.json({message:"ukuran file terlalu besar"}, {status:400}); 
}
if (!file.type.startsWith("image/"))
     {return NextResponse.json({message:"jenis file tidak di dukung"}, {status:400}); 
}
const blob = await put(file.name, file,{
    access: "public",
    multipart: true
});

return NextResponse.json(blob);
}

export const DELETE = async   (request: Request) =>{
    const {searchParams}= new URL(request.url)
    const imageURL = searchParams.get("imageUrl") as string;
    await del(imageURL);
    return NextResponse.json({status:200});
};
