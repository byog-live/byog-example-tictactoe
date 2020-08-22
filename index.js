import './style.css';

import gameDef from './game.js';
import game from '@byog/sdk';

game.handlePush = ({event, payload}) => {
  switch (event) {
    case 'join':
      break;
    default:
      state[event] = payload;
      draw();
  }
}

const state = {game: {}, board: {}};
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const dashSize = 4;
const sectionSideLength = canvas.width / 3;

function draw() {
  ctx.fillStyle = '#333';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = state.game.current == userId ? '#aaa' : '#444';
  for (let offset = 0; offset < canvas.height; offset += dashSize * 3) {
    ctx.fillRect(canvas.width / 3 - dashSize / 2, offset, dashSize, dashSize);
    ctx.fillRect((canvas.width / 3) * 2 - dashSize / 2, offset, dashSize, dashSize);
    ctx.fillRect(offset, canvas.height / 3 - dashSize / 2, dashSize, dashSize);
    ctx.fillRect(offset, (canvas.height / 3) * 2 - dashSize / 2, dashSize, dashSize);
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let sign;
      const coords = `${i}-${j}`;
      if ((sign = state.board[coords])) {
        ctx.font = '128px sans-serif';
        ctx.fillStyle = '#fff';
        const size = ctx.measureText(sign);
        ctx.fillText(
          sign,
          i * sectionSideLength + sectionSideLength / 2 - size.width / 2,
          (j + 1) * sectionSideLength - 36,
        );
      }
    }
  }
}

function place(event) {
  const hOffset = Math.floor((event.offsetX * 3) / canvas.width);
  const vOffset = Math.floor((event.offsetY * 3) / canvas.height);
  game.trigger('place', `${hOffset}-${vOffset}`);
}

draw();

const playButton = document.getElementById('playButton');

playButton.addEventListener('click', () => {
  gameChannel.push('trigger', {event: 'ready'});
  playButton.parentElement.removeChild(playButton);

  canvas.addEventListener('click', place);
});


game.dev(gameDef, true);
