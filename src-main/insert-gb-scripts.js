'use strict';

export function initGbScripts() {
    /*_***************************************_GB_SCRIPTS_***************************************_*/
    addGBControlsContainer();
    addDetectorConfig();
    insertDetectorScripts();
    insertQualtricsIframe();
    addCacheClearControls();
    addPageReloadControl();
    // insertButtons();

    function isRecordedPage() {
        return location.pathname !== '/action-triggers-test/';
    }

    /* DETECTOR CONFIG */
    function addDetectorConfig() {
        let container = document.createElement('div');
        container.setAttribute('id', 'gb-reporting-url');

        let title = document.createElement('h4');
        title.innerHTML = 'reportURI';
        container.appendChild(title);
        document.getElementById('gb-control-panel').append(container);

        let reportURI = localStorage.getItem('gbReportURI') || 'https://report.dev-mt-eks.glassboxrnd.com/f3lx7s0z/reporting/1ba66434-62b3-a15f-d5a7-e1c6e1ce35d2/cls_report';

        let reportUriInput = document.createElement('input');
        reportUriInput.setAttribute('id', 'gb-report-uri-input');
        reportUriInput.classList.add('form-control');
        reportUriInput.setAttribute('placeholder', 'https://report.dev-mt-eks.glassboxrnd.com/f3lx7s0z/reporting/1ba66434-62b3-a15f-d5a7-e1c6e1ce35d2/cls_report');
        reportUriInput.value = reportURI;

        let reportUriInputLabel = document.createElement('label');
        reportUriInputLabel.innerHTML = '_cls_config.reportURI, e.g.: https://report.dev-mt-eks.glassboxrnd.com/f3lx7s0z/reporting/1ba66434-62b3-a15f-d5a7-e1c6e1ce35d2/cls_report';
        reportUriInputLabel.setAttribute('for', 'gb-report-uri-input');

        container.appendChild(reportUriInputLabel);
        container.appendChild(reportUriInput);

        reportUriInput.addEventListener('change', (e) => {
            localStorage.setItem('gbReportURI', e.target.value);
        });

        if (!isRecordedPage()) {
            return;
        }

        if (typeof window._cls_config === 'undefined') {
            window._cls_config = {};
        }

        window._cls_config = Object.assign({}, window._cls_config, {
            interceptAjax: true,
            valueMaskingMode: 'blacklist',
            supportRemoteClientConfig: false,
            clientAttributesEnabled: true,
            collectVoc: true,
            reportInitializeWorkerAsBlob: true,
            observeRightClick: true,
            waitForSegmentRender: 10,
            domFormAnalysisReporting: true,
            domIncludeCSSSelector: true,
            ajaxRecordStats: 'always',
            ajaxRecordResponseHeaders: 'always',
            ajaxRecordRequestHeaders: 'always',
            ajaxRecordResponseBody: 'always',
            ajaxRecordRequestBody: 'always',
            ajaxRecordMetadata: 'always',
            ajaxCaptureRequestCookie: true,
            recordAjaxCallsAnyway: true,
            iframesAutoInject: true,
            ajaxTimeoutForResourceData: 0,
            reportUseWorker: false,
            reportURI: reportURI
        });

    }

    /* INSERT DETECTOR, CONFIG, GLASSVOX */
    function insertDetectorScripts() {
        let container = document.createElement('div');
        container.setAttribute('id', 'gb-detector-versions');

        let title = document.createElement('h4');
        title.innerHTML = 'Libs versions';
        container.appendChild(title);

        let detectorPath = localStorage.getItem('gbDetectorPath') || 'https://gb-qa-detector.s3.us-east-2.amazonaws.com/7.2/';
        let detectorPathInput = document.createElement('input');
        detectorPathInput.setAttribute('id', 'gb-detector-path-input');
        detectorPathInput.classList.add('form-control');
        detectorPathInput.setAttribute('placeholder', 'https://gb-qa-detector.s3.us-east-2.amazonaws.com/7.2/224/');
        detectorPathInput.value = detectorPath;

        let detectorPathInputLabel = document.createElement('label');
        detectorPathInputLabel.innerHTML = 'Detector libs folder path, e.g.: https://gb-qa-detector.s3.us-east-2.amazonaws.com/7.2/224/';
        detectorPathInputLabel.setAttribute('for', 'gb-detector-path-input');

        container.appendChild(detectorPathInputLabel);
        container.appendChild(detectorPathInput);
        document.getElementById('gb-control-panel').append(container);

        detectorPathInput.addEventListener('change', (e) => {
            localStorage.setItem('gbDetectorPath', e.target.value);
        });


        if (!isRecordedPage()) {
            container.appendChild(
                createTagline('Libs are not attached', 'warning')
            );
            return;
        }

        [
            `${detectorPath}detector-bootstrap.min.js`,
            `${detectorPath}glassvox.min.js`
        ].forEach((src, i) => {
            let script = document.createElement('script');
            script.setAttribute('src', src);
            i > 0 && script.setAttribute('async', '');
            script.setAttribute('type', 'text/javascript');
            document.head.appendChild(script);
        });

        container.appendChild(
            createTagline('Libs are attached <strong id="gb-current-version"></strong>', 'success')
        );

        setTimeout(() => {
            document.getElementById('gb-current-version').innerHTML = `Detector version: ${window?._detector?.version}`;
        }, 2000);
    }

    /* INSERT GB CONTROLS CONTAINER */
    function addGBControlsContainer() {
        let container = document.createElement('div');
        container.setAttribute('id', 'gb-control-panel');
        container.classList = 'well container';

        let title = document.createElement('h3');
        title.innerHTML = 'GB recording setup panel';
        container.appendChild(title);

        document.getElementById('head').prepend(container);
    }

    /* INSERT QUALTRICS IFRAME */
    function insertQualtricsIframe() {
        const isQualtricsEnabled = localStorage.getItem('gbQualtricsEnabled') === 'true';

        let container = document.createElement('div');
        container.setAttribute('id', 'gb-qualtrics-toggle');

        let title = document.createElement('h4');
        title.innerHTML = 'Qualtrics iframe toggle';

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

        dropdown.value = isQualtricsEnabled.toString();

        dropdown.addEventListener('change', e => {
            container.querySelectorAll('.alert').forEach(i => i.remove());

            const currValue = e.target.value === 'true';
            localStorage.setItem('gbQualtricsEnabled', `${currValue}`);

            container.append(
                createTagline(`Qualtrics state is: ${currValue}`, currValue ? 'success' : 'warning')
            );
        });

        container.append(title, dropdown);
        document.getElementById('gb-control-panel').append(container);

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

            container.append(h2, iframe);
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
            [
                'clear_local_storage',
                'clear_session_storage',
                'clear_cookies',
                'clear_all'
            ].map((i) => `<option ${i === 'clear_all' ? 'selected' : ''} value="${i}">${i}</option>`).join('\n');

        let button = document.createElement('button');
        button.innerHTML = 'Clear storage';
        dropdown.setAttribute('id', 'gb-clear-cache-btn');
        button.classList = 'btn btn-sm btn-danger';

        button.addEventListener('click', () => {
            container.querySelectorAll('.alert').forEach(i => i.remove());
            const gbDetectorPath = localStorage.getItem('gbDetectorPath');
            const gbReportURI = localStorage.getItem('gbReportURI');

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

            gbDetectorPath && localStorage.setItem('gbDetectorPath', gbDetectorPath);
            gbReportURI && localStorage.setItem('gbReportURI', gbReportURI);

            value && container.appendChild(
                createTagline(`${value} cache is cleared`, 'warning')
            );
            console.log(value);
        });

        container.append(title, dropdown, ' ', button);
        document.getElementById('gb-control-panel').append(container);

        function deleteAllCookies() {
            document.cookie
                .split(';')
                .forEach(c => {
                    document.cookie = c.replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
                });
        }
    }

    /* RELOAD THE PAGE */
    function addPageReloadControl() {
        let container = document.createElement('div');
        container.setAttribute('id', 'gb-page-reload');

        let title = document.createElement('h4');
        title.innerHTML = 'Actions';
        container.appendChild(title);

        let buttonReload = document.createElement('button');
        buttonReload.innerHTML = 'Reload the page';
        buttonReload.classList = 'btn btn-sm btn-success';

        buttonReload.addEventListener('click', () => {
            location.reload();
        });

        let goSetupPageLink = document.createElement('a');
        goSetupPageLink.innerHTML = 'Go setup page';
        goSetupPageLink.setAttribute('href', '/action-triggers-test');
        goSetupPageLink.classList = 'btn btn-sm btn-info';

        container.append(buttonReload, ' ', goSetupPageLink);
        document.getElementById('gb-control-panel').append(container);
    }

    /* INSERT BUTTONS */
    function insertButtons() {
        let container = document.createElement('div');
        container.setAttribute('id', 'gb-action-buttons');
        let title = document.createElement('h4');
        title.innerHTML = 'Action Buttons';
        container.append(title);

        ['RESPONDED SURVEY', 'IGNORED SURVEY'].forEach((name, i) => {
            let button = document.createElement('button');
            button.innerHTML = name;
            let modeClass = ['info', 'warning'][i];
            button.classList = 'btn ' + `alert-${modeClass}`;

            button.addEventListener('click', () => {
                container.append(createTagline(name, modeClass));
            });

            container.append(button);
        });

        document.getElementById('gb-control-panel').append(container);
    }

    function createTagline(htmlString, mode) {
        let tagline = document.createElement('div');
        tagline.classList = 'alert voc-session-mode ' + `alert-${mode}`;
        tagline.innerHTML = htmlString;

        return tagline;
    }

    /*_***************************************_GB_SCRIPTS_***************************************_*/
}
