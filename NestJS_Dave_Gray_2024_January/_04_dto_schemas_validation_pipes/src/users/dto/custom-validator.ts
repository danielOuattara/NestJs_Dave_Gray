import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ROLE } from './create-user.dto';

@ValidatorConstraint({ name: 'IsValidRole', async: false })
export class IsValidRole implements ValidatorConstraintInterface {
  validate(value: ROLE /*, args: ValidationArguments */) {
    const roles = Object.values(ROLE);
    return roles.includes(value);
  }

  defaultMessage(args: ValidationArguments) {
    // const roles = Object.values(ROLE).join(' or ');
    return `${args.value} is not a valid role. `;
  }
}
