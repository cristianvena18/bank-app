import ApplicationException from "./ApplicationException";

export default class EmailAlreadyExist extends ApplicationException {
  public constructor(message: string = "Email Already exist") {
    const errorMessage = {
      errors: {
        email: {
          message,
          field: "email",
        },
      },
    };

    super(EmailAlreadyExist.name, JSON.stringify(errorMessage));
  }
}
