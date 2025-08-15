//@ui5-bundle com/myorg/mylib/library-preload.js
/*!
 * ${copyright}
 */
sap.ui.predefine("com/myorg/mylib/TypedJSONContext", ["sap/ui/model/Context"],function(e){"use strict";class t extends e{}var s={__esModule:true};s.TypedJSONContext=t;return s});
/*!
 * ${copyright}
 */
sap.ui.predefine("com/myorg/mylib/TypedJSONModel", ["sap/ui/model/json/JSONModel"],function(e){"use strict";class s extends e{}var d={__esModule:true};d.TypedJSONModel=s;return d});
/*!
 * ${copyright}
 */
sap.ui.predefine("com/myorg/mylib/library", ["sap/ui/core/Lib","sap/ui/core/library"],function(e,i){"use strict";const r=e.init({name:"com.myorg.mylib",version:"1.0.0",dependencies:["sap.ui.core"],types:[],interfaces:[],controls:[],elements:[],noLibraryCSS:true});return r});
sap.ui.require.preload({
	"com/myorg/mylib/manifest.json":'{"_version":"1.21.0","sap.app":{"id":"com.myorg.mylib","type":"library","embeds":[],"applicationVersion":{"version":"1.0.0"},"title":"com.myorg.mylib","description":"example lib for typed json model downport - do not reuse","resources":"resources.json","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":[]},"sap.ui5":{"dependencies":{"minUI5Version":"1.130","libs":{"sap.ui.core":{"minVersion":"1.130.0"}}},"library":{"i18n":false,"css":false,"content":{"controls":[],"elements":[],"types":[],"interfaces":[]}}}}'
});
//# sourceMappingURL=library-preload.js.map
