import Card from "@/components/card";
import { getRooms } from "@/lib/data";

const Main = async () => {
  const rooms = await getRooms();

  return (
    <div className="max-w-screen-xl py-6 pb-20 px-4 mx-auto">
      <div className="grid gap-7 md:grid-cols-3">
        {rooms.map((room) => (
          <Card
            key={room.id}
            name={room.name}
            price={room.price}
            capacity={room.capacity}
            image={room.image}
            slug={room.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Main;
