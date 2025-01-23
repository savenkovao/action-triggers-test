if (typeof _cls_config === "undefined") {
  _cls_config = {};
} /* DO NOT CHANGE */
_cls_config.onReadyCallback = "test";
_cls_config.ajaxRecordMetadata = "always";
_cls_config.ajaxRecordResponseHeaders = "always";
_cls_config.ajaxRecordResponseBody = "and(tld,statusgte(400))";
_cls_config.clientAttributesEnabled = true;
_cls_config.ajaxRecordStats = "always";
_cls_config.valueMaskingMode = "blacklist";
_cls_config.resourcesRecordEnabled = true;
_cls_config.resourceRecordCssOnly = true;
_cls_config.resourcesRecordChance = 0.9;
_cls_config.webVitalsRecordEnabled = true;
_cls_config.resourceTimingRecordEnabled = true;
_cls_config.resourceTimingRecordEnabledByChance = 1;
_cls_config.enableGoogleAnalyticsIntegration = true;
_cls_config.googleDimensionIndex = 3;
_cls_config.googleMeasurementId="UA-172635256-1";
_cls_config.collectUsabillaVoc = true;
_cls_config.collectVoc = true;
_cls_config.sendTopURL = true;
_cls_config.recordScrollReach = true;
_cls_config.interceptABTesting = true;
_cls_config.interceptThirdPartyAttributes = true;
_cls_config.abTestingGlobalObject = "ttMeta";
_cls_config.interceptAjax = true;
_cls_config.enableSessionizingByCors=true;
_cls_config.enableOptimizelyIntegration = true;
_cls_config.supportRemoteClientConfig = false;
_cls_config.vocObjectMap = {
  "usabilla":{
    "nps": {"name": "nps", "type": "int"},
    "rating": {"name": "csat", "type": "int"},
    "mood": {"name": "csat", "type": "int"},
    "performance": {"name": "performance", "type": "int"},
    "email": {"name": "email", "type": "string"},
    "comment": {"name": "comment", "type": "string"},
    "Comment": {"name": "comment", "type": "string"},
    "action": {"name": "feedbackType", "type": "string"},
    "id": {"name": "campaignId", "type": "string"},
    "type": {"name": "campaignType", "type": "string"},
    "custom rating": {"name": "customLabel", "type": "int"}
  }
};
_cls_config.initDetectorOnInteractive = true;
_cls_config.detectorPath = 'https://cdn.gbqofs.com/sv/a/';
_cls_config.reportURI = "https://feature-branch-report.glassboxrnd.com/feature-vos-qe/9ctunkav/reporting/95e8b252-1aa1-27e2-08c6-a2925ecaa4db/cls_report"; // CHANGE
// _cls_config.reportURI = "https://dev-7.0.0-report.glassboxrnd.com/f3lx7s0z/reporting/d09b7249-e8b5-76c8-c8f7-c906a663701b/cls_report"; // CHANGE
