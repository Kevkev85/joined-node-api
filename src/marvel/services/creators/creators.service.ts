import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { CollectionQuery } from 'src/marvel/views/queryParams/collectionQuery';
import { CreatorQueryParams } from 'src/marvel/views/queryParams/creatorQueryParams';
import { HelperService } from '../helper/helper.service';

@Injectable()
export class CreatorsService {
  constructor(
    private helperService: HelperService,
    private httpService: HttpService,
  ) {}

  private url_branch = 'creators';

  getCreatorById(creatorId: number) {
    return this.helperService.getById(this.url_branch, creatorId);
  }

  getFilteredResults(query: CreatorQueryParams) {
    const url = this.getAllQueries(query);
    return this.httpService.get(url).pipe(map(x => x.data));
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
