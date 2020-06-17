import { Controller, Get, Param } from '@nestjs/common';
import { StoriesService } from 'src/marvel/services/stories/stories.service';

@Controller('stories')
export class StoriesController {
  constructor(private storiesService: StoriesService) {}

  @Get('byId/:storiesId')
  getById(@Param('storiesId') storiesId: number) {
    return this.storiesService.getById(storiesId);
  }
}
