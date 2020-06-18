import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CharacterQueryParams } from 'src/marvel/views/queryParams/characterQueryParams';
import { CollectionQuery } from 'src/marvel/views/queryParams/collectionQuery';
import { MultipleCharacterView } from 'src/marvel/views/resultsView/MultipleCharacterView';
import { SingleCharacterView } from 'src/marvel/views/resultsView/SingleCharacterView';
import { HelperService } from '../helper/helper.service';

@Injectable()
export class CharacterService {
  constructor(
    private helperService: HelperService,
    private httpService: HttpService,
  ) {}

  private url_branch = 'characters';

  getById(charId: number) {
    return this.helperService
      .getById(this.url_branch, charId)
      .pipe(map(result => new SingleCharacterView(result.data.results[0])));
  }

  getFilteredCharacterResults(query: CharacterQueryParams) {
    const url = this.getAllQueries(query);
    return this.httpService.get(url).pipe(
      map(x => new MultipleCharacterView(x.data)),
      catchError(e =>
        throwError(new HttpException(e.message, e.response.status)),
      ),
    );
  }

  getCollection(query: CollectionQuery) {
    return this.helperService.getCollection(this.url_branch, query);
  }

  private getAllQueries(query: CharacterQueryParams) {
    let initial_url = this.helperService.getAuthorizedUrl(this.url_branch);
    const a = query.name ? `${initial_url}&name=${query.name}` : initial_url;
    const b = query.nameStartsWith
      ? `${a}&nameStartsWith=${query.nameStartsWith}`
      : a;

    return this.helperService.addMainParamsQuery(b, query);
  }
}
