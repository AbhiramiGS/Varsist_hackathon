import { faker } from "@faker-js/faker";

import { prisma } from "../index";

import seedAdmins from "./seeds/admin";
// import seedProducts from "./seeds/products";
import seedCategories from "./seeds/categories";
import seedCollections from "./seeds/collection";
import seedComponents from "./seeds/component";
import seedCustomers from "./seeds/customers";
import seedSchemes from "./seeds/schemes";
import seedVendors from "./seeds/vendors";
import seedPincodes from "./seeds/pincodes";
import seedEmployees from "./seeds/employees";

async function main() {
  const count = faker.number.int({
    min: 17,
    max: 20,
  });

  await seedPincodes(prisma);
  await seedEmployees(prisma);
  await seedCustomers(prisma, count);
  await seedCollections(prisma);
  await seedComponents(prisma);
  await seedVendors(prisma, count);
  await seedCategories(prisma);
  await seedSchemes(prisma);
  await seedAdmins(prisma);
}

main()
  .then(() => {
    console.log("Seeding complete ✅");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
