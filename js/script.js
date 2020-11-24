// ============== Меню "БУРГЕР" ================
const menuToggle = document.querySelector('#menu-toggle');
const mobileNavContainer = document.querySelector('#mobile-nav');
menuToggle.onclick = function(){
   menuToggle.classList.toggle('menu-icon-active');
   mobileNavContainer.classList.toggle('mobile-nav--active');
}

// =========== Раскрывающий список блока "Секркт качества" =============
let call = document.getElementsByClassName("item-first");
for(let i = 0; i < call.length; i++){
   call[i].addEventListener("click", function(){
      let itemSecond = this.nextElementSibling;
      itemSecond.classList.toggle("hidden");
      itemSecond.classList.toggle("item-second__active");
      this.classList.toggle("item-first__active");
      if(itemSecond.classList.contains("hidden")){
         this.querySelector(".arrow-up").src = "img/vectorDown.svg"
      }else{
         this.querySelector(".arrow-up").src = "img/vectorUp.svg"
      }
   })
}

// =========== Навигация по сайту =============
const anchors = document.querySelectorAll('a[href*= "#"]')
for(let anchor of anchors){
   anchor.addEventListener("click", function(event){
      event.preventDefault();
      const blockId = anchor.getAttribute("href");
      document.querySelector('' + blockId).scrollIntoView({
         behavior: "smooth",
         block: "start" 
      })
      mobileNavContainer.classList.remove('mobile-nav--active');
      menuToggle.classList.remove('menu-icon-active');
      let active = document.querySelector(".header__menu--active");
      if(active == null){
         anchor.classList.add("header__menu--active")
      }else{
         active.classList.remove("header__menu--active");
         anchor.classList.add("header__menu--active");
      }
   })
}

// Изменение активного класса навигации при скроле
window.addEventListener("scroll", ()=>{
   let scrollDistance = window.scrollY;
   document.querySelectorAll(".section").forEach((el, i) => {
      if(el.offsetTop - (screen.height / 2) <= scrollDistance){
         document.querySelectorAll(".header__navbar a").forEach((el) => {
            if(el.classList.contains("header__menu--active")){
               el.classList.remove("header__menu--active");
            }
         });
         document.querySelectorAll(".header__navbar li")[i].querySelector("a").classList.add("header__menu--active");
      }else if(scrollDistance < document.querySelector(".welcome").clientHeight + 450){
         document.querySelectorAll(".header__navbar a").forEach((el) => {
            if(el.classList.contains("header__menu--active")){
               el.classList.remove("header__menu--active");
            }
         });
      }
   });
});

// Отмена прозрачности у хедара при скроле от 100px
window.onscroll = function() {
   let scrolled = window.pageYOffset || document.documentElement.scrollTop;
   document.getElementById('header').style.backgroundColor = scrolled < 100 ? "rgba(0, 0, 0, 0)" : "rgb(31, 31, 31)";
   document.getElementById('header').style.transitionDuration = scrolled < 100 ? "0.7s" : "0.9s";
}

// Открытие фотмы обратной связи
const btns = document.querySelectorAll(".btn");
for(let btn of btns){
   btn.addEventListener("click", function(e){
      e.preventDefault();
      // console.log('btn', btn)
      const form = document.querySelector(".form");
      form.classList.remove("hidden");
   })
}

// Закрытие формы обратной связи
document.querySelector(".form__overlay").addEventListener("click", function(e){
   if(e.target.closest(".form__body")){
   }else{
      const form = document.querySelector(".form");
      form.classList.add("hidden");
   }
})













