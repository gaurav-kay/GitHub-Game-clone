const battleButton = document.querySelector("#battleButton")
const alertDiv = document.querySelector("#alert")
const ratio1 = 23
const ratio2 = 37
var enableBattle = 0

battleButton.style.visibility = "hidden"

var player1 = {
      name: document.getElementById("player1Name"),
      input: document.querySelector("#player1Input"),
      submitButton: document.querySelector("#player1Submit"),
      img: document.querySelector("#player1Image"),
      winner: false,
      result: document.getElementById("player1result"),
      score: 0
}

var player2 = {
      name: document.getElementById("player2Name"),
      input: document.querySelector("#player2Input"),
      submitButton: document.querySelector("#player2Submit"),
      img: document.querySelector("#player2Image"),
      winner: false,
      result: document.getElementById("player2result"),
      score: 0
}

var userNotFound = false

// https://stackoverflow.com/questions/16310423/addeventlistener-calls-the-function-without-me-even-asking-it-to
player1.submitButton.addEventListener("click", submitButtonClickHandler.bind(this, player1))
player2.submitButton.addEventListener("click", submitButtonClickHandler.bind(this, player2))

battleButton.addEventListener('click', () => {
      if(player1.data != null && player2.data != null && userNotFound != null) {
            decideWinner()
            if(player1.winner === true && player2.winner === false) {
                  player1.result.textContent = "Winner"
                  player2.result.textContent = "Loser"
            } else if(player2.winner === true && player1.winner === false) {
                  player2.result.textContent = "Winner"
                  player1.result.textContent = "Loser"
            } else {
                  alertDiv.textContent = "Game tied!"
            }
            
            // Player 1
            var parent = document.querySelector('#player1ResultInfo')

            var ul = document.createElement('UL')
            ul.textContent = "Public Repos: " + player1.data["public_repos"]

            parent.appendChild(ul)

            ul = document.createElement('UL')
            ul.textContent = "Followers: " + player1.data["followers"]

            parent.appendChild(ul)

            // Player 2
            var parent = document.querySelector('#player2ResultInfo')

            var ul = document.createElement('UL')
            ul.textContent = "Public Repos: " + player2.data["public_repos"]

            parent.appendChild(ul)

            ul = document.createElement('UL')
            ul.textContent = "Followers: " + player2.data["followers"]

            parent.appendChild(ul)
      } else {
            alertDiv.textContent = "Fill out both the user fields with valid users"
      }
})

function decideWinner() {
      if(player1.data["public_repos"] * ratio1 + player1.data["followers"] * ratio2 > player2.data["public_repos"] * ratio1 + player2.data["followers"] * ratio2) {
            player1.winner = true
      } else if (player1.data["public_repos"] * ratio1 + player1.data["followers"] * ratio2 < player2.data["public_repos"] * ratio1 + player2.data["followers"] * ratio2) {
            player2.winner = true
      }
}

function submitButtonClickHandler(player) {
      callAPI(player.input.value)
      .then((data) => {
            if(data["message"] == null || data["avatar_url"] != null) {
                  player.data = data
                  player.img.src = data["avatar_url"]
                  player.name.textContent = data["name"]
                  enableBattle++
                  if (enableBattle >= 2) {
                        battleButton.style.visibility = "visible"
                  }
            } else {
                  player.img.src = "./no-user.jpg"
                  player.name.textContent = "No user found"
            }
      })
}

// https://stackoverflow.com/questions/36975619/how-to-call-a-rest-web-service-api-from-javascript
// https://javascript.info/async-await
async function callAPI(playerID) {
      data = await fetch("https://api.github.com/users/" + playerID)
            .then((response) => {
                  // to json
                  return response.json()
            })

      // console.log(data)

      return data
}