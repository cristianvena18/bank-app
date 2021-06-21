import masker from 'mask-json';

export class Masker {
  public static format() {
    const mask = masker([
      'authorization',
      "card_number",
      "pin",
      "password",
      "new_password",
      "cvv",
      "cbu",
      "last_card_numbers",
    ], { replacement: '**** MASKED ****' });
    return {
      transform: (info: any) => mask(info),
    }
  }
}