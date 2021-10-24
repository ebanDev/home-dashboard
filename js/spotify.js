playDOM = document.querySelector(".spotify #play");
pauseDOM = document.querySelector(".spotify #pause");
previousDOM = document.querySelector(".spotify #previous");
nextDOM = document.querySelector(".spotify #next");

function getToken(_callback) {
  var getTokenReq = new XMLHttpRequest();
  getTokenReq.open("POST", `https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${spotifyRefreshToken}`);
  getTokenReq.setRequestHeader('Authorization', `Basic ${ btoa(spotifyClientID + ':' + spotifyClientSecret) }`);
  getTokenReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  getTokenReq.responseType = 'json';

  getTokenReq.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      spotifyToken = this.response.access_token;
      _callback();
    }
  }

  getTokenReq.send(null);
}


function updatePlayingState() {
  getToken(function() {
    var currentlyPlayingReq = new XMLHttpRequest();
    currentlyPlayingReq.open("GET", `https://api.spotify.com/v1/me/player`);
    currentlyPlayingReq.setRequestHeader('Authorization', `Bearer ${ spotifyToken }`);
    currentlyPlayingReq.setRequestHeader('Content-Type', 'application/json');
    currentlyPlayingReq.responseType = 'json';

    currentlyPlayingReq.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        isPlaying = this.response.is_playing
        if (isPlaying) {
          playingText = document.querySelector(".spotify h2");
          playingText.innerHTML = this.response.item.name + " - " + this.response.item.artists[0].name
          playDOM.style.display = 'none';
          pauseDOM.style.display = 'initial';

          timeToEnd = this.response.item.duration_ms - this.response.progress_ms
          setTimeout(updatePlayingState, timeToEnd);
          return;
        } else {
          playDOM.style.display = 'initial';
          pauseDOM.style.display = 'none';
        }
      }
    }

    currentlyPlayingReq.send(null);
  });
}

pauseDOM.onclick = function() {
  var pauseReq = new XMLHttpRequest();
  pauseReq.open("PUT", `https://api.spotify.com/v1/me/player/pause`);
  pauseReq.setRequestHeader('Authorization', `Bearer ${ spotifyToken }`);
  pauseReq.setRequestHeader('Content-Type', 'application/json');
  pauseReq.responseType = 'json';

  pauseReq.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 202) {
      updatePlayingState()
    }
  }

  pauseReq.send(null);
}

playDOM.onclick = function() {
  var playReq = new XMLHttpRequest();
  playReq.open("PUT", `https://api.spotify.com/v1/me/player/play`);
  playReq.setRequestHeader('Authorization', `Bearer ${ spotifyToken }`);
  playReq.setRequestHeader('Content-Type', 'application/json');
  playReq.responseType = 'json';

  playReq.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 202) {
      updatePlayingState()
    }
  }

  playReq.send(null);
}

previousDOM.onclick = function() {
  var previousReq = new XMLHttpRequest();
  previousReq.open("POST", `https://api.spotify.com/v1/me/player/previous`);
  previousReq.setRequestHeader('Authorization', `Bearer ${ spotifyToken }`);
  previousReq.setRequestHeader('Content-Type', 'application/json');
  previousReq.responseType = 'json';

  previousReq.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 202) {
      updatePlayingState()
    }
  }

  previousReq.send(null);
}

nextDOM.onclick = function() {
  var nextReq = new XMLHttpRequest();
  nextReq.open("POST", `https://api.spotify.com/v1/me/player/next`);
  nextReq.setRequestHeader('Authorization', `Bearer ${ spotifyToken }`);
  nextReq.setRequestHeader('Content-Type', 'application/json');
  nextReq.responseType = 'json';

  nextReq.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 202) {
      updatePlayingState()
    }
  }

  nextReq.send(null);
}

updatePlayingState()

// TODO : Change device
