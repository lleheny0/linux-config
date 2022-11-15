var timeout = null;

function getMetadata() {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function (resp) {
    if (this.readyState == 4 && this.status == 200) {
      var lines = this.responseText.split("\n");
      displayMetadata(lines[0].split("/"));
      timeout = setTimeout(
        getMetadata,
        getTimeRemaining(lines[1].split(" ")[4])
      );
    }
  };
  xmlhttp.open("GET", "metadata.php", true);
  xmlhttp.send();
}

function displayMetadata(info) {
  var metadata =
    "<div>Game:</div>" +
    `<div id="game-title">${info[0]}</div>` +
    "<div>Track:</div>" +
    `<div id="track-name">${info[1].split(".mp3")[0]}</div>`;
  document.getElementById("metadata").innerHTML = metadata;
}

function getTimeRemaining(times) {
  var audio = document.getElementsByTagName("audio")[0];
  var delay = Math.ceil((audio.duration || 0) - (audio.currentTime || 0)) || 4;

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
