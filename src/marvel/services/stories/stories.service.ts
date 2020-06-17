import { HttpService, Injectable } from '@nestjs/common';
import { HelperService } from '../helper/helper.service';

@Injectable()
export class StoriesService {
  constructor(
    private httpService: HttpService,
    private helperService: HelperService,
  ) {}

  private url_branch = 'stories';

  getById(storiesId: number) {
    return this.helperService.getById(this.url_branch, storiesId);
  }
}
