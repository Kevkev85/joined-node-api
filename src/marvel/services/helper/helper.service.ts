import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ApiSecretsService } from 'src/marvel/api-secrets/api-secrets.service';
import { CollectionQuery } from 'src/marvel/views/queryParams/collectionQuery';
import { Md5 } from 'ts-md5';

@Injectable()
export class HelperService {
  constructor(
    private httpService: HttpService,
    private apiSecrets: ApiSecretsService,
  ) {}

  private BASE_URL = 'https://gateway.marvel.com/v1/public/';

  addMainParamsQuery(intital: string, query: any): string {
    const a = query.orderBy ? `${intital}&orderBy=${query.orderBy}` : intital;
    const b = query.limit ? `${a}&limit=${query.limit}` : a;
    const c = query.offset ? `${b}&offset=${query.offset}` : b;
    return c;
  }

  getById(urlBranch: string, relevantId: number) {
    return this.httpService
      .get(`${this.BASE_URL}${urlBranch}/${relevantId}${this.getToken()}`)
      .pipe(map(x => x.data));
  }

  getCollection(urlBranch: string, query: CollectionQuery) {
    const fieldName = query.fieldName;
    const relevantId = query.relevantId;
    const relevantUrl = `${
      this.BASE_URL
    }${urlBranch}/${relevantId}/${fieldName}${this.getToken()}`;

    const toSend = this.addMainParamsQuery(relevantUrl, query);
    return this.httpService.get(toSend).pipe(map(x => x.data));
  }

  getAuthorizedUrl(urlBranch: string) {
    return `${this.BASE_URL}${urlBranch}${this.getToken()}`;
  }

  getToken(): string {
    const hashed = Md5.hashStr(
      Date.now() + this.apiSecrets.privateKey + this.apiSecrets.publicKey,
    );
    return (
      '?ts=' +
      Date.now() +
      '&apikey=' +
      this.apiSecrets.publicKey +
      '&hash=' +
      hashed
    );
  }
}
