import { AggregateRoot } from "../../ValueObjects/AggregateRoot";
import { BankId } from "./BankId";
import { BankSlug } from "./BankSlug";

export class Bank extends AggregateRoot {
  private id: BankId;
  private slug: BankSlug;
  private constructor(id: BankId, slug: BankSlug) {
    super();
    this.id = id;
    this.slug = slug;
  }

  public getSlug() {
    return this.slug;
  }

  public static fromPrimitives(data: any) {
    return new Bank(new BankId(data.id), new BankSlug(data.slug));
  }

  public toPrimitives(): any {
    return {
      id: this.id.toString(),
      slug: this.slug.value,
    };
  }
}
