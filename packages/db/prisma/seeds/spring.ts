import type { PrismaClient } from "@prisma/client";

export default async function seedSprings(prisma: PrismaClient) {
  const azhagar = await prisma.springShed.create({
    data: {
      name: "Alagar hills springshed",
      state: "Tamil Nadu",
    },
  });

  const nagamalai = await prisma.springShed.create({
    data: {
      name: "Nagamalai Springshed",
      state: "Tamil Nadu",
    },
  });

  const kodaikanal = await prisma.springShed.create({
    data: {
      name: "Kodaikanal springshed",
      state: "Tamil Nadu",
    },
  });

  const nilgiris = await prisma.springShed.create({
    data: {
      name: "Nilgiris Springshed",
      state: "Tamil Nadu",
    },
  });

  const springshed1 = await prisma.springShed.create({
    data: {
      name: "Springshed 1",
      state: "Odisha",
    },
  });

  const springshed2 = await prisma.springShed.create({
    data: {
      name: "Springshed 2",
      state: "Uttarakhand",
    },
  });

  const springshed3 = await prisma.springShed.create({
    data: {
      name: "Springshed 3",
      state: "Odisha",
    },
  });

  const springshed4 = await prisma.springShed.create({
    data: {
      name: "Springshed 4",
      state: "Odisha",
    },
  });

  console.log(
    "Seeded springsheds",
    azhagar,
    nagamalai,
    kodaikanal,
    nilgiris,
    springshed1,
    springshed2,
    springshed3,
    springshed4,
  );
}
