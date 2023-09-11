import prisma from "@/utils/prisma";

const user = await prisma.user.create({
  data: {
    email: "bob.rufus@prisma.io",
    name: "Bob Rufus",
    Post: {
      create: [
        { title: "Working at Prisma" },
        { title: "All about databases" },
      ],
    },
  },
});
