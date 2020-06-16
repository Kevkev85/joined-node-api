import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SingleCharacterInfo } from 'src/marvel/views/characters/SingleCharacter';
import { AuthTokenService } from '../auth-token/auth-token.service';
import { HelperService } from '../helper/helper.service';

@Injectable()
export class CharacterService {
  constructor(
    private helperService: HelperService,
    private httpService: HttpService,
    private authTokenService: AuthTokenService,
  ) {}

  private CHARACTER_URL = `https://gateway.marvel.com/v1/public/characters${this.authTokenService.getToken()}`;
  private STARTSWITH_URL = `${this.CHARACTER_URL}&nameStartsWith=`;
  private NAMES_URL = `${this.CHARACTER_URL}&name=`;

  getByNameStartsWith(nameStartsWith: string) {
    return this.covertToCharacterList(
      this.httpService.get(`${this.STARTSWITH_URL}${nameStartsWith}`),
    );
  }

  getNSWOffset(offset: number, nameStartsWith: string) {
    return this.covertToCharacterList(
      this.httpService.get(
        this.helperService.skipOffSet(
          `${this.STARTSWITH_URL}${nameStartsWith}`,
          offset,
        ),
      ),
    );
  }

  getByName(name: string) {
    return this.covertToCharacterList(
      this.httpService.get(`${this.NAMES_URL}${name}`),
    );
  }

  getById(charId: number) {
    return this.httpService
      .get(
        `https://gateway.marvel.com/v1/public/characters/${charId}${this.authTokenService.getToken()}`,
      )
      .pipe(
        map(x => {
          const result = x.data;
          const dataTosend = new SingleCharacterInfo(result);

          return x.data;
          //return dataTosend;
        }),
      );
  }

  getCollection(fieldName: string, charId: number) {
    return this.httpService
      .get(this.getListOfCollectionURL(fieldName, charId))
      .pipe(map(x => x.data));
  }

  private getListOfCollectionURL(fieldName: string, charId: number) {
    return `https://gateway.marvel.com/v1/public/characters/${charId}/${fieldName}${this.authTokenService.getToken()}`;
  }

  private covertToCharacterList(obs: Observable<any>) {
    return obs.pipe(
      map(x => {
        const all = x.data.data.results;
        const total$ = x.data.data.total;
        const count$ = x.data.data.count;
        const limit$ = x.data.data.limit;

        const resul = all.map(each => ({
          id: each.id,
          name: each.name,
        }));

        return {
          total: total$,
          count: count$,
          limit: limit$,
          result: resul,
        };
      }),
      catchError(e => {
        return throwError(new HttpException(e.message, e.response.status));
      }),
    );
  }
}
