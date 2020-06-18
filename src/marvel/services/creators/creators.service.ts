import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CollectionQuery } from 'src/marvel/views/queryParams/collectionQuery';
import { CreatorQueryParams } from 'src/marvel/views/queryParams/creatorQueryParams';
import { MultipleCreatorView } from 'src/marvel/views/resultsView/MultipleCreatorView';
import { SingleCreatorView } from 'src/marvel/views/resultsView/SingleCreatorView';
import { HelperService } from '../helper/helper.service';

@Injectable()
export class CreatorsService {
  constructor(
    private helperService: HelperService,
    private httpService: HttpService,
  ) {}

  private url_branch = 'creators';

  getCreatorById(creatorId: number) {
    return this.helperService
      .getById(this.url_branch, creatorId)
      .pipe(map(result => new SingleCreatorView(result.data.results[0])));
  }

  getFilteredResults(query: CreatorQueryParams) {
    const url = this.getAllQueries(query);
    return this.httpService.get(url).pipe(
      map(x => new MultipleCreatorView(x.data)),
      catchError(e =>
        throwError(new HttpException(e.message, e.response.status)),
      ),
    );
  }

  getCollection(query: CollectionQuery) {
    return this.helperService.getCollection(this.url_branch, query);
  }

  private getAllQueries(query: CreatorQueryParams) {
    let initial_url = this.helperService.getAuthorizedUrl(this.url_branch);
    const a = query.firstName
      ? `${initial_url}&firstName=${query.firstName}`
      : initial_url;
    const b = query.lastName ? `${a}&lastName=${query.lastName}` : a;
    const c = query.firstNameStartsWith
      ? `${b}&firstNameStartsWith=${query.firstNameStartsWith}`
      : b;
    const d = query.lastNameStartsWith
      ? `${c}&lastNameStartsWith=${query.lastNameStartsWith}`
      : c;

    return this.helperService.addMainParamsQuery(d, query);
  }
}
