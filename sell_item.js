  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
  });
  
  // window.onload = function(){
  //   checkIfUserLoggedIn()
  // }
  
  // function checkIfUserLoggedIn(){
  //   const user = firebase.auth().currentUser
  //   if (user) {
  //     console.log('logged in')
  //   } else {
  //     console.log('not logged in')
  //   }
  // }

  const sellButton = document.querySelector("#sell_item_button")

  sellButton.addEventListener("click", e => {
    console.log('click')
    /*const condition = document.querySelector("#condition_set").value
    console.log('condition: ' + condition)
    const category = document.querySelector("#category_set").value
    console.log('category: ' + category)*/
    const price = document.querySelector("#item_price").value
    console.log('price: ' + price)
    const item_name = document.querySelector("#item_name").value
    console.log('item_name: ' + item_name)
    const description = document.querySelector("#item_description").value
    console.log('description :' + description)
    const image = document.querySelector("#image_file").files[0]
    console.log(image)
//removed category and condition from both function parameters below
    uploadItemToFirebase(item_name, price, description, image)
  })

  function uploadItemToFirebase(item_name, price, description, image) {
    console.log('hello')
    const userId = auth.currentUser.uid
    const username = auth.currentUser.displayName
    const productRef = database.collection('products').doc()
    const productId = productRef.id
    console.log(productId)
    console.log(userId)
    console.log(username)
    const data = {
      sellerid: userId,
      sellername: username,
      name: item_name,
      description: description,
      price: price,
      //category: category,
      //condition: condition,
      imageURL: null,
      boughtby: null
    }
    productRef.set(data)
      .then(res => {
        console.log(res)
        const file = image
        const storageRef = storage.ref()

        // Create the file metadata
        var metadata = {
          contentType: 'image/jpeg'
        }

        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = storageRef.child('images/' + file.name).put(file, metadata)

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused')
                break
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running')
                break
            }
          },
          function(error) {

            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break

              case 'storage/canceled':
                // User canceled the upload
                break

              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break
            }
          },
          function() {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              console.log('File available at', downloadURL)
              const currentProductRef = database.collection('products').doc(productId)
              .set({
                imageURL: downloadURL
              }, {merge: true})
              .then( res => {
                console.log('success')
                window.location.href = "dashboard.html"

              })
              .catch( err => console.log(err))
              
            })
          })
      })
      .catch(err => {
        console.log(err)
      })
  }
  