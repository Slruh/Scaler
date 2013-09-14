Game = {
  width: 600,
  height: 600,

  pinBoardSide: {
    LEFT: 0,
    RIGHT: 1
  },

  checkScaleEvenForWin: function() {
    if (Game.pinBoardLeft.numberOfWeights() + Game.pinBoardRight.numberOfWeights() == 6) {
        Crafty.e('2D, DOM, Text')
        .attr({ x: 250, y: 300 })
        .text('Equality Achieved')
        .textFont({ size: '30px', weight: 'bold' });
    }
  },

  // Initialize and start our game
  start: function() {
    Crafty.init(600, 600);
    Crafty.audio.add("theme", "audio/main_loop.mp3");
    Crafty.audio.play("theme", -1);

    Crafty.e('Shelf');
    Crafty.e('ScaleBase');
    Crafty.e('ScaleArm');

    //Load sprites 
    Crafty.sprite("lhimages/platform.png", {spr_arm:[0,0,400,15]});
    Crafty.sprite("lhimages/crate.png", {spr_crate:[0,0,100,100]});

    //Init the pin boards
    Game.pinBoardLeft = Crafty.e('PinBoard')
    Game.pinBoardLeft.pinboard({x:50, y:100, w:150, h:150}, Game.pinBoardSide.LEFT);
    Game.pinBoardRight = Crafty.e('PinBoard')
    Game.pinBoardRight.pinboard({x:400, y:100, w:150, h:150}, Game.pinBoardSide.RIGHT);

    var weights = [1,1,2,2,3,3];

    var xWeightStart = 75;
    for (var i = 0; i < 6; i++) {
        Crafty.e('Weight').weight(weights[i], {x:xWeightStart,y:450,w:50,h:50});
        xWeightStart += 80;
    }
  }
}