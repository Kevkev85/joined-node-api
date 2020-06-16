import { Injectable } from '@nestjs/common';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class AuthTokenService {
  private publicKey = 'cf0309d00475d9de464f92673d5728ca';
  private privateKey = '053293a31525e100e382f98a59dbe96a55975faa';

  getToken(): string {
    const hashed = Md5.hashStr(Date.now() + this.privateKey + this.publicKey);
    return (
      '?ts=' + Date.now() + '&apikey=' + this.publicKey + '&hash=' + hashed
    );
  }
}
