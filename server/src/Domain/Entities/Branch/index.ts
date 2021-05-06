import { BranchId } from "./BranchId";
import { AggregateRoot } from "../../ValueObjects/AggregateRoot";

export class Branch extends AggregateRoot {
  private id: BranchId;

  private constructor(id: BranchId) {
    super();
    this.id = id;
  }

  static fromPrimitives(data: any) {
    return new Branch(new BranchId(data.id));
  }

  getId(): BranchId {
    return this.id;
  }

  getRelations(): string[] {
    return [];
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
    };
  }
}
