import { HttpModule, Module } from '@nestjs/common';
import { ApiSecretsService } from './api-secrets/api-secrets.service';
import { CharacterController } from './controllers/characters/characters.controller';
import { ComicController } from './controllers/comic/comic.controller';
import { CreatorsController } from './controllers/creators/creators.controller';
import { SeriesController } from './controllers/series/series.controller';
import { CharacterService } from './services/character/character.service';
import { ComicService } from './services/comic/comic.service';
import { CreatorsService } from './services/creators/creators.service';
import { HelperService } from './services/helper/helper.service';
import { SeriesService } from './services/series/series.service';

@Module({
  imports: [HttpModule],
  controllers: [
    CharacterController,
    ComicController,
    CreatorsController,
    SeriesController,
  ],
  providers: [
    CharacterService,
    HelperService,
    ComicService,
    ApiSecretsService,
    CreatorsService,
    SeriesService,
  ],
})
export class MarvelModule {}
