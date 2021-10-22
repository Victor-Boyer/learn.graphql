import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function posts() {
  const allPosts = await prisma.post.findMany({
    include: { author: true, comments: true },
  });
  return allPosts;
}

export async function getOnePost({ id }: any) {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { author: true, Post: true },
    });
    console.log(post);

    return post;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function createPost({ input }: any) {
  try {
    console.log("[...creating_post...]");
    const { author, content } = input;
    const post = await prisma.post.create({
      data: {
        content,
        author: { connect: { email: author } },
      },
      include: {
        author: true,
      },
    });
    return post;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updatePost({ input }: any) {
  try {
    const { id, content } = input;
    console.log("[...updating_post...]");
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { content },
      include: { author: true },
    });
    return post;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deletePost({ id }: any) {
  try {
    const post = await prisma.post.delete({
      where: { id },
      select: {
        id: true,
      },
    });
    return post;
  } catch (error) {
    console.log(error);
    return error;
  }
}

/* COMMENTS */
export async function createComment({ input }: any) {
  try {
    const { author, content, postId } = input;
    const post = await prisma.post.create({
      data: {
        content,
        author: { connect: { email: author } },
        Post: { connect: { id: Number(postId) } },
      },
    });
    return post;
  } catch (error) {
    console.log(error);
    return error;
  }
}
