let burger = document.querySelector('#navbar-burger')
let menu = document.querySelector('#navbar-menu')

burger.addEventListener("click", function(e) {
  e.preventDefault();
  menu.classList.toggle('is-active');
  burger.classList.toggle('is-active');
},false)

