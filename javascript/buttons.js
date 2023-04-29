let myAudio = document.getElementById("myAudio");

    function playMusic() {
      myAudio.play();
    }

    function pauseMusic() {
      myAudio.pause();
    }

    var musicStarted = false;
    var canvas1 = true;
    var mode1 = true;
    // Create a button to start the audio
    var startButton = document.createElement('button');
    var musicButton = document.createElement('button');
    var switchButton = document.createElement('button');
    var changeModeButton = document.createElement('button');
    startButton.textContent = 'Start';
    musicButton.textContent = 'Start music';
    switchButton.textContent = 'Switch to canvas 2';
    changeModeButton.textContent = 'Change mode';


    switchButton.addEventListener('click', function () {
      if (canvas1) {
        toggleProgram2();
        switchButton.textContent = 'Switch to canvas 1';
        canvas1 = false;
        document.body.removeChild(changeModeButton);
      } else {
        toggleProgram2();
        switchButton.textContent = 'Switch to canvas 2';
        canvas1 = true;
        document.body.appendChild(changeModeButton);
      }
    });

    changeModeButton.addEventListener('click', function () {
      if (mode1) {
        toggleProgram();
        mode1 = false;
      } else {
        toggleProgram();
        mode1 = true;
      }
    });

    musicButton.addEventListener('click', function () {
      if (musicStarted) {
        pauseMusic();
        musicButton.textContent = 'Start music';
        musicStarted = false;
      
      } else {
        playMusic();
        musicButton.textContent = 'Pause music';
        musicStarted = true;
      }
    

    });
    // Add a click event listener to the startButton
    startButton.addEventListener('click', function () {
      start();
      document.body.removeChild(startButton);
      document.body.appendChild(musicButton);
      document.body.appendChild(switchButton);
      document.body.appendChild(changeModeButton);
      //startButton.style.backgroundColor = "navy";
    });

    document.body.appendChild(startButton);