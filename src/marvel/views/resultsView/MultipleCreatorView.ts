import { SingleCreatorView } from './SingleCreatorView';

export class MultipleCreatorView {
  offset: number;
  limit: number;
  total: number;
  count: number;
  listOfCreators: SingleCreatorView[];

  constructor(payload: any) {
    const data = payload.data;
    this.offset = data.offset;
    this.limit = data.limit;
    this.total = data.total;
    this.count = data.count;
    this.listOfCreators = data.results.map(each => new SingleCreatorView(each));
  }
}
