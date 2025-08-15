declare module "com/myorg/mylib/TypedJSONContext" {
    /*!
     * ${copyright}
     */
    import Context from "sap/ui/model/Context";
    import TypedJSONModel from "com/myorg/mylib/TypedJSONModel";
    import { AbsoluteBindingPath, RelativeBindingPath, PropertyByRelativeBindingPath } from "com/myorg/mylib/TypedJSONModel";
    /**
     * Constructor for a new <code>com.myorg.mylib.TypedJSONContext</code>.
     *
     * This is intentionally not documented in JSDoc, as it is only relevant for TypeScript users
     * and the types for this class are added to the UI5 type definitions.
     *
     * Originally added in version 1.140.0, this library approach (or directly in-app) can be used
     * as rudimentary "downport".
     *
     * Original file: https://github.com/UI5/openui5/blob/af03f36b36773f9ce0a5def4f4ea50f47d3a91fc/src/sap.ui.core/src/sap/ui/model/json/TypedJSONModel.js
     *
     * @extends sap.ui.model.Context
     * @constructor
     * @public
     * @name com.myorg.mylib.TypedJSONContext
     */
    class TypedJSONContext extends Context {
    }
    module "com/myorg/mylib/TypedJSONContext" {
        /**
         * TypedJSONContext is a subclass of Context that provides type-safe access to the model data. It is only available when using UI5 with TypeScript.
         *
         * @since 1.140.0
         */
        export default class TypedJSONContext<Data extends object, Root extends AbsoluteBindingPath<Data>> extends Context {
            constructor(oModel: TypedJSONModel<Data>, sPath: Root);
            getModel(): TypedJSONModel<Data>;
            getProperty<P extends RelativeBindingPath<Data, Root>>(sPath: P extends RelativeBindingPath<Data, Root> ? P : never): PropertyByRelativeBindingPath<Data, Root, P>;
        }
    }
}
//# sourceMappingURL=TypedJSONContext.d.ts.map