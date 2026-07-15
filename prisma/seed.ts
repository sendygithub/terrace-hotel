import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

await prisma.user.upsert({
  where: {
    email: "admin@gmail.com",
  },
  update: {},
  create: {
    name: "Admin",
    email: "admin@gmail.com",
    password: "123",
    role: "ADMIN",
  },
});

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function main() {
//   // Create Amenities
//   const amenitiesData = [
//     { name: "WiFi" },
//     { name: "AC" },
//     { name: "TV" },
//     { name: "Mini Bar" },
//     { name: "Bathtub" },
//     { name: "Sea View" },
//     { name: "Breakfast" },
//     { name: "Room Service" },
//     { name: "Swimming Pool" },
//     { name: "Gym" },
//     { name: "Spa" },
//     { name: "Parking" },
//   ];

//   const amenities = await Promise.all(
//     amenitiesData.map((a) =>
//       prisma.amenities.upsert({
//         where: { id: a.name.toLowerCase().replace(/\s+/g, "-") },
//         update: {},
//         create: {
//           id: a.name.toLowerCase().replace(/\s+/g, "-"),
//           name: a.name,
//         },
//       }),
//     ),
//   );

//   // Create Rooms
//   const roomsData = [
//     {
//       name: "Deluxe King Room",
//       type: "deluxe",
//       description:
//         "Nikmati kenyamanan maksimal di kamar Deluxe King kami yang luas. Dilengkapi dengan tempat tidur king size, pemandangan kota yang menakjubkan, dan fasilitas modern untuk membuat masa menginap Anda tak terlupakan.",
//       image: "/hero.jpg",
//       price: 1500000,
//       capacity: 2,
//       amenities: ["WiFi", "AC", "TV", "Mini Bar", "Breakfast"],
//     },
//     {
//       name: "Deluxe Twin Room",
//       type: "deluxe",
//       description:
//         "Kamar Deluxe Twin dengan dua tempat tidur single yang nyaman, cocok untuk perjalanan bersama teman atau kolega. Dilengkapi dengan berbagai fasilitas premium.",
//       image: "/hero.jpg",
//       price: 1400000,
//       capacity: 2,
//       amenities: ["WiFi", "AC", "TV", "Breakfast"],
//     },
//     {
//       name: "Premium Ocean View",
//       type: "premium",
//       description:
//         "Kamar Premium dengan pemandangan laut yang spektakuler. Nikmati matahari terbit langsung dari kamar Anda. Dilengkapi dengan tempat tidur queen size dan balkon pribadi.",
//       image: "/hero.jpg",
//       price: 2500000,
//       capacity: 2,
//       amenities: [
//         "WiFi",
//         "AC",
//         "TV",
//         "Mini Bar",
//         "Sea View",
//         "Bathtub",
//         "Breakfast",
//       ],
//     },
//     {
//       name: "Premium Family Room",
//       type: "premium",
//       description:
//         "Kamar Premium yang luas untuk keluarga. Dengan dua tempat tidur queen size, ruang tamu terpisah, dan fasilitas lengkap untuk membuat liburan keluarga Anda menyenangkan.",
//       image: "/hero.jpg",
//       price: 3000000,
//       capacity: 4,
//       amenities: [
//         "WiFi",
//         "AC",
//         "TV",
//         "Mini Bar",
//         "Bathtub",
//         "Breakfast",
//         "Room Service",
//       ],
//     },
//     {
//       name: "Suite Presidential",
//       type: "suite",
//       description:
//         "Kamar Suite Presidential kami adalah puncak kemewahan. Dengan ruang tamu terpisah, ruang makan, dapur kecil, dan pemandangan 360 derajat kota. Pengalaman menginap yang tak tertandingi.",
//       image: "/hero.jpg",
//       price: 5000000,
//       capacity: 2,
//       amenities: [
//         "WiFi",
//         "AC",
//         "TV",
//         "Mini Bar",
//         "Bathtub",
//         "Sea View",
//         "Breakfast",
//         "Room Service",
//         "Spa",
//       ],
//     },
//     {
//       name: "Suite Honeymoon",
//       type: "suite",
//       description:
//         "Suite Honeymoon eksklusif untuk momen spesial Anda. Dilengkapi dengan tempat tidur king size, dekorasi romantis, bathtub mewah, dan layanan butler pribadi.",
//       image: "/hero.jpg",
//       price: 4500000,
//       capacity: 2,
//       amenities: [
//         "WiFi",
//         "AC",
//         "TV",
//         "Mini Bar",
//         "Bathtub",
//         "Sea View",
//         "Breakfast",
//         "Room Service",
//       ],
//     },
//   ];

//   for (const roomData of roomsData) {
//     const { amenities: roomAmenities, ...roomInfo } = roomData;

//     const room = await prisma.room.upsert({
//       where: { id: roomData.name.toLowerCase().replace(/\s+/g, "-") },
//       update: {
//         name: roomInfo.name,
//         type: roomInfo.type,
//         description: roomInfo.description,
//         image: roomInfo.image,
//         price: roomInfo.price,
//         capacity: roomInfo.capacity,
//       },
//       create: {
//         id: roomData.name.toLowerCase().replace(/\s+/g, "-"),
//         name: roomInfo.name,
//         type: roomInfo.type,
//         description: roomInfo.description,
//         image: roomInfo.image,
//         price: roomInfo.price,
//         capacity: roomInfo.capacity,
//       },
//     });

//     // Connect amenities to room
//     for (const amenityName of roomAmenities) {
//       const amenity = amenities.find((a) => a.name === amenityName);
//       if (amenity) {
//         await prisma.roomAmenities.upsert({
//           where: {
//             id: `${room.id}-${amenity.id}`,
//           },
//           update: {},
//           create: {
//             id: `${room.id}-${amenity.id}`,
//             roomId: room.id,
//             amenitiesId: amenity.id,
//           },
//         });
//       }
//     }
//   }

//   console.log("Seed data created successfully!");
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
