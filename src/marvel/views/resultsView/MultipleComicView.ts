import { SingleComicView } from './SingleComicView';

export class MultipleComicView {
  offset: number;
  limit: number;
  total: number;
  count: number;
  listOfComics: SingleComicView[];

  constructor(payload: any) {
    const data = payload.data;
    this.offset = data.offset;
    this.limit = data.limit;
    this.total = data.total;
    this.count = data.count;
    this.listOfComics = data.results.map(each => new SingleComicView(each));
  }
}
