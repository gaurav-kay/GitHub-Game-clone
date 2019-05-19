const player1Input = document.querySelector("#player1Input")
const player2Input = document.querySelector("#player2Input")
var player1SubmitButton = document.querySelector("#player1Submit")
var player2SubmitButton = document.querySelector("#player2Submit")

player1SubmitButton.addEventListener("click", clickHandler.bind(this, player1Input))
player2SubmitButton.addEventListener("click", clickHandler.bind(this, player2Input))

function clickHandler(playerInput) {
      
      debugger
      var x
      if(playerInput == player1Input) {
            x = player1Input.value
      } else {
            x = player2Input.value
      }
      callAPI(x)
      .then((data) => {
            if(playerInput == player1Input) {
                  document.querySelector("#player1Image").src = data["avatar_url"]
            } else {
                  document.querySelector("#player2Image").src = data["avatar_url"]
            }
      })
}

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