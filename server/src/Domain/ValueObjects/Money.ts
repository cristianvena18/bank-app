import Dinero from "dinero.js";
import { Currency } from "./Currency";

export class Money {
  private amount: string;
  private currency: Currency;

  constructor(amount: number, currency: Currency) {
    // super({ amount, currency: currency.value });
    this.currency = currency;
    this.amount = String(amount);
  }

  public getAmount() {
    return this.amount;
  }

  public isGreaterThanOrEquals(amount: Money) {
    const comparators = Dinero.normalizePrecision([
      Dinero(this.toPrimitives()),
      Dinero(amount.toPrimitives())
    ])

    return comparators[0].getAmount() >= comparators[1].getAmount()
  }

  public substract(amount: Money): Money {
    return new Money(Dinero(this.toPrimitives()).subtract(Dinero(amount.toPrimitives())).getAmount(), this.currency);
  }

  public add(amount: Money): Money {
    return new Money(Dinero(this.toPrimitives()).add(Dinero(amount.toPrimitives())).getAmount(), this.currency);
  }

  public toPrimitives(): Object {
    return {
      amount: Number(this.amount),
      currency: this.currency.value
    }
  }

  public getCurrency() {
    return this.currency;
  }

  public static ARS(amount: string) {
    return new Money(Number(amount), new Currency(Currency.VALID_VALUES.ARS));
  }

  public static USD(amount: string) {
    return new Money(Number(amount), new Currency(Currency.VALID_VALUES.USD));
  }

  public static EUR(amount: string) {
    return new Money(Number(amount), new Currency(Currency.VALID_VALUES.EUR));
  }
}
