todayDOM = document.querySelector(".goaccess #today");
totalDOM = document.querySelector(".goaccess #total");


var goAccessDataReq = new XMLHttpRequest();
goAccessDataReq.open("GET", goAccessDataURL);
goAccessDataReq.setRequestHeader('Authorization', 'Basic ' + btoa(goAccessAuth));
goAccessDataReq.setRequestHeader('Content-Type', 'application/json');
goAccessDataReq.responseType = 'json';

goAccessDataReq.onreadystatechange = function() {
  if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    console.log(this.response)
    todayDOM.innerHTML = this.response.visitors.data[0].visitors.count

    totalDOM.innerHTML = this.response.general.valid_requests
  }
}

goAccessDataReq.send(null);
