import { NextResponse } from "next/server";
import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";

export const PUT = async (request: Request) => {
  try {
    const form = await request.formData();
    const file = form.get("file") as File;

    // Validasi file
    if (!file || file.size === 0) {
      return NextResponse.json(
        { message: "file is required" },
        { status: 400 },
      );
    }

    if (file.size > 4000000) {
      return NextResponse.json(
        { message: "ukuran file terlalu besar" },
        { status: 400 },
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "jenis file tidak di dukung" },
        { status: 400 },
      );
    }

    // Buat nama file unik
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name) || ".jpg";
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;

    // Path untuk menyimpan file
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, uniqueName);

    // Buat direktori jika belum ada
    await mkdir(uploadDir, { recursive: true });

    // Tulis file
    await writeFile(filePath, buffer);

    // Kembalikan URL
    const url = `/uploads/${uniqueName}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
};

export const DELETE = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get("imageUrl") as string;

    if (!imageUrl) {
      return NextResponse.json(
        { message: "Image URL is required" },
        { status: 400 },
      );
    }

    // Hapus file dari folder public
    const fileName = path.basename(imageUrl);
    const filePath = path.join(process.cwd(), "public", "uploads", fileName);

    await unlink(filePath);

    return NextResponse.json({ message: "File deleted", status: 200 });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
};
