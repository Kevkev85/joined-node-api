export class SingleCharacterView {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  modified: Date;
  marvelUrl: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.modified = data.modified;
    this.thumbnail =
      data.thumbnail.path + '/portrait_small.' + data.thumbnail.extension;
    this.marvelUrl = data.urls[0].url;
  }
}
