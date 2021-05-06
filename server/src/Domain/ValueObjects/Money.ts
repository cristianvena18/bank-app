import Dinero from "dinero.js";
import { Currency } from "./Currency";

export class Money extends Dinero {
  private amount: string;
  private currency: string;

  constructor(amount: number, currency: Currency) {
    super({ amount, currency: currency.value });
  }

  public getAmount() {
    return this.currency;
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
