// setup
	
	var test = require("peezy-test-helper");
	var file = require("./../index.js");

// tests

	/* exists */

		test.single("Single File Exists", "file.exists(filepath)", function() {
		
			test.assert(file.exists("./package.json") === true);
		
		});
			
		test.single("Multiple Files Exist", "file.exists(filepaths)", function() {
		
			test.assert(file.exists(["./package.json", "./README.md"]) === true);
		
		});
		
		test.single("Single File Doesn't Exist", "!file.exists(filepath)", function() {
		
			test.assert(!file.exists("./package2.json") === true);
		
		});	
		
		test.single("Multiple File Doesn't Exist", "!file.exists(filepaths)", function() {
		
			test.assert(!file.exists(["./package.json", "./README2.md"]) === true);

		
		});
		
	/* import */	

	/* get files recursive */
	
	/* get folders */
	
	/* mkdir */
	
	/* del */
	
	/* export */
	
	/* save */
	
	/* exportJSON */
	
	/* exportCSV */
