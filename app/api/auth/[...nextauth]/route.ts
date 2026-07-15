d
// codingan chatGPT
import Prisma  from "@/lib/prisma";

export async function GET() {
  const users = await Prisma.user.findMany();
  return Response.json(users);
}


//codingan default coder media
// export const { GET, POST } = handlers