import { MainParams } from './mainParams';

export class CollectionQuery extends MainParams {
  fieldName: string;
  relevantId: number;

  constructor(
    orderBy: string,
    limit: number,
    offset: number,
    fieldName: string,
    relevantId: number,
  ) {
    super(orderBy, limit, offset);
    this.fieldName = fieldName;
    this.relevantId = relevantId;
  }
}
