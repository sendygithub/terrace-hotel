"use client";
import { useActionState } from "react";
import { Prisma } from "@prisma/client";
import { SiOnstar } from "react-icons/si";
import { ContactSchema } from "@/lib/zod";
import { error } from "console";

export const ContactMessage = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = ContactSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }
  const { name, email, subject, message } = validatedFields.data;

  try {
    await Prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });
    return { message: "terima kasih sudah menggontak kami" };
  } catch (error) {
    console.log(error);
  }
};
