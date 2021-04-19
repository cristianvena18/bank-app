import {EmployeeId} from "./EmployeeId";
import {AggregateRoot} from "../../ValueObjects/AggregateRoot";

export class Employee extends AggregateRoot {
    private id: EmployeeId;

    private constructor(id: EmployeeId) {
        super();
        this.id = id;
    }

    public getId(): EmployeeId {
        return this.id;
    }

    static fromPrimitives(data: any) {
        return new Employee(
            new EmployeeId(data.id)
        );
    }

    getRelations(): string[] {
        return [];
    }

    toPrimitives(): any {
        return {
            id: this.id.value,
        }
    }
}
