import { Test, TestingModule } from '@nestjs/testing';
import { CreatorsController } from './creators.controller';

describe('Creators Controller', () => {
  let controller: CreatorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreatorsController],
    }).compile();

    controller = module.get<CreatorsController>(CreatorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
