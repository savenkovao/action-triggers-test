'use strict';

export class GbDetectorTestTools {
    static defaultClsConfig = {
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
        reportUseWorker: false
    };

    static reportUriList = [
        'https://report.dev-mt-eks.glassboxrnd.com/xutmbetq/reporting/guardians-voc-regression-testing/cls_report',
        'https://report.dev-mt-eks.glassboxrnd.com/f3lx7s0z/reporting/1ba66434-62b3-a15f-d5a7-e1c6e1ce35d2/cls_report',
        'https://report.dev-mt-eks.glassboxrnd.com/xutmbetq/reporting/guardians-voc-qualtrics-regression/cls_report',
        'https://feature-branch-report.glassboxrnd.com/feature-voc-mobile-mvp/i6kj8hip/reporting/afd5b8a4-a8ee-5316-95f3-c76460d7a994/cls_report',
    ];

    static libsList = [
        'https://gb-qa-detector.s3.us-east-2.amazonaws.com/7.2/',
        'https://gb-qa-detector.s3.us-east-2.amazonaws.com/7.2/224/',
        'https://savenkovao.github.io/action-triggers-test/stud/scripts/detector-libs/7.2.224/'
    ];

    static defaultQualtricsSurvey = 'https://glassboxpartner.qualtrics.com/jfe/form/SV_eJ8fX5JtTv5M290';

    static excludedPages = [
        '/action-triggers-test/',
        '/action-triggers-test/index.html'
    ];

    static configPage = GbDetectorTestTools.excludedPages[0];

    constructor() {
        this.addMainContainer();
        this.addDetectorConfig();
        this.insertDetectorScripts();
        this.insertQualtricsIframe();
        this.addCacheClearControls();
        this.addActionControls();
    }

    isRecordedPage() {
        return !GbDetectorTestTools.excludedPages.includes(location.pathname);
    }

    createAndAttachBlockContainer(id, titleStr) {
        let container = document.createElement('div');
        container.setAttribute('id', id);

        if (titleStr) {
            let title = document.createElement('h4');
            title.innerHTML = titleStr;

            container.appendChild(title);
        }

        document.getElementById('gb-control-panel').append(container);

        return container;
    }

    createTagline(htmlString, mode) {
        let tagline = document.createElement('div');
        tagline.classList = 'alert voc-session-mode ' + `alert-${mode}`;
        tagline.innerHTML = htmlString;

        return tagline;
    }

    /* INSERT GB TOOLS CONTAINER */
    addMainContainer() {
        let container = document.createElement('div');
        container.setAttribute('id', 'gb-control-panel');
        container.classList = 'well container';

        let title = document.createElement('h3');
        title.innerHTML = 'GB recording setup panel';
        container.appendChild(title);

        document.getElementById('head').prepend(container);
    }

    /* ADD DETECTOR CONFIG */
    addDetectorConfig() {
        const container = this.createAndAttachBlockContainer('gb-reporting-url', 'reportURI');

        const reportURI = localStorage.getItem('gbReportURI') || GbDetectorTestTools.reportUriList[0];
        const reportUriInput = document.createElement('input');
        reportUriInput.setAttribute('id', 'gb-report-uri-input');
        reportUriInput.setAttribute('placeholder', GbDetectorTestTools.reportUriList[0]);
        reportUriInput.classList.add('form-control');
        reportUriInput.value = reportURI;

        const reportUriInputLabel = document.createElement('label');
        reportUriInputLabel.innerHTML = '_cls_config.reportURI';
        reportUriInputLabel.setAttribute('for', 'gb-report-uri-input');

        const examplesList = document.createElement('pre');
        examplesList.innerHTML = GbDetectorTestTools.reportUriList.join('\n');

        container.append(reportUriInputLabel, reportUriInput, examplesList);

        reportUriInput.addEventListener('change', (e) => {
            localStorage.setItem('gbReportURI', e.target.value);
        });

        if (!this.isRecordedPage()) {
            return;
        }

        if (typeof window._cls_config === 'undefined') {
            window._cls_config = {};
        }

        window._cls_config = Object.assign({}, window._cls_config, GbDetectorTestTools.defaultClsConfig, { reportURI });
    }

