import { MainParams } from './mainParams';

export class CharacterQueryParams extends MainParams {
  name: string;
  nameStartsWith: string;

  constructor(
    orderBy: string,
    limit: number,
    offset: number,
    name: string,
    nameStartsWith: string,
  ) {
    super(orderBy, limit, offset);
    this.name = name;
    this.nameStartsWith = nameStartsWith;
  }
}
