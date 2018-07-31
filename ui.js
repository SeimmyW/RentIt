const signin = document.querySelector('#login')
const signout = document.querySelector('#logout')

signin.addEventListener("click", e => {
    signInWithGoogle()
})

signout.addEventListener("click", function(e){
    signOutWithGoogle()
})

const authDropdownItem = document.querySelector('#login')

function updateUIforSignIn(avatarSrc)
{
    authDropdownItem.innerHTML = `<img class = "avatar-image" src = "${avatarSrc}"/>`
}
function updateUIforSignOut(){
     authDropdownItem.innerHTML = `<a href="#"><b>Log In/Sign Up</b></a>`
}
