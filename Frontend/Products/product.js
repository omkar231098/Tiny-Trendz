
// maindata javascript

window.addEventListener("load", () => {
  fetchAndRenderEmployees();
});

let mainSection = document.getElementById("data-list-wrapper");

function fetchAndRenderEmployees() {
  fetch("http://localhost:4500/product/", {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

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
        .map((item) => getCard(item._id,item.img,item.price,item.category,item.brand,
           item.name,  item.color, item.age, item.quantity, item.sleeve, item.neck ,
           item.type,item.pattern,item.material,item.gender,
           item.userID))
        .join("")}
    </div>
  `;

  mainSection.innerHTML = cardList;

  const buttons = document.querySelectorAll(".card__Button1");

  buttons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const currentId = event.target.id;
      populateEditForms(currentId);
      // console.log(`Clicked button id: ${currentId}`);
    });
  });

  const buttons1 = document.querySelectorAll(".card__Button");

  buttons1.forEach((button) => {
    button.addEventListener("click", function (event) {
      const currentId = event.target.id;
      populateEditForms1(currentId);
      // console.log(`Clicked button id: ${currentId}`);
    });
  });
}

function getCard(_id, name,img, price,category,brand,color,age,quantity,sleeve,neck,type,pattern,material,gender) {
  let card = `
<div class="card" id="cardhover" data-id=${_id} >
<div class="card__img">

<img width="100%" src="https://cdn.fcglcdn.com/brainbees/images/products/300x364/13104089a.webp" alt="Car Image" />
<h3 class="card_item card_title">${name}</h3>
</div>
<div class="card__body">
    <div  class="card__Button"  ><button class="cardbtn" id=${_id}>Add To Cart</button></div>
   
  
  <hr>
  <div class="card_item card_description">
   Your Price $${price}
  </div>
  
</div>
</div>
`;

  return card;
}