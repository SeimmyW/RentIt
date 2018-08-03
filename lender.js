document.addEventListener('DOMContentLoaded', function() {

  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems, {});
  })
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, {});
  });


var search = document.querySelector("#search")

document.addEventListener('keypress', e => {
  let k = e.keyCode || e.which
  console.log(k)
  if (k === 13){
    window.location.href = `marketplace.html?search=${search.value}`
  }
})