import { ResourseUriName } from '../resourseUriName';

export class SingleCharacterInfo {
  name?: string;
  description?: string;
  thumbnail?: string;
  comics?: {
    available?: number;
    items?: ResourseUriName[];
  };

  series?: {
    available: number;
    items: ResourseUriName[];
  };

  stories?: {
    available: number;
    items: ResourseUriName[];
  };

  events?: {
    available: number;
    items: ResourseUriName[];
  };

  constructor(result: any) {
    const innerData = result.data.results[0];
    this.name = innerData.name;
    this.description = innerData.description;
    this.thumbnail =
      innerData.thumbnail.path +
      '/portrait_small.' +
      innerData.thumbnail.extension;
    this.comics = {
      available: innerData.comics.available,
      items: innerData.comics.items.map(x => ({
        resourceId: this.getId(x.resourceURI),
        name: x.name,
      })),
    };

    this.series = {
      available: innerData.series.available,
      items: innerData.series.items.map(x => ({
        resourceId: this.getId(x.resourceURI),
        name: x.name,
      })),
    };

    this.stories = {
      available: innerData.stories.available,
      items: innerData.stories.items.map(x => ({
        resourceId: this.getId(x.resourceURI),
        name: x.name,
        type: x.type,
      })),
    };

    this.events = {
      available: innerData.events.available,
      items: innerData.events.items.map(x => ({
        resourceId: this.getId(x.resourceURI),
        name: x.name,
      })),
    };
  }

  private getId(uri: string) {
    const n = uri.lastIndexOf('/');
    return parseInt(uri.substring(n + 1));
  }
}
