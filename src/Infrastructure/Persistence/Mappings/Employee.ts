import { EntitySchema } from "typeorm";

export interface EmployeeDTO {
  id: string;
}

export const EmployeeModel = new EntitySchema<EmployeeDTO>({
  name: "employees",
  columns: {
    id: {
      type: String,
      primary: true,
    },
  },
});
