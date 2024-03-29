// maindata javascript

window.addEventListener("load", () => {
  fetchAndRenderEmployees();
});

function reset() {
  fetchAndRenderEmployees();
}

let bag = [];

let mainSection = document.getElementById("data-list-wrapper");

function fetchAndRenderEmployees() {
  fetch("https://real-pink-bass-hose.cyclic.app/product/", {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      bag = data;
      mainSection.innerHTML = renderCardList(data);

      renderCardList(data);
    })
    .catch((error) => console.log(error));
}

// -----------------------

function renderCardList(data) {
  let cardList = `

    <div class="card-list">
      ${data
        .map((item) => getCard(item._id, item.img, item.price, item.name))
        .join("")}
    </div>
  `;

  mainSection.innerHTML = cardList;

  const buttons = document.querySelectorAll(".card__Button1");

  buttons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const currentId = event.target.id;
      populateEditForms(currentId);
      console.log(`Clicked button id: ${currentId}`);
    });
  });


  let token=localStorage.getItem("token")
  const buttons1 = document.querySelectorAll(".card__Button");

  buttons1.forEach((button) => {
    button.addEventListener("click", function (event) {
      const currentId = event.target.id;

      if(token){
        populateEditForms5(currentId)
      }else{
       alert("Please Login First") 
      }

      // console.log(`Clicked button id: ${currentId}`);
    });
  });
}

function getCard(_id, img, price, name) {
  let card = `
<div class="card" id="cardhover" data-id=${_id} >
<div class="card__img">

<img width="100%" src="${img}" alt="Car Image" />
<h3 class="card_item card_title">${name}</h3>
</div>
<div class="card__body">
    <div  class="card__Button"  ><button class="cardbtn" id=${_id}>Add To Cart</button></div>
   
  
  <hr>
  <div class="card_item card_description">
  <h3 class="card_item card_title">$${price}/-</h3>
  
  </div>
  
</div>
</div>
`;

  return card;
}

