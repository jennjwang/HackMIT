// Zenserp- google shopping search query
// Playground: https://app.zenserp.com/api/v2/search?apikey=YOUR-API-KEY&q=Pied%20Piper&device=desktop&location=Manhattan,New%20York,United%20States

function find_products(searched, callback) {
  // Create a request variable and assign a new XMLHttpRequest object to it.
  var request = new XMLHttpRequest()

  // Open a new connection, using the GET request on the URL endpoint

  // var request_url = 'https://app.zenserp.com/api/v2/search?apikey=a0a55b90-fa88-11ea-b032-e1b6e8960bf5&q='+ searched.replace(" ", "%20") + '%20sustainable&tbm=shop&device=desktop&hl=en&location=Manhattan,New%20York,United%20States'

  request.open('GET', request_url, false)

  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
      //console.log(data);
      //result_data = data.shopping_results;
      //console.log(data.shopping_results);
      
      var result_data = [];

      data.shopping_results.forEach((item) => {
        console.log('inner: ' + item.title)
        result_data.push([item.title, item.thumbnail, item.price, 'https://www.google.com/' + item.link, item.source])

        // Return results- 2D list- title, image (base 64 encoding), price, link, source 
        callback(result_data)
      });

    } else {
      console.log('error')
    }
  }

  // Send request
  request.send()
}


//as second parameter, include callback function that uses the return results to render cards on front-end
find_products('soap', data => console.log("The data is:", data));