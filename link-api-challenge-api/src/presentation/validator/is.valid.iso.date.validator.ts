import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DateValidatorUtil } from './util/date.validator.util';

@ValidatorConstraint({ async: true })
export class IsValidISODateConstraint implements ValidatorConstraintInterface {
  validate(date: string): boolean {
    return DateValidatorUtil.isValidISODate(date);
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} must be a valid ISO date`;
  }
}

export function IsValidISODate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidISODateConstraint,
    });
  };
}