function populateEditForms5(currentId) {
  fetch(`https://real-pink-bass-hose.cyclic.app/product/${currentId}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // handle error
    })
    .then((data) => {
      let load = {

      age:data[0].age,
      brand: data[0].brand,
      category: data[0].category,
      color: data[0].color,
      gender: data[0].gender,
      img: data[0].img,
      material: data[0].material,
      name: data[0].name,
      neck:data[0].neck,
      pattern: data[0].pattern,
      price:  data[0].price,
      quantity:data[0].quantity,
      sleeve: data[0].sleeve,
      type: data[0].type 
    }

      // console.log(data[0]);

      registerUser(load);
      function registerUser(load) {
        fetch("https://real-pink-bass-hose.cyclic.app/cart/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify(load),
        })
          .then((response) => response.json())
          .then((data1) => {
            console.log(data1);
            alert("Product is Added in Cart");
          })
          .catch((error) => {
            console.error(error);
            alert("Product is Already in Cart");
          });
      }
    })
    .catch((error) => {
      // handle error
    });
}

function SortBox() {
  let sel = document.querySelector("#sortfilter").value;
  if (sel == "desc") {
    bag.sort((a, b) => b.price - a.price);
  }
  if (sel == "asc") {
    bag.sort((a, b) => a.price - b.price);
  }
  if (sel == "descorder") {
    bag.sort((a, b) => b.name.localeCompare(a.name));
    console.log(bag);
  }
  if (sel == "ascorder") {
    bag.sort((a, b) => a.name.localeCompare(b.name));
    console.log(bag);
  }
  renderCardList(bag);
}

function search() {
  let q = document.querySelector("#searchbar").value;

  let newData = bag.filter(function (elem) {
    return elem.name.toLocaleLowerCase().includes(q.toLocaleLowerCase());
  });

  renderCardList(newData);
}

// filter codes
const categoryCheckboxes = document.querySelectorAll(
  'input[name="checkbox-filter-1"]'
);

let previousCategories = [];

categoryCheckboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    // Get all the selected category values
    const selectedCategories = [];
    categoryCheckboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
        selectedCategories.push(checkbox.value);
      }
    });

    // If no categories are selected, show all products
    if (selectedCategories.length === 0) {
      selectedCategories = previousCategories;
    }

    // Update the display with the selected categories
    populateEditForms(selectedCategories);
    previousCategories = selectedCategories;
  });
});

function populateEditForms(brands) {
  let url = "https://real-pink-bass-hose.cyclic.app/product/bran?";
  brands.forEach((brand, index) => {
    url += `brand=${brand}`;
    if (index < brands.length - 1) {
      url += "&";
    }
  });
  fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // handle error
    })
    .then((data) => {
      renderCardList(data);
    })
    .catch((error) => {
      // handle error
    });
}

// categoryCheckboxes.forEach(function(checkbox) {
//   checkbox.addEventListener('change', function() {

//     const selectedCategories = [];
//     categoryCheckboxes.forEach(function(checkbox) {
//       if (checkbox.checked) {
//         selectedCategories.push(checkbox.value);
//       }

//     });

//      populateEditForms(selectedCategories);
//      console.log(selectedCategories)
//   });
// });

// function populateEditForms(brands) {
//   let url = "https://real-pink-bass-hose.cyclic.app/product/bran?";
//   brands.forEach((brand, index) => {
//     url += `brand=${brand}`;
//     if (index < brands.length - 1) {
//       url += "&";
//     }
//   });
//   fetch(url, {
//     method: "GET",
//     headers: {
//       "content-type": "application/json",
//       Authorization: localStorage.getItem("token"),
//     },
//   })
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       }

//     })
//     .then((data) => {
//       renderCardList(data);
//     })
//     .catch((error) => {

//     });
// }

const categoryCheckboxes1 = document.querySelectorAll(
  'input[name="checkbox-filter-3"]'
);

// sleeve filter
categoryCheckboxes1.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    // Get all the selected category values
    const selectedCategories1 = [];
    categoryCheckboxes1.forEach(function (checkbox) {
      if (checkbox.checked) {
        selectedCategories1.push(checkbox.value);
      }
    });
    // Update the display with the selected categories
    populateEditForms1(selectedCategories1);
    console.log(selectedCategories1);
  });
});

function populateEditForms1(brands) {
  let url = "https://real-pink-bass-hose.cyclic.app/product/slev?";
  brands.forEach((brand, index) => {
    url += `sleeve=${brand}`;
    if (index < brands.length - 1) {
      url += "&";
    }
  });
  fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // handle error
    })
    .then((data) => {
      renderCardList(data);
    })
    .catch((error) => {
      // handle error
    });
}

const categoryCheckboxes2 = document.querySelectorAll(
  'input[name="checkbox-filter-4"]'
);

categoryCheckboxes2.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    // Get all the selected category values
    const selectedCategories2 = [];
    categoryCheckboxes2.forEach(function (checkbox) {
      if (checkbox.checked) {
        selectedCategories2.push(checkbox.value);
      }
    });
    // Update the display with the selected categories
    populateEditForms2(selectedCategories2);
    console.log(selectedCategories2);
  });
});

function populateEditForms2(brands) {
  let url = "https://real-pink-bass-hose.cyclic.app/product/patt?";
  brands.forEach((brand, index) => {
    url += `pattern=${brand}`;
    if (index < brands.length - 1) {
      url += "&";
    }
  });
  fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // handle error
    })
    .then((data) => {
      renderCardList(data);
    })
    .catch((error) => {
      // handle error
    });
}

const categoryCheckboxes3 = document.querySelectorAll(
  'input[name="checkbox-filter-5"]'
);

categoryCheckboxes3.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    // Get all the selected category values
    const selectedCategories3 = [];
    categoryCheckboxes3.forEach(function (checkbox) {
      if (checkbox.checked) {
        selectedCategories3.push(checkbox.value);
      }
    });
    // Update the display with the selected categories
    populateEditForms3(selectedCategories3);
    console.log(selectedCategories3);
  });
});

function populateEditForms3(brands) {
  let url = "https://real-pink-bass-hose.cyclic.app/product/mat?";
  brands.forEach((brand, index) => {
    url += `material=${brand}`;
    if (index < brands.length - 1) {
      url += "&";
    }
  });
  fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // handle error
    })
    .then((data) => {
      renderCardList(data);
    })
    .catch((error) => {
      // handle error
    });
}

function handlefilter() {
  const minPrice = document.getElementById("lower").value;
  const maxPrice = document.getElementById("upper").value;

  populateEditForms4(minPrice, maxPrice);

  function populateEditForms4(minPrice, maxPrice) {
    let url = `https://real-pink-bass-hose.cyclic.app/product/price?minPrice=${minPrice}&maxPrice=${maxPrice}`;
    fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((data) => {
        renderCardList(data);
      })
      .catch((error) => {
        // handle error
      });
  }
}


const username = localStorage.getItem("username");

// Update the content of the element with the username
const usernameElement = document.getElementById("usernamedisplay");
if (usernameElement) {
  usernameElement.textContent = (username || "Login/Register");
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
  window.open("index.html", "_blank");
});