import { EntitySchema } from "typeorm";
import { AccountDTO } from "./Account";

export interface TransferDTO {
    id: string;
    sourceAccount: AccountDTO;
    destinationAccount: AccountDTO,
    amount: string;
    currency: string;
    date: Date;
}

export const TransferModel = new EntitySchema<TransferDTO>({
    name: "transfers",
    columns: {
        id: {
            type: String,
            primary: true,
        },
        amount: {
            type: String,
        },
        currency: {
            type: String,
        },
        date: {
            type: Date,
        }
    },
    relations: {
        sourceAccount: {
            type: "many-to-one",
            target: "accounts",
            joinColumn: true,
        },
        destinationAccount: {
            type: "many-to-one",
            target: "accounts",
            joinColumn: true,
        },
    },
});
