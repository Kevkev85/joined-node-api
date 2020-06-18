import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CollectionQuery } from 'src/marvel/views/queryParams/collectionQuery';
import { SeriesQueryParams } from 'src/marvel/views/queryParams/seriesQueryParams';
import { MultiSeriesView } from 'src/marvel/views/resultsView/MultiSeriesView';
import { SingleSeriesView } from 'src/marvel/views/resultsView/SingleSeriesView';
import { HelperService } from '../helper/helper.service';

@Injectable()
export class SeriesService {
  constructor(
    private helperService: HelperService,
    private httpService: HttpService,
  ) {}

  private url_branch = 'series';

  getCollection(query: CollectionQuery) {
    return this.helperService.getCollection(this.url_branch, query);
  }

  getSeriesById(seriesId: number) {
    return this.helperService
      .getById(this.url_branch, seriesId)
      .pipe(map(result => new SingleSeriesView(result.data.results[0])));
  }

  getFilteredSeries(query: SeriesQueryParams) {
    const url = this.getAllQueries(query);
    return this.httpService.get(url).pipe(
      map(x => new MultiSeriesView(x.data)),
      catchError(e =>
        throwError(new HttpException(e.message, e.response.status)),
      ),
    );
  }

  private getAllQueries(query: SeriesQueryParams) {
    let initial_url = this.helperService.getAuthorizedUrl(this.url_branch);

    const a = query.title ? `${initial_url}&title=${query.title}` : initial_url;
    const b = query.titleStartsWith
      ? `${a}&titleStartsWith=${query.titleStartsWith}`
      : a;

    return this.helperService.addMainParamsQuery(b, query);
  }
}
