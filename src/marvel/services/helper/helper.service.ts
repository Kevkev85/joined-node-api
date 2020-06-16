import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { AuthTokenService } from '../auth-token/auth-token.service';

@Injectable()
export class HelperService {
  constructor(
    private authTokenService: AuthTokenService,
    private httpService: HttpService,
  ) {}

  private BASE_URL = 'https://gateway.marvel.com/v1/public/';

  placeLimit(originalUrl: string, limit: number): string {
    return `${originalUrl}&limit=${limit}`;
  }

  skipOffSet(originalUrl: string, offset: number): string {
    return `${originalUrl}&offset=${offset}`;
  }

  addMainParamsQuery(intital: string, query: any): string {
    const a = query.orderBy ? `${intital}&orderBy=${query.orderBy}` : intital;
    const b = query.limit ? `${a}&limit=${query.limit}` : a;
    const c = query.offset ? `${b}&offset=${query.offset}` : b;
    return c;
  }

  getById(urlBranch: string, relevantId: number) {
    return this.httpService
      .get(
        `${
          this.BASE_URL
        }${urlBranch}/${relevantId}${this.authTokenService.getToken()}`,
      )
      .pipe(map(x => x.data));
  }

  getCollection(urlBranch: string, fieldName: string, relevantId: number) {
    const relevantUrl = `https://gateway.marvel.com/v1/public/${urlBranch}/${relevantId}/${fieldName}${this.authTokenService.getToken()}`;
    return this.httpService.get(relevantUrl).pipe(map(x => x.data));
  }
}
