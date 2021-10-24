var todoReq = new XMLHttpRequest();
todoReq.open("POST", `https://api.notion.com/v1/databases/${ todoDbId }/query`, true);
todoReq.setRequestHeader('Authorization', `Bearer ${ todoNotionToken }`);
todoReq.setRequestHeader('Notion-Version', '2021-08-16');
todoReq.setRequestHeader('Content-Type', 'application/json');

todoReq.responseType = 'json';
todoReq.onreadystatechange = function() {
  if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    todoList = this.response.results.slice(0, 5);
    for (todoIndex in todoList) {
      todoProps = todoList[todoIndex].properties
      todoListDOM = document.getElementsByClassName('todoList')[0];
      todoElement = document.createElement('li');

      todoElement.innerHTML = todoProps.Name.title[0].plain_text;

      if (todoProps.Tags.multi_select[0].name) {
        category = document.createElement('span');
        category.innerHTML = todoProps.Tags.multi_select[0].name;
        todoElement.appendChild(category);
      }

      todoListDOM.appendChild(todoElement);
    }
  }
}

todoReq.send(JSON.stringify({
  "filter": {
    "or": [{
      "property": "Status",
      "select": {
        "equals": "⏳ À Faire"
      }
    }]
  },
  "sorts": [{
    "property": "Date",
    "direction": "ascending"
  }]
}));
