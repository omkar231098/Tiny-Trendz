window.addEventListener("load", () => {
    fetchAndRenderEmployees();
  });

let mainSection = document.getElementById("data-list-wrapper");

let UpdateCarbtn = document.getElementById("updatebtn");

let Updatename = document.getElementById("Update-product-name");
let Updateimg = document.getElementById("Update-product-img");
let Updateprice = document.getElementById("Update-product-price");
let UpdateCategory = document.getElementById("Update-product-category");
let Updatebrand = document.getElementById("Update-product-brand");

let Updatecolor = document.getElementById("Update-product-color");
let Updateage = document.getElementById("Update-product-age");
let Updatequantity = document.getElementById("Update-product-quantity");
let Updatesleeve = document.getElementById("Update-product-sleeve");

let Updateneck = document.getElementById("Update-product-neck");
let Updatetype = document.getElementById("Update-product-type");
let Updatepattern = document.getElementById("Update-product-pattern");

let Updatematerial = document.getElementById("Update-product-material");
let Updategender= document.getElementById("Update-product-gender");

let AddProductbtn = document.getElementById("addproduct");


AddProductbtn.addEventListener("click", function (e) {
  alert("Product Has been added Successfully");

  e.preventDefault();

  let Name=document.getElementById("product-name").value;
  let Img=document.getElementById("product-img").value;
  let Price=document.getElementById("product-price").value;
  let Category=document.getElementById("product-category").value;
  let Brand=document.getElementById("product-brand").value;
  let Color=document.getElementById("product-color").value;
  let Age=document.getElementById("product-age").value;
  // let Quantity=document.getElementById("product-quantity").value;
  let Sleeve=document.getElementById("product-sleeve").value;
  let Neck =document.getElementById("product-neck").value;
  let Type=document.getElementById("product-type").value;
  let Pattern=document.getElementById("product-pattern").value;
  let Material=document.getElementById("product-material").value;
  let Gender=document.getElementById("product-gender").value;



  registerUser(Name,Img,Price,Category,Brand,Color,Age,Sleeve,Neck,Type,Pattern,Material,Gender);
});

function registerUser(Name,Img,Price,Category,Brand,Color,Age,Sleeve,Neck,Type,Pattern,Material,Gender) {
  fetch("https://real-pink-bass-hose.cyclic.app/product/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      name:Name,
      img:Img,
      price:Price,
      category:Category,
      brand:Brand,
      color:Color,
      age:Age,
      quantity:1,
      sleeve:Sleeve,
      neck:Neck,
      type:Type,
      pattern:Pattern,
      material:Material,
      gender:Gender


    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      fetchAndRenderEmployees();
    })
    .catch((error) => console.error(error));
}

















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

      mainSection.innerHTML = renderCardList(data);

      renderCardList(data);
    })
    .catch((error) => console.log(error));
}


function renderCardList(data) {
    let cardList = `
  
      <div class="card-list">
        ${data
          .map((item) => getCard(
            item._id,
            item.img,
            item.price,
            item.category,
            item.brand,
            item.name,
            item.color,
            item.age, 
            item.quantity, 
            item.sleeve,
            item.neck ,
            item.type,
            item.pattern,
            item.material,
            item.gender,
            item.userID
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

  function getCard(_id, img,price,category,brand,name,color,age,quantity,sleeve,neck,type,pattern,material,gender) {
    let card = `
    <div class="card" id="cardhover" data-id=${_id} >
    <div class="card__img">
    
    <img width="100%" src="${img}" alt="Car Image" />
    <h3 class="card_item card_title">Name - ${name}</h3>
    
    </div>
    <div class="card__body">
        <div id="card-body1">
            <div>
                <p>Category - ${category}</p>
                <p>Brand - ${brand}</p>
                <p>Color - ${color}</p>
                <p>Age - ${age}</p>
                <p>Quantity - ${quantity}</p>
                <p>sleeveType - ${sleeve}</p>
            </div>
            <div>
                <p>NeckType - ${neck}</p>
                <p>Type - ${type}</p>
                <p>Pattern - ${pattern}</p>
                <p>Material - ${material}</p>
                <p>Gender - ${gender}</p>
                <p>Price - ${price}/-</p>
            </div>
        </div>
        
        <hr>

        <div id="editbtn" >
         <div  class="card__Button"  ><button class="cardbtn" id=${_id}>Update</button></div>
        <div  class="card__Button1"  ><button  class="cardbtn1" id=${_id} >Delete</button></div> 
        </div> 
       
      
      
      
      
    </div>
    </div>
  `;
  
    return card;
  }


  // delete product
  function populateEditForms(currentId) {
    fetch(`https://real-pink-bass-hose.cyclic.app/product/delete/${currentId}`, {
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
      alert("Product has been Deleted");
    fetchAndRenderEmployees();
  }

  // update the product

  function populateEditForms1(currentId) {
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
        UpdateProductIDValue = data[0]._id;
  
        Updatename.value = data[0].name;
        Updateprice.value = data[0].price;
        Updateimg.value= data[0].img;
        UpdateCategory.value= data[0].category
        Updatebrand.value= data[0].brand

        Updatecolor.value= data[0].color
        Updateage.value= data[0].age
        Updatequantity.value= data[0].quantity
        Updatesleeve.value= data[0].sleeve
        Updateneck.value= data[0].neck
        Updatetype.value= data[0].type

        Updatepattern.value=data[0].pattern
        Updatematerial.value= data[0].material
        Updategender.value= data[0].gender
        
  
        
  
        version = data[0].__v;
      })
      .catch((error) => {
        // handle error
      });
  }



  UpdateCarbtn.addEventListener("click", function (e) {
 
  e.preventDefault();
  let UpdateCarIdValue =  UpdateProductIDValue;

  // let UpdateCarNameValue = UpdateCarName.value;
  // let UpdateCarPriceValue = UpdateCarPrice.value;

  let userObj = {
    name:  Updatename.value,
    price: + Updateprice.value,
    img:Updateimg.value,
    category:UpdateCategory.value,
    brand:Updatebrand.value,
    color:  Updatecolor.value,
    age: +Updateage.value,
    quantity: +Updatequantity.value,
sleeve: Updatesleeve.value,
neck: Updateneck.value,
type: Updatetype.value,
pattern:Updatepattern.value,
material:Updatematerial.value,
gender:   Updategender.value,

    __v: version,
    _id: UpdateCarIdValue,
  };

  fetch(`https://real-pink-bass-hose.cyclic.app/product/update/${UpdateCarIdValue}`, {
    method: "PUT",
    body: JSON.stringify(userObj),
    headers: {
      "Content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  })
    .then((res) => res.json())
    .then((data) => {}
    
     
    );
    alert("Update the Product Data Successfully");
  fetchAndRenderEmployees();

});
