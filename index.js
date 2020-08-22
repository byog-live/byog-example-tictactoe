import './style.css';

import game from '@byog/sdk';
import gameDef from './game.js';
import {setup, draw} from './ui.js';

game.handlePush = ({event, payload}) => {
  switch (event) {
    case 'join':
      break;
    default:
      state[event] = payload;
      draw();
  }
}

setup(game);
draw(game);

game.dev(gameDef, true);
