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