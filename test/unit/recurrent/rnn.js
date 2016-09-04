var fs = require('fs');
var assert = require('assert');
var RNN = require('../../../lib/recurrent/rnn');
var Vocab = require('../../../lib/recurrent/vocab');
var vocab = new Vocab(['0','1','2','3','4','5','6','7','8','9','+','=']);

function randomMath() {
  var left = Math.floor(Math.random() * 10);
  var right = Math.floor(Math.random() * 10);
  return left + '+' + right + '=' + (left + right);
}

describe('rnn', function() {
  it('can predict what a math problem is after being fed 1000 random math problems', function() {
    console.time('math rnn');
    //1+9=10
    //123456 <- length
    var rnn = new RNN({
      inputSize: 6, //<- length
      inputRange: vocab.characters.length,
      outputSize: vocab.characters.length //<- length
    });

    for (var i = 0; i < 5000; i++) {
      rnn.run(vocab.toIndexes(randomMath()));
      if (i % 10 === 0) {
        console.log(vocab.toCharacters(rnn.predict()).join(''));
      }
    }

    for (i = 0; i < 5; i++) {
      var prediction = vocab.toCharacters(rnn.predict()).join('');
      console.log(prediction);
      assert(/[+]/.test(prediction));
      assert(/[=]/.test(prediction));
    }
    console.timeEnd('math rnn');
    console.log('');
  });
});