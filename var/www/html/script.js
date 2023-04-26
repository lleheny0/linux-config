let progress = 0,
  total;

const displayMetadata = ({ track, game, cover }) => {
  document.getElementById("pagetitle").innerHTML = `♫ ${game}`;
  document.getElementById("gameInfo").innerHTML = game;
  document.getElementById("trackInfo").innerHTML = track;
  document.getElementById("cover").innerHTML = cover
    ? `<img src="${cover}" />`
    : null;
  document.getElementById("background").innerHTML = cover
    ? `<img src="${cover}" />`
    : null;
};

const updateMediaSession = ({ track, game, cover }) => {
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track,
      artist: game,
      artwork: [
        {
          src: cover,
        },
      ],
    });
  }
};

const getDelay = () => {
  const { currentTime, duration } = document.getElementById("audio");

  return Math.ceil((duration || 0) - (currentTime || 0) || 4);
};

const updateTimer = ({ remainingTime }) =>
  setTimeout(getMetadata, (remainingTime + getDelay()) * 1000);

const updateProgressBar = ({ remainingTime, trackLength }) => {
  progress = trackLength - remainingTime - getDelay();
  total = trackLength;
};

const getMetadata = () => {
  const xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function (resp) {
    if (this.readyState == 4 && this.status == 200) {
      const data = JSON.parse(this.responseText);

      if (!data.error) {
        displayMetadata(data);
        updateMediaSession(data);
        updateProgressBar(data);
        updateTimer(data);
      } else {
        document.getElementById("gameInfo").innerHTML = "Music server is down";
        document.getElementById("trackInfo").innerHTML =
          "I'm probably updating the library";
      }
    }
  };
  xmlhttp.open("GET", "metadata.php", true);
  xmlhttp.send();
};

const handleTogglePlayback = (audio) => () => {
  if (audio.paused) {
    audio.src = `http://[IP]:8000/gamemusic?t=${new Date().getTime()}`;
    audio.load();
    audio.play();
    playPause.src = "assets/stop.png";
  } else {
    audio.pause();
    audio.src = "";
    playPause.src = "assets/play.png";
  }
};

const handleToggleMute = (audio) => () => {
  if (audio.muted) {
    audio.muted = false;
    muted.src = "assets/unmuted.png";
  } else {
    audio.muted = true;
    muted.src = "assets/muted.png";
  }
};

const handleChangeVolume = (audio) => (e) => {
  audio.volume = e.target.value;
};

const setupControls = () => {
  const audio = document.getElementById("audio");
  const playPause = document.getElementById("playPause");
  const muted = document.getElementById("muted");
  const volume = document.getElementById("volume");

  playPause.onclick = handleTogglePlayback(audio);
  muted.onclick = handleToggleMute(audio);
  volume.oninput = handleChangeVolume(audio);

  if ("mediaSession" in navigator) {
    navigator.mediaSession.setActionHandler(
      "play",
      handleTogglePlayback(audio)
    );
    navigator.mediaSession.setActionHandler(
      "pause",
      handleTogglePlayback(audio)
    );
  }
};

window.onload = () => {
  getMetadata();
  setupControls();
  setInterval(() => {
    progress++;
    document.getElementById("progressBar").style.width = `${
      (progress / total) * 100
    }%`;
  }, 1000);
};