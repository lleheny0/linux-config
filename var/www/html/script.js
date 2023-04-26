let timeout = null;

const displayMetadata = (data) => {
  document.getElementById("pagetitle").innerHTML = `♫ ${data.game}`;
  document.getElementById("gameInfo").innerHTML = data.game;
  document.getElementById("trackInfo").innerHTML = data.track;
  document.getElementById("cover").innerHTML = data.cover
    ? `<img src="${data.cover}" />`
    : null;
  document.getElementById("background").innerHTML = data.cover
    ? `<img src="${data.cover}" />`
    : null;
};

const updateMediaSession = (data) => {
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: data.track,
      artist: data.game,
      artwork: [
        {
          src: data.cover,
        },
      ],
    });
  }
};

const getCurrentDelay = (audio) =>
  Math.ceil((audio.duration || 0) - (audio.currentTime || 0)) || 4;

const updateTimer = ({ remainingTime = 600 }) => {
  const audio = document.getElementById("audio");

  timeout = setTimeout(
    getMetadata,
    (remainingTime + getCurrentDelay(audio)) * 1000
  );
};

const getMetadata = () => {
  const xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function (resp) {
    if (this.readyState == 4 && this.status == 200) {
      const data = JSON.parse(this.responseText);

      if (!data.error) {
        displayMetadata(data);
        updateMediaSession(data);
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
    audio.removeAttribute("src");
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
};
