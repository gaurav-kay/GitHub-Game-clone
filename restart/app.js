var player1Input = document.querySelector("#player1Input")
var player2Input = document.querySelector("#player2Input")
var player1SubmitButton = document.querySelector("#player1Submit")
var player2SubmitButton = document.querySelector("#player2Submit")

var player1ID
var player2ID

player1SubmitButton.addEventListener('click', () => {
      player1ID = player1Input.value
      // .textContent doesn't work
      console.log("tag:" + player1ID)
      callAPI(player1ID)
})

player2SubmitButton.addEventListener('click', () => {
      player2ID = player2Input.value
      // .textContent doesn't work
      console.log(player2ID);
      callAPI(player2ID)
})

// https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
async function callAPI(playerID) {
      var response = await fetch("https://api.github.com/users/" + playerID)
      var data = await response.json()
      console.log(data)
}