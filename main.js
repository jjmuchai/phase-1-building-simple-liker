// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

// Ensure modal is hidden when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");

  // Select all like buttons (hearts)
  const likeButtons = document.querySelectorAll(".like-glyph");

  likeButtons.forEach((heart) => {
    heart.addEventListener("click", () => {
      // If the heart is empty, send a server request
      if (heart.textContent === EMPTY_HEART) {
        mimicServerCall()
          .then(() => {
            // Server request successful: change heart to full
            heart.textContent = FULL_HEART;
            heart.classList.add("activated-heart");
          })
          .catch((error) => {
            // Server request failed: Show error message
            modal.classList.remove("hidden");
            modal.querySelector("#modal-message").textContent = error;

            // Hide the error message after 3 seconds
            setTimeout(() => {
              modal.classList.add("hidden");
            }, 3000);
          });
      } else {
        // If the heart is full, change it back to empty
        heart.textContent = EMPTY_HEART;
        heart.classList.remove("activated-heart");
      }
    });
  });
});


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
