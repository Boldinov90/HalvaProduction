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

// ================    Функция отправки данных из формы обратной связи на почту     ====================
// =====================================================================================================
document.addEventListener('DOMContentLoaded', function(){
   // ================    Отображение формы отзыва на странице     ====================
   // =====================================================================================================
   // Находим обертку формы
   const formOverlay = document.getElementById('form');
   // Находим форму
   const form = document.getElementById('form__body');
   // Находим форму reaction 
   const formReaction = document.getElementById('form__body-reaction');
   // Находим все кнопки "Связаться с нами"
   const btns = document.querySelectorAll(".btn");
   // Проходим циклом по массиву
   for(let btn of btns){
      // Слушаем клик по кнопке
      btn.addEventListener("click", function(){
         // Делаем обертку с формой видимой
         formOverlay.style.display = 'block';
         // Запрещаем скроллинг страницы
         document.querySelector('body').classList.toggle("no-scroll");
      })
   }
   // Слушаем любой клик
   document.addEventListener('click', function(e){
      // Если клик был сделан по обертке
      if(e.target.classList.contains('form__overlay') || e.target.classList.contains('form-close')){
         // Скрываем обертку вместе с формой
         formOverlay.style.display = 'none';
         // Разрешаем скроллинг страницы
         document.querySelector('body').classList.toggle("no-scroll");
      }
   });
   // Слушаем событие отправка формы
   form.addEventListener('submit', formSend);
   async function formSend(e){
       // Отменяем стандартное поведение браузера
       e.preventDefault();
       // Проверяем валидацию (заполнение полей ввода)
       let error = formValidate(form);
       // Если все поля заполнены (нет ошибок)
       let formData = new FormData(form);
       // formData.append('upload', formImage.files[0]);
       if(error === 0){
           // анимация ожидания
           form.classList.add('_sending');
           let response = await fetch('sendform.php', {
               method: 'POST',
               body: formData
           });
           // Проверка получения ответа
           if(response.ok){
               // Очищаем поля ввода
               form.reset();
               // Удаляем класс с анимацией ожидания
               form.classList.remove('_sending');
               // Скрываем форму
               form.style.display = 'none';
               // Отображаем оповещение об отправке
               formReaction.style.display = 'flex';
               // Меняем отображение форм через 2,5 секунды
               setTimeout(() => {  
                   form.style.display = 'flex';
                   formReaction.style.display = 'none';
                   formOverlay.style.display = 'none';
               }, 2500);
           }else{
               alert('Ошибка');
               // Удаляем класс с анимацией ожидания
               form.classList.remove('_sending');
           }
       }else{
           alert('Пожалуйста, заполните обязательные поля');
       }
   }
   // Проверка валидации полей ввода
   function formValidate(){
       let error = 0;
       let formReq = document.querySelectorAll('._req');
       for(let index = 0; index < formReq.length; index++){
           const input = formReq[index];
           formRemoveError(input);
           if(input.value === ""){
               formAddError(input);
               error++;
           }
       }
       return error;
   }
   function formAddError(input){
       input.parentElement.classList.add('_error');
       input.classList.add('_error');
   }
   function formRemoveError(input){
       input.parentElement.classList.remove('_error');
       input.classList.remove('_error');
   }
});









