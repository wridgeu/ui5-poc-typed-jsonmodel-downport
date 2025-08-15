declare module "com/myorg/mylib/TypedJSONModel" {
    /*!
     * ${copyright}
     */
    import JSONModel from "sap/ui/model/json/JSONModel";
    import TypedJSONContext from "com/myorg/mylib/TypedJSONContext";
    import Context from "sap/ui/model/Context";
    /**
     * Constructor for a new <code>com.myorg.mylib.TypedJSONModel</code>.
     *
     * This is intentionally not documented in JSDoc, as it is only relevant for TypeScript users
     * and the types for this class are added to the UI5 type definitions.
     *
     * Originally added in version 1.140.0, this library approach (or directly in-app) can be used
     * as rudimentary "downport".
     *
     * Original file: https://github.com/UI5/openui5/blob/af03f36b36773f9ce0a5def4f4ea50f47d3a91fc/src/sap.ui.core/src/sap/ui/model/json/TypedJSONContext.js
     *
     * @extends sap.ui.model.json.JSONModel
     * @constructor
     * @public
     * @name com.myorg.mylib.TypedJSONModel
     */
    class TypedJSONModel extends JSONModel {
    }
    module "com/myorg/mylib/TypedJSONModel" {
        /**
         * TypedJSONModel is a subclass of JSONModel that provides type-safe access to the model data. It is only available when using UI5 with TypeScript.
         *
         * @since 1.140.0
         */
        export default class TypedJSONModel<Data extends object> extends JSONModel {
            constructor(oData?: Data, bObserve?: boolean);
            createBindingContext<Path extends AbsoluteBindingPath<Data>>(sPath: Path, oContext?: Context, mParameters?: object, fnCallBack?: Function, bReload?: boolean): TypedJSONContext<Data, Path>;
            getData(): Data;
            getProperty<Path extends AbsoluteBindingPath<Data>>(sPath: Path): PropertyByAbsoluteBindingPath<Data, Path>;
            getProperty<Path extends RelativeBindingPath<Data, Root>, Root extends AbsoluteBindingPath<Data>>(sPath: Path, oContext: TypedJSONContext<Data, Root>): PropertyByRelativeBindingPath<Data, Root, Path>;
            setData(oData: Data, bMerge?: boolean): void;
            setProperty<Path extends AbsoluteBindingPath<Data>>(sPath: Path, oValue: PropertyByAbsoluteBindingPath<Data, Path>, oContext?: undefined, bAsyncUpdate?: boolean): boolean;
            setProperty<Path extends RelativeBindingPath<Data, Root>, Root extends AbsoluteBindingPath<Data>>(sPath: Path, oValue: PropertyByRelativeBindingPath<Data, Root, Path>, oContext: TypedJSONContext<Data, Root>, bAsyncUpdate?: boolean): boolean;
        }
        /**
         * Valid absolute binding in a JSONModel with the underlying type `Type`.
         * Counterpart to {@link PropertyByAbsoluteBindingPath}
         * @example
         * type Person = { name: string, id: number };
         * type PathInPerson = PathInJSONModel<Person>; // "/name" | "/id"
         * let path: PathInPerson = "/name"; // ok
         * path = "/firstName"; // error
         */
        type AbsoluteBindingPath<Type> = Type extends Array<unknown> ? `/${number}` | `/${number}${AbsoluteBindingPath<Type[number]>}` : Type extends object ? {
            [Key in keyof Type]: Type[Key] extends Array<unknown> ? `/${string & Key}/${number}` | `/${string & Key}/${number}${AbsoluteBindingPath<Type[Key][number]>}` : `/${string & Key}${AbsoluteBindingPath<Type[Key]>}`;
        }[keyof Type] | `/${string & PropertiesOf<Type>}` : never;
        /**
         * Valid relative binding path in a JSONModel.
         * The root of the path is defined by the given root string.
         *
         * @example
         * type PersonWrapper = { person: { name: string, id: number } };
         * type PathRelativeToPerson = RelativeBindingPath<PersonWrapper, "/person">; // "name" | "id"
         */
        type RelativeBindingPath<Type, Root extends AbsoluteBindingPath<Type>> = AbsoluteBindingPath<TypeAtPath<Type, Root>> extends `/${infer Rest}` ? Rest : never;
        /**
         * The type of a property in a JSONModel identified by the given path.
         * Counterpart to {@link AbsoluteBindingPath}.
         * @example
         * type Person = { name: string, id: number };
         * type PersonName = PropertyInJSONModel<Person, "/name">; // string
         * const name: PersonName = "John"; // ok
         */
        type PropertyByAbsoluteBindingPath<Type, Path extends string> = Path extends `/${number}` ? Type extends Array<infer U> ? U : never : Path extends `/${number}${infer Rest}` ? Type extends Array<infer U> ? PropertyByAbsoluteBindingPath<U, Rest> : never : Path extends `/${infer Key}/${number}/${infer Rest}` ? Key extends keyof Type ? FromArrayWithSubPath<Type, Key, Rest> : never : Path extends `/${infer Key}/${number}` ? Key extends keyof Type ? FromArrayElement<Type, Key> : never : Path extends `/${infer Key}/${infer Rest}` ? Key extends keyof Type ? FromNestedProperty<Type, Key, Rest> : never : Path extends `/${infer Key}` ? Key extends keyof Type ? FromTopLevelProperty<Type, Key> : never : never;
        /**
         * The type of a property in a JSONModel identified by the given relative path and root.
         * Counterpart to {@link RelativeBindingPath}.
         * @example
         * type PersonWrapper = { person: { name: string, id: number } };
         * type PersonName = PropertyByRelativeBindingPath<PersonWrapper, "/person", "name">;
         * const name: PersonName = "John"; // ok
         */
        type PropertyByRelativeBindingPath<Type, Root extends string, RelativePath extends string> = PropertyByAbsoluteBindingPath<Type, `${Root}/${RelativePath}`>;
        /***********************************************************************************************************************
         * Helper types to split the types above into separate parts
         * to make it easier to read and understand.
        /**********************************************************************************************************************/
        /**
         * Helper type to handle paths that point to an array with a subpath.
         * @example const path = "/orders/0/items"
         */
        type FromArrayWithSubPath<Type, Key extends keyof Type, Rest extends string> = Type[Key] extends Array<infer U> ? PropertyByAbsoluteBindingPath<U, `/${Rest}`> : never;
        /**
         * Helper type to handle paths that point to an array element.
         * @example const path = "/orders/0"
         */
        type FromArrayElement<Type, Key extends keyof Type> = Type[Key] extends Array<infer U> ? U : never;
        /**
         * Helper type to handle paths that point to a nested property.
         * @example const path = "/customer/address/street"
         */
        type FromNestedProperty<Type, Key extends keyof Type, Rest extends string> = PropertyByAbsoluteBindingPath<Type[Key], `/${Rest}`>;
        /**
         * Helper type to handle paths that point to a top-level property.
         * @example const path = "/customer"
         */
        type FromTopLevelProperty<Type, Key extends keyof Type> = Type[Key];
        /**
         * Helper type to navigate along a nested path.
         * Navigates from the root type along the path to determine the sub-type.
         */
        type TypeAtPath<Type, Path extends string> = Path extends `/${infer Key}/${infer Rest}` ? Key extends keyof Type ? TypeAtPath<Type[Key], `/${Rest}`> : never : Path extends `/${infer Key}` ? Key extends keyof Type ? Type[Key] : never : never;
        /**
         * Helper type to extract the names of the properties of a given type.
         * Excludes properties that are of the type `Function` or `symbol`.
         * @example
         * type Person = { name: string, id: number };
         * type PersonProperties = PropertiesOf<Person>; // "name" | "id"
         * let property: PersonProperties = "name"; // ok
         * property = "firstName"; // error
         */
        type PropertiesOf<Type> = {
            [Key in keyof Type]: Type[Key] extends Function ? never : Type[Key] extends symbol ? never : Key;
        }[keyof Type];
    }
}
//# sourceMappingURL=TypedJSONModel.d.ts.map