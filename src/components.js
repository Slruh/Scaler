Crafty.c("ScaleBase" , {
  init: function() {
    this.requires('2D, Canvas, Image')
      .attr({
        x:230,
        y:55,
        w:20,
        h:450
      })
      .image("images-raw/pen.gif")
  },
});

Crafty.c("ScaleArm", {
  init: function() {
    this.requires('2D, Canvas, Image')
      .attr({
        x:100,
        y:50,
        w:400,
        h:15
      })
      .image("images-raw/platform.png")
    this.origin("center");
    this.bind("WeightChanged", this.adjustScale);
  },

  adjustScale:function() {
    var leftWeight = Game.pinBoardLeft.totalWeight();
    var rightWeight = Game.pinBoardRight.totalWeight();
    var totalWeight = leftWeight + rightWeight;
    var balance = rightWeight - leftWeight;
    var balancePercentOfTotal = balance / totalWeight;
    var rotationValue = 10 * balancePercentOfTotal;
    this.rotation = rotationValue;
    Crafty.trigger("ArmRotated", rotationValue);

    if (balance == 0) {
      Game.checkScaleEvenForWin();
    }
  },
});

Crafty.c("PinBoard", {

  init: function() {
    this.requires('2D, Canvas, Image')
      .image("lhimages/korkBOARD.png");
    this.weights = [];
    this.bind("ArmRotated", this.adjustHeightWithRotation)
  },

  pinboard: function(loc, side) {
    this.attr(loc);
    this.side = side;
  },

  totalWeight: function() {
    var totalWeight = 0;
    for (var i = 0; i < this.weights.length; i++) {
      totalWeight += this.weights[i].weight;
    }
    return totalWeight;
  },

  addWeight: function(weight) {
    //Check to see if the object exists in this board i.e. dragged in same board
    if (this.weights.indexOf(weight) == -1) {
      this.weights.push(weight);
      Crafty.trigger("WeightChanged");
      Crafty.audio.play("attach", 1);
    }
  },

  removeWeight: function(weight) {
    var indexOfWeight = this.weights.indexOf(weight);
    if (indexOfWeight != -1) {
      this.weights.splice(indexOfWeight, 1);
      Crafty.trigger("WeightChanged");
    }
  },

  adjustHeightWithRotation: function(rotationValue) {
    var rad = rotationValue * Math.PI/180;
    var height = Math.tan(rad) * 200;
    var heightAdjustment = 100;
    var oldHeight = this.y;
    if (this.side == Game.pinBoardSide.LEFT) {
      heightAdjustment = 100 - height;
    } else {
      heightAdjustment = 100 + height;
    }
    this.y = heightAdjustment;
    var differenceHeight = oldHeight - heightAdjustment;
    for (var i = 0; i < this.weights.length; i++) {
      this.weights[i].y = this.weights[i].y - differenceHeight;
    }
  },

  numberOfWeights: function() {
    return this.weights.length;
  }
});

Crafty.c("Weight", {
  weight: 0,

  init:function() {
    this.requires('2D, Canvas, Draggable, Image')
      .enableDrag()
      .image("lhimages/crate.png")
    this.bind("StopDrag", this.checkHit);
  },

  weight: function(weight, loc) {
    this.attr(loc);
    this.weight = weight;
    this.addComponent('Collision');
  },

  checkHit: function() {
    var hitComponents = this.hit("PinBoard");
    if (hitComponents) {

      //Remove from any existing PinBoards
      Game.pinBoardLeft.removeWeight(this);
      Game.pinBoardRight.removeWeight(this);

      //Add this to the new pinboard
      if (hitComponents.length != 1) {
        alert("Problem hit multiple pin boards");
      }
      else {
        hitComponents[0].obj.addWeight(this);
      }
    }
    else {
      this.y = 525;

      //Remove the object from any pinboard its in
      Game.pinBoardLeft.removeWeight(this);
      Game.pinBoardRight.removeWeight(this);

      //Sounds
      Crafty.audio.play("thud", 1);
    }
  }
});