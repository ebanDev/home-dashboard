tasmotaDOM = document.querySelector(".tasmota img");

function updateLightState() {
  var lightStateReq = new XMLHttpRequest();
  lightStateReq.open("GET", `http://${ tasmotaIP }/?m=1`);

  lightStateReq.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      if (this.response.includes("ON")) {
        lightState = true;
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        lightState = false;
        document.documentElement.setAttribute("data-theme", "light");
      }
    }
  }

  lightStateReq.send(null);
}

tasmotaDOM.onclick = function () {
  var lightToggleReq = new XMLHttpRequest();
  lightToggleReq.open("GET", `http://${ tasmotaIP }/?m=1&o=1`);

  lightToggleReq.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      updateLightState()
    }
  }

  lightToggleReq.send(null);
}
