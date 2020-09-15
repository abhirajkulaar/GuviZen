Open API can be accessed via a normal get request -

var request = new XMLHttpRequest()
request.open('GET', 'https://dog.ceo/api/breeds/list/all', true)
request.onload = function() {
  // Begin accessing JSON data here
var data = JSON.parse(this.response)
console.log(data)
}

// Send request
request.send()
