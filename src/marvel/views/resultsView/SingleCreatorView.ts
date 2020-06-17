export class SingleCreatorView {
  id: number;
  firstName: string;
  lastName: string;
  modified: Date;
  thumbnail: string;
  marvelUrl: string;

  constructor(data: any) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.modified = data.modified;
    this.marvelUrl = data.urls[0].url;
    this.thumbnail =
      data.thumbnail.path + '/portrait_small.' + data.thumbnail.extension;
  }
}
