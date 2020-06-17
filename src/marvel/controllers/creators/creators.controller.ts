import { Controller, Get, Param, Query } from '@nestjs/common';
import { CreatorsService } from 'src/marvel/services/creators/creators.service';
import { CollectionQuery } from 'src/marvel/views/queryParams/collectionQuery';
import { CreatorQueryParams } from 'src/marvel/views/queryParams/creatorQueryParams';

@Controller('creators')
export class CreatorsController {
  constructor(private creatorsService: CreatorsService) {}

  @Get('filtered')
  getFilteredCreators(@Query() query: CreatorQueryParams) {
    return this.creatorsService.getFilteredResults(query);
  }

  @Get('byId/:creatorId')
  getById(@Param('creatorId') creatorId: number) {
    return this.creatorsService.getCreatorById(creatorId);
  }

  @Get('collection')
  getCollection(@Query() query: CollectionQuery) {
    return this.creatorsService.getCollection(query);
  }
}
