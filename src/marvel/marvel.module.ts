import { HttpModule, Module } from '@nestjs/common';
import { CharacterController } from './controllers/characters/characters.controller';
import { CharacterService } from './services/character/character.service';
import { AuthTokenService } from './services/auth-token/auth-token.service';
import { HelperService } from './services/helper/helper.service';
import { ComicController } from './controllers/comic/comic.controller';
import { ComicService } from './services/comic/comic.service';

@Module({
  imports: [HttpModule],
  controllers: [CharacterController, ComicController],
  providers: [CharacterService, AuthTokenService, HelperService, ComicService],
})
export class MarvelModule {}
