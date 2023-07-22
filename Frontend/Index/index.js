
var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "flex";  
  setTimeout(carousel, 2000); // Change image every 2 seconds

}



const username = localStorage.getItem("username");

// Update the content of the element with the username
const usernameElement = document.getElementById("usernamedisplay");

if (usernameElement) {
  usernameElement.textContent = (username || "Hello, Login or Register");
  
}



const logoutButton = document.getElementById("logoutbox");

// Add event listener for logout button/link
logoutButton.addEventListener("click", function() {
  // Clear token and username from localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  
  // Update the content of the element with the username to be empty
  const usernameElement = document.getElementById("usernamedisplay");
  if (usernameElement) {
    usernameElement.textContent = "Login/Register";
  }
});