import { MainParams } from './mainParams';

export class ComiqQuery extends MainParams {
  format: string;
  formatType: string;
  title: string;
  titleStartsWith: string;
  startYear: number;
  constructor(
    orderBy: string,
    limit: number,
    offset: number,
    format: string,
    formatType: string,
    title: string,
    titleStartsWith: string,
    startYear: number,
  ) {
    super(orderBy, limit, offset);
    this.format = format;
    this.formatType = formatType;
    this.title = title;
    this.titleStartsWith = titleStartsWith;
    this.startYear = startYear;
  }
}
