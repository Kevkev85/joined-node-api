import { Controller, Get, Param, Query } from '@nestjs/common';
import { SeriesService } from 'src/marvel/services/series/series.service';
import { CollectionQuery } from 'src/marvel/views/queryParams/collectionQuery';
import { SeriesQueryParams } from 'src/marvel/views/queryParams/seriesQueryParams';

@Controller('series')
export class SeriesController {
  constructor(private seriesService: SeriesService) {}

  @Get('filtered')
  getFilteredSeries(@Query() query: SeriesQueryParams) {
    return this.seriesService.getFilteredSeries(query);
  }

  @Get('byId/:seriesId')
  getById(@Param('seriesId') seriesId: number) {
    return this.seriesService.getSeriesById(seriesId);
  }

  @Get('collection')
  getCollection(@Query() query: CollectionQuery) {
    return this.seriesService.getCollection(query);
  }
}
