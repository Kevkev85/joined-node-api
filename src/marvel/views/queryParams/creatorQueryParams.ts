import { MainParams } from './mainParams';

export class CreatorQueryParams extends MainParams {
  firstName: string;
  lastName: string;
  firstNameStartsWith: string;
  lastNameStartsWith: string;

  constructor(
    orderBy: string,
    limit: number,
    offset: number,
    firstName: string,
    lastName: string,
    firstNameStartsWith: string,
    lastNameStartsWith: string,
  ) {
    super(orderBy, limit, offset);
    this.firstName = firstName;
    this.lastName = lastName;
    this.firstNameStartsWith = firstNameStartsWith;
    this.lastNameStartsWith = lastNameStartsWith;
  }
}
