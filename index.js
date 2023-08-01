const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const player = new Fighter({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: 'yellow',
  offset: {
    x: 0,
    y: 0
  }
});

const enemy = new Fighter({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: -50,
    y: 0
  }
});

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  w: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowUp: {
    pressed: false
  },
}

const determineWinner = ({player, enemy, timerId}) => {
  clearTimeout(timerId);
  document.querySelector('#message').style.display = 'flex'
  if (player.health === enemy.health) {
    document.querySelector('#message').innerHTML = 'Tie'
  } else if (player.health > enemy.health) {
    document.querySelector('#message').innerHTML = 'Player wins'
  } else {
    document.querySelector('#message').innerHTML = 'Enemy wins'
  }
}

let timerId;
let timer = 26;
const decreaseTimer = () => {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer -= 1;
    document.querySelector('#timer').innerHTML = timer
  }
  if (timer === 0){
    determineWinner({player, enemy, timerId})
  }
}
decreaseTimer();

const rectangularCollision = ({rectangle1, rectangle2}) => {
  return (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x
    && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.height + rectangle1.attackBox.position.y >= rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
}
const animate = () => {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  //player movement
  player.velocity.x = 0;
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5;
  }
  //enemy movement
  enemy.velocity.x = 0;
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5;
  }
  
  //detect for collisions
  if (rectangularCollision({rectangle1: player, rectangle2: enemy}) && player.isAttacking) {
      player.isAttacking = false;
      enemy.health -= 20;
      document.querySelector('#enemyHealth').style.width = `${enemy.health}%`
  }
  if (rectangularCollision({rectangle1: enemy, rectangle2: player}) && enemy.isAttacking) {
      enemy.isAttacking = false;
      player.health -= 20;
      document.querySelector('#playerHealth').style.width = `${player.health}%`
  }

  // END THE GAME
  if (enemy.health === 0 || player.health === 0) {
    determineWinner({player, enemy, timerId})
  }
};

animate();
window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = true;
      player.lastKey = 'd'
      break;
    case 'a':
      keys.a.pressed = true;
      player.lastKey = 'a'
      break;
    case 'w':
      player.velocity.y = -20
      break;
    case ' ':
      player.attack()
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressed = true;
      enemy.lastKey = 'ArrowRight'
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = 'ArrowLeft'
      break;
    case 'ArrowUp':
      enemy.velocity.y = -20
      break;
    case 'ArrowDown':
      enemy.attack()
      break;
  }
})
window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false;
      break;
    case 'a':
      keys.a.pressed = false;
      break;
    case 'w':
      keys.w.pressed = false;
      break;
    case 'ArrowRight':
      keys.ArrowRight.pressed = false;
      break;
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false;
      break;
    case 'ArrowUp':
      keys.ArrowUp.pressed = false;
      break;
  }
})