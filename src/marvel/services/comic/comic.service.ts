import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CollectionQuery } from 'src/marvel/views/queryParams/collectionQuery';
import { ComiqQuery } from 'src/marvel/views/queryParams/comicQueryParam';
import { MultipleComicView } from 'src/marvel/views/resultsView/MultipleComicView';
import { SingleComicView } from 'src/marvel/views/resultsView/SingleComicView';
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
    return this.httpService.get(url).pipe(
      map(x => new MultipleComicView(x.data)),
      catchError(e =>
        throwError(new HttpException(e.message, e.response.status)),
      ),
    );
  }

  getComicById(comicId: number) {
    return this.helperService
      .getById(this.url_branch, comicId)
      .pipe(map(result => new SingleComicView(result.data.results[0])));
  }

  getCollection(query: CollectionQuery) {
    return this.helperService.getCollection(this.url_branch, query);
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
