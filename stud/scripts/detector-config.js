if (typeof _cls_config === "undefined") {
  _cls_config = {};
} /* DO NOT CHANGE */

_cls_config = Object.assign({}, _cls_config, {
  interceptAjax: true,
  valueMaskingMode: "blacklist",
  supportRemoteClientConfig: false,
  clientAttributesEnabled: true,
  collectVoc: true,
  reportInitializeWorkerAsBlob: true,
  observeRightClick: true,
  waitForSegmentRender: 10,
  domFormAnalysisReporting: true,
  domIncludeCSSSelector: true,
  ajaxRecordStats: "always",
  ajaxRecordResponseHeaders: "always",
  ajaxRecordRequestHeaders: "always",
  ajaxRecordResponseBody: "always",
  ajaxRecordRequestBody: 'always',
  ajaxRecordMetadata: 'always',
  ajaxCaptureRequestCookie: true,
  recordAjaxCallsAnyway: true,
  iframesAutoInject: true,
  ajaxTimeoutForResourceData: 0,
  reportUseWorker: false,
  // ...localStorage.getItem('localLibs') && { detectorPath: '/action-triggers-test/stud/scripts/detector-libs/' },
  // detectorPath: '/action-triggers-test/stud/scripts/detector-libs/',
  // reportURI: "https://feature-branch-report.glassboxrnd.com/feature-voc-mobile-mvp/i6kj8hip/reporting/5a21ea13-5f37-b901-59c0-6b5143bd3bcb/cls_report",
  // reportURI: "https://feature-branch-report.glassboxrnd.com/feature-voc-mobile-mvp/i6kj8hip/reporting/80bf4a9b-8091-40e4-489a-21f55a0fea75/cls_report"
  // reportURI: "https://feature-branch-report.glassboxrnd.com/feature-voc-mobile-7/ub4oxcej/reporting/4c8cc581-1f4f-6e88-9aa6-c5eaad50c06e/cls_report"
  // reportURI: "https://feature-branch-report.glassboxrnd.com/feature-voc-mobile-7/ub4oxcej/reporting/eec8034b-0465-2455-f85a-899266c646aa/cls_report"
  // reportURI: "https://report.dev-mt-eks.glassboxrnd.com/f3lx7s0z/reporting/d09b7249-e8b5-76c8-c8f7-c906a663701b/cls_report"
  reportURI: localStorage.getItem('reportURI')
      ? localStorage.getItem('reportURI')
      : "https://report.dev-mt-eks.glassboxrnd.com/xutmbetq/reporting/guardians-voc-regression-testing/cls_report"
});

// _cls_config.detectorPath = 'https://cdn.gbqofs.com/sv/a/';
// reportURI = "https://feature-branch-report.glassboxrnd.com/feature-voc-publisher/0ijnbzfw/reporting/8757114c-07fd-3ca7-7f43-9a3340716709/cls_report"; // pre-release app
// reportURI: "https://report.dev-mt-eks.glassboxrnd.com/f3lx7s0z/reporting/d09b7249-e8b5-76c8-c8f7-c906a663701b/cls_report"