    /* INSERT DETECTOR, GLASSVOX LIBS */
    insertDetectorScripts() {
        const container = this.createAndAttachBlockContainer('gb-detector-versions', 'Libs versions');

        const detectorPath = localStorage.getItem('gbDetectorPath') || GbDetectorTestTools.libsList[0];
        const qualtricsIframeSrcInput = document.createElement('input');
        qualtricsIframeSrcInput.setAttribute('id', 'gb-detector-path-input');
        qualtricsIframeSrcInput.classList.add('form-control');
        qualtricsIframeSrcInput.setAttribute('placeholder', GbDetectorTestTools.libsList[0]);
        qualtricsIframeSrcInput.value = detectorPath;

        const qualtricsIframeSrcInputLabel = document.createElement('label');
        qualtricsIframeSrcInputLabel.innerHTML = 'Detector libs folder path';
        qualtricsIframeSrcInputLabel.setAttribute('for', 'gb-detector-path-input');

        const examplesList = document.createElement('pre');
        examplesList.innerHTML = GbDetectorTestTools.libsList.join('\n');

        container.append(qualtricsIframeSrcInputLabel, qualtricsIframeSrcInput, examplesList);

        qualtricsIframeSrcInput.addEventListener('change', (e) => {
            localStorage.setItem('gbDetectorPath', e.target.value);
        });

        if (!this.isRecordedPage()) {
            container.appendChild(
                this.createTagline('Libs are not attached at this page', 'warning')
            );
            return;
        }

        [
            `${detectorPath}detector-bootstrap.min.js`,
            `${detectorPath}glassvox.min.js`
        ].forEach((src, i) => {
            const script = document.createElement('script');
            script.setAttribute('src', src);
            script.setAttribute('async', '');
            script.setAttribute('type', 'text/javascript');

            document.head.appendChild(script);
        });

        container.appendChild(
            this.createTagline('Libs are attached <strong id="gb-current-version"></strong>', 'success')
        );

        setTimeout(() => {
            document.getElementById('gb-current-version').innerHTML = `Detector version: ${window?._detector?.version}`;
        }, 2000);
    }


    /* INSERT QUALTRICS IFRAME */
    insertQualtricsIframe() {
        let container = this.createAndAttachBlockContainer('gb-qualtrics-toggle', 'Qualtrics iframe toggle');

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

        const isQualtricsEnabled = localStorage.getItem('gbQualtricsEnabled') === 'true';
        dropdown.value = isQualtricsEnabled.toString();

        dropdown.addEventListener('change', e => {
            container.querySelectorAll('.alert').forEach(i => i.remove());

            const currValue = e.target.value === 'true';
            localStorage.setItem('gbQualtricsEnabled', `${currValue}`);

            container.append(
                this.createTagline(`Qualtrics state is: ${currValue}`, currValue ? 'success' : 'warning')
            );
        });

        const qualtricsIframeSrc = localStorage.getItem('qualtricsIframeSrc') || GbDetectorTestTools.defaultQualtricsSurvey;

        const qualtricsIframeSrcInput = document.createElement('input');
        qualtricsIframeSrcInput.setAttribute('id', 'gb-qualtrics-src-input');
        qualtricsIframeSrcInput.classList.add('form-control');
        qualtricsIframeSrcInput.setAttribute('placeholder', GbDetectorTestTools.defaultQualtricsSurvey);
        qualtricsIframeSrcInput.value = qualtricsIframeSrc;

        qualtricsIframeSrcInput.addEventListener('change', e => {
            localStorage.setItem('qualtricsIframeSrc', `${e.target.value}`);
        })

        container.append(dropdown, qualtricsIframeSrcInput);

        if (isQualtricsEnabled) {
            let section = document.getElementsByTagName('section')[0];
            let iframe = document.createElement('iframe');
            let container = document.createElement('div');
            let h2 = document.createElement('h2');
            h2.innerHTML = 'QUALTRICS injected';


            iframe.setAttribute('src', qualtricsIframeSrc);
            iframe.setAttribute('min-width', '300px');
            iframe.setAttribute('width', '100%');
            iframe.setAttribute('height', '800px');

            container.append(h2, iframe);
            section.appendChild(container);
            console.log('QUALTRICS injected - Guardians test Qualtrics form');
        }
    }

    /* CLEAR CACHE CONTROLS */
    addCacheClearControls() {
        let container = this.createAndAttachBlockContainer('gb-clear-cache', 'Clear cache');

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

        const deleteAllCookies = function () {
            document.cookie
                .split(';')
                .forEach(c => {
                    document.cookie = c.replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
                });
        };

        button.addEventListener('click', () => {
            container.querySelectorAll('.alert').forEach(i => i.remove());
            const gbDetectorPath = localStorage.getItem('gbDetectorPath');
            const gbReportURI = localStorage.getItem('gbReportURI');
            const qualtricsIframeSrc = localStorage.getItem('qualtricsIframeSrc');

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
            qualtricsIframeSrc && localStorage.setItem('qualtricsIframeSrc', qualtricsIframeSrc);

            value && container.appendChild(
                this.createTagline(`${value}: cache is cleared`, 'success')
            );
        });

        container.append(dropdown, ' ', button);
    }

    /* ACTION CONTROLS */
    addActionControls() {
        let container = this.createAndAttachBlockContainer('gb-page-reload', 'Actions');

        let buttonReload = document.createElement('button');
        buttonReload.innerHTML = 'Reload the page';
        buttonReload.classList = 'btn btn-sm btn-success';

        buttonReload.addEventListener('click', () => {
            location.reload();
        });

        let goSetupPageLink = document.createElement('a');
        goSetupPageLink.innerHTML = 'Go setup page';
        goSetupPageLink.setAttribute('href', GbDetectorTestTools.configPage);
        goSetupPageLink.classList = 'btn btn-sm btn-info';

        container.append(buttonReload, ' ', goSetupPageLink);
    }
}
