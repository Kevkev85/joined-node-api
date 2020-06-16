import { HttpModule, Module } from '@nestjs/common';
import { ApiSecretsService } from './api-secrets/api-secrets.service';
import { CharacterController } from './controllers/characters/characters.controller';
import { ComicController } from './controllers/comic/comic.controller';
import { CharacterService } from './services/character/character.service';
import { ComicService } from './services/comic/comic.service';
import { HelperService } from './services/helper/helper.service';

@Module({
  imports: [HttpModule],
  controllers: [CharacterController, ComicController],
  providers: [CharacterService, HelperService, ComicService, ApiSecretsService],
})
export class MarvelModule {}
