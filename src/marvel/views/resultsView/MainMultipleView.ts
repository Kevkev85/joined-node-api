export class MainMultipleView {
  offset: number;
  limit: number;
  total: number;
  count: number;

  constructor(offset: number, limit: number, total: number, count: number) {
    this.offset = offset;
    this.limit = limit;
    this.total = total;
    this.count = count;
  }
}
