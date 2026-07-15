"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { IoTrashOutline } from "react-icons/io5";

const DeleteRoomButton = ({ roomId }: { roomId: string }) => {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this room? This action cannot be undone.",
    );
    if (!confirmed) return;

    startTransition(async () => {
      try {
        const response = await fetch(`/api/rooms/${roomId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          router.refresh();
        } else {
          alert("Failed to delete room. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting room:", error);
        alert("Failed to delete room. Please try again.");
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-sm hover:bg-red-100 disabled:opacity-50 flex items-center gap-1"
    >
      <IoTrashOutline className="size-3" />
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteRoomButton;
