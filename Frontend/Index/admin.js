
document.getElementById("signupbtn").addEventListener("click",()=>{

    document.getElementById("frontimg").style.display="none"
    document.getElementById("backimg").style.display="block"


})

document.getElementById("loginbtn").addEventListener("click",()=>{

    document.getElementById("backimg").style.display="none"
    document.getElementById("frontimg").style.display="block"


})



// signup form code======>

let registerUserUsername = document.getElementById("register-user-name");
let registerUserEmail = document.getElementById("register-user-email");
let registerUserPassword = document.getElementById("register-user-passowrd");
let registerUserButton = document.getElementById("register-user");

let LoginUserEmail = document.getElementById("login-user-email");
let LoginUserPassword = document.getElementById("login-user-passowrd");
let LoginUserButton = document.getElementById("login-user");

registerUserButton.addEventListener("click", function (e) {

 
      // alert("Register User Successfully");
  
      e.preventDefault();
  
      let UserName = registerUserUsername.value;
      let email = registerUserEmail.value;
     let Password = registerUserPassword.value;
  
      registerUser(UserName,  email, Password);
    
  });


//   function registerUser(UserName,  email, Password) {
    
//   fetch("https://real-pink-bass-hose.cyclic.app/admin/register", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name: UserName,
//       email: email,
//       password: Password,
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) =>{console.log(data)
//     alert("Register User Successfully")
//     })
//     .catch((error) => {console.error(error)
//         alert("Please Check the Details Again!!")
//     });
// }
function registerUser(UserName,  email, Password) {
    
  fetch("https://real-pink-bass-hose.cyclic.app/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: UserName,
      email: email,
      password: Password,
    }),
  })
    .then((response) => response.json())
    .then((data) =>{console.log(data)
      alert("Register User Successfully");
    })
    
    .catch((error) => console.error(error));
}


// Login form code======>


LoginUserButton.addEventListener("click", function (e) {
  e.preventDefault();

  let UserName = LoginUserEmail.value;
  let Password = LoginUserPassword.value;

  loginUser(UserName, Password);
});

function loginUser(email, password) {
  fetch("https://real-pink-bass-hose.cyclic.app/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data && data.token) {
        console.log(data);
        alert("Login Admin Successfully");
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username); // Assuming the response contains the username
        window.open("admindata.html", "_blank");
      } else {
        throw new Error("Invalid response data");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to login. Please check your credentials.");
    });
}



