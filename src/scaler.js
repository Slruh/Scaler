Game = {
  width: 600,
  height: 600,

  pinBoardSide: {
    LEFT: 0,
    RIGHT: 1
  },

  // Initialize and start our game
  start: function() {
    Crafty.init(600, 600);
    Crafty.audio.add("theme", "audio/main_loop.mp3");
    Crafty.audio.play("theme");

    Crafty.e('Shelf');
    Crafty.e('ScaleBase');
    Crafty.e('ScaleArm');

    //Init the pin boards
    Game.pinBoardLeft = Crafty.e('PinBoard')
    Game.pinBoardLeft.pinboard({x:50, y:100, w:150, h:150}, Game.pinBoardSide.LEFT);
    Game.pinBoardRight = Crafty.e('PinBoard')
    Game.pinBoardRight.pinboard({x:400, y:100, w:150, h:150}, Game.pinBoardSide.RIGHT);

    var weights = [1,1,2,2,3,3];

    var xWeightStart = 75;
    for (var i = 0; i < 6; i++) {
        Crafty.e('Weight').weight(weights[i], {x:xWeightStart,y:375,w:50,h:50});
        xWeightStart += 80;
    }

  }
}