import { SingleSeriesView } from './SingleSeriesView';

export class MultiSeriesView {
  offset: number;
  limit: number;
  total: number;
  count: number;
  listOfSeries: SingleSeriesView[];

  constructor(payload: any) {
    const data = payload.data;
    this.offset = data.offset;
    this.limit = data.limit;
    this.total = data.total;
    this.count = data.count;
    this.listOfSeries = data.results.map(each => new SingleSeriesView(each));
  }
}
