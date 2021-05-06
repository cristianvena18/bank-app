import { EntitySchema } from "typeorm";

export type IBank = {
  id: string;
  slug: string;
};

export const BankModel = new EntitySchema<IBank>({
  name: "bank",
  columns: {
    id: {
      type: String,
      primary: true,
    },
    slug: {
      type: String,
    },
  },
});
