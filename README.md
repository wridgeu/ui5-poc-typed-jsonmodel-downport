## PoC downport of `TypedJSONModel`

... first introduced during UI5ers live (Aug '25). Everyone wanted to start using it right away but it is only available for UI5 `>=1.140.0`.

So Andreas Kunz and Peter Muessig proposed/mentioned a few things (extract from our chat quoted):

The actual `*.d.ts` snippet that makes the `TypedJSONModel` exist can be found [here](https://github.com/UI5/typescript/blob/main/packages/dts-generator/src/resources/typed-json-model.d.ts). If you add this to your project, you will see the `TypedJSONModel` but it will break at runtime when your code instantiates the `TypedJSONModel` so you would also have to make sure this exists (when tweaking older UI5 versions):
- Supporting/Connecting classes that "connect" the TS magic with the UI5 framework at runtime
	- `TypedJSONModel` extension of JSONModel, [here](https://github.com/UI5/openui5/blob/af03f36b36773f9ce0a5def4f4ea50f47d3a91fc/src/sap.ui.core/src/sap/ui/model/json/TypedJSONModel.js)
	- `TypedJSONContext` extension of Context, [here](https://github.com/UI5/openui5/blob/af03f36b36773f9ce0a5def4f4ea50f47d3a91fc/src/sap.ui.core/src/sap/ui/model/json/TypedJSONContext.js)

Peter also mentioned: If you inline the module definitions for the `TypedJSONModel` and the `TypedJSONContext` in your application you can also use it as a workaround at runtime. You can add the `.d.ts` on top of that and you should then be good to go for development and runtime. As `TypedJSONModel` and `TypedJSONContext` is barely nothing (kb wise) it negligible from a runtime performance impact perspective.

## Notes

- I swear I should create more libraries ... most of my time was wasted on missing [this](https://www.youtube.com/watch?v=7aAehB4ejHQ&t=3509s) ...
- The `typed-json-model.d.ts` received `z` as prefix. As the `.d.ts` needs to be "on top" of the class definition files in the resulting `index.d.ts` after the library was built. I don't think there is a good way to influence this "natively". The building of the file happens in this [part of the transpile task](https://github.com/ui5-community/ui5-ecosystem-showcase/blob/cfaf0739608b699fe6e14079bbd313873b7acdd9/packages/ui5-tooling-transpile/lib/task.js#L202). Sure one could:
	- adjust the task itself, 
	- try to improve the inlining maybe (= try to put all of the content of the 3 files into one single file or do some other magic ... but that won't work with a `d.ts` file)
	- create your own task or some simple post-run script that manually moves the [triple-slash-directive](https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html) accordingly
- I didn't even bother writing custom `.controller` code, it was taken from the official [test example package](https://github.com/UI5/typescript/blob/main/test-packages/typed-json-model/webapp/controller/App.controller.ts)
- For a quickstart [easy-ui5](https://github.com/ui5-community/generator-easy-ui5) was used; I didn't bother renaming anything
- Doing this you obviously lose being up-to-date when it comes to the type definition, so you have to check that for yourself until you reach UI5 `>=1.140.0`

**This is a simple test. Nothing in here is considered best or even good practice. Some of the files (i.e. test directories, etc.) were removed to "declutter" this poc, at least for the lib folder.**