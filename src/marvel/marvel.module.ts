import { HttpModule, Module } from '@nestjs/common';
import { ApiSecretsService } from './api-secrets/api-secrets.service';
import { CharacterController } from './controllers/characters/characters.controller';
import { ComicController } from './controllers/comic/comic.controller';
import { CharacterService } from './services/character/character.service';
import { ComicService } from './services/comic/comic.service';
import { HelperService } from './services/helper/helper.service';
import { CreatorsService } from './services/creators/creators.service';
import { CreatorsController } from './controllers/creators/creators.controller';
import { SeriesService } from './services/series/series.service';
import { SeriesController } from './controllers/series/series.controller';
import { StoriesService } from './services/stories/stories.service';
import { StoriesController } from './controllers/stories/stories.controller';

@Module({
  imports: [HttpModule],
  controllers: [CharacterController, ComicController, CreatorsController, SeriesController, StoriesController],
  providers: [CharacterService, HelperService, ComicService, ApiSecretsService, CreatorsService, SeriesService, StoriesService],
})
export class MarvelModule {}
