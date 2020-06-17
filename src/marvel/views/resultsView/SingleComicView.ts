export class SingleComicView {
  id: number;
  title: string;
  issueNumber: number;
  description: string;
  modified: Date;
  isbn: string;
  format: string;
  pageCount: number;
  marvelUrl: string;
  onSaleDate: Date;
  printPrice: number;
  thumbnail: string;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.issueNumber = data.issueNumber;
    this.description = data.description;
    this.modified = data.modified;
    this.isbn = data.isbn;
    this.format = data.format;
    this.pageCount = data.pageCount;
    this.marvelUrl = data.urls[0].url;
    this.onSaleDate = data.dates[0].date;
    this.printPrice = data.prices[0].price;
    this.thumbnail =
      data.thumbnail.path + '/portrait_small.' + data.thumbnail.extension;
  }
}
