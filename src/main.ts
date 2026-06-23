import { GameApplication } from '@/app/GameApplication';

const game = new GameApplication();

game
  .init()
  .catch(console.error);
