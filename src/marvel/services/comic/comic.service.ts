import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ComiqQuery } from 'src/marvel/views/queryParams/comicQueryParam';
import { HelperService } from '../helper/helper.service';

@Injectable()
export class ComicService {
  constructor(
    private helperService: HelperService,
    private httpService: HttpService,
  ) {}

  private url_branch = 'comics';

  getFilteredResults(query: ComiqQuery) {
    const url = this.getAllQueries(query);
    return this.httpService.get(url).pipe(map(x => x.data));
  }

  getComicById(comicId: number) {
    return this.helperService.getById(this.url_branch, comicId);
  }

  private getAllQueries(query: ComiqQuery) {
    let initial_url = this.helperService.getAuthorizedUrl(this.url_branch);
    const a = query.format
      ? `${initial_url}&format=${query.format}`
      : initial_url;
    const b = query.formatType ? `${a}&formatType=${query.formatType}` : a;
    const c = query.title ? `${b}&title=${query.title}` : b;
    const d = query.titleStartsWith
      ? `${c}&titleStartsWith=${query.titleStartsWith}`
      : c;
    const e = query.startYear ? `${d}&startYear=${query.startYear}` : d;

    return this.helperService.addMainParamsQuery(e, query);
  }
}
