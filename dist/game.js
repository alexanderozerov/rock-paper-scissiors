'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(player1, player2) {
    _classCallCheck(this, Game);

    this.player1 = player1;
    this.player2 = player2;
    this.score = [0, 0];

    //{player.id: action.name}
    this.choices = new Map();

    this.messages = [
    //              rock  paper  scissors  lizard  spock
    /* rock     */['Tie', 'Paper covers Rock', 'Rock crushes Scissors', 'Rock crushes Lizard', 'Spock vaporizes Rock'],
    /* paper    */['Paper covers Rock', 'Tie', 'Scissors cuts Paper', 'Lizard eats Paper', 'Paper disproves Spock'],
    /* scissors */['Rock crushes Scissors', 'Scissors cuts Paper', 'Tie', 'Scissors decapitate Lizard', 'Spock smashes Scissors'],
    /* lizard   */['Rock crushes Lizard', 'Lizard eats Paper', 'Scissors decapitate Lizard', 'Tie', 'Lizard poisons Spock'],
    /* spock    */['Spock vaporizes Rock', 'Paper disproves Spock', 'Spock smashes Scissors', 'Lizard poisons Spock', 'Tie']];

    this.resultMatrix = [
    //             rock paper scissors lizard spock
    /* rock     */[0, -1, 1, 1, -1],
    /* paper    */[1, 0, -1, -1, 1],
    /* scissors */[-1, 1, 0, 1, -1],
    /* lizard   */[-1, 1, -1, 0, 1],
    /* spock    */[1, -1, 1, -1, 0]];

    this.actions = new Map([['ROCK', 0], ['PAPER', 1], ['SCISSORS', 2], ['LIZARD', 3], ['SPOCK', 4]]);
  }

  /* results:                */
  /*  1 - first playes wins  */
  /*  0 - tie                */
  /* -1 - second playes wins */

  _createClass(Game, [{
    key: 'nextMove',
    value: function nextMove(action, player) {
      this.choices.set(player.id, action);

      if (this.choices.size < 2) return;

      var _ref = [this.actions.get(this.choices.get(this.player1.id)), this.actions.get(this.choices.get(this.player2.id))],
          firstChoice = _ref[0],
          secondChoice = _ref[1];


      var roundResult = this.resultMatrix[firstChoice][secondChoice];
      var message = this.messages[firstChoice][secondChoice];

      var firstPlayerResult = void 0,
          secondPlayerResult = void 0;

      switch (roundResult) {
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
        message: message,
        result: firstPlayerResult,
        opponentAction: this.choices.get(this.player2.id)
      });

      this.player2.emit('GAME_RESULT', {
        score: [this.score[0], this.score[1]],
        message: message,
        result: secondPlayerResult,
        opponentAction: this.choices.get(this.player1.id)
      });

      this.choices.clear();
    }
  }]);

  return Game;
}();

exports.default = Game;