class DrumKit {
  constructor() {
    this.play = document.querySelector('.play');
    this.pads = document.querySelectorAll('.pad');
    this.kickSound = document.querySelector('.kick-sound');
    this.snareSound = document.querySelector('.snare-sound');
    this.hihatSound = document.querySelector('.hihat-sound');
    this.index = 0;
    this.bpm = 150;
  }

  activePad() {
    this.classList.toggle('active');
  }

  repeat() {
    let step = this.index % 8;
    const activePads = document.querySelectorAll(`.b-${step}`);

    // Loop over each pad
    activePads.forEach((pad) => {
      pad.style.animation = `playTrack .3s alternate ease-in-out 2`;

      // Check if pads are active
      if (pad.classList.contains('active')) {
        if (pad.classList.contains('kick-pad')) {
          this.kickSound.currentTime = 0;
          this.kickSound.play();
        }
        if (pad.classList.contains('snare-pad')) {
          this.kickSound.currentTime = 0;
          this.snareSound.play();
        }
        if (pad.classList.contains('hihat-pad')) {
          this.kickSound.currentTime = 0;
          this.hihatSound.play();
        }
      }
    });

    this.index++;
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    setInterval(() => {
      this.repeat();
    }, interval);
  }
}

const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
  pad.addEventListener('click', drumKit.activePad);
  pad.addEventListener('animationend', function () {
    this.style.animation = '';
  });
});

drumKit.play.addEventListener('click', () => {
  drumKit.start();
});
