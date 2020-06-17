export class SingleSeriesView {
  id: number;
  title: string;
  description: string;
  startYear: number;
  endYear: number;
  modified: Date;
  thumbnail: string;
  rating: string;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.startYear = data.startYear;
    this.endYear = data.endYear;
    this.modified = data.modified;
    this.thumbnail =
      data.thumbnail.path + '/portrait_small.' + data.thumbnail.extension;
    this.rating = data.rating;
  }
}
