var player1Input = document.querySelector("#player1Input")
var player2Input = document.querySelector("#player2Input")
var player1SubmitButton = document.querySelector("#player1Submit")
var player2SubmitButton = document.querySelector("#player2Submit")

var player1ID
var player2ID

player1SubmitButton.addEventListener('click', () => {
      player1ID = player1Input.value
      // .textContent doesn't work

      callAPI(player1ID)
      .then((data) => {
            console.log(data)
            updateImage(document.querySelector("#player1Image"), data["avatar_url"])
      })
})

player2SubmitButton.addEventListener('click', () => {
      player2ID = player2Input.value
      // .textContent doesn't work
      callAPI(player2ID)
      .then((data) => {
            console.log(data)
            updateImage(document.querySelector("#player1Image"), data["avatar_url"])
      })
})

// https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
async function callAPI(playerID) {
      // https://javascript.info/async-await
      // var response = await fetch("https://api.github.com/users/" + playerID)
      // var data = await response.json()
      x = await fetch("https://api.github.com/users/" + playerID)
      .then((response) => {
            return response.json()            
      })
      .then((data) => {
            console.log(data)
            return data
      })

      return x
}

function updateImage(image, url) {
      image.src = url
}