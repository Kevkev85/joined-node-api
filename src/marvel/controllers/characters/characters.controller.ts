import { Controller, Get, Param, Query } from '@nestjs/common';
import { CharacterService } from 'src/marvel/services/character/character.service';
import { CharacterQueryParams } from 'src/marvel/views/queryParams/characterQueryParams';
import { CollectionQuery } from 'src/marvel/views/queryParams/collectionQuery';

@Controller('characters')
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @Get('filtered')
  getFilteredCharacters(@Query() query: CharacterQueryParams) {
    return this.characterService.getFilteredCharacterResults(query);
  }

  @Get('byId/:charId')
  getById(@Param('charId') charId: number) {
    return this.characterService.getById(charId);
  }

  @Get('info')
  getCollection(@Query() query: CollectionQuery) {
    return this.characterService.getCollection(query);
  }
}
