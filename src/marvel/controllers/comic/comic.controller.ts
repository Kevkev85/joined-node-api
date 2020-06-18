import { Controller, Get, Param, Query } from '@nestjs/common';
import { ComicService } from 'src/marvel/services/comic/comic.service';
import { CollectionQuery } from 'src/marvel/views/queryParams/collectionQuery';
import { ComiqQuery } from 'src/marvel/views/queryParams/comicQueryParam';

@Controller('comic')
export class ComicController {
  constructor(private comicService: ComicService) {}

  @Get('filtered')
  getLine(@Query() query: ComiqQuery) {
    return this.comicService.getFilteredResults(query);
  }

  @Get('byId/:comicId')
  getById(@Param('comicId') comicId: number) {
    return this.comicService.getComicById(comicId);
  }

  @Get('collection')
  getCollection(@Query() query: CollectionQuery) {
    return this.comicService.getCollection(query);
  }
}
