let timeout = null;

function getMetadata() {
  const xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function (resp) {
    if (this.readyState == 4 && this.status == 200) {
      const lines = this.responseText.split("\n");
      const info = lines[0].split("/");

      displayMetadata(info);

      if (info[0] !== "volume: n") {
        timeout = setTimeout(
          getMetadata,
          getTimeRemaining(lines[1].split(" ")[4])
        );
      }
    }
  };
  xmlhttp.open("GET", "metadata.php", true);
  xmlhttp.send();
}

function displayMetadata(info) {
  if (info[0] !== "volume: n") {
    const metadata =
      `<div id="game-title"><span class="emoji">💿</span> ${info[0]}</div>` +
      `<div id="track-name"><span class="emoji">🎵</span> ${info[1].split(".mp3")[0]}</div>`;

    document.getElementById("metadata").innerHTML = metadata;
    document.getElementById("pagetitle").innerHTML = `♫ ${info[0]}`;
  } else {
    document.getElementById("metadata").innerHTML =
      "<div>🎮 Server's down</div>" +
      "<div>📻 I'm probably updating the library</div>";
  }
}

function getTimeRemaining(times) {
  const audio = document.getElementsByTagName("audio")[0];
  const delay =
    Math.ceil((audio.duration || 0) - (audio.currentTime || 0)) || 4;

  return (
    (parseInt(times.split("/")[1].split(":")[0]) * 60 +
      parseInt(times.split("/")[1].split(":")[1]) -
      (parseInt(times.split("/")[0].split(":")[0]) * 60 +
        parseInt(times.split("/")[0].split(":")[1])) +
      delay) *
    1000
  );
}

window.onload = function () {
  getMetadata();
};
