class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.score = [0, 0];

    //{player.id: action.name}
    this.choices = new Map();

    this.messages = [
      //              rock  paper  scissors  lizard  spock
      /* rock     */ ['Tie', 'Paper covers Rock', 'Rock crushes Scissors', 'Rock crushes Lizard', 'Spock vaporizes Rock'],
      /* paper    */ ['Paper covers Rock', 'Tie', 'Scissors cuts Paper', 'Lizard eats Paper', 'Paper disproves Spock'],
      /* scissors */ ['Rock crushes Scissors', 'Scissors cuts Paper', 'Tie', 'Scissors decapitate Lizard', 'Spock smashes Scissors'],
      /* lizard   */ ['Rock crushes Lizard', 'Lizard eats Paper', 'Scissors decapitate Lizard', 'Tie', 'Lizard poisons Spock'],
      /* spock    */ ['Spock vaporizes Rock', 'Paper disproves Spock', 'Spock smashes Scissors', 'Lizard poisons Spock', 'Tie']
    ];

    this.resultMatrix = [
      //             rock paper scissors lizard spock
      /* rock     */ [0,    -1,    1,    1,    -1],
      /* paper    */ [1,     0,   -1,   -1,     1],
      /* scissors */ [-1,    1,    0,    1,    -1],
      /* lizard   */ [-1,    1,   -1,    0,     1],
      /* spock    */ [1,    -1,    1,    -1,    0]
    ];

    this.actions = new Map([
      ['ROCK', 0], 
      ['PAPER', 1], 
      ['SCISSORS', 2], 
      ['LIZARD', 3], 
      ['SPOCK', 4]
    ]);
  }

  /* results:                */
  /*  1 - first playes wins  */
  /*  0 - tie                */
  /* -1 - second playes wins */

  nextMove(action, player) {
    this.choices.set(player.id, action);

    if (this.choices.size < 2) return;

    const [firstChoice, secondChoice] = [
      this.actions.get(this.choices.get(this.player1.id)), 
      this.actions.get(this.choices.get(this.player2.id))
    ];

    const roundResult = this.resultMatrix[firstChoice][secondChoice];
    const message = this.messages[firstChoice][secondChoice];

    let firstPlayerResult, secondPlayerResult;

    switch(roundResult) {
    case 1:
      this.score[0] += 1;
      firstPlayerResult = 'WIN';
      secondPlayerResult = 'LOSS';
      break;

    case 0:
      firstPlayerResult = secondPlayerResult = 'TIE';
      break;

    case -1:
      this.score[1] += 1;
      firstPlayerResult = 'LOSS';
      secondPlayerResult = 'WIN';
      break;
    }

    this.player1.emit('GAME_RESULT', {
      score: [this.score[1], this.score[0]], 
      message, 
      result: firstPlayerResult,
      opponentAction: this.choices.get(this.player2.id)
    });

    this.player2.emit('GAME_RESULT', {
      score: [this.score[0], this.score[1]], 
      message, 
      result: secondPlayerResult,
      opponentAction: this.choices.get(this.player1.id)
    });

    this.choices.clear();
  }

}

export default Game;