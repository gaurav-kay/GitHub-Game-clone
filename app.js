var player1 = {
      input: document.querySelector("#player1Input"),
      submitButton: document.querySelector("#player1Submit"),
      img: document.querySelector("#player1Image")
}

var player2 = {
      input: document.querySelector("#player2Input"),
      submitButton: document.querySelector("#player2Submit"),
      img: document.querySelector("#player2Image")
}

// https://stackoverflow.com/questions/16310423/addeventlistener-calls-the-function-without-me-even-asking-it-to
player1.submitButton.addEventListener("click", clickHandler.bind(this, player1))
player2.submitButton.addEventListener("click", clickHandler.bind(this, player2))

function clickHandler(player) {
      callAPI(player.input.value)
      .then((data) => {
            player.data = data
            player.img.src = data["avatar_url"]
      })
}

// https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
// https://javascript.info/async-await
async function callAPI(playerID) {
      console.log(playerID)
      data = await fetch("https://api.github.com/users/" + playerID)
      .then((response) => {
            // to json
            return response.json()
      })
      console.log(data)
      return data
}