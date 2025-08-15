/*!
 * ${copyright}
 */
sap.ui.define(["sap/ui/core/Lib", "sap/ui/core/library"], function (Lib, sap_ui_core_library) {
  "use strict";

  /**
   * Initialization Code and shared classes of library com.myorg.mylib.
   */

  // delegate further initialization of this library to the Core
  const thisLib = Lib.init({
    name: "com.myorg.mylib",
    version: "1.0.0",
    dependencies: [
    // keep in sync with the ui5.yaml and .library files
    "sap.ui.core"],
    types: [],
    interfaces: [],
    controls: [],
    elements: [],
    noLibraryCSS: true // if no CSS is provided, you can disable the library.css load here
  });

  // export the library namespace
  return thisLib;
});
//# sourceMappingURL=library-dbg.js.map
