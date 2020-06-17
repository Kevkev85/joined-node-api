import { MainParams } from './mainParams';

export class SeriesQueryParams extends MainParams {
  title: string;
  titleStartsWith: string;

  constructor(
    orderBy: string,
    limit: number,
    offset: number,
    title: string,
    titleStartsWith: string,
  ) {
    super(orderBy, limit, offset);
    this.title = title;
    this.titleStartsWith = titleStartsWith;
  }
}
