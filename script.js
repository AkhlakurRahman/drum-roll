class DrumKit {
  constructor() {
    this.play = document.querySelector('.play');
    this.pads = document.querySelectorAll('.pad');
    this.kickSound = document.querySelector('.kick-sound');
    this.snareSound = document.querySelector('.snare-sound');
    this.hihatSound = document.querySelector('.hihat-sound');
    this.selects = document.querySelectorAll('select');
    this.muteButtons = document.querySelectorAll('.mute');
    this.tempoSlider = document.querySelector('.tempo-slider');

    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
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
          this.snareSound.currentTime = 0;
          this.snareSound.play();
        }
        if (pad.classList.contains('hihat-pad')) {
          this.hihatSound.currentTime = 0;
          this.hihatSound.play();
        }
      }
    });

    this.index++;
  }

  start() {
    const interval = (60 / this.bpm) * 1000;

    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }

  updateButton() {
    if (!this.isPlaying) {
      this.play.innerText = 'Stop';
      this.play.classList.add('active');
    } else {
      this.play.innerText = 'Play';
      this.play.classList.remove('active');
    }
  }

  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;

    switch (selectionName) {
      case 'kick-select':
        this.kickSound.src = selectionValue;
        break;

      case 'snare-select':
        this.snareSound.src = selectionValue;
        break;

      case 'hihat-select':
        this.hihatSound.src = selectionValue;
        break;

      default:
        break;
    }
  }

  muteSound(e) {
    const muteIndex = e.target.getAttribute('data-track');

    e.target.classList.toggle('active');

    if (e.target.classList.contains('active')) {
      switch (muteIndex) {
        case '0':
          this.kickSound.volume = 0;
          break;

        case '1':
          this.snareSound.volume = 0;
          break;

        case '2':
          this.hihatSound.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case '0':
          this.kickSound.volume = 1;
          break;

        case '1':
          this.snareSound.volume = 1;
          break;

        case '2':
          this.hihatSound.volume = 1;
          break;
      }
    }
  }

  changeTempo(e) {
    const tempoText = document.querySelector('.tempo-number');

    tempoText.innerText = e.target.value;
  }

  updateTempo(e) {
    this.bpm = e.target.value;

    clearInterval(this.isPlaying);
    this.isPlaying = null;

    const playBtn = document.querySelector('.play');
    if (playBtn.classList.contains('active')) {
      this.start();
    }
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
  drumKit.updateButton();
  drumKit.start();
});

drumKit.selects.forEach((select) => {
  select.addEventListener('change', (e) => {
    drumKit.changeSound(e);
  });
});

drumKit.muteButtons.forEach((muteButton) => {
  muteButton.addEventListener('click', (e) => {
    drumKit.muteSound(e);
  });
});

drumKit.tempoSlider.addEventListener('input', (e) => {
  drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener('change', (e) => {
  drumKit.updateTempo(e);
});
