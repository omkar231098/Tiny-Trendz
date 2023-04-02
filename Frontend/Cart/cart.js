window.addEventListener("load", () => {
    fetchAndRenderEmployees();
  });

  let mainSection = document.getElementById("data-list-wrapper");
  

function fetchAndRenderEmployees() {
  fetch("https://real-pink-bass-hose.cyclic.app/cart/", {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);


      let TotalProducts = document.getElementById("valuetotal")
      TotalProducts.textContent=data.length


      let totalPrice = 0;
      data.forEach(item => {
        const quantity = item.quantity;
        const price = item.price;
        const itemTotalPrice = quantity * price;
        totalPrice += itemTotalPrice;
      });

      const message = `${totalPrice}/-`;
      
  let TotalPrice = document.getElementById("valueprice")
  TotalPrice.textContent=message


      mainSection.innerHTML = renderCardList(data);

      renderCardList(data);
    })
    .catch((error) => console.log(error));
}


function renderCardList(data) {
    let cardList = `
  
      <div class="card-list">
        ${data
          .map((item) => getCard(item._id,item.img,item.price,
             item.name
             
            ))
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


  function getCard(_id, img , price, name ) {
    let card = `
  <div class="card" id="cardhover" data-id=${_id} >
  <div class="card__img">
  
  <img width="100%" src="${img}" alt="Car Image" />
  <h3 class="card_item card_title">${name}</h3>
  </div>
  <div class="card__body">
  <div class="card_item card_description">
  <h3 class="card_item card_title">Your Price ${price}/-</h3>
     
    </div>    
  <div  class="card__Button"  ><button class="cardbtn" id=${_id}>Delete</button></div>
      <div id="adjustquantity">  
      
      <div  class="card__Button1"  ><button  class="cardbtn1" id=${_id} >+</button></div> 
      <div  class="card__Button2"  ><button  class="cardbtn1" id=${_id} >-</button></div> 
      </div>
     
    
    <hr>
    
    
  </div>
  </div>
  `;
  
    return card;
  }
  

  function populateEditForms1(currentId) {
    fetch(`https://real-pink-bass-hose.cyclic.app/cart/delete/${currentId}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((task) => {
   
      })
      .catch((error) => {
        // handle error
      });
  
    fetchAndRenderEmployees();
  }