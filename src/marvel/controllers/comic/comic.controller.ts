import { Controller, Get, HttpService, Param, Query } from '@nestjs/common';
import { ComicService } from 'src/marvel/services/comic/comic.service';
import { ComiqQuery } from 'src/marvel/views/queryParams/comicQueryParam';

@Controller('comic')
export class ComicController {
  constructor(
    private comicService: ComicService,
    private httpService: HttpService,
  ) {}

  @Get('1')
  getLine(@Query() query: ComiqQuery) {
    return this.comicService.getFilteredResults(query);
  }

  @Get('byId/:comicId')
  getById(@Param('comicId') comicId: number) {
    return this.comicService.getComicById(comicId);
  }
}
