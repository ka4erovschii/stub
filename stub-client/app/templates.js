angular.module('bilete').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('./app/example/externalTemplate.html',
    "<p>External modal template with external scope: <code>{{value}}</code></p>"
  );


  $templateCache.put('./app/example/index.html',
    "<!doctype html><html ng-app=exampleDialog><head><meta charset=utf-8><title>ngDialog demo</title><link href=\"http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,400italic\" rel=stylesheet><link rel=stylesheet href=css/ngDialog.css><link rel=stylesheet href=css/ngDialog-theme-default.css><link rel=stylesheet href=css/ngDialog-theme-plain.css><style>a, button {\r" +
    "\n" +
    "\t\t\tfont: 14px 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;\r" +
    "\n" +
    "\t\t\tdisplay: block;\r" +
    "\n" +
    "\t\t\tcolor: #333;\r" +
    "\n" +
    "\t\t\tmargin-bottom: 10px;\r" +
    "\n" +
    "\t\t}\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t/* The following 'important' styles are just here to show off trapFocus */\r" +
    "\n" +
    "\t\tbutton.ngdialog-button {\r" +
    "\n" +
    "\t\t\tborder: solid transparent 1px !important;\r" +
    "\n" +
    "\t\t}\r" +
    "\n" +
    "\t\t\r" +
    "\n" +
    "\t\tbutton.ngdialog-button:focus {\r" +
    "\n" +
    "\t\t\tborder: solid black 1px !important;\r" +
    "\n" +
    "\t\t}\r" +
    "\n" +
    "\t\t\r" +
    "\n" +
    "\t\t.ngdialog h2:focus { outline: none; }</style></head><body ng-controller=MainCtrl><a href=\"\" ng-click=open()>Open via service</a> <button type=button ng-dialog=firstDialogId ng-dialog-controller=InsideCtrl ng-dialog-data={{jsonData}} ng-dialog-class=ngdialog-theme-default ng-dialog-show-close=false>Open via directive</button> <a href=\"\" ng-click=openDefault()>Default theme</a> <a href=\"\" ng-click=openPlain()>Plain theme</a> <a href=\"\" ng-click=openInlineController()>Inline controller</a> <a href=\"\" ng-click=openTemplate()>Open with external template for modal</a> <a href=\"\" ng-click=openTemplateNoCache()>Open with external template for modal (disabled cache)</a> <a href=\"\" ng-click=openTimed()>Open and use return value to close later</a> <a href=\"\" ng-click=openNotify()>Open and use promise to know when closed</a> <a href=\"\" ng-click=openConfirm()>Open confirm modal</a> <a href=\"\" ng-click=openDefaultWithPreCloseCallbackInlined()>Open default modal with pre-close callback inlined</a> <button type=button ng-dialog=firstDialogId ng-dialog-controller=InsideCtrl ng-dialog-data={{jsonData}} ng-dialog-class=ngdialog-theme-default ng-dialog-scope=this ng-dialog-pre-close-callback=directivePreCloseCallback ng-dialog-show-close=false>Open via directive with pre-close callback</button> <a href=\"\" ng-click=openConfirmWithPreCloseCallbackOnScope()>Open confirm modal with pre-close callback on scope</a> <a href=\"\" ng-click=openConfirmWithPreCloseCallbackInlinedWithNestedConfirm()>Open confirm modal with pre-close inlined with nested confirm.</a> <a href=\"\" ng-click=openWithoutOverlay()>Open without overlay</a><script type=text/ng-template id=firstDialogId><div class=\"ngdialog-message\">\r" +
    "\n" +
    "\t\t\t<h3>ngDialog template</h3>\r" +
    "\n" +
    "\t\t\t<p ng-show=\"theme\">Test content for <code>{{theme}}</code></p>\r" +
    "\n" +
    "\t\t\t<p ng-show=\"ngDialogData.foo\">Data passed through: <code>{{ngDialogData.foo}}</code></p>\r" +
    "\n" +
    "\t\t\t<p ng-show=\"dialogModel.message\">Scope passed through: <code>{{dialogModel.message}}</code></p>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t\t<div class=\"ngdialog-buttons\">\r" +
    "\n" +
    "\t\t\t<button type=\"button\" class=\"ngdialog-button ngdialog-button-secondary\"\r" +
    "\n" +
    "\t\t\t\tng-dialog=\"secondDialogId\"\r" +
    "\n" +
    "\t\t\t\tng-dialog-class=\"ngdialog-theme-default\"\r" +
    "\n" +
    "\t\t\t\tng-dialog-controller=\"SecondModalCtrl\"\r" +
    "\n" +
    "\t\t\t\tng-dialog-close-previous>Close and open</button>\r" +
    "\n" +
    "\t\t\t<button type=\"button\" class=\"ngdialog-button ngdialog-button-primary\" ng-click=\"openSecond()\">Open next</button>\r" +
    "\n" +
    "\t\t</div></script><script type=text/ng-template id=dialogWithNestedConfirmDialogId><div class=\"ngdialog-message\">\r" +
    "\n" +
    "\t\t\t<h3>ngDialog template</h3>\r" +
    "\n" +
    "\t\t\t<p>Dialog containing work in which a user has to perform a task (e.g. editing data).</p>\r" +
    "\n" +
    "\t\t\t<p>'Save' would save the task's actions, while 'Cancel' would cause the task's actions to be lost.</p>\r" +
    "\n" +
    "\t\t\t<p>...other controls here...</p>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t\t<div class=\"ngdialog-buttons\">\r" +
    "\n" +
    "\t\t\t<button type=\"button\" class=\"ngdialog-button ngdialog-button-secondary\" ng-click=\"closeThisDialog('Cancel')\">Cancel</button>\r" +
    "\n" +
    "\t\t\t<button type=\"button\" class=\"ngdialog-button ngdialog-button-primary\" ng-click=\"confirm('Save')\">Save</button>\r" +
    "\n" +
    "\t\t</div></script><script type=text/ng-template id=withInlineController><div class=\"ngdialog-message\">\r" +
    "\n" +
    "\t\t\t<h3>ngDialog template</h3>\r" +
    "\n" +
    "\t\t\t<p ng-show=\"theme\">Test content for <code>{{theme}}</code></p>\r" +
    "\n" +
    "\t\t\t<p ng-show=\"exampleExternalData\">Example data from external service: <code>{{exampleExternalData}}</code></p>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t\t<div class=\"ngdialog-buttons\">\r" +
    "\n" +
    "\t\t\t<button type=\"button\" class=\"ngdialog-button ngdialog-button-primary\" ng-click=\"closeThisDialog()\">Close</button>\r" +
    "\n" +
    "\t\t</div></script><script type=text/ng-template id=secondDialogId><h3><a href=\"\" ng-click=\"closeSecond()\">Close all by click here!</a></h3></script><script type=text/ng-template id=modalDialogId><div class=\"ngdialog-message\">\r" +
    "\n" +
    "\t\t\t<h3>ngDialog modal example</h3>\r" +
    "\n" +
    "\t\t\t<p>The <code>.openConfirm()</code> function returns a promise that is resolved when confirmed and rejected when otherwise closed. Modal dialogs by default do not close when clicked outside the dialog or when hitting escape. This can ofcourse be overridden when opening the dialog.</p>\r" +
    "\n" +
    "\t\t\t<p>Confirm can take a value. Enter one here for example and see the console output: <input ng-model=\"confirmValue\" /></p>\r" +
    "\n" +
    "\t\t</div>\r" +
    "\n" +
    "\t\t<div class=\"ngdialog-buttons\">\r" +
    "\n" +
    "\t\t\t<button type=\"button\" class=\"ngdialog-button ngdialog-button-primary\" ng-click=\"confirm(confirmValue)\">Confirm</button>\r" +
    "\n" +
    "\t\t\t<button type=\"button\" class=\"ngdialog-button ngdialog-button-secondary\" ng-click=\"closeThisDialog('button')\">Cancel</button>\r" +
    "\n" +
    "\t\t</div></script><script src=https://ajax.googleapis.com/ajax/libs/angularjs/1.3.1/angular.min.js></script><script>window.angular || document.write('<script src=\"../bower_components/angular/angular.min.js\">\\x3C/script>')</script><script src=../js/ngDialog.js></script><script>var app = angular.module('exampleDialog', ['ngDialog']);\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t// Example of how to set default values for all dialogs\r" +
    "\n" +
    "\t\tapp.config(['ngDialogProvider', function (ngDialogProvider) {\r" +
    "\n" +
    "\t\t\tngDialogProvider.setDefaults({\r" +
    "\n" +
    "\t\t\t\tclassName: 'ngdialog-theme-default',\r" +
    "\n" +
    "\t\t\t\tplain: false,\r" +
    "\n" +
    "\t\t\t\tshowClose: true,\r" +
    "\n" +
    "\t\t\t\tcloseByDocument: true,\r" +
    "\n" +
    "\t\t\t\tcloseByEscape: true,\r" +
    "\n" +
    "\t\t\t\tappendTo: false,\r" +
    "\n" +
    "\t\t\t\tpreCloseCallback: function () {\r" +
    "\n" +
    "\t\t\t\t\tconsole.log('default pre-close callback');\r" +
    "\n" +
    "\t\t\t\t}\r" +
    "\n" +
    "\t\t\t});\r" +
    "\n" +
    "\t\t}]);\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\tapp.controller('MainCtrl', function ($scope, $rootScope, ngDialog) {\r" +
    "\n" +
    "\t\t\t$rootScope.jsonData = '{\"foo\": \"bar\"}';\r" +
    "\n" +
    "\t\t\t$rootScope.theme = 'ngdialog-theme-default';\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t$scope.directivePreCloseCallback = function (value) {\r" +
    "\n" +
    "\t\t\t\tif(confirm('Close it? MainCtrl.Directive. (Value = ' + value + ')')) {\r" +
    "\n" +
    "\t\t\t\t\treturn true;\r" +
    "\n" +
    "\t\t\t\t}\r" +
    "\n" +
    "\t\t\t\treturn false;\r" +
    "\n" +
    "\t\t\t};\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t$scope.preCloseCallbackOnScope = function (value) {\r" +
    "\n" +
    "\t\t\t\tif(confirm('Close it? MainCtrl.OnScope (Value = ' + value + ')')) {\r" +
    "\n" +
    "\t\t\t\t\treturn true;\r" +
    "\n" +
    "\t\t\t\t}\r" +
    "\n" +
    "\t\t\t\treturn false;\r" +
    "\n" +
    "\t\t\t};\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t$scope.open = function () {\r" +
    "\n" +
    "\t\t\t\tngDialog.open({ template: 'firstDialogId', controller: 'InsideCtrl', data: {foo: 'some data'} });\r" +
    "\n" +
    "\t\t\t};\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t$scope.openDefault = function () {\r" +
    "\n" +
    "\t\t\t\tngDialog.open({\r" +
    "\n" +
    "\t\t\t\t\ttemplate: 'firstDialogId',\r" +
    "\n" +
    "\t\t\t\t\tcontroller: 'InsideCtrl',\r" +
    "\n" +
    "\t\t\t\t\tclassName: 'ngdialog-theme-default'\r" +
    "\n" +
    "\t\t\t\t});\r" +
    "\n" +
    "\t\t\t};\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t$scope.openDefaultWithPreCloseCallbackInlined = function () {\r" +
    "\n" +
    "\t\t\t\tngDialog.open({\r" +
    "\n" +
    "\t\t\t\t\ttemplate: 'firstDialogId',\r" +
    "\n" +
    "\t\t\t\t\tcontroller: 'InsideCtrl',\r" +
    "\n" +
    "\t\t\t\t\tclassName: 'ngdialog-theme-default',\r" +
    "\n" +
    "\t\t\t\t\tpreCloseCallback: function(value) {\r" +
    "\n" +
    "\t\t\t\t\t\tif (confirm('Close it?  (Value = ' + value + ')')) {\r" +
    "\n" +
    "\t\t\t\t\t\t\treturn true;\r" +
    "\n" +
    "\t\t\t\t\t\t}\r" +
    "\n" +
    "\t\t\t\t\t\treturn false;\r" +
    "\n" +
    "\t\t\t\t\t}\r" +
    "\n" +
    "\t\t\t\t});\r" +
    "\n" +
    "\t\t\t};\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t$scope.openConfirm = function () {\r" +
    "\n" +
    "\t\t\t\tngDialog.openConfirm({\r" +
    "\n" +
    "\t\t\t\t\ttemplate: 'modalDialogId',\r" +
    "\n" +
    "\t\t\t\t\tclassName: 'ngdialog-theme-default'\r" +
    "\n" +
    "\t\t\t\t}).then(function (value) {\r" +
    "\n" +
    "\t\t\t\t\tconsole.log('Modal promise resolved. Value: ', value);\r" +
    "\n" +
    "\t\t\t\t}, function (reason) {\r" +
    "\n" +
    "\t\t\t\t\tconsole.log('Modal promise rejected. Reason: ', reason);\r" +
    "\n" +
    "\t\t\t\t});\r" +
    "\n" +
    "\t\t\t};\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t$scope.openConfirmWithPreCloseCallbackOnScope = function () {\r" +
    "\n" +
    "\t\t\t\tngDialog.openConfirm({\r" +
    "\n" +
    "\t\t\t\t\ttemplate: 'modalDialogId',\r" +
    "\n" +
    "\t\t\t\t\tclassName: 'ngdialog-theme-default',\r" +
    "\n" +
    "\t\t\t\t\tpreCloseCallback: 'preCloseCallbackOnScope',\r" +
    "\n" +
    "\t\t\t\t\tscope: $scope\r" +
    "\n" +
    "\t\t\t\t}).then(function (value) {\r" +
    "\n" +
    "\t\t\t\t\tconsole.log('Modal promise resolved. Value: ', value);\r" +
    "\n" +
    "\t\t\t\t}, function (reason) {\r" +
    "\n" +
    "\t\t\t\t\tconsole.log('Modal promise rejected. Reason: ', reason);\r" +
    "\n" +
    "\t\t\t\t});\r" +
    "\n" +
    "\t\t\t};\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t$scope.openConfirmWithPreCloseCallbackInlinedWithNestedConfirm = function () {\r" +
    "\n" +
    "\t\t\t\tngDialog.openConfirm({\r" +
    "\n" +
    "\t\t\t\t\ttemplate: 'dialogWithNestedConfirmDialogId',\r" +
    "\n" +
    "\t\t\t\t\tclassName: 'ngdialog-theme-default',\r" +
    "\n" +
    "\t\t\t\t\tpreCloseCallback: function(value) {\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t\t\t\tvar nestedConfirmDialog = ngDialog.openConfirm({\r" +
    "\n" +
    "\t\t\t\t\t\t\ttemplate:\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t'<p>Are you sure you want to close the parent dialog?</p>' +\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t'<div class=\"ngdialog-buttons\">' +\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t'<button type=\"button\" class=\"ngdialog-button ngdialog-button-secondary\" ng-click=\"closeThisDialog(0)\">No' +\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t\t'<button type=\"button\" class=\"ngdialog-button ngdialog-button-primary\" ng-click=\"confirm(1)\">Yes' +\r" +
    "\n" +
    "\t\t\t\t\t\t\t\t\t'</button></div>',\r" +
    "\n" +
    "\t\t\t\t\t\t\tplain: true,\r" +
    "\n" +
    "\t\t\t\t\t\t\tclassName: 'ngdialog-theme-default'\r" +
    "\n" +
    "\t\t\t\t\t\t});\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t\t\t\treturn nestedConfirmDialog;\r" +
    "\n" +
    "\t\t\t\t\t},\r" +
    "\n" +
    "\t\t\t\t\tscope: $scope\r" +
    "\n" +
    "\t\t\t\t})\r" +
    "\n" +
    "\t\t\t\t.then(function(value){\r" +
    "\n" +
    "\t\t\t\t\tconsole.log('resolved:' + value);\r" +
    "\n" +
    "\t\t\t\t\t// Perform the save here\r" +
    "\n" +
    "\t\t\t\t}, function(value){\r" +
    "\n" +
    "\t\t\t\t\tconsole.log('rejected:' + value);\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t\t});\r" +
    "\n" +
    "\t\t\t};\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t$scope.openPlain = function () {\r" +
    "\n" +
    "\t\t\t\t$rootScope.theme = 'ngdialog-theme-plain';\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t\tngDialog.open({\r" +
    "\n" +
    "\t\t\t\t\ttemplate: 'firstDialogId',\r" +
    "\n" +
    "\t\t\t\t\tcontroller: 'InsideCtrl',\r" +
    "\n" +
    "\t\t\t\t\tclassName: 'ngdialog-theme-plain',\r" +
    "\n" +
    "\t\t\t\t\tcloseByDocument: false\r" +
    "\n" +
    "\t\t\t\t});\r" +
    "\n" +
    "\t\t\t};\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t$scope.openInlineController = function () {\r" +
    "\n" +
    "\t\t\t\t$rootScope.theme = 'ngdialog-theme-plain';\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t\tngDialog.open({\r" +
    "\n" +
    "\t\t\t\t\ttemplate: 'withInlineController',\r" +
    "\n" +
    "\t\t\t\t\tcontroller: ['$scope', '$timeout', function ($scope, $timeout) {\r" +
    "\n" +
    "\t\t\t\t\t\tvar counter = 0;\r" +
    "\n" +
    "\t\t\t\t\t\tvar timeout;\r" +
    "\n" +
    "\t\t\t\t\t\tfunction count() {\r" +
    "\n" +
    "\t\t\t\t\t\t\t$scope.exampleExternalData = 'Counter ' + (counter++);\r" +
    "\n" +
    "\t\t\t\t\t\t\ttimeout = $timeout(count, 450);\r" +
    "\n" +
    "\t\t\t\t\t\t}\r" +
    "\n" +
    "\t\t\t\t\t\tcount();\r" +
    "\n" +
    "\t\t\t\t\t\t$scope.$on('$destroy', function () {\r" +
    "\n" +
    "\t\t\t\t\t\t\t$timeout.cancel(timeout);\r" +
    "\n" +
    "\t\t\t\t\t\t});\r" +
    "\n" +
    "\t\t\t\t\t}],\r" +
    "\n" +
    "\t\t\t\t\tclassName: 'ngdialog-theme-plain'\r" +
    "\n" +
    "\t\t\t\t});\r" +
    "\n" +
    "\t\t\t};\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t$scope.openTemplate = function () {\r" +
    "\n" +
    "\t\t\t\t$scope.value = true;\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t\tngDialog.open({\r" +
    "\n" +
    "\t\t\t\t\ttemplate: 'externalTemplate.html',\r" +
    "\n" +
    "\t\t\t\t\tclassName: 'ngdialog-theme-plain',\r" +
    "\n" +
    "\t\t\t\t\tscope: $scope\r" +
    "\n" +
    "\t\t\t\t});\r" +
    "\n" +
    "\t\t\t};\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t$scope.openTemplateNoCache = function () {\r" +
    "\n" +
    "\t\t\t\t$scope.value = true;\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t\tngDialog.open({\r" +
    "\n" +
    "\t\t\t\t\ttemplate: 'externalTemplate.html',\r" +
    "\n" +
    "\t\t\t\t\tclassName: 'ngdialog-theme-plain',\r" +
    "\n" +
    "\t\t\t\t\tscope: $scope,\r" +
    "\n" +
    "\t\t\t\t\tcache: false\r" +
    "\n" +
    "\t\t\t\t});\r" +
    "\n" +
    "\t\t\t};\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t$scope.openTimed = function () {\r" +
    "\n" +
    "\t\t\t\tvar dialog = ngDialog.open({\r" +
    "\n" +
    "\t\t\t\t\ttemplate: '<p>Just passing through!</p>',\r" +
    "\n" +
    "\t\t\t\t\tplain: true,\r" +
    "\n" +
    "\t\t\t\t\tcloseByDocument: false,\r" +
    "\n" +
    "\t\t\t\t\tcloseByEscape: false\r" +
    "\n" +
    "\t\t\t\t});\r" +
    "\n" +
    "\t\t\t\tsetTimeout(function () {\r" +
    "\n" +
    "\t\t\t\t\tdialog.close();\r" +
    "\n" +
    "\t\t\t\t}, 2000);\r" +
    "\n" +
    "\t\t\t};\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t$scope.openNotify = function () {\r" +
    "\n" +
    "\t\t\t\tvar dialog = ngDialog.open({\r" +
    "\n" +
    "\t\t\t\t\ttemplate:\r" +
    "\n" +
    "\t\t\t\t\t\t'<p>You can do whatever you want when I close, however that happens.</p>' +\r" +
    "\n" +
    "\t\t\t\t\t\t'<div class=\"ngdialog-buttons\"><button type=\"button\" class=\"ngdialog-button ngdialog-button-primary\" ng-click=\"closeThisDialog(1)\">Close Me</button></div>',\r" +
    "\n" +
    "\t\t\t\t\tplain: true\r" +
    "\n" +
    "\t\t\t\t});\r" +
    "\n" +
    "\t\t\t\tdialog.closePromise.then(function (data) {\r" +
    "\n" +
    "\t\t\t\t\tconsole.log('ngDialog closed' + (data.value === 1 ? ' using the button' : '') + ' and notified by promise: ' + data.id);\r" +
    "\n" +
    "\t\t\t\t});\r" +
    "\n" +
    "\t\t\t};\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t$scope.openWithoutOverlay = function () {\r" +
    "\n" +
    "\t\t\t\tngDialog.open({\r" +
    "\n" +
    "\t\t\t\t\ttemplate: '<h2>Notice that there is no overlay!</h2>',\r" +
    "\n" +
    "\t\t\t\t\tclassName: 'ngdialog-theme-default',\r" +
    "\n" +
    "\t\t\t\t\tplain: true,\r" +
    "\n" +
    "\t\t\t\t\toverlay: false\r" +
    "\n" +
    "\t\t\t\t});\r" +
    "\n" +
    "\t\t\t};\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t$rootScope.$on('ngDialog.opened', function (e, $dialog) {\r" +
    "\n" +
    "\t\t\t\tconsole.log('ngDialog opened: ' + $dialog.attr('id'));\r" +
    "\n" +
    "\t\t\t});\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t$rootScope.$on('ngDialog.closed', function (e, $dialog) {\r" +
    "\n" +
    "\t\t\t\tconsole.log('ngDialog closed: ' + $dialog.attr('id'));\r" +
    "\n" +
    "\t\t\t});\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\t\t$rootScope.$on('ngDialog.closing', function (e, $dialog) {\r" +
    "\n" +
    "\t\t\t\tconsole.log('ngDialog closing: ' + $dialog.attr('id'));\r" +
    "\n" +
    "\t\t\t});\r" +
    "\n" +
    "\t\t});\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\tapp.controller('InsideCtrl', function ($scope, ngDialog) {\r" +
    "\n" +
    "\t\t\t$scope.dialogModel = {\r" +
    "\n" +
    "\t\t\t\tmessage : 'message from passed scope'\r" +
    "\n" +
    "\t\t\t};\r" +
    "\n" +
    "\t\t\t$scope.openSecond = function () {\r" +
    "\n" +
    "\t\t\t\tngDialog.open({\r" +
    "\n" +
    "\t\t\t\t\ttemplate: '<h3><a href=\"\" ng-click=\"closeSecond()\">Close all by click here!</a></h3>',\r" +
    "\n" +
    "\t\t\t\t\tplain: true,\r" +
    "\n" +
    "\t\t\t\t\tcloseByEscape: false,\r" +
    "\n" +
    "\t\t\t\t\tcontroller: 'SecondModalCtrl'\r" +
    "\n" +
    "\t\t\t\t});\r" +
    "\n" +
    "\t\t\t};\r" +
    "\n" +
    "\t\t});\r" +
    "\n" +
    "\r" +
    "\n" +
    "\t\tapp.controller('SecondModalCtrl', function ($scope, ngDialog) {\r" +
    "\n" +
    "\t\t\t$scope.closeSecond = function () {\r" +
    "\n" +
    "\t\t\t\tngDialog.close();\r" +
    "\n" +
    "\t\t\t};\r" +
    "\n" +
    "\t\t});</script></body></html>"
  );


  $templateCache.put('./app/view/add-application.html',
    "<div><h1></h1><h1></h1><ol class=breadcrumb><li><a href=\"#/\"><i class=\"glyphicon glyphicon-home\"></i></a></li><li class=active>Inregistrarea cererilor</li></ol><h1></h1><tabset><tab heading=Solicitantul><form role=form><h4>Date despre solicitant :</h4><h1></h1><div class=\"form-group col-md-12 col-sm-12 col-xs-12 alert alert-danger\" ng-show=obj.invalid><p>*** Cererea poate fi inregestrata numai in caz Urgent. Sau de pe data {{obj.nextRegistrationDate | date:'dd-MM-yyyy'}}</p></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=familyName>Nume</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\" ng-class=\"{'has-error':!application.member.firstName}\"><input class=form-control ng-disabled=!obj.add id=familyName placeholder=Nume ng-model=application.member.firstName require ng-pattern=\"/([A-Z][a-z]*)/\"></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=lastName>Prenume</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\" ng-class=\"{'has-error':!application.member.lastName}\"><input class=form-control ng-disabled=!obj.add id=lastName placeholder=Prenume ng-model=application.member.lastName uppercase=\"\" require ng-pattern=\"/([A-Z][a-z]*)/\"></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=patronimic>Patronimic</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\" ng-class=\"{'has-error':!application.member.patronimic}\"><input class=form-control ng-disabled=!obj.add id=patronimic placeholder=Patronimic ng-model=application.member.patronimic uppercase=\"\" require ng-pattern=\"/([A-Z][a-z]*)/\"></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=idnp>IDNP</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\" ng-model-onblur ng-class=\"{'has-error':!application.member.idnp}\"><input class=form-control ng-disabled=!obj.add id=idnp ng-change=\"checkIdnp('member')\" ng-model=application.member.idnp placeholder=IDNP uppercase=\"\" ng-pattern=\"/([0-9]){13}/\" maxlength=13 minlength=13></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=seria>Seria</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\" ng-class=\"{'has-error':!application.member.seria}\"><input class=form-control ng-disabled=!obj.add id=seria ng-model=application.member.seria placeholder=seria uppercase=\"\"></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=numPensLicence>Nr. Pensionar</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input class=form-control ng-disabled=!obj.add id=numPensLicence ng-model=application.member.numPensLicence placeholder=\"Numarul legitimatie\" uppercase=\"\"></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=raion>Raion</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\" ng-class=\"{'has-error':!application.member.raion}\"><select class=form-control ng-disabled=!obj.add id=raion ng-model=application.member.raion ng-options=\"item as item.nameRo for item in raions\" ng-change=\"selectLoalityByRaionId('member')\"></select></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=localitate>Localitate</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\" ng-class=\"{'has-error':(application.member.raion && !application.member.localitate)}\"><select class=form-control ng-disabled=!obj.add id=localitate ng-model=application.member.localitate ng-options=\"item as item.nameRo for item in localitaties\"></select></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=street>Strada</label><div class=\"col-lg-8 col-md-8 col-sm-8 col-xs-8\" ng-style={padding:2} ng-class=\"{'has-error':!application.member.street}\"><input ng-disabled=!obj.add class=form-control id=street ng-model=application.member.street placeholder=Strada></div></div><div class=\"form-group col-lg-3 col-md-3 col-sm-3 col-xs-3\"><div class=\"col-xs-1 col-sm-1 col-md-1 col-lg-1\"><label class=notbold>Nr</label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\" ng-class=\"{'has-error':!application.member.house}\"><input ng-disabled=!obj.add class=form-control id=nr ng-model=application.member.house placeholder=\"\"></div><div class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2\"><label class=notbold>Bloc</label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><input ng-disabled=!obj.add class=form-control id=bloc ng-model=application.member.block placeholder=\"\"></div></div><div class=\"form-group col-lg-2 col-md-2 col-sm-2 col-xs-2\"><div class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2\"><label class=notbold>Ap</label></div><div class=\"col-xs-8 col-sm-8 col-md-8 col-lg-8\"><input ng-disabled=!obj.add class=form-control id=flat ng-model=application.member.flat placeholder=\"\"></div></div><div class=\"form-group col-lg-3 col-md-3 col-sm-3 col-xs-3\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=phone>Telefon</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input ng-disabled=!obj.add class=form-control id=phone ng-model=application.member.phone placeholder=\"\"></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\"><label class=notbold for=specificatii>Specificatii</label></div><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\" ng-class=\"{'has-error':(!application.specificatii)}\"><select class=form-control ng-disabled=!obj.add id=specificatii ng-model=application.specificatii ng-options=\"specific as specific.nameRo for specific in specificatii \" ng-change=selectPrestatorBySpecificCode()></select></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\"><label class=notbold for=prestator>Prestator</label></div><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input ng-disabled=!obj.add class=form-control id=prestator ng-model=obj.prestator[0].nameRo ng-disabled=true></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><hr><div class=\"form-group col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label ng-style={paddingRight:-10}>Angajat in cimpul muncii</label></div><label class=notbold><input type=radio value=true ng-disabled=!obj.add ng-model=application.member.hasJob> da</label><label class=notbold><input type=radio value=false ng-disabled=!obj.add ng-model=application.member.hasJob> nu</label></div><div class=\"form-group col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label ng-style={paddingRight:-10}>Caz de urgența</label></div><label class=notbold><input type=radio data-ng-value=true ng-model=application.is_urgent id=isUrgentYes ng-style={padding:10}> da</label><label class=notbold><input type=radio data-ng-value=false ng-model=application.is_urgent id=isUrgentNo ng-style={padding:10}> nu</label></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><hr><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label><b>Reducere solicitată</b></label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><div><label><input type=radio value=30 ng-disabled=!obj.add ng-model=application.descounts> reducere 30%</label></div></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label><b></b></label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><div><label><input type=radio value=70 ng-disabled=!obj.add ng-model=application.descounts> reducere 70%</label></div></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label><b></b></label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><div><label><input type=radio value=100 ng-disabled=!obj.add ng-model=application.descounts> gratuit</label></div></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><hr><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label><b>Categorie</b></label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label class=notbold><input type=checkbox ng-disabled=!obj.add ng-model=application.member.persnInAge> Persoana in virsta</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\" ng-show=application.member.persnInAge><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label><b></b></label></div><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><label class=notbold><input type=checkbox ng-disabled=!obj.add ng-model=application.member.limitedAge> In baza limitei de virsta</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\" ng-show=application.member.persnInAge><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label><b></b></label></div><div class=\"col-xs-7 col-sm-7 col-md-5 col-lg-7\"><label class=notbold><input type=checkbox ng-disabled=!obj.add ng-model=application.member.benifAlocCity> beneficiar de alocatie sociala de stat</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\" ng-show=application.member.persnInAge><div class=\"form-group col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label><b></b></label></div><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label class=notbold><input type=checkbox ng-disabled=!obj.add ng-model=application.member.benifPension> beneficiaza de pensie</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label><b></b></label></div><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><label class=notbold><input type=checkbox ng-disabled=!obj.add ng-model=application.member.persnWDisabil> Persoana cu disabilitati</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\" ng-show=application.member.persnWDisabil><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label><b></b></label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label class=notbold><input type=radio value=sever ng-disabled=!obj.add ng-model=application.member.disabilityCategory> grad sever</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\" ng-show=\"((application.member.disabilityCategory == 'sever') && application.member.persnWDisabil)\"><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><label><b></b></label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label class=notbold><input type=checkbox value=true ng-disabled=!obj.add ng-model=application.needsGuardian> necesita insotitor</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\" ng-show=application.member.persnWDisabil><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label><b></b></label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label class=notbold><input type=radio value=accentuat ng-disabled=!obj.add ng-model=application.member.disabilityCategory> grad accentuat</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\" ng-show=application.member.persnWDisabil><div class=\"form-group col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label><b></b></label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label class=notbold><input type=radio value=mediu ng-disabled=!obj.add ng-model=application.member.disabilityCategory> grad mediu</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label><b></b></label></div><div class=\"col-xs-7 col-sm-7 col-md-7 col-lg-7\"><label class=notbold><input type=checkbox ng-disabled=!obj.add ng-model=application.member.persnRepresat> Persoane represate si reabilitate ulterior</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\" ng-show=application.member.persnRepresat><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label><b></b></label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label class=notbold><input ng-disabled=!obj.add type=checkbox> reducere 30%</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\" ng-show=application.member.persnRepresat><div class=\"form-group col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label><b></b></label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label class=notbold><input type=checkbox ng-disabled=!obj.add> valorificat in 3 ani</label></div></div></div><div ng-show=application.needsGuardian><h4>Date despre insotitor</h4><h1></h1><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=familyNameG>Nume</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\" ng-class=\"{'has-error':!application.guardian.firstName}\"><input class=form-control ng-disabled=!obj.add id=familyNameG placeholder=Nume ng-model=application.guardian.firstName require ng-pattern=\"/([A-Z][a-z]*)/\"></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=lastNameG>Prenume</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\" ng-class=\"{'has-error':!application.guardian.lastName}\"><input class=form-control ng-disabled=!obj.add id=lastNameG placeholder=Prenume ng-model=application.guardian.lastName uppercase=\"\" require ng-pattern=\"/([A-Z][a-z]*)/\"></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=patronimicG>Patronimic</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\" ng-class=\"{'has-error':!application.guardian.patronimic}\"><input class=form-control ng-disabled=!obj.add id=patronimicG placeholder=Patronimic ng-model=application.guardian.patronimic uppercase=\"\" require ng-pattern=\"/([A-Z][a-z]*)/\"></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=idnp>IDNP</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\" ng-model-onblur ng-class=\"{'has-error':!application.guardian.idnp}\"><input class=form-control ng-disabled=!obj.add id=idnpG ng-change=\"checkIdnp('guardian')\" ng-model=application.guardian.idnp placeholder=IDNP uppercase=\"\" require ng-pattern=\"/([0-9]){13}/\" maxlength=13 minlength=13></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=seria>Seria</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\" ng-class=\"{'has-error':!application.guardian.seria}\"><input class=form-control ng-disabled=!obj.add id=seriaG ng-model=application.guardian.seria placeholder=seria uppercase=\"\"></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=numPensLicenceG>Nr. Pensionar</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input class=form-control ng-disabled=!obj.add id=numPensLicenceG ng-model=application.guardian.numPensLicence placeholder=\"Numarul legitimatie\" uppercase=\"\"></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=raion>Raion</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\" ng-class=\"{'has-error':!application.guardian.raion}\"><select class=form-control ng-disabled=!obj.add id=raionG ng-model=application.guardian.raion ng-options=\"item as item.nameRo for item in raionsGuardian\" ng-change=\"selectLoalityByRaionId('guardian')\"></select></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=localitateG>Localitate</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\" ng-class=\"{'has-error':(application.guardian.raion && !application.guardian.localitate)}\"><select class=form-control ng-disabled=!obj.add id=localitateG ng-model=application.guardian.localitate ng-options=\"item as item.nameRo for item in localitateGuardian\"></select></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=streetG>Strada</label><div class=\"col-lg-8 col-md-8 col-sm-8 col-xs-8\" ng-style={padding:2} ng-class=\"{'has-error':!application.guardian.street}\"><input ng-disabled=!obj.add class=form-control id=streetG ng-model=application.guardian.street placeholder=Strada></div></div><div class=\"form-group col-lg-3 col-md-3 col-sm-3 col-xs-3\"><div class=\"col-xs-1 col-sm-1 col-md-1 col-lg-1\"><label class=notbold>Nr</label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\" ng-class=\"{'has-error':!application.guardian.house}\"><input ng-disabled=!obj.add class=form-control id=nrG ng-model=application.guardian.house placeholder=\"\"></div><div class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2\"><label class=notbold>Bloc</label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><input ng-disabled=!obj.add class=form-control id=blockG ng-model=application.guardian.block placeholder=\"\"></div></div><div class=\"form-group col-lg-2 col-md-2 col-sm-2 col-xs-2\"><div class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2\"><label class=notbold>Ap</label></div><div class=\"col-xs-8 col-sm-8 col-md-8 col-lg-8\"><input ng-disabled=!obj.add class=form-control id=flatG ng-model=application.guardian.flat placeholder=\"\"></div></div><div class=\"form-group col-lg-3 col-md-3 col-sm-3 col-xs-3\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=phone>Telefon</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input ng-disabled=!obj.add class=form-control id=phoneG ng-model=application.guardian.phone placeholder=\"\"></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><hr><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label><b>Categorie</b></label></div><div class=\"col-xs-8 col-sm-8 col-md-8 col-lg-8\"><label class=notbold><input type=checkbox ng-disabled=!obj.add ng-model=application.guardian.guardianBenifAlocCity> primeste alocatii sociale de stat</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label><b></b></label></div><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><label class=notbold><input type=checkbox ng-disabled=!obj.add ng-model=application.guardian.guardianBenifPension> beneficiaza de pensie</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label><b></b></label></div><div class=\"col-xs-7 col-sm-7 col-md-7 col-lg-7\"><label class=notbold><input type=checkbox ng-disabled=!obj.add ng-model=application.guardian.guardianPersWdisability> persoana cu disabilitati</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\" ng-show=application.guardian.guardianPersWdisability><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label><b></b></label></div><div class=\"col-xs-7 col-sm-7 col-md-7 col-lg-7\"><label class=notbold><input type=radio ng-disabled=!obj.add value=accentuat ng-model=application.guardian.disabilityCategory> grad accentuat</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\" ng-show=application.guardian.guardianPersWdisability><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label><b></b></label></div><div class=\"col-xs-7 col-sm-7 col-md-7 col-lg-7\"><label class=notbold><input type=radio ng-disabled=!obj.add value=mediu ng-model=application.guardian.disabilityCategory> grad mediu</label></div></div></div></div><div class=\"row col-xs-12 col-sm-12 col-md-12 col-lg-12\"><hr><button class=\"btn btn-primary\" type=button ng-click=save() ng-disabled=!checkNeedData()><span class=\"glyphicon glyphicon-floppy-disk\"></span> Salvare</button> <button class=\"btn btn-success\" ng-click=save() ng-disabled=!checkNeedData()><span class=\"glyphicon glyphicon-save\"></span> Generare cerere</button><h1></h1></div></form></tab><tab heading=Anexe ng-show=!obj.add><form role=form><h1></h1><h4>Acte obligatorii :</h4><h1></h1><div ng-repeat=\"item in listOfDocType \" class=\"row col-xs-12 col-sm-12 col-md-12 col-lg-12\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><span><input type=checkbox checklist-model=application.documentPresent class=checkboxDoc checklist-value=item ng-checked=\"(application.documentPresent.indexOf(item) > 0)\"></span><label>{{item.name}}</label></div></div><div uploader=uploader filters=\"queueLimit, customFilter\"><table class=\"table table-bordered table-striped\" ng-file-over><thead><tr><th>Denumire fișier</th><th>Dimensiune</th><th>Progres</th><th>Acțiuni</th></tr></thead><tbody><tr ng-repeat=\"item in uploader.queue\"><td>{{item.file.name}}</td><td>{{(item.file.size/1024/1024)|number:3}} MB</td><th><div class=progress><div class=progress-bar role=progressbar ng-style=\"{ 'width': item.progress + '%' }\"></div></div></th><td><a href class=\"btn btn-success btn-xs force-enabled\" ng-click=downloadFile(item) ng-show=item.isUploaded><span class=\"glyphicon glyphicon-download-alt\"></span></a> <a href class=\"btn btn-danger btn-xs force-enabled\" ng-click=removeFile(item) ng-hide=item.isUploaded><span class=\"glyphicon glyphicon-trash\"></span></a></td></tr></tbody></table><div class=row><label class=\"col-sm-3 control-label\">Atașați fișierele</label><div class=col-sm-3><input ng-file-select type=file nv-file-select=\"\" uploader=uploader multiple></div></div></div><div class=\"row col-xs-12 col-sm-12 col-md-12 col-lg-12\"><hr><button class=\"btn btn-primary\" type=button id=uploadFiles ng-click=uploadFiles()>Salvare</button><h1></h1></div><h1></h1></form></tab><tab heading=Biletul ng-show=application.ticket><h1></h1><div><div class=row><h1></h1><h4>Bilet pentru solicitant</h4></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label ng-style={padding:0} class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4 notbold\">Denumire prestator</label><div class=\"col-xs-7 col-sm-7 col-md-7 col-lg-7\"><input class=form-control ng-disabled=!obj.add ng-model=application.ticket.prestator.nameRo placeholder=\"\"></div></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\" ng-style={padding:0}><label class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5 notbold\">Perioada de la</label><div class=\"col-xs-7 col-sm-7 col-md-7 col-lg-7\" ng-controller=Datepicker><p class=input-group><input class=form-control datepicker-popup={{format}} ng-model=application.ticket.dateStart ng-disabled=!obj.add is-open=opened show-button-bar=false datepicker-options=dateOptions timestamp disabled></p></div></div><div class=\"col-xs-3 col-sm-3 col-md-3 col-lg-3\"><label class=\"col-xs-3 col-sm-3 col-md-3 col-lg-3 notbold\" ng-style={padding:0}>pina la</label><div class=\"col-xs-9 col-sm-9 col-md-9 col-lg-9\" ng-controller=Datepicker ng-style={padding:0}><p class=input-group><input class=form-control datepicker-popup={{format}} ng-model=application.ticket.dateEnd ng-disabled=!obj.add is-open=opened show-button-bar=false datepicker-options=dateOptions timestamp disabled></p></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label ng-style={padding:0} class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4 notbold\">Costul biletului</label><div class=\"col-xs-7 col-sm-7 col-md-7 col-lg-7\"><input ng-disabled=!obj.add class=form-control ng-model=application.ticket.price></div></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\" ng-style={padding:0}><label class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5 notbold\">Costul cu reducere</label><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><input ng-disabled=!obj.add class=form-control value={{application.ticket.price-(application.ticket.price*(application.descounts/100))}}></div></div></div></div><div ng-show=application.needsGuardian><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\" ng-style={padding:0}><hr><h1></h1><h4>Bilet pentru insotitor</h4></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label ng-style={padding:0} class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4 notbold\">Denumire prestator</label><div class=\"col-xs-7 col-sm-7 col-md-7 col-lg-7\"><input class=form-control ng-disabled=!obj.add ng-model=application.guardianTicket.prestator.nameRo placeholder=\"\"></div></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\" ng-style={padding:0}><label class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5 notbold\">Perioada de la</label><div class=\"col-xs-7 col-sm-7 col-md-7 col-lg-7\" ng-controller=Datepicker><p class=input-group><input class=form-control datepicker-popup={{format}} ng-model=application.guardianTicket.dateStart ng-disabled=!obj.add is-open=opened show-button-bar=false datepicker-options=dateOptions timestamp disabled></p></div></div><div class=\"col-xs-3 col-sm-3 col-md-3 col-lg-3\"><label class=\"col-xs-3 col-sm-3 col-md-3 col-lg-3 notbold\" ng-style={padding:0}>pina la</label><div class=\"col-xs-9 col-sm-9 col-md-9 col-lg-9\" ng-controller=Datepicker ng-style={padding:0}><p class=input-group><input class=form-control datepicker-popup={{format}} ng-model=application.guardianTicket.dateEnd ng-disabled=!obj.add is-open=opened show-button-bar=false datepicker-options=dateOptions timestamp disabled></p></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label ng-style={padding:0} class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4 notbold\">Costul biletului</label><div class=\"col-xs-7 col-sm-7 col-md-7 col-lg-7\"><input ng-disabled=!obj.add class=form-control ng-model=application.guardianTicket.price></div></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\" ng-style={padding:0}><label class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5 notbold\">Costul cu reducere</label><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><input ng-disabled=!obj.add class=form-control></div></div></div></div><div class=\"row col-xs-12 col-sm-12 col-md-12 col-lg-12\"><hr><button class=\"btn btn-success\" ng-click=confirmTicket() ng-disabled=\"(application.ticket.status == 'CONFIRMED') || (application.ticket.status == 'REFUSED')\">Confirmare bilet</button> <button class=\"btn btn-danger\" ng-click=refuzTicket() ng-disabled=\"(application.ticket.status == 'REFUSED') || (application.ticket.status == 'CONFIRMED') \">Refuz bilet</button> <button class=\"btn btn-primary\" ng-click=open(application)>Returnare bilet</button> <button class=\"btn btn-warning\">Inchiere bilet</button><h1></h1></div></tab></tabset></div>"
  );


  $templateCache.put('./app/view/dialog/addPrestator.html',
    "<div><div class=modal-header></div><div class=modal-body><h4>Adauga prestator nou</h4><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=prestatorName>Denumire</label><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\"><input class=form-control id=prestatorName ng-model=obj.prestatorName></div><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=cazUrgent>Caz De Urgenta</label><div class=\"col-lg-1 col-md-1 col-sm-1 col-xs-1\"><input type=checkbox id=cazUrgent ng-model=obj.cazUrgent></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=prestatorSpecific>Specializare</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input class=form-control id=prestatorSpecific ng-model=obj.prestatorSpecific></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=prestatorSpecific>Tel.</label><div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\"><input class=form-control ng-model=obj.prestatorPhone></div><label class=\"col-lg-1 col-md-1 col-sm-1 col-xs-1 notbold\">Țara</label><div class=\"col-lg-5 col-md-5 col-sm-5 col-xs-5\"><input class=form-control ng-model=obj.prestatorCountry></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><label class=\"col-lg-3 col-md-9 col-sm-3 col-xs-3 notbold\">Addressa</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><textarea type=textarea class=form-control rows=3 ng-model=obj.prestatorAdress></textarea></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><label class=\"col-lg-3 col-md-9 col-sm-3 col-xs-3 notbold\">Ruta</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><textarea type=textarea class=form-control rows=3 ng-model=obj.prestatorRoute></textarea></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><button class=\"btn btn-success\" ng-click=save()>Salvare</button> <button class=\"btn btn-warning\" ng-click=cancel()>Iesire</button></div><div class=row></div><div class=row></div><div class=row></div></div><div class=modal-footer><div class=row></div></div></div>"
  );


  $templateCache.put('./app/view/dialog/refuzTicket.html',
    ""
  );


  $templateCache.put('./app/view/dialog/returnTicket.html',
    "<div class=modal-header><h3 class=modal-title><span class=text-center>Motivul returnarii biletului</span></h3></div><div class=modal-body><span class=\"btn btn-default btn-file\"><input type=file id=imboln ng-file-select>Imbolnavire</span> <span class=\"btn btn-default btn-file\"><input type=file id=decesR ng-file-select>Decesul Rudelor</span> <span class=\"btn btn-default btn-file\"><input type=file id=decesB ng-file-select>Decesul benificiar</span> <span class=\"btn btn-default btn-button\"><input type=button id=wMotiv ng-file-select>Fara motiv</span></div><div class=modal-footer><button class=\"btn btn-primary\" ng-click=ok(obj)>Salvare</button> <button class=\"btn btn-warning\" ng-click=cancel()>Anulare</button></div>"
  );


  $templateCache.put('./app/view/dialog/transferTicket.html',
    "<div><div class=modal-header><h3 class=modal-title><span class=text-center>Transfer</span></h3></div><div class=modal-body><div><div class=\"row col-xs-11 col-sm-11 col-md-11 col-lg-11\"><label class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2\" for=raion>Raion</label><select class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\" id=raion ng-model=raion ng-options=\"item as item.nameRo for item in raions\"></select><label class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2\" for=localitate>Localitate</label><select class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\" id=localitate ng-model=localitate ng-options=\"item as item.nameRo for item in localitaties\"></select></div><h1></h1></div><div class=\"row col-xs-11 col-sm-11 col-md-11 col-lg-11\"><label class=\"col-xs-1 col-sm-1 col-md-1 col-lg-1\" for=street>Strada</label><input class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2\" style=width:160px id=street ng-model=application.member.street placeholder=Strada><label class=\"col-xs-1 col-sm-1 col-md-1 col-lg-1\">Nr</label><input class=\"col-xs-1 col-sm-1 col-md-1 col-lg-1\" id=nr placeholder=\"\"><label class=\"col-xs-1 col-sm-1 col-md-1 col-lg-1\">Bloc</label><input class=\"col-xs-1 col-sm-1 col-md-1 col-lg-1\" id=nrBloc placeholder=\"\"><label class=\"col-xs-1 col-sm-1 col-md-1 col-lg-1\">Ap</label><input class=\"col-xs-1 col-sm-1 col-md-1 col-lg-1\" id=appartament placeholder=\"\"></div><div class=\"row col-xs-11 col-sm-11 col-md-11 col-lg-11\"><label class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2\" for=phone>Telefon</label><input class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\" style=width:160px id=phone ng-model=application.member.phone placeholder=\"\"></div><div><label>Incarca cerere de transfer</label><span class=\"btn btn-default btn-file\"><input type=file class=\"btn btn-default btn-file\" class=modal-form placeholder=\"\">Incarca</span></div></div><div class=modal-footer><button class=\"btn btn-primary\" ng-click=\"okTransfer(raion, localite)\">Salvare</button> <button class=\"btn btn-warning\" ng-click=cancel()>Anulare</button></div></div>"
  );


  $templateCache.put('./app/view/directives/addMember.html',
    "<div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=familyName>Nume</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\" ng-class=\"{'has-error':!application.member.firstName}\"><input class=form-control id=familyName placeholder=Nume ng-model=application.member.firstName require ng-pattern=\"/([A-Z][a-z]*)/\"></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=lastName>Prenume</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\" ng-class=\"{'has-error':!application.member.lastName}\"><input class=form-control id=lastName placeholder=Prenume ng-model=application.member.lastName uppercase=\"\" require ng-pattern=\"/([A-Z][a-z]*)/\"></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=patronimic>Patronimic</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\" ng-class=\"{'has-error':!application.member.patronimic}\"><input class=form-control id=patronimic placeholder=Patronimic ng-model=application.member.patronimic uppercase=\"\" require ng-pattern=\"/([A-Z][a-z]*)/\"></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=idnp>IDNP</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\" ng-model-onblur ng-class=\"{'has-error':!application.member.idnp}\"><input class=form-control id=idnp ng-bind=checkIdnp(application.member.idnp) ng-model=application.member.idnp placeholder=IDNP uppercase=\"\" require ng-pattern=\"/([1-9]){13}/\" maxlength=13></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=seria>Seria</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\" ng-class=\"{'has-error':!application.member.seria}\"><input class=form-control id=seria ng-model=application.member.seria placeholder=seria uppercase=\"\"></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=numPensLicence>Nr. Pensionar</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\" ng-class=\"{'has-error':!application.member.numPensLicence}\"><input class=form-control id=numPensLicence ng-model=application.member.numPensLicence placeholder=\"Numarul legitimatie\" uppercase=\"\"></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=raion>Raion</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\" ng-class=\"{'has-error':!raion}\"><select class=form-control id=raion ng-model=raion ng-options=\"item as item.nameRo for item in raions\" ng-change=\"selectLoalityByRaionId(raion,'')\"></select></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=localitate>Localitate</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\" ng-class=\"{'has-error':(application.member.raion && !localitate)}\"><select class=form-control id=localitate ng-model=localitate ng-options=\"item as item.nameRo for item in localitaties\"></select></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=street>Strada</label><div class=\"col-lg-8 col-md-8 col-sm-8 col-xs-8\" ng-style={padding:2} ng-class=\"{'has-error':!street}\"><input class=form-control id=street ng-model=application.member.street placeholder=Strada></div></div><div class=\"form-group col-lg-3 col-md-3 col-sm-3 col-xs-3\"><div class=\"col-xs-1 col-sm-1 col-md-1 col-lg-1\"><label class=notbold>Nr</label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\" ng-class=\"{'has-error':!nr}\"><input class=form-control id=nr ng-model=application.member.nr placeholder=\"\"></div><div class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2\"><label class=notbold>Bloc</label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><input class=form-control id=nrBloc ng-model=application.member.nrBloc placeholder=\"\"></div></div><div class=\"form-group col-lg-2 col-md-2 col-sm-2 col-xs-2\"><div class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2\"><label class=notbold>Ap</label></div><div class=\"col-xs-8 col-sm-8 col-md-8 col-lg-8\"><input class=form-control id=appartament ng-model=application.member.appartament placeholder=\"\"></div></div><div class=\"form-group col-lg-3 col-md-3 col-sm-3 col-xs-3\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=phone>Telefon</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input class=form-control id=phone ng-model=application.member.phone placeholder=\"\"></div></div></div>"
  );


  $templateCache.put('./app/view/directives/attachments.html',
    "<div ng-file-drop class=form-group><table class=\"table table-bordered table-striped\" ng-file-over><thead><tr><th>Denumire fișier</th><th>Dimensiune</th><th>Progres</th><th>Acțiuni</th></tr></thead><tbody><tr ng-repeat=\"item in uploader.queue\"><td>{{::item.file.name}}</td><td>{{::(item.file.size/1024/1024)|number:2}} MB</td><th><div class=progress><div class=progress-bar role=progressbar ng-style=\"{ 'width': item.progress + '%' }\"></div></div></th><td><a href class=\"btn btn-success btn-xs force-enabled\" ng-click=downloadFile(item) ng-show=item.isUploaded><span class=\"glyphicon glyphicon-download-alt\"></span></a> <a href class=\"btn btn-danger btn-xs force-enabled\" ng-click=removeFile(item) ng-hide=item.isUploaded><span class=\"glyphicon glyphicon-trash\"></span></a></td></tr></tbody></table><div class=row><label class=\"col-sm-3 control-label\">Atașați fișierele</label><div class=col-sm-3><input ng-file-select type=file multiple></div></div></div>"
  );


  $templateCache.put('./app/view/feed_back.html',
    "<div ng-controller=FeedBackController><h1></h1><h1></h1><ol class=breadcrumb><li><a href=\"#/\"><i class=\"glyphicon glyphicon-home\"></i></a></li><li class=active>Feed-back Prestator</li></ol><h1></h1></div>"
  );


  $templateCache.put('./app/view/file.html',
    ""
  );


  $templateCache.put('./app/view/home.html',
    "<div ng-controller=HomeController><h1></h1><h1></h1><div class=col-lg-12><div class=\"col-xs-1 col-sm-1 col-md-1 col-lg-1 bottom-space\"></div><div class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2 bottom-space\" ng-show=\" (obj.usertype == 'admin') || (obj.usertype == 'dass')\" ng-style={paddingBottom:10}><a href=#/cerere><button class=\"btn btn-info btn-block panel-buttons\">Inregistrarea cererilor</button></a></div><div class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2 bottom-space\" ng-show=\"(obj.usertype == 'mmpsf') || (obj.usertype == 'admin')\" ng-style={padding:10}><a href=#/mmpfs><button class=\"btn btn-info btn-block panel-buttons\">Repartizarea biletelor(MMPSF)</button></a></div><div class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2 bottom-space\" ng-show=\"(obj.usertype == 'dass')  || (obj.usertype == 'admin')\" ng-style={padding:10}><a href=#/dass><button class=\"btn btn-info btn-block panel-buttons\">Repartizarea biletelor(DASS)</button></a></div><div class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2 bottom-space\" ng-show=\"(obj.usertype == 'mmpsf') || (obj.usertype == 'admin') || (obj.usertype == 'dass')\" ng-style={padding:10}><a href=#/registru><button class=\"btn btn-info btn-block panel-buttons\">Registru bilete</button></a></div><div class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2 bottom-space\" ng-show=\"(obj.usertype == 'prestator') || (obj.usertype == 'admin')\" ng-style={padding:10}><a href=#/feed_back><button class=\"btn btn-info btn-block panel-buttons\">Feed-back prestator</button></a></div></div></div>"
  );


  $templateCache.put('./app/view/login.html',
    "<div class=row><h1></h1><h1></h1><div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\"></div><div class=\"col-lg-6 col-md-6 col-sm-6 col-xs-6 center middle\"><div class=\"panel panel-default\"><div class=panel-heading><i class=\"fa fa-lock\"></i> Autentificare</div><div class=panel-body><form class=\"form col-sm-12 col-xs-12 center\"><div class=\"form-group col-md-12 col-sm-12 col-xs-12\"><label class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label\">Utilizator</label><div class=\"col-lg-10 col-md-10 col-sm10 col-xs-10\" ng-class=\"{'has-error':invalid}\"><input ng-model=credentials.username class=\"form-control\"></div></div><div class=\"form-group col-md-12 col-sm-12 col-xs-12\"><label class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label\">Parola</label><div class=\"col-lg-10 col-md-10 col-sm10 col-xs-10\" ng-class=\"{'has-error':invalid}\"><input type=password ng-model=credentials.password class=\"form-control\"></div></div><div class=\"form-group col-md-12 col-sm-12 col-xs-12\" ng-show=invalid><label class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2\"></label><div class=\"col-lg-10 col-md-10 col-sm10 col-xs-10 alert alert-danger\"><p>***Userul sau parola sunt greșite! Main încercati.</p></div></div><div class=\"form-group last col-md-12 col-sm-12 col-xs-12\"><label class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2 control-label\"></label><div class=\"col-lg-10 col-md-10 col-sm10 col-xs-10\"><input type=button ng-click=login() value=Autentifica class=\"btn btn-success btn-sm\"></div></div></form></div></div></div><div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\"></div></div>"
  );


  $templateCache.put('./app/view/registru.html',
    "<tabset ng-controller=RegistruController><h1></h1><h1></h1><ol class=breadcrumb><li><a href=\"#/\"><i class=\"glyphicon glyphicon-home\"></i></a></li><li class=active>Registru bilete</li></ol><tab heading=\"Registru bilete primite\" ng-click=\"nextStep('close')\"><h1></h1><h1></h1><div class=row><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\" for=prestator>Denumire prestator</label><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><select class=form-control id=prestator ng-model=obj.prestator ng-change=selectorHandler() ng-options=\"item as item.nameRo for item in prestatori\"></select></div></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label class=\"col-xs-3 col-sm-3 col-md-3 col-lg-3\" for=raion>Raionul</label><div class=\"col-xs-8 col-sm-8 col-md-8 col-lg-8\"><select class=form-control id=raion ng-model=obj.raion ng-change=selectorHandler() ng-options=\"item as item.nameRo for item in raions \"></select></div></div><div class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2\"><div ng-controller=Datepicker class=\"col-xs-10 col-sm-10 col-md-10 col-lg-10\"><p class=input-group ng-disabled=\"!(obj.raion && obj.prestator)\"><input class=form-control id=year ng-model=obj.year ng-change=selectorHandler() datepicker-popup={{YearFormat}} is-open=opened show-button-bar=false datepicker-options=\"{minMode: 'year'}\" datepicker-mode=\"'year'\" timestamp disabled> <span class=input-group-btn><button type=button ng-disabled=\"!(obj.raion && obj.prestator)\" class=\"btn btn-default\" ng-click=open($event)><i class=\"glyphicon glyphicon-calendar\"></i></button></span></p></div></div></div><h1></h1><h1></h1><div class=row><h1></h1><p ng-style=\"{color:'red'}\">Afisarea foilor de tratament per prestator :</p></div><div class=row><table class=\"table table-bordered table-striped\"><thead><tr><th class=text-center>Nr.</th><th class=text-center>Nr. bilete de la</th><th class=text-center>Nr. bilete pina la</th><th class=text-center>Seria</th><th class=text-center>durata (zile)</th><th class=text-center>Perioada</th><th class=text-center>Nr. bilete disponibile</th><th class=text-center>Prestator</th><th class=text-center>Cost (lei)</th></tr></thead><tbody><tr ng-repeat=\"ticket in obj.allTickets | offset: currentPage*itemsPerPage | limitTo: itemsPerPage\"><td class=text-center>{{((currentPage)*itemsPerPage)+$index+1}}</td><td class=text-center>{{ticket.nrFrom}}</td><td class=text-center>{{ticket.nrTo}}</td><td class=text-center>{{ticket.seria}}</td><td class=text-center>{{(ticket.dateEnd - ticket.dateStart) | date:'dd'}}</td><td class=text-center>{{ticket.dateStart | date:'dd-MM-yyyy'}} - {{ticket.dateEnd | date:'dd-MM-yyyy'}}</td><td class=text-center>{{ticket.nrTo - ticket.nrFrom+1}}</td><td class=text-center>{{prestatorName}}</td><td class=text-center>{{ticket.price}}</td></tr></tbody></table><div ng-show=\"(ticketList.length > 0)\"><ul class=\"pager ng-cloak\"><li ng-class=prevPageDisabled()><a ng-click=firstPage() href=\"\"></a></li><li ng-class=prevPageDisabled()><a ng-click=prevPage() href=\"\"></a></li><li ng-repeat=\"n in range()\" ng-class=\"{active: n == currentPage}\" ng-click=setPage(n)><a href=#>{{n+1}}</a></li><li ng-class=nextPageDisabled()><a ng-click=nextPage() href=\"\"></a></li><li ng-class=nextPageDisabled()><a ng-click=lastPage(ticketList.length) href=\"\"></a></li></ul></div></div><h1></h1><div class=row><h1></h1><h1></h1><h1></h1><button class=\"btn btn-success\" ng-click=save()>Confirmare date</button></div></tab></tabset>"
  );


  $templateCache.put('./app/view/repartizarea_dass.html',
    "<div><h1></h1><h1></h1><ol class=breadcrumb><li><a href=\"#/\"><i class=\"glyphicon glyphicon-home\"></i></a></li><li class=active>Repartizarea biletelor (DASS)</li></ol><tabset><tab heading=\"Bilete alocate\"><h1></h1><div class=row><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\" ng-style={padding:0}><label ng-style={padding:0} class=\"col-xs-3 col-sm-3 col-md-3 col-lg-3\">Raionul :</label><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><select class=form-control id=raion ng-model=obj.raion ng-options=\"item as item.nameRo for item in raions \" ng-change=selectorTickets()></select></div></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label\">Anul</label><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\" ng-controller=Datepicker><p class=input-group><input class=form-control id=year datepicker-popup={{YearFormat}} ng-model=obj.year is-open=opened show-button-bar=false datepicker-options=\"{minMode: 'year'}\" datepicker-mode=\"'year'\" ng-change=selectorTickets() timestamp disabled> <span class=input-group-btn><button type=button class=\"btn btn-default\" ng-click=open($event)><i class=\"glyphicon glyphicon-calendar\"></i></button></span></p></div></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label\">Trimestru</label><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><p class=input-group><select ng-model=obj.trimestr class=form-control ng-options=\"item as item.name for item in obj.trimestrList\" ng-change=selectorTickets()></select></p></div></div></div><div class=row><h1></h1><p ng-style=\"{color:'red'}\">Bilete de tratament alocate :</p></div><div class=row><table class=\"table table-bordered table-striped\"><tr><th class=text-center>Prestatorul</th><th class=text-center>Luna I</th><th class=text-center>Luna II</th><th class=text-center>Luna III</th><th class=text-center>Durata</th><th class=text-center>Total bilete disponibile</th><th class=text-center>Bilete alocate</th></tr><tr ng-repeat=\"item in repartisationList\"><td class=text-left>{{item[0].nameRo}}</td><td class=text-center>{{item[3]}}</td><td class=text-center>{{item[4]}}</td><td class=text-center>{{item[5]}}</td><td class=text-center>{{item[2]+1}}</td><td class=text-center>{{item[6]}}</td><td class=text-center>{{item[1]}}</td></tr></table><h1></h1></div></tab><tab heading=\"Lista solicitari\" ng-click=\"nextStep('solicitari')\"><h1></h1><div class=row><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\" ng-style={padding:0}><label ng-style={padding:0} class=\"col-xs-3 col-sm-3 col-md-3 col-lg-3\">Raionul :</label><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><select class=form-control ng-model=obj.raion ng-options=\"item as item.nameRo for item in raions \" ng-change=selectorTickets()></select></div></div></div><div class=row><h1></h1><p ng-style=\"{color:'red'}\">Bilete eliberate :</p></div><div class=row><table class=\"table table-bordered table-striped\"><tr><th class=text-center>Nr.</th><th class=text-center>Raionul</th><th class=text-center>Localitatea</th><th class=text-center>Nr. cererii</th><th class=text-center>Data inregistrarii cererii</th><th class=text-center>IDNP beneficiar</th><th class=text-center>Nume</th><th class=text-center>Prenume</th><th class=text-center>Categorie</th><th class=text-center>Specific solicitat</th><th class=text-center>Insotitor</th><th class=text-center>Starea cerere</th><th class=text-center>Aciune</th></tr><tr ng-repeat=\"app in applicationsUrgent\" ng-style=\"{color:'red'}\"><td class=text-center>{{$index+1}}</td><td class=text-center>{{obj.raion.nameRo}}</td><td class=text-center>{{app.member.localitate.nameRo}}</td><td class=text-center><a target=_blank href=#/cerere/{{app.id}}>A-{{app.id}}</a></td><td class=text-center>{{app.date | date:'dd-MM-yyyy'}}</td><td class=text-center>{{app.member.idnp}}</td><td class=text-center>{{app.member.firstName}}</td><td class=text-center>{{app.member.lastName}}</td><td class=text-center>Categorie</td><td class=text-center>{{app.specificatii.nameRo}}</td><td class=text-center>{{app.member.guardian == null ? 'Nu' : 'Da'}}</td><td class=text-center>{{showAppStatus(app)}}</td><td class=text-center><button><span class=\"glyphicon glyphicon-share-alt\" ng-click=open(application)></span></button></td></tr><tr ng-repeat=\"app in applicationsOpen\"><td class=text-center>{{$index+applicationsUrgent.length+1}}</td><td class=text-center>{{obj.raion.nameRo}}</td><td class=text-center>{{app.member.localitate.nameRo}}</td><td class=text-center><a target=_blank href=#/cerere/{{app.id}}>A-{{app.id}}</a></td><td class=text-center>{{app.date | date:'dd-MM-yyyy'}}</td><td class=text-center>{{app.member.idnp}}</td><td class=text-center>{{app.member.firstName}}</td><td class=text-center>{{app.member.lastName}}</td><td class=text-center>Categorie</td><td class=text-center>{{app.specificatii.nameRo}}</td><td class=text-center>{{app.member.guardian == null ? 'Nu' : 'Da'}}</td><td class=text-center>{{showAppStatus(app)}}</td><td class=text-center><button><span class=\"glyphicon glyphicon-share-alt\" ng-click=open(application)></span></button></td></tr></table><h1></h1><div ng-show=\"(applications.length > 0)\"><ul class=\"pager ng-cloak\"><li ng-class=prevPageDisabled()><a ng-click=firstPage() href=\"\"></a></li><li ng-class=prevPageDisabled()><a ng-click=prevPage() href=\"\"></a></li><li ng-repeat=\"n in range()\" ng-class=\"{active: n == currentPage}\" ng-click=setPage(n)><a href=#>{{n+1}}</a></li><li ng-class=nextPageDisabled()><a ng-click=nextPage() href=\"\"></a></li><li ng-class=nextPageDisabled()><a ng-click=lastPage(applications.length) href=\"\"></a></li></ul></div></div></tab></tabset></div>"
  );


  $templateCache.put('./app/view/repartizarea_mmpfs.html',
    "<div><h1></h1><h1></h1><ol class=breadcrumb><li><a href=\"#/\"><i class=\"glyphicon glyphicon-home\"></i></a></li><li class=active>Repartizarea biletelor (MMPSF)</li></ol><tabset class=\"nav nav-tabs\"><tab heading=\"Repartizare bilete (Prestator)\" ng-click=\"nextStep('registru')\"><h1></h1><div class=row><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><label class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\" for=prestator>Denumire Prestator</label><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><select class=form-control id=prestator ng-model=obj.prestator ng-disabled=disable ng-change=selectorHandler() ng-options=\"item as item.nameRo for item in prestatori\"></select></div><div class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2\" ng-style={padding:0}><span><button type=button class=\"btn btn-default\" ng-click=open($event)><i class=\"glyphicon glyphicon-plus\"></i></button></span></div></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6 control-label\" for=costBilet>Costul biletului de tratament</label><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><input min=0 class=form-control id=costBilet ng-disabled=disable placeholder=Pret ng-model=obj.price></div></div></div><div class=row><h1></h1><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><label class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label\">Anul</label><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\" ng-controller=Datepicker><p class=input-group><input class=form-control id=year ng-model=obj.year ng-change=selectorHandler() datepicker-popup={{YearFormat}} is-open=opened show-button-bar=false datepicker-options=\"{minMode: 'year'}\" datepicker-mode=\"'year'\" timestamp disabled> <span class=input-group-btn><button type=button class=\"btn btn-default\" ng-click=open($event)><i class=\"glyphicon glyphicon-calendar\"></i></button></span></p></div></div><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><label class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\" for=specific>Specializare</label><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><input ng-disabled=!obj.add class=form-control id=specific ng-model=obj.specificatii[0].nameRo ng-disabled=true></div></div></div><div class=row><h1></h1><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\" uploader=uploader filters=\"queueLimit, customFilter\"><span class=\"btn btn btn-warning btn-file\" ng-disabled=\"!((obj.specificatii) && (obj.prestator) && (obj.price) && (obj.year) && !(ticketList.length >0))\"><input type=file nv-file-select=\"\" uploader=uploader accept=\"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel\"> Importare grafic de bilete disponibile</span></div></div><div class=row ng-style={padding:5}><h1></h1><p ng-style=\"{color:'red'}\">Conform graficului prezentat de catre prestator, sunt disponibile urmatoarele bilete :</p><div class=row><table class=\"table table-bordered table-striped\"><thead><tr><th class=text-center>Nr.</th><th class=text-center>Nr. bilete de la</th><th class=text-center>Nr. bilete pina la</th><th class=text-center>Seria</th><th class=text-center>durata (zile)</th><th class=text-center>Perioada</th><th class=text-center>Nr. bilete disponibile</th><th class=text-center>Prestator</th><th class=text-center>Cost (lei)</th></tr></thead><tbody><tr ng-repeat=\"ticket in ticketList | offset: currentPage*itemsPerPage | limitTo: itemsPerPage\"><td class=text-center>{{((currentPage)*itemsPerPage)+$index+1}}</td><td class=text-center>{{ticket.nrFrom}}</td><td class=text-center>{{ticket.nrTo}}</td><td class=text-center>{{ticket.seria}}</td><td class=text-center>{{(ticket.dateEnd - ticket.dateStart) | date:'dd'}}</td><td class=text-center>{{ticket.dateStart | date:'dd-MM-yyyy'}} - {{ticket.dateEnd | date:'dd-MM-yyyy'}}</td><td class=text-center>{{ticket.nrTo - ticket.nrFrom+1}}</td><td class=text-center>{{prestatorName}}</td><td class=text-center>{{ticket.price}}</td></tr></tbody></table><div ng-show=\"(ticketList.length > 0)\"><ul class=\"pager ng-cloak\"><li ng-class=prevPageDisabled()><a ng-click=firstPage() href=\"\" class=\"glyphicon glyphicon-backward\"></a></li><li ng-class=prevPageDisabled()><a ng-click=prevPage() href=\"\" class=\"glyphicon glyphicon-chevron-left\"></a></li><li ng-repeat=\"n in range()\" ng-class=\"{active: n == currentPage}\" ng-click=setPage(n)><a href=#>{{n+1}}</a></li><li ng-class=nextPageDisabled()><a ng-click=nextPage() href=\"\" class=\"glyphicon glyphicon-chevron-right\"></a></li><li ng-class=nextPageDisabled()><a ng-click=lastPage(ticketList.length) href=\"\" class=\"glyphicon glyphicon-forward\"></a></li></ul></div></div></div><div class=row><button class=\"btn btn-default\" ng-model=repartizarebtn ng-disabled=\"!((ticketList.length >0)&& !(repartisationList.length >0))\" ng-click=repartizarePerRaione()>Repartizarea pe raioane</button></div><div class=row><h1></h1><table class=\"table table-bordered table-striped\"><tr><th class=text-center>Numar</th><th class=text-center>Raion</th><th class=text-center>Total bilete repartizate per raion</th><th class=text-center>Prestator</th></tr><tr ng-repeat=\"item in ticketListOpen \"><td class=text-center>{{$index+1}}</td><td class=text-left>{{item[0].nameRo}}</td><td class=text-center>{{item[2]}}</td><td class=text-center>{{item[1].nameRo}}</td></tr><tr><td class=text-center><b>Total</b></td><td class=text-left></td><td class=text-center><b>{{ticketListOpen[ticketListOpen.length-1].total}}</b></td><td class=text-center></td></tr></table></div><h1></h1></tab><tab heading=\"Repartizare bilete (Raion)\" ng-click=\"nextStep('registru')\"><h1></h1><div class=row><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><label class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label\" for=raion>Raionul</label><div class=\"col-xs-8 col-sm-8 col-md-8 col-lg-8\"><select class=form-control id=raion ng-model=raion ng-change=changeRaion(raion) ng-options=\"item as item.nameRo for item in raions \"></select></div></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4 control-label\">Anul</label><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\" ng-controller=Datepicker><p class=input-group><input class=form-control datepicker-popup={{YearFormat}} ng-change=listTicketsByRaionId(raion) ng-model=obj.year is-open=opened show-button-bar=false datepicker-options=\"{minMode: 'year'}\" datepicker-mode=\"'year'\" timestamp disabled> <span class=input-group-btn><button type=button class=\"btn btn-default\" ng-disabled=!prestator ng-click=open($event)><i class=\"glyphicon glyphicon-calendar\"></i></button></span></p></div></div></div><h1></h1><tabset class=\"nav nav-tabs\"><tab heading=\"Registru bilete repartizate\"><h1></h1><div class=\"row control-label\"><p class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6 control-label\" ng-style=\"{color:'red'}\">Bilete de tratament pe raion :</p></div><div class=\"row col-xs-12 col-sm-12 col-md-12 col-lg-12 control-label\"><h1></h1><table class=\"table table-bordered table-striped\"><tr><th class=text-center>Nr.</th><th class=text-center>Raionul</th><th class=text-center>Durata</th><th class=text-center>Perioada</th><th class=text-center>Prestator</th></tr><tr ng-repeat=\"item in ticketListOpen\"><td class=text-left>{{$index+1}}</td><td class=text-left>{{raion.nameRo}}</td><td class=text-center>{{(item.dateEnd - item.dateStart) | date:'dd'}}</td><td class=text-center>{{item.dateEnd | date:'dd-MM-yyyy'}} - {{item.dateStart | date:'dd-MM-yyyy'}}</td><td class=text-center>{{item.prestator.nameRo}}</td></tr></table></div></tab><tab heading=\"Registul bilete solicitate\"><div class=row><h1></h1><p class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6 control-label\" ng-style=\"{color:'red'}\">Registul listelor de solicitari a biletelor de tratament :</p></div><div class=\"row col-xs-12 col-sm-12 col-md-12 col-lg-12 control-label\"><h1></h1><table class=\"table table-bordered table-striped\"><tr><th class=text-center>Nr.</th><th class=text-center>Raionul</th><th class=text-center>Localitatea</th><th class=text-center>Nr. cererii</th><th class=text-center>Data inregistrarii cererii</th><th class=text-center>IDNP</th><th class=text-center>Nume</th><th class=text-center>Prenume</th><th class=text-center>Specificul solicitat</th></tr><tr ng-repeat=\"application in applicationsOpen \"><td class=text-center>{{$index+1}}</td><td class=text-center>{{application.member.raion.nameRo}}</td><td class=text-center>{{application.member.localitate.nameRo}}</td><td class=text-center><a target=_blank href=#/cerere/{{application.id}}>A-{{application.id}}</a></td><td class=text-center>{{application.date | date:'dd-MM-yyyy'}}</td><td class=text-center>{{application.member.idnp}}</td><td class=text-center>{{application.member.firstName}}</td><td class=text-center>{{application.member.lastName}}</td><td class=text-center>{{application.specificatii.nameRo}}</td></tr></table></div></tab><tab heading=\"Registru biletelor returnate\"><div class=row><h1></h1><p class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6 control-label\" ng-style=\"{color:'red'}\">Registul biletelor returnate :</p></div><div class=\"row col-xs-12 col-sm-12 col-md-12 col-lg-12 control-label\"><h1></h1><table class=\"table table-bordered table-striped\"><tr><th class=text-center>Nr.</th><th class=text-center>Seria bilet</th><th class=text-center>nr. bilet</th><th class=text-center>Durata</th><th class=text-center>Perioada</th><th class=text-center>Prestator</th><th class=text-center>Motiv returnare</th></tr></table></div></tab></tabset></tab></tabset></div>"
  );


  $templateCache.put('./app/view/view-application.html',
    "<div><h1></h1><h1></h1><ol class=breadcrumb><li><a href=\"#/\"><i class=\"glyphicon glyphicon-home\"></i></a></li><li class=active>Vizualizarea cererilor</li></ol><h1></h1><tabset><tab heading=Solicitantul><h4>Date despre solicitant :</h4><h1></h1><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=familyName>Nume</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input class=form-control id=familyName ng-disabled=true ng-model=application.member.firstName require ng-pattern=\"/([A-Z][a-z]*)/\"></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=lastName>Prenume</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input class=form-control id=lastName ng-disabled=true ng-model=application.member.lastName></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=patronimic>Patronimic</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input class=form-control id=patronimic ng-disabled=true ng-model=application.member.patronimic></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=idnp>IDNP</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input class=form-control id=idnp ng-model=application.member.idnp ng-disabled=true></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=seria>Seria</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input class=form-control id=seria ng-model=application.member.seria ng-disabled=true></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=numPensLicence>Nr. Pensionar</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input class=form-control id=numPensLicence ng-model=application.member.numPensLicence ng-disabled=true></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=raion>Raion</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input class=form-control id=raion ng-model=application.member.raion.nameRo ng-disabled=true></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=localitate>Localitate</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input class=form-control id=localitate ng-model=application.member.localitate.nameRo ng-disabled=true></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=street>Strada</label><div class=\"col-lg-8 col-md-8 col-sm-8 col-xs-8\" ng-style={padding:2}><input class=form-control id=street ng-model=application.member.street ng-disabled=true></div></div><div class=\"form-group col-lg-3 col-md-3 col-sm-3 col-xs-3\"><div class=\"col-xs-1 col-sm-1 col-md-1 col-lg-1\"><label class=notbold>Nr</label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><input class=form-control id=nr ng-model=application.member.house ng-disabled=true></div><div class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2\"><label class=notbold>Bloc</label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><input class=form-control id=bloc ng-model=application.member.block ng-disabled=true></div></div><div class=\"form-group col-lg-2 col-md-2 col-sm-2 col-xs-2\"><div class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2\"><label class=notbold>Ap</label></div><div class=\"col-xs-8 col-sm-8 col-md-8 col-lg-8\"><input class=form-control id=flat ng-model=application.member.flat ng-disabled=true></div></div><div class=\"form-group col-lg-3 col-md-3 col-sm-3 col-xs-3\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=phone>Telefon</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input class=form-control id=phone ng-model=application.member.phone ng-disabled=true></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\"><label class=notbold for=specificatii>Specificatii</label></div><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input class=form-control id=specificatii ng-model=application.specificatii.nameRo ng-disabled=true></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\"><label class=notbold for=prestator>Prestator</label></div><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input class=form-control id=prestator ng-model=obj.prestator[0].nameRo ng-disabled=true></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><div class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3\"><label class=notbold for=dateC>Data crearii</label></div><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input type=date class=form-control id=dateC ng-model=obj.date ng-disabled=true></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><hr><div class=\"form-group col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label ng-style={paddingRight:-10}>Angajat in cimpul muncii</label></div><label class=notbold><input type=radio data-ng-value=true ng-model=application.member.hasJob ng-disabled=true> da</label><label class=notbold><input type=radio data-ng-value=false ng-model=application.member.hasJob ng-disabled=true> nu</label></div><div class=\"form-group col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-3 col-sm-3 col-md-3 col-lg-3\"><label ng-style={paddingRight:-10}>Caz de urgența</label></div><label class=notbold><input type=radio data-ng-value=true ng-model=application.is_urgent ng-style={padding:10} ng-disabled=true> da</label><label class=notbold><input type=radio data-ng-value=false ng-model=application.is_urgent ng-style={padding:10} ng-disabled=true> nu</label></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><hr><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label><b>Reducere solicitată</b></label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><div><label><input type=radio data-ng-value=30 ng-model=application.descounts ng-disabled=true> reducere 30%</label></div></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label><b></b></label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><div><label><input type=radio data-ng-value=70 ng-model=application.descounts ng-disabled=true> reducere 70%</label></div></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><hr><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label><b>Categorie</b></label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label class=notbold ng-disabled=true><input type=checkbox ng-model=application.member.persnInAge ng-disabled=true> Persoana in virsta</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label><b></b></label></div><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><label class=notbold><input type=checkbox ng-model=application.member.limitedAge ng-disabled=true> In baza limetei de virsta</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label><b></b></label></div><div class=\"col-xs-7 col-sm-7 col-md-5 col-lg-7\"><label class=notbold><input type=checkbox ng-model=application.member.benifAlocCity ng-disabled=true> beneficiar de alocatie sociala de stat</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"form-group col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label><b></b></label></div><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label class=notbold><input type=checkbox ng-model=application.member.benifPension ng-disabled=true> beneficiaza de pensie</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label><b></b></label></div><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><label class=notbold><input type=checkbox ng-model=application.member.persnWDisabil ng-disabled=true> Persoana cu disabilitati</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label><b></b></label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label class=notbold><input type=radio value=sever ng-model=application.member.disabilityCategory ng-disabled=true> grad sever</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><label><b></b></label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label class=notbold><input type=checkbox value=true ng-model=application.member.needsGuardian ng-disabled=true> necesita insotitor</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label><b></b></label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label class=notbold><input type=radio value=accentuat ng-model=application.member.disabilityCategory ng-disabled=true> grad accentuat</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"form-group col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label><b></b></label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label class=notbold><input type=radio value=mediu ng-model=application.member.disabilityCategory ng-disabled=true> grad mediu</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label><b></b></label></div><div class=\"col-xs-7 col-sm-7 col-md-7 col-lg-7\"><label class=notbold><input type=checkbox ng-model=application.member.persnRepresat ng-disabled=true> Persoane represate si reabilitate ulterior</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label><b></b></label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label class=notbold><input type=checkbox ng-disabled=true> reducere 30%</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"form-group col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label><b></b></label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label class=notbold><input type=checkbox ng-disabled=true> valorificat in 3 ani</label></div></div></div><div ng-show=application.member.needsGuardian><h4>Date despre insotitor</h4><h1></h1><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=familyNameG>Nume</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input class=form-control id=familyNameG ng-model=application.member.guardian.firstName ng-disabled=true></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=lastNameG>Prenume</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input class=form-control id=lastNameG ng-model=application.member.guardian.lastName ng-disabled=true></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=patronimicG>Patronimic</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input class=form-control id=patronimicG ng-model=application.member.guardian.patronimic ng-disabled=true></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=idnp>IDNP</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\" ng-model-onblur><input class=form-control id=idnpG ng-change=\"checkIdnp('guardian')\" ng-model=application.member.guardian.idnp ng-disabled=true></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=seria>Seria</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input class=form-control id=seriaG ng-model=application.member.guardian.seria ng-disabled=true></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=numPensLicenceG>Nr. Pensionar</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input class=form-control id=numPensLicenceG ng-model=application.member.guardian.numPensLicence ng-disabled=true></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=raionG>Raion</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input class=form-control id=raionG ng-model=application.member.guardian.raion.nameRo ng-disabled=true></div></div><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=localitateG>Localitate</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input class=form-control id=localitateG ng-model=application.member.guardian.localitate.nameRo ng-disabled=true></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"form-group col-lg-4 col-md-4 col-sm-4 col-xs-4\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=streetG>Strada</label><div class=\"col-lg-8 col-md-8 col-sm-8 col-xs-8\" ng-style={padding:2}><input class=form-control id=streetG ng-model=application.member.guardian.street ng-disabled=true></div></div><div class=\"form-group col-lg-3 col-md-3 col-sm-3 col-xs-3\"><div class=\"col-xs-1 col-sm-1 col-md-1 col-lg-1\"><label class=notbold>Nr</label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><input class=form-control id=nrG ng-model=application.member.guardian.house ng-disabled=true></div><div class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2\"><label class=notbold>Bloc</label></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><input class=form-control id=blockG ng-model=application.member.guardian.block ng-disabled=true></div></div><div class=\"form-group col-lg-2 col-md-2 col-sm-2 col-xs-2\"><div class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2\"><label class=notbold>Ap</label></div><div class=\"col-xs-8 col-sm-8 col-md-8 col-lg-8\"><input class=form-control id=flatG ng-model=application.member.guardian.flat ng-disabled=true></div></div><div class=\"form-group col-lg-3 col-md-3 col-sm-3 col-xs-3\"><label class=\"col-lg-3 col-md-3 col-sm-3 col-xs-3 notbold\" for=phone>Telefon</label><div class=\"col-lg-9 col-md-9 col-sm-9 col-xs-9\"><input class=form-control id=phoneG ng-model=application.member.guardian.phone ng-disabled=true></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><hr><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label><b>Categorie</b></label></div><div class=\"col-xs-8 col-sm-8 col-md-8 col-lg-8\"><label class=notbold><input type=checkbox ng-model=application.member.guardian.guardianBenifAlocCity ng-disabled=true> primeste alocatii sociale de stat</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label><b></b></label></div><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><label class=notbold><input type=checkbox ng-model=application.member.guardian.guardianBenifPension ng-disabled=true> beneficiaza de pensie</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\"><label><b></b></label></div><div class=\"col-xs-7 col-sm-7 col-md-7 col-lg-7\"><label class=notbold><input type=checkbox ng-model=application.member.guardian.guardianPersWdisability ng-disabled=true> persoana cu disabilitati</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label><b></b></label></div><div class=\"col-xs-7 col-sm-7 col-md-7 col-lg-7\"><label class=notbold><input type=radio value=accentuat ng-model=application.member.guardian.disabilityCategory ng-disabled=true> grad accentuat</label></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label><b></b></label></div><div class=\"col-xs-7 col-sm-7 col-md-7 col-lg-7\"><label class=notbold><input type=radio value=mediu ng-model=application.member.guardian.disabilityCategory ng-disabled=true> grad mediu</label></div></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><h1></h1><h1></h1></div></tab><tab heading=Anexe><form role=form><h1></h1><h4>Acte obligatorii :</h4><h1></h1><div class=\"row col-xs-12 col-sm-12 col-md-12 col-lg-12\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><span><input type=checkbox id=cerere ng-model=\"application.cerere\"></span><label>Cererea</label></div><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><span><input type=checkbox id=medicalCert ng-model=\"application.medicalCert\"></span><label>Certificatul medical al 070E</label></div></div><div class=\"row col-xs-12 col-sm-12 col-md-12 col-lg-12\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><span><input type=checkbox id=copiaAct ng-model=\"application.copyOfIdentityDoc\"></span><label>Copia Actului de identitate</label></div><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><span><input type=checkbox id=recomandation ng-model=\"application.recomandation\"></span><label>Recomandarea centrului de reabilitare/recuperare</label></div></div><div class=\"row col-xs-12 col-sm-12 col-md-12 col-lg-12\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><span><input type=checkbox id=conclusionConsilium ng-model=\"application.conclusionConsilium\"></span><label>Concluzia Consiliului de expertiza medicala si vitalitatii</label></div><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><span><input type=checkbox id=workCarnetCopy ng-model=\"application.workCarnetCopy\"></span><label>Copii din paginile principale din carnetul de munca</label></div></div><div class=\"row col-xs-12 col-sm-12 col-md-12 col-lg-12\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><span><input type=checkbox id=pensionarPermis ng-model=\"application.pensionarPermis\"></span><label>Legitimatia de pensionar</label></div><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><span><input type=checkbox id=copyPasaport ng-model=\"application.copyPasaport\"></span><label>Copia pasaportului RM</label></div></div><div class=\"row col-xs-12 col-sm-12 col-md-12 col-lg-12\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\" ng-show=app.needsGuardian><span><input type=checkbox id=copuOfIdentityDocGuardian ng-model=\"application.copuOfIdentityDocGuardian\"></span><label>Copia Actului de identitate insotitor</label></div><h1></h1></div><div ng-file-drop class=form-group nv-file-drop=\"\" uploader=uploader filters=\"queueLimit, customFilter\"><table class=\"table table-bordered table-striped\" ng-file-over><thead><tr><th>Denumire fișier</th><th>Dimensiune</th><th>Progres</th><th>Acțiuni</th></tr></thead><tbody><tr ng-repeat=\"item in uploader.queue\"><td>{{item.file.name}}</td><td>{{(item.file.size/1024/1024)|number:2}} MB</td><th><div class=progress><div class=progress-bar role=progressbar ng-style=\"{ 'width': item.progress + '%' }\"></div></div></th><td><a href class=\"btn btn-success btn-xs force-enabled\" ng-click=downloadFile(item) ng-show=item.isUploaded><span class=\"glyphicon glyphicon-download-alt\"></span></a> <a href class=\"btn btn-danger btn-xs force-enabled\" ng-click=onCancelItem(item) ng-hide=item.isUploaded><span class=\"glyphicon glyphicon-trash\"></span></a></td></tr></tbody></table><div class=row><label class=\"col-sm-3 control-label\">Atașați fișierele</label><div class=col-sm-3><input ng-file-select type=file nv-file-select=\"\" uploader=uploader multiple></div></div></div><div class=\"row col-xs-12 col-sm-12 col-md-12 col-lg-12\"><hr><button class=\"btn btn-primary\" type=button ng-click=save() ng-disabled=!checkNeedData()>Salvare</button><h1></h1></div><h1></h1></form></tab><tab heading=Biletul ng-show=true><h1></h1><div><div class=row><h1></h1><h4>Bilet pentru solicitant</h4></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label ng-style={padding:0} class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4 notbold\">Denumire prestator</label><div class=\"col-xs-7 col-sm-7 col-md-7 col-lg-7\"><input class=form-control placeholder=\"\"></div></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\" ng-style={padding:0}><label class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5 notbold\">Perioada de la</label><div class=\"col-xs-7 col-sm-7 col-md-7 col-lg-7\" ng-controller=Datepicker><p class=input-group><input class=form-control datepicker-popup={{YearFormat}} ng-disabled=!obj.raion ng-change=listTicketsByRaionId(0) ng-model=obj.year is-open=opened show-button-bar=false datepicker-options=dateOptions timestamp disabled> <span class=input-group-btn><button type=button class=\"btn btn-default\" ng-click=open($event)><i class=\"glyphicon glyphicon-calendar\"></i></button></span></p></div></div><div class=\"col-xs-3 col-sm-3 col-md-3 col-lg-3\"><label class=\"col-xs-3 col-sm-3 col-md-3 col-lg-3 notbold\" ng-style={padding:0}>pina la</label><div class=\"col-xs-9 col-sm-9 col-md-9 col-lg-9\" ng-controller=Datepicker ng-style={padding:0}><p class=input-group><input class=form-control ng-style={padding:0} datepicker-popup={{YearFormat}} ng-disabled=!obj.raion ng-change=listTicketsByRaionId(0) ng-model=obj.year is-open=opened show-button-bar=false datepicker-options=dateOptions timestamp disabled> <span class=input-group-btn><button type=button class=\"btn btn-default\" ng-click=open($event)><i class=\"glyphicon glyphicon-calendar\"></i></button></span></p></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label ng-style={padding:0} class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4 notbold\">Costul biletului</label><div class=\"col-xs-7 col-sm-7 col-md-7 col-lg-7\"><input class=form-control placeholder=\"\"></div></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\" ng-style={padding:0}><label class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5 notbold\">Costul cu reducere</label><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><input class=form-control placeholder=\"\"></div></div></div></div><div ng-show=app.needsGuardian><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\" ng-style={padding:0}><hr><h1></h1><h4>Bilet pentru insotitor</h4></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label ng-style={padding:0} class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4 notbold\">Denumire prestator</label><div class=\"col-xs-7 col-sm-7 col-md-7 col-lg-7\"><input class=form-control placeholder=\"\"></div></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\" ng-style={padding:0}><label class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5 notbold\">Perioada de la</label><div class=\"col-xs-7 col-sm-7 col-md-7 col-lg-7\" ng-controller=Datepicker><p class=input-group><input class=form-control datepicker-popup={{YearFormat}} ng-disabled=!obj.raion ng-change=listTicketsByRaionId(0) ng-model=obj.year is-open=opened show-button-bar=false datepicker-options=dateOptions timestamp disabled> <span class=input-group-btn><button type=button class=\"btn btn-default\" ng-click=open($event)><i class=\"glyphicon glyphicon-calendar\"></i></button></span></p></div></div><div class=\"col-xs-3 col-sm-3 col-md-3 col-lg-3\"><label class=\"col-xs-3 col-sm-3 col-md-3 col-lg-3 notbold\" ng-style={padding:0}>pina la</label><div class=\"col-xs-9 col-sm-9 col-md-9 col-lg-9\" ng-controller=Datepicker ng-style={padding:0}><p class=input-group><input class=form-control ng-style={padding:0} datepicker-popup={{YearFormat}} ng-disabled=!obj.raion ng-change=listTicketsByRaionId(0) ng-model=obj.year is-open=opened show-button-bar=false datepicker-options=dateOptions timestamp disabled> <span class=input-group-btn><button type=button class=\"btn btn-default\" ng-click=open($event)><i class=\"glyphicon glyphicon-calendar\"></i></button></span></p></div></div></div><div class=\"row col-lg-12 col-md-12 col-sm-12 col-xs-12\"><div class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5\"><label ng-style={padding:0} class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4 notbold\">Costul biletului</label><div class=\"col-xs-7 col-sm-7 col-md-7 col-lg-7\"><input class=form-control placeholder=\"\"></div></div><div class=\"col-xs-4 col-sm-4 col-md-4 col-lg-4\" ng-style={padding:0}><label class=\"col-xs-5 col-sm-5 col-md-5 col-lg-5 notbold\">Costul cu reducere</label><div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\"><input class=form-control placeholder=\"\"></div></div></div></div><div class=\"row col-xs-12 col-sm-12 col-md-12 col-lg-12\"><hr><button class=\"btn btn-success\">Confirmare bilet</button> <button class=\"btn btn-danger\">Refuz bilet</button> <button class=\"btn btn-primary\" ng-click=open(application)>Returnare bilet</button> <button class=\"btn btn-warning\">Inchiere bilet</button><h1></h1></div></tab></tabset></div>"
  );


  $templateCache.put('./app/view/view-taxonomy.html',
    "<div>{{taxonomy}}</div><h1></h1><div>{{taxonomy.id}}</div>"
  );

}]);
