//@ui5-bundle com/myorg/mylib/library-preload.js
/*!
 * ${copyright}
 */
sap.ui.predefine("com/myorg/mylib/TypedJSONContext", ["sap/ui/model/Context"],function(e){"use strict";const t=e.extend("com.myorg.mylib.TypedJSONContext",{});return t});
/*!
 * ${copyright}
 */
sap.ui.predefine("com/myorg/mylib/TypedJSONModel", ["sap/ui/model/json/JSONModel"],function(e){"use strict";const o=e.extend("com.myorg.mylib.TypedJSONModel",{});return o});
/*!
 * ${copyright}
 */
sap.ui.predefine("com/myorg/mylib/library", ["sap/ui/core/Lib","sap/ui/core/library"],function(e,i){"use strict";const r=e.init({name:"com.myorg.mylib",version:"1.0.0",dependencies:["sap.ui.core"],types:[],interfaces:[],controls:[],elements:[],noLibraryCSS:true});return r});
sap.ui.require.preload({
	"com/myorg/mylib/manifest.json":'{"_version":"1.21.0","sap.app":{"id":"com.myorg.mylib","type":"library","embeds":[],"applicationVersion":{"version":"1.0.0"},"title":"com.myorg.mylib","description":"Some description about com.myorg.mylib","resources":"resources.json","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":[]},"sap.ui5":{"dependencies":{"minUI5Version":"1.130","libs":{"sap.ui.core":{"minVersion":"1.130.0"}}},"library":{"i18n":false,"css":false,"content":{"controls":[],"elements":[],"types":[],"interfaces":[]}}}}'
});
//# sourceMappingURL=library-preload.js.map
