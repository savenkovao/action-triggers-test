'use strict';

(function () {
    /* TODO:
    *   1. Add storage clear buttons localStorage.clear()
    *   2. Add detector libs version name input
    *   3. Add separate instance for Qualtrics/Alerts/etc
    *   3. Add Qualtrics toggle
    *
    * */

    /*_***************************************_GB_SCRIPTS_***************************************_*/
    addGBControlsContainer();
    insertDetectorScripts();
    insertQualtricsIframe();
    addCacheClearControls();
    insertButtons();

    /* INSERT DETECTOR, CONFIG, GLASSVOX */
    function insertDetectorScripts() {
        let container = document.createElement('div');
        container.setAttribute('id', 'gb-detector-versions');
        let title = document.createElement('h4');
        title.innerHTML = 'Libs versions';
        container.appendChild(title);
        document.getElementById('gb-control-panel').append(container);

        [
            '/action-triggers-test/stud/scripts/detector-config.js',
            // ...localStorage.getItem('localLibs') ?
            //     [
            'https://savenkovao.github.io/action-triggers-test/stud/scripts/detector-libs/7.2.224/detector-bootstrap.min.js',
            'https://savenkovao.github.io/action-triggers-test/stud/scripts/detector-libs/7.2.224/glassvox.min.js'
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
    }

    /* INSERT GB CONTROLS CONTAINER */
    function addGBControlsContainer() {
        let container = document.createElement('div');
        container.setAttribute('id', 'gb-control-panel');
        container.classList.add('well');
        document.getElementById('head').prepend(container);
    }

    /* INSERT QUALTRICS IFRAME */
    function insertQualtricsIframe() {
        const isQualtricsEnabled = localStorage.getItem('qualtricsEnabled') === 'true';

        let container = document.createElement('div');
        container.setAttribute('id', 'gb-qualtrics-toggle');

        let title = document.createElement('h4');
        title.innerHTML = 'Qualtrics iframe toggle';
        container.appendChild(title);
        document.getElementById('gb-control-panel').append(container);

        let dropdown = document.createElement('select');
        dropdown.classList.add('input-sm');
        dropdown.setAttribute('id', 'gb-qualtrics-toggle-select');
        dropdown.setAttribute('placeholder', 'Show Qualtrics iframe');
        dropdown.innerHTML =
            `<option value="" disabled selected>Select your option</option>`
            + [
                'true',
                'false'
            ].map((i) => `<option value="${i}">${i}</option>`).join('\n');

        console.log({ isQualtricsEnabled });
        dropdown.value = isQualtricsEnabled.toString();

        dropdown.addEventListener('change', e => {
            localStorage.setItem('qualtricsEnabled', `${e.target.value === 'true'}`);
        });

        container.appendChild(dropdown);

        if (isQualtricsEnabled) {
            let section = document.getElementsByTagName('section')[0];
            let iframe = document.createElement('iframe');
            let container = document.createElement('div');
            let h2 = document.createElement('h2');
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
    }

    /* CLEAR CACHE CONTROLS */
    function addCacheClearControls() {
        let container = document.createElement('div');
        container.setAttribute('id', 'gb-clear-cache');
        let title = document.createElement('h4');
        title.innerHTML = 'Clear cache';

        let dropdown = document.createElement('select');
        dropdown.classList.add('input-sm');
        dropdown.setAttribute('id', 'gb-clear-cache-select');
        dropdown.setAttribute('placeholder', 'Select cache to clear');
        dropdown.innerHTML =
            `<option value="" disabled selected>Select your option</option>`
            + [
                'clear_local_storage',
                'clear_session_storage',
                'clear_cookies',
                'clear_all'
            ].map((i) => `<option value="${i}">${i}</option>`).join('\n');

        let button = document.createElement('button');
        button.innerHTML = 'Clear storage';
        dropdown.setAttribute('id', 'gb-clear-cache-btn');
        button.classList = 'btn btn-sm btn-danger';

        button.addEventListener('click', () => {
            const value = dropdown.value;

            switch (value) {
                case 'clear_local_storage': {
                    localStorage.clear();
                    break;
                }
                case 'clear_session_storage': {
                    sessionStorage.clear();
                    break;
                }
                case 'clear_cookies': {
                    deleteAllCookies();
                    break;
                }
                case 'clear_all': {
                    localStorage.clear();
                    sessionStorage.clear();
                    deleteAllCookies();
                    break;
                }
            }
            console.log(value);
        });

        container.appendChild(title);
        container.appendChild(dropdown);
        container.appendChild(button);
        document.getElementById('gb-control-panel').append(container);

        function deleteAllCookies() {
            document.cookie
                .split(';')
                .forEach(c => {
                    document.cookie = c.replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
                });
        }
    }

    /* INSERT BUTTONS */
    function insertButtons() {
        let container = document.createElement('div');
        container.setAttribute('id', 'gb-action-buttons');
        let title = document.createElement('h4');
        title.innerHTML = 'Action Buttons';
        container.appendChild(title);

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

        document.getElementById('gb-control-panel').append(container);
    }

    /*_***************************************_GB_SCRIPTS_***************************************_*/

    /* OLD website functionality scripts */
    initStudProfkomPlugins();

    function initStudProfkomPlugins() {
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
    }

    /* OLD website functionality scripts */
}());