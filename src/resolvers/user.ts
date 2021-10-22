import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function users() {
  const allUsers = await prisma.user.findMany({ include: { Post: true } });
  return allUsers;
}

export async function createUser({ input }: any) {
  try {
    console.log("[...registering_user...]");

    const user = await prisma.user.create({
      data: {
        ...input,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateUser({ input }: any) {
  try {
    console.log("[...updating_user...]");
    const user = await prisma.user.update({
      where: { email: input.email },
      data: { ...input },
    });
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteUser({ email }: any) {
  try {
    const user = await prisma.user.delete({
      where: { email },
      select: {
        email: true,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
}
