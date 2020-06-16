export class MainParams {
  orderBy: string;
  limit: number;
  offset: number;

  constructor(orderBy: string, limit: number, offset: number) {
    this.orderBy = orderBy;
    this.limit = limit;
    this.offset = offset;
  }
}
