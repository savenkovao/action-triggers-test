Qualtrics.SurveyEngine.addOnload(function () {
  if (typeof _cls_config === 'undefined') {
    _cls_config = {};
  } /* DO NOT CHANGE jjelson 19.03.24 !!!!!!!!!!!! */
  window._gbRid = '${e://Field/ResponseID}';
  window._gbSid = '${e://Field/SurveyID}';
  _cls_config.vocObjectMap = {
      "qualtrics": {
          "nps": {
              "name": "nps",
              "type": "int"
          },
          "csat": {
              "name": "csat",
              "type": "int"
          },
          "performance": {
              "name": "performance",
              "type": "int"
          },
          "email": {
              "name": "email",
              "type": "string"
          },
          "comment": {
              "name": "comment",
              "type": "string",
              "maskingRegex": ["\\w"]
          },
          "id": {
              "name": "campaignId",
              "type": "string"
          },
          "type": {
              "name": "campaignType",
              "type": "string"
          }, // need to think about it
          "custom rating": {
              "name": "customLabel",
              "type": "int"
          }
      }
  };
  _cls_config.sessionIdByQueryParam = '_cls_s';
  _cls_config.clseByQueryParam = '_cls_e';
  _cls_config.iframeWaitForHandshake = true;
  var sessionId = '${e://Field/Glassbox Session ID}';
  var clse = '${e://Field/Glassbox CLSE}';

  if (sessionId) {
    var query = document.location.search ? document.location.search.substring(1) + '&' + '_cls_s=' + sessionId : '';
    window.history.replaceState(null, null, '?' + query);
  }

  if (clse) {
    var query = document.location.search ? document.location.search.substring(1) + '&' + '_cls_e=' + clse : '';
    window.history.replaceState(null, null, '?' + query);
  }

  var script = document.createElement('script');
  script.setAttribute('id', '_cls_detector');
  script.setAttribute('type', 'text/javascript');
  //script.setAttribute('type', 'module');
  script.setAttribute('src', 'https://cdn.gbqofs.com/fashion-sandbox/vos/detector-dom.min.js');
  // script.setAttribute('src', 'https://gb-qa-detector.s3.us-east-2.amazonaws.com/7.2/detector-bootstrap.min.js');
  script.setAttribute('data-clsconfig', 'https://feature-branch-report.glassboxrnd.com/feature-3-party-voc/sbagelaa/reporting/e147706c-d25e-7b6a-11a0-1dc5ef56104e/cls_report');

  document.head.appendChild(script);

  window._gbDataCollector = {
    source: 'qualtrics',
    type: 'Feedback:Success',
    userData: {}
  };
  window._gbisDataCollectorFull = false;
  window._gbDataSent = false;
  window.collectQualtricsQuestionData = function (name, value) {
    if (name) {
      _gbDataCollector.userData[name] = value;
      _gbisDataCollectorFull = true;
    }
  }
  /*window._gbSendData = function () {
      // end of survey id (can be customize)
      var el = document.getElementById("EndOfSurvey");
      if (el) {
          if (window._detector && window._gbisDataCollectorFull && !window._gbDataSent) {
              _detector.sendVocData(_gbDataCollector);
              window._gbDataSent = true;
          }
      } else {
          setTimeout(_gbSendData, 200);
      }
  }
  collectQualtricsQuestionData("id", "SE_Fashion_Always_On");*/
});
Qualtrics.SurveyEngine.addOnPageSubmit(function (type) {
  /*var selected = this.getSelectedChoices();
  if (type == 'next') {
      var selected = this.getSelectedChoices();
      var npsScore = selected[0];
  }
  collectQualtricsQuestionData("nps", npsScore);*/
});