Game = {
  width: 600,
  height: 600,

  pinBoardSide: {
    LEFT: 0,
    RIGHT: 1
  },

  checkScaleEvenForWin: function() {
    if (Game.pinBoardLeft.numberOfWeights() + Game.pinBoardRight.numberOfWeights() == 6) {
        Crafty.e('2D, DOM, Image')
        .image("lhimages/badge.png")
        .attr({ x: 100, y: 80 })
        Crafty.audio.play("win", 1);
        Crafty.audio.remove("theme", 1);
    }
  },

  shuffleArray:function(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  },

  // Initialize and start our game
  start: function() {
    Crafty.init(600, 600);
    Crafty.audio.add("theme", "audio/main_loop.mp3");
    Crafty.audio.add("win", "audio/victory.mp3");
    Crafty.audio.add("thud", "audio/thud.mp3");
    Crafty.audio.add("attach","audio/attach.mp3");
    Crafty.audio.play("theme", -1);

    Crafty.e('ScaleBase');
    Crafty.e('ScaleArm');

    //Init the pin boards
    Game.pinBoardLeft = Crafty.e('PinBoard')
    Game.pinBoardLeft.pinboard({x:25, y:100, w:200, h:200}, Game.pinBoardSide.LEFT);
    Game.pinBoardRight = Crafty.e('PinBoard')
    Game.pinBoardRight.pinboard({x:375, y:100, w:200, h:200}, Game.pinBoardSide.RIGHT);

    var weights = [1,1,2,2,3,3];
    weights = Game.shuffleArray(weights);

    var xWeightStart = 75;
    for (var i = 0; i < 6; i++) {
        Crafty.e('Weight').weight(weights[i], {x:xWeightStart,y:525,w:50,h:50});
        xWeightStart += 80;
    }
  }
}