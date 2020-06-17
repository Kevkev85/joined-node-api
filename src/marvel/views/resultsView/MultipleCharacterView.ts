import { SingleCharacterView } from './SingleCharacterView';

export class MultipleCharacterView {
  offset: number;
  limit: number;
  total: number;
  count: number;
  listOfCharacters: SingleCharacterView[];

  constructor(payload: any) {
    const data = payload.data;
    this.offset = data.offset;
    this.limit = data.limit;
    this.total = data.total;
    this.count = data.count;
    this.listOfCharacters = data.results.map(
      each => new SingleCharacterView(each),
    );
  }
}
