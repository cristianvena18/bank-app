import { NextFunction, Request, Response } from "express";
import NotFoundException from "../../Presentation/Http/Exceptions/NotFoundException";
import InternalErrorException from "../../Presentation/Http/Exceptions/InternalErrorException";
import BadRequestException from "../../Presentation/Http/Exceptions/BadRequestException";
import AuthorizationException from "../../Presentation/Http/Exceptions/AuthorizationException";
import UnprocessableEntityException from "../../Presentation/Http/Exceptions/UnprocessableEntityException";
import AuthenticationException from "../../Presentation/Http/Exceptions/AuthenticationException";
import ForeignKeyConstraintException from "../../Presentation/Http/Exceptions/ForeignKeyConstraintException";

import { error } from "./customResponse";
import { HTTP_CODES } from "../../Presentation/Http/Enums/HttpCodes";
import { codeErrors } from "../../Presentation/Http/Validations/Utils/ErrorMessages";
import DIContainer from "../DI/di.config";
import { LoggerService } from "../../Domain/Interfaces/Services/LoggerService";
import { LogLevels } from "../../Domain/Enums/LogLevels";
import { INTERFACES } from "../DI/interfaces.types";

import EntityNotFoundException from "../../Application/Exceptions/EntityNotFoundException";
import ValidationException from "../../Application/Exceptions/ValidationException";
import AuthorizationFailed from "../../Application/Exceptions/AuthorizationFailed";
import AuthenticationFailed from "../../Application/Exceptions/AuthenticationFailed";
import ForeignKeyConstraintFailed from "../../Application/Exceptions/ForeignKeyConstraintFailed";
import RelatedEntitiesConstraintFailed from "../../Application/Exceptions/RelatedEntitiesConstraintFailed";
import CannotPasswordMatch from "../../Application/Exceptions/CannotPasswordMatch";
import EmailAlreadyExist from "../../Application/Exceptions/EmailAlreadyExist";

const reportExceptions = (constructor) => {
  let list = [
    InternalErrorException.name,
    AuthorizationException.name,
    AuthenticationException.name,
  ];
  return list.includes(constructor);
};

export const logErrors = (
  e: any,
  _request: Request,
  _response: Response,
  next: NextFunction
) => {
  const logger = DIContainer.get<LoggerService>(INTERFACES.LoggerService);

  if (reportExceptions(e.name)) {
    logger.report(LogLevels.ERROR, e.stack);
  } else {
    logger.log(LogLevels.ERROR, e.stack);
  }

  return next(e);
};

export const mapApplicationToHTTPErrors = async (
  e: any,
  _request: Request,
  _response: Response,
  next: NextFunction
) => {
  switch (e.constructor) {
    case EntityNotFoundException:
      e = new NotFoundException(
        e.message,
        HTTP_CODES.NOT_FOUND,
        codeErrors.HTTP.NOT_FOUND.code,
        codeErrors.HTTP.NOT_FOUND.href
      );
      return next(e);
    case ValidationException:
      if (JSON.parse(e.message).type === "BadRequestException") {
        e = new BadRequestException(
          e.message,
          HTTP_CODES.BAD_REQUEST,
          codeErrors.HTTP.BAD_REQUEST.code,
          codeErrors.HTTP.BAD_REQUEST.href
        );
        return next(e);
      }
      e = new UnprocessableEntityException(
        e.message,
        HTTP_CODES.UNPROCESSABLE_ENTITY,
        codeErrors.HTTP.UNPROCESSABLE_ENTITY.code,
        codeErrors.HTTP.UNPROCESSABLE_ENTITY.href
      );
      return next(e);
    case AuthorizationFailed:
      e = new AuthorizationException(
        e.message,
        HTTP_CODES.UNAUTHORIZED,
        codeErrors.HTTP.UNAUTHORIZED.code,
        codeErrors.HTTP.UNAUTHORIZED.href
      );
      return next(e);
    case CannotPasswordMatch:
      e = new AuthorizationException(
        e.message,
        HTTP_CODES.BAD_REQUEST,
        codeErrors.HTTP.BAD_REQUEST.code,
        codeErrors.HTTP.BAD_REQUEST.href
      );
      return next(e);
    case EmailAlreadyExist:
      e = new BadRequestException(
        e.message,
        HTTP_CODES.BAD_REQUEST,
        codeErrors.HTTP.BAD_REQUEST.code,
        codeErrors.HTTP.BAD_REQUEST.href
      );
      return next(e);
    case AuthenticationFailed:
      e = new AuthenticationException(
        e.message,
        HTTP_CODES.FORBIDDEN,
        codeErrors.HTTP.FORBIDDEN.code,
        codeErrors.HTTP.FORBIDDEN.href
      );
      return next(e);
    case ForeignKeyConstraintFailed:
      e = new ForeignKeyConstraintException(
        e.message,
        HTTP_CODES.CONFLICT,
        codeErrors.HTTP.FOREIGN_KEY_CONSTRAINT_ERROR.code,
        codeErrors.HTTP.FOREIGN_KEY_CONSTRAINT_ERROR.href
      );
      return next(e);
    default:
      e = new InternalErrorException(
        e.message,
        HTTP_CODES.INTERNAL_ERROR,
        codeErrors.HTTP.INTERNAL_ERROR.code,
        codeErrors.HTTP.INTERNAL_ERROR.href
      );
      return next(e);
  }
};

export const execute = async (
  e: any,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  try {
    return response
      .status(e.status)
      .json(error(e.name, JSON.parse(e.message), e.type, e.href));
  } catch (e) {
    return response.status(500).json(
      error(
        e.name,
        JSON.parse(
          JSON.stringify({
            errors: {
              default: { field: "default", message: "default" },
            },
          })
        ),
        e.type,
        e.href
      )
    );
  }
};
