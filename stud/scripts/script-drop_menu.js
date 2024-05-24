"use strict";

(function () {

  //Dropdown menu (mobile)
  var currentScreenWidth = document.documentElement.clientWidth;
  var previousScreenWidth;
  var mobileMenuButton = document.querySelectorAll('.mobile-menu')[0];
  var headerMenuMobile = document.querySelectorAll('.header-menu-mobile')[0];
  var headerLogoMobile = document.querySelectorAll('.header-logo-mobile')[0];
  var logoBlock = document.querySelectorAll('.logo-block')[0];
  var mainCounter = 0;
  var burgerMenuWhiteIcon = "mobile-menu-white_icon";
  var logoWhiteIcon = "logo-block-white_icon";
  var mobileMenuBackground;
  var networksLink = document.querySelectorAll('.networks-link')[0];
  var header = document.getElementsByTagName('header')[0];
  var headerMenu = document.querySelectorAll('.header-menu')[0];
  var fixedHeader = document.querySelectorAll('.fixed-header')[0];
  var goUpButton = document.querySelectorAll('.btn_go_up')[0];




  setFooterText();

  createBlockMenuBackground ();

  setCurrentScreenWidth();

  setNewClasses ();


  // Ф-ция-событие включения-выключения (выдвигания-задвигания)
  // мобильного меню

  mobileMenuButton.onclick = function() {
    mainCounter++;

    if (mainCounter%2 == 0){  
      hideMobileMenu();    
    } else { 
      showMobileMenu();  
    }

  }

  window.addEventListener("resize", resizeFunction);


  window.onscroll = function() {
    setCurrentScreenWidth();

    if (currentScreenWidth > 768) {
      var scrolled = window.pageYOffset; 

      if (scrolled >= 50) {      
        narrowHeaderMenu();
      } else {
        extendHeaderMenu();
      }
    }  
  }


  // Ф-ция для редакции текста в футере

  function setFooterText() {
    var date = new Date();
    if(currentScreenWidth > 768){
    networksLink.innerHTML = "© 2000 – "+date.getFullYear()+" \"Профком студентов ОГАСА\"";
    } else {
    networksLink.innerHTML = "© 2000 – "+date.getFullYear()+" \"ППОС ОГАСА\"";
    } 
  }


  // Функция создания фонового блока для мобильного меню

  function createBlockMenuBackground() {
    mobileMenuBackground = document.createElement('div');
    mobileMenuBackground.classList.add("mobile-menu-background");
    headerLogoMobile.appendChild(mobileMenuBackground);
  }


  // Ф-ция для установления текущей и предыдущей ширины экрана

  function setCurrentScreenWidth(){
    previousScreenWidth = currentScreenWidth;
    currentScreenWidth = document.documentElement.clientWidth;    
  }


  // Функция, присваивающая новые классы для корректного отображения
  // мобильного меню (Без скрипта меню выглядит иначе)

  function setNewClasses() { 
    if(currentScreenWidth<=768){
    mobileMenuBackground.classList.add('mobile-menu-background-hidden');
    headerMenuMobile.classList.add("header-menu-mobile-hidden");
    mobileMenuButton.classList.add('mobile-menu-enabled');
    } 
  }


  // Ф-ция отображения мобильного меню

  function showMobileMenu() {  
    headerLogoMobile.classList.add('header-logo-mobile-transp');
    headerMenuMobile.classList.add('header-menu-mobile-visible');
    mobileMenuBackground.classList.remove('mobile-menu-background-hidden');
    logoBlock.classList.add(logoWhiteIcon);
    mobileMenuButton.classList.add(burgerMenuWhiteIcon);
    // document.body.style.overflow = "hidden"; // откл прокрутки экрана
  }


  // Ф-ция сокрытия мобильного меню

  function hideMobileMenu() {
    headerLogoMobile.classList.remove('header-logo-mobile-transp');
    headerMenuMobile.classList.remove('header-menu-mobile-visible');
    mobileMenuBackground.classList.add('mobile-menu-background-hidden');
    mobileMenuButton.classList.remove(burgerMenuWhiteIcon);  
    logoBlock.classList.remove(logoWhiteIcon);
    // document.body.style.overflow = ""; // вкл прокрутки экрана
  }


  // Ф-ция включения мобильного меню

  function enableDropMenu() {
   hideMobileMenu(); 
  }


  //Ф-ция для изменения внешнего вида меню при изменении
  // ширины экрана 

  function resizeFunction (){
    setCurrentScreenWidth();
    mainCounter = 0;
    setFooterText ();

    // headerMenuMobile.style.transition = "none";

    if(previousScreenWidth <= 768) {

      if (currentScreenWidth <= 768) {

        // Из мобильного в мобильный
        enableDropMenu();

      } else {

        // Из мобильного в десктоп
        mobileMenuButton.classList.remove('mobile-menu-enabled');
        hideMobileMenu();

      }

    } else {

      if (currentScreenWidth <= 768){

        // из десктоп в мобильный
        setNewClasses ();
        // extendHeaderMenu();

      } else {
        // из десктоп в декстоп
      }
    }
  }


  // Ф-ция сужения десктопного меню

  function narrowHeaderMenu() {  
    logoBlock.classList.add('logo-block-min');
    header.classList.add('header-min');
    headerMenu.classList.add('header-menu-min');
    headerLogoMobile.classList.add('header-logo-min');
  }


  // Ф-ция расширения десктопного меню

  function extendHeaderMenu() {
    logoBlock.classList.remove('logo-block-min');
    header.classList.remove('header-min');
    headerMenu.classList.remove('header-menu-min');
    headerLogoMobile.classList.remove('header-logo-min');
  }

}());



// window.scrollBy({ top: 100, behavior: 'smooth' });


// var scrolled;
// window.onscroll = function() {
//   scrolled = window.pageYOffset;

//   if (scrolled > 300) {
//     goUpButton.classList.add('btn_go_up-enabled');
//   }
// }

// goUpButton.onclick = function() {
//   goUpButton.classList.add('btn_go_down');
//   window.scrollTo(0,scrolled);
// }