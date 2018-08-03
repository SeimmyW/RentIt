let productContainer = document.querySelector("#products")
// let productsArray = []
// let marketplaceArray = []
// let newArray
window.onload = function(){
    console.log("hello")
    // checkForProducts()
    initializeApp()
    initializeVueApp()

}

function getfilter (){
  var url = window.location.href
  console.log(url)
  var params = url.split("?")
  if (params.length < 2) return ''
  console.log(params)
  var search = params[1].split("=")[1]
  console.log(search)
  return search
}


// https://codepen.io/robinhuy/pen/qjLxRq
// not as good - https://codepen.io/damonbauer/pen/bsuDy

// var shopnowbutton = document.querySelector("#shopnowbutton")
// productsArray.push(
//       {
//         image: "https://via.placeholder.com/200x150",
//         name: "PRODUCT ITEM NUMBER 1",
//         description: "Description for product item number 1",
//         price: 5.99,
//         quantity: 1
//       }    
// )
// productsArray.push(
//       {
//         image: "https://via.placeholder.com/200x150",
//         name: "PRODUCT ITEM NUMBER 2",
//         description: "Description for product item number 1",
//         price: 9.99,
//         quantity: 1
//       }    
// )

function resetMarketplace(){
  initializeVueApp()
}

const VUE_APP = new Vue({
  el: "#app",
  data () {
    return {
      products: [],
      marketplace: [],
      fee: 5,
      promotions: [
        {
          code: "29xgbuHa4O",
          discount: "50%"
        },
        {
          code: "mUxSnhywT1",
          discount: "40%"
        },
        {
          code: "nDdViZL4l3",
          discount: "30%"
        }
      ],
      promoCode: "",
      discount: 0
    }
  },
  computed: {
    itemCount: function() {
      var count = 0;

      for (var i = 0; i < this.products.length; i++) {
        count += parseInt(this.products[i].quantity) || 0;
      }

      return count;
    },
    subTotal: function() {
      var subTotal = 0;

      for (var i = 0; i < this.products.length; i++) {
        subTotal += this.products[i].quantity * this.products[i].price;
      }

      return subTotal;
    },
    discountPrice: function() {
      return this.subTotal * this.discount / 100;
    },
    totalPrice: function() {
      return this.subTotal - this.discountPrice + this.fee;
    }
  },
  filters: {
    currencyFormatted: function(value) {
      return Number(value).toLocaleString('en-US', {
        style: 'currency', 
        currency: 'USD'
      });
    }
  },
  methods: {
    updateQuantity: function(index, event) {
      var value = event.target.value;
      var product = this.products[index];

      // Minimum quantity is 1, maximum quantity is 100, can left blank to input easily
      if (value === "" || (parseInt(value) > 0 && parseInt(value) < 100)) {
        product.quantity = value;
      }

      this.$set(this.products, index, product);
    },
    checkQuantity: function(index, event) {
      // Update quantity to 1 if it is empty
      if (event.target.value === "") {
        var product = this.products[index];
        product.quantity = 1;
        this.$set(this.products, index, product);
      }
    },
    removeItem: function(index) {
      this.products.splice(index, 1);
    },
    updateMarketplace: function(data, idx){
      this.$set(this.marketplace, idx, data)  
    },
    filterMarketplace: function(word){
      this.marketplace = this.marketplace.filter( product => {
        let name = product.name.toLowerCase()
        let lowerWord = word.toLowerCase()
        if (name.includes(lowerWord)) {
          return true
        } else {
          return false
        }
      })
    },
    addItem: function(productInfo) {
      let product = {
        image: productInfo.imageURL,
        name: productInfo.name,
        description: productInfo.description,
        price: productInfo.price,
        seller: productInfo.sellername,
        quantity: 1
      }         
      this.products.push(product)
    },
    checkPromoCode: function() {
      for (var i = 0; i < this.promotions.length; i++) {
        if (this.promoCode === this.promotions[i].code) {
          this.discount = parseFloat(
            this.promotions[i].discount.replace("%", "")
          );
          return;
        }
      }

      alert("Sorry, the Promotional code you entered is not valid!");
    }
  }
});            


function initializeVueApp(){
    let shopping_cart_app = document.querySelector('#shopping_cart_app')
    let filter = getfilter()
    console.log(filter)
    const query = firebase.firestore().collection('products')
    .get()
    .then( snapshot => {
        if (snapshot.size) {
            snapshot.docs.forEach( (doc, idx) => VUE_APP.updateMarketplace(doc.data(), idx))
        }
        VUE_APP.filterMarketplace(filter)
    })
    // shopping_cart_app.classList.add('hidden')
}

// function checkForProducts() {
//     const query = firebase.firestore().collection('products')
//         .get()
//         .then(snapshot => {
//             console.log("hello")
//             if (snapshot.size) {
//                 snapshot.forEach(doc => {
//                     console.log('hi2')
//                     let productInfo = doc.data()
//                     console.log(productInfo)
//                     updateMarketplaceWithProduct(productInfo)
//                 })
//             }
//         })
// }


// function updateMarketplaceWithProduct(productInfo) {
//     console.log('updating product '+ productInfo.name)
//     productContainer.innerHTML += `
//     <li class="catCardList">
//         <div class="catCard"><a href="#"><img style = "height:200; width: 221" src="${productInfo.imageURL}" alt="${productInfo.name}"></a>
//             <div class="lowerCatCard">
//                 <h3>${productInfo.name}</h3>
//                 <div class="startingPrice">$${productInfo.price}/day</span></div>
//                 <p>${productInfo.description}</p>
//                 <h4>Sold by:</h4>
//                 <ul>
//                 <li><b>${productInfo.sellername}</b></li>
//                 </ul>
//                 <div id="catCardButton" class="button"><a @click="addItem(${productInfo})">Add to Cart</a></div>
//             </div>
//         </div>
//     </li>
//     `;
// }

