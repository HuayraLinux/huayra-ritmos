function p5() {
};

var loadSound = function() {
  console.log("mock loadSound");
  return {
    file: "sounds/basicos/000_drum1.wav",
    setVolume: function(e) {},
    rate: function(e) {},
    play: function(e) {},
  };
};

p5.SoundRecorder = function() {
  console.log("mock SoundRecorder");
  return {
    setInput: function() {
      console.log("mock SoundRecorder.setInput");
    }
  };
};

p5.SoundFile = function() {
  console.log("mock SoundFile");
  return {};
};

p5.soundOut = {
  limiter: {
    connect: function() {
      console.log("mock p5.soundOut.limiter.connect");
    }
  }
};

