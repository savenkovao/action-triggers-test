'use strict';

(function () {
    /* INSERT DETECTOR, CONFIG, GLASSVOX */


    [
        '/action-triggers-test/stud/scripts/detector-config.js',

        // ...localStorage.getItem('localLibs') ?
        //     [
                '/action-triggers-test/stud/scripts/detector-libs/detector-bootstrap.min.js',
                '/action-triggers-test/stud/scripts/detector-libs/glassvox.min.js'
            // ]
            // : [
            //     'https://gb-qa-detector.s3.us-east-2.amazonaws.com/7.2/detector-bootstrap.min.js',
            //     'https://gb-qa-detector.s3.us-east-2.amazonaws.com/7.2/glassvox.min.js'
            // ]

    ].forEach((src, i) => {
        let script = document.createElement('script');
        script.setAttribute('src', src);
        i > 0 && script.setAttribute('async', '');
        script.setAttribute('type', 'text/javascript');
        document.head.appendChild(script);
    });

    /* INSERT DETECTOR, CONFIG, GLASSVOX */

    /* INSERT QUALTRICS IFRAME */
    const isQualtricsEnabled = Boolean(localStorage.getItem('qualtricsEnabled'));
    if (isQualtricsEnabled) {
        var section = document.getElementsByTagName('section')[0];
        var iframe = document.createElement('iframe');
        var container = document.createElement('div');
        var h2 = document.createElement('h2');
        h2.innerHTML = 'QUALTRICS injected';


        iframe.setAttribute('src', 'https://glassboxpartner.qualtrics.com/jfe/form/SV_eJ8fX5JtTv5M290'); // OLD from may
        // iframe.setAttribute('src', 'https://glassboxpartner.qualtrics.com/jfe/form/SV_7PY5RmrV2WW3MPk'); // VirginAustralia test
        iframe.setAttribute('min-width', '300px');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '800px');

        container.appendChild(h2);
        container.appendChild(iframe);
        section.appendChild(container);
        console.log('QUALTRICS injected - Guardians test Qualtrics form');
    }
    /* INSERT QUALTRICS IFRAME */

    /* INSERT BUTTONS */
    function insertButtons() {
        let container = document.createElement('div');

        ['RESPONDED SURVEY', 'IGNORED SURVEY'].forEach((name, i) => {
            let button = document.createElement('button');
            button.innerHTML = name;
            let modeClass = ['alert-info', 'alert-warning'][i];
            button.classList = 'btn ' + modeClass;

            button.addEventListener('click', () => {
                let tagline = document.createElement('div');
                tagline.classList = 'alert voc-session-mode ' + modeClass;
                tagline.innerHTML = name;
                container.appendChild(tagline);
            });

            container.appendChild(button);
        });

        document.getElementById('head').prepend(container);
    }

    insertButtons();
    /* INSERT BUTTONS */

    //Dropdown menu (mobile)
    var currentScreenWidth = document.documentElement.clientWidth;
    var previousScreenWidth;
    var mobileMenuButton = document.querySelectorAll('.mobile-menu')[0];
    var headerMenuMobile = document.querySelectorAll('.header-menu-mobile')[0];
    var headerLogoMobile = document.querySelectorAll('.header-logo-mobile')[0];
    var logoBlock = document.querySelectorAll('.logo-block')[0];
    var mainCounter = 0;
    var burgerMenuWhiteIcon = 'mobile-menu-white_icon';
    var logoWhiteIcon = 'logo-block-white_icon';
    var mobileMenuBackground;
    var networksLink = document.querySelectorAll('.networks-link')[0];
    var header = document.getElementsByTagName('header')[0];
    var headerMenu = document.querySelectorAll('.header-menu')[0];
    var fixedHeader = document.querySelectorAll('.fixed-header')[0];
    var goUpButton = document.querySelectorAll('.btn_go_up')[0];


    setFooterText();

    createBlockMenuBackground();

    setCurrentScreenWidth();

    setNewClasses();


    // Ф-ция-событие включения-выключения (выдвигания-задвигания)
    // мобильного меню

    mobileMenuButton.onclick = function () {
        mainCounter++;

        if (mainCounter % 2 == 0) {
            hideMobileMenu();
        } else {
            showMobileMenu();
        }

    };

    window.addEventListener('resize', resizeFunction);


    window.onscroll = function () {
        setCurrentScreenWidth();

        if (currentScreenWidth > 768) {
            var scrolled = window.pageYOffset;

            if (scrolled >= 50) {
                narrowHeaderMenu();
            } else {
                extendHeaderMenu();
            }
        }
    };


    // Ф-ция для редакции текста в футере

    function setFooterText() {
        var date = new Date();
        if (currentScreenWidth > 768) {
            networksLink.innerHTML = '© 2000 – ' + date.getFullYear() + ' "Профком студентов ОГАСА"';
        } else {
            networksLink.innerHTML = '© 2000 – ' + date.getFullYear() + ' "ППОС ОГАСА"';
        }
    }


    // Функция создания фонового блока для мобильного меню

    function createBlockMenuBackground() {
        mobileMenuBackground = document.createElement('div');
        mobileMenuBackground.classList.add('mobile-menu-background');
        headerLogoMobile.appendChild(mobileMenuBackground);
    }


    // Ф-ция для установления текущей и предыдущей ширины экрана

    function setCurrentScreenWidth() {
        previousScreenWidth = currentScreenWidth;
        currentScreenWidth = document.documentElement.clientWidth;
    }


    // Функция, присваивающая новые классы для корректного отображения
    // мобильного меню (Без скрипта меню выглядит иначе)

    function setNewClasses() {
        if (currentScreenWidth <= 768) {
            mobileMenuBackground.classList.add('mobile-menu-background-hidden');
            headerMenuMobile.classList.add('header-menu-mobile-hidden');
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

    function resizeFunction() {
        setCurrentScreenWidth();
        mainCounter = 0;
        setFooterText();

        // headerMenuMobile.style.transition = "none";

        if (previousScreenWidth <= 768) {

            if (currentScreenWidth <= 768) {

                // Из мобильного в мобильный
                enableDropMenu();

            } else {

                // Из мобильного в десктоп
                mobileMenuButton.classList.remove('mobile-menu-enabled');
                hideMobileMenu();

            }

        } else {

            if (currentScreenWidth <= 768) {

                // из десктоп в мобильный
                setNewClasses();
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
