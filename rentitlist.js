
let productContainer = document.querySelector("#products")

window.onload = function(){
    console.log("hello")
    checkForProducts()
    initializeApp()
}


function checkForProducts() {
    const query = firebase.firestore().collection('products')
        .get()
        .then(snapshot => {
            console.log("hello")
            if (snapshot.size) {
                snapshot.forEach(doc => {
                    console.log('hi2')
                    let productInfo = doc.data()
                    console.log(productInfo)
                    updateMarketplaceWithProduct(productInfo)
                })
            }
        })
}


function updateMarketplaceWithProduct(productInfo) {
    console.log('updating product '+ productInfo.name)
    productContainer.innerHTML += `
    <li class="catCardList">
        <div class="catCard"><a href="#"><img style = "height:200; width: 221" src="${productInfo.imageURL}" alt="${productInfo.name}"></a>
            <div class="lowerCatCard">
                <h3>${productInfo.name}</h3>
                <div class="startingPrice">$${productInfo.price}/day</span></div>
                <p>${productInfo.description}</p>
                <h4>Sold by:</h4>
                <ul>
                <li><b>${productInfo.sellername}</b></li>
                </ul>
                <div id="catCardButton" class="button"><a href="#">Add to Cart</a></div>
            </div>
        </div>
    </li>
    `;
}

