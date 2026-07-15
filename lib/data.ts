import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { error } from "console";

export const getAmenities = async () => {
  const session = await auth();
  // validasi = jika tidak terdapat session atau jika tidak terdapat user
  if (!session || !session.user) {
    throw new Error("Unauthorized acces");
  }
  try {
    const result = await prisma.amenities.findMany();
    return result;
  } catch (error) {
    console.log(error);
  }
};
