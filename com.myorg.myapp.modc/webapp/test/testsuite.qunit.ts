export default {
	name: "QUnit test suite for the UI5 Application: com.myorg.myapp.modc",
	defaults: {
		page: "ui5://test-resources/com/myorg/myapp/modc/Test.qunit.html?testsuite={suite}&test={name}",
		qunit: {
			version: 2
		},
		sinon: {
			version: 4
		},
		ui5: {
			language: "EN",
			theme: "sap_horizon"
		},
		coverage: {
			only: "com/myorg/myapp/modc/",
			never: "test-resources/com/myorg/myapp/modc/"
		},
		loader: {
			paths: {
				"com/myorg/myapp/modc": "../"
			}
		}
	},
	tests: {
		"unit/unitTests": {
			title: "Unit tests for com.myorg.myapp.modc"
		},
		"integration/opaTests": {
			title: "Integration tests for com.myorg.myapp.modc"
		}
	}
};
