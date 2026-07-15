"use client";
import { useRef, useState, useTransition } from "react";
import React from "react";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5";
import Image from "next/image";
import { BarLoader } from "react-spinners";
import { useRouter } from "next/navigation";

interface Amenity {
  id: string;
  name: string;
}

interface RoomAmenity {
  id: string;
  amenitiesId: string;
  Amenities: Amenity;
}

interface Room {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  price: number;
  capacity: number;
  RoomAmenities: RoomAmenity[];
}

const EditRoomForm = ({
  room,
  amenities,
}: {
  room: Room;
  amenities: Amenity[];
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState(room.image);
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const selectedAmenityIds = room.RoomAmenities.map((ra) => ra.amenitiesId);

  const handleUpload = () => {
    if (!inputFileRef.current?.files) return;
    const file = inputFileRef.current.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.set("file", file);
    startTransition(async () => {
      try {
        const response = await fetch("/api/upload", {
          method: "PUT",
          body: formData,
        });
        const data = await response.json();
        if (response.status !== 200) {
          setMessage(data.message);
          return;
        }
        setImage(data.url);
        setMessage("");
      } catch (error) {
        console.log(error);
        setMessage("Upload failed");
      }
    });
  };

  const deleteImage = (imageUrl: string) => {
    startTransition(async () => {
      try {
        await fetch(`/api/upload?imageUrl=${imageUrl}`, {
          method: "DELETE",
        });
        setImage("");
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as string;
    const price = formData.get("price") as string;
    const capacity = formData.get("capacity") as string;
    const selectedAmenities = formData.getAll("amenities") as string[];

    if (!name || !description || !image || !price) {
      setMessage("Please fill all required fields and upload an image");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch(`/api/rooms/${room.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            description,
            type: type || "deluxe",
            image,
            price,
            capacity: capacity || "1",
            amenities: selectedAmenities,
          }),
        });

        if (response.ok) {
          router.push("/admin/rooms");
          router.refresh();
        } else {
          const data = await response.json();
          setMessage(data.error || "Failed to update room");
        }
      } catch (error) {
        console.log(error);
        setMessage("Something went wrong");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-12 gap-5">
        <div className="col-span-8 bg-white p-4 rounded-sm">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={room.name}
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
              placeholder="Room name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room Type
            </label>
            <select
              name="type"
              defaultValue={room.type}
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
            >
              <option value="deluxe">Deluxe</option>
              <option value="premium">Premium</option>
              <option value="suite">Suite</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              rows={8}
              defaultValue={room.description}
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
              placeholder="Description"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amenities
            </label>
            <div className="grid md:grid-cols-3 gap-2">
              {amenities.map((item) => (
                <div className="flex items-center mb-2" key={item.id}>
                  <input
                    type="checkbox"
                    name="amenities"
                    defaultChecked={selectedAmenityIds.includes(item.id)}
                    defaultValue={item.id}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                  />
                  <label className="ms-2 text-sm font-medium text-gray-900 capitalize">
                    {item.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-4 bg-white p-4 rounded-sm">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image <span className="text-red-500">*</span>
            </label>
            <label
              htmlFor="input-file"
              className="flex flex-col border-2 border-dashed rounded-md cursor-pointer bg-gray-50 relative min-h-[200px]"
            >
              <div className="flex flex-col items-center justify-center text-gray-500 pt-5 pb-6 z-10">
                {pending ? <BarLoader /> : null}
                {image ? (
                  <button
                    type="button"
                    onClick={() => deleteImage(image)}
                    className="flex items-center justify-center bg-red-500 size-6 rounded-sm absolute right-1 top-1 text-white hover:bg-red-600 z-20"
                  >
                    <IoTrashOutline className="size-4" />
                  </button>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <IoCloudUploadOutline className="size-8" />
                    <p className="mb-1 text-sm font-bold">Select image</p>
                    {message ? (
                      <p className="text-xs text-red-500">{message}</p>
                    ) : (
                      <p className="text-xs">SVG, PNG, JPG, GIF (max: 4MB)</p>
                    )}
                  </div>
                )}
              </div>
              {!image ? (
                <input
                  type="file"
                  ref={inputFileRef}
                  onChange={handleUpload}
                  id="input-file"
                  className="hidden"
                  accept="image/*"
                />
              ) : (
                <Image
                  src={image}
                  alt="Room image"
                  width={640}
                  height={360}
                  className="rounded-md absolute inset-0 w-full h-full object-cover"
                />
              )}
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capacity
            </label>
            <input
              type="number"
              name="capacity"
              defaultValue={room.capacity}
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
              placeholder="Capacity"
              min="1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (IDR) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              defaultValue={room.price}
              className="py-2 px-4 rounded-sm border border-gray-400 w-full"
              placeholder="Price"
              min="0"
              required
            />
          </div>
          {message && <p className="text-sm text-red-500 mb-2">{message}</p>}
          <button
            type="submit"
            disabled={pending}
            className="bg-orange-400 text-white w-full hover:bg-orange-500 py-2.5 px-6 text-lg font-semibold cursor-pointer disabled:opacity-50"
          >
            {pending ? "Saving..." : "Update"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditRoomForm;
