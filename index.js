import './style.css';

import game from '@byog/sdk';
import gameDef from './game.js';
import {setup, draw} from './ui.js';

setup(game);
draw(game);

game.dev(gameDef, true);
