// setup
	
	var test = require("suite-tooth"),
		exists = require("exists-file"),
		_ = require("lodash"),
		path = require("path");
		
	var file = require("./../index.js");
	
// test vars	
	
	var basepath = "./tmp",
		subpath1 = "./tmp/sub",
		subpath2 = "./tmp/sub2",
		subpath3 = "./tmp/sub2/sub3",
		sub1 = "sub",
		sub2 = "sub2",
		sub3 = "sub3",
		filepath1 = "./tmp/file1.txt",
		filepath2 = "./tmp/sub/file2.json",
		filepath3 = "./tmp/sub2/sub3/file3.csv",
		filename1 = "file1.txt",
		filename2 = "file2.json",
		filename3 = "file3.csv",
		missing_file = "./tmp/404.txt",
		missing_folder = "./tmp/404",
		content = "hello world",
		foobar = {"foo": "bar"};
		
	var files = [
		filepath1,
		filepath2,
		filepath3
	];

// suites

	// mkdir

		test.suite("Mkdir", [
			{
				desc: "Create folder",
				assert: function() {
					
					file.mkdir(basepath);
					test.assert(exists(basepath) === true);
					
				}
			},
			{
				desc: "Create subfolder",
				assert: function() {
					
					file.mkdir(subpath1);
					test.assert(exists(subpath1) === true);
					
				}
			},
			{
				desc: "Create multiple folders",
				assert: function() {
					
					file.mkdir([subpath2, subpath3]);
					test.assert(exists(subpath2) === true);
					test.assert(exists(subpath3) === true);
					
				}			 		
			}
		]);
		
	// export

		test.suite("Export", [
			{
				desc: "Export .txt file",
				assert: function() {
				
					file.export(filepath1, content);
					test.assert(exists(filepath1) === true);
					
				}
			},
			{
				desc: "Export .json file",
				assert: function() {
					
					file.export(filepath2, foobar);
					test.assert(exists(filepath2) === true);
					
				}
			},		
			{
				desc: "Export .csv file",
				assert: function() {
				
					file.export(filepath3, foobar);
					test.assert(exists(filepath3) === true);	
					
				}
			}			
		]);
		
		
	// exists	
		
		test.suite("Exists", [
			{
				desc: "Single file exists",
				assert: function() {
					
					test.assert(file.exists(filepath1) === true);					
					
				}
			},			
			{
				desc: "Multiple files exist",
				assert: function() {
				
					test.assert(file.exists(files) === true);
					
				}
			},				
			{
				desc: "Single file doesn't exist",
				assert: function() {
				
					test.assert(file.exists(missing_file) === false);
					
				}
			},		
			{
				desc: "Multiple files don't all exist",
				assert: function() {
					
					test.assert(file.exists([filepath1, missing_file]) === false);
					
				}
			},
			{
				desc: "Folder exists",
				assert: function() {
				
					test.assert(file.exists(basepath) === true);
					test.assert(file.exists(subpath1) === true);
					
				}
			},		
			{
				desc: "Multiple folders exist",
				assert: function() {
					
					test.assert(file.exists([basepath, subpath1]) === true);
					
				}
			},
			{
				desc: "Folder doesn't exist",
				assert: function() {
				
					test.assert(file.exists(missing_folder) === false);
					
				}
			},		
			{
				desc: "Multiple folders don't all exist",
				assert: function() {
					
					test.assert(file.exists([basepath, missing_folder]) === false);
					
				}
			}						
		]);
		
	// file info
	
		test.suite("File Info", [	
			{
				desc: "Get recursive file list",
				assert: function() {
				
					var tree = file.getFilesRecursive(basepath);
					test.assert(_.contains(tree, path.normalize(filepath1)) === true);
					test.assert(_.contains(tree, path.normalize(filepath2)) === true);
					test.assert(_.contains(tree, path.normalize(filepath3)) === true);										
					
				}
			},			
			{
				desc: "Get folder list",
				assert: function() {
				
					var folders = file.getFolders(basepath);
					test.assert(_.contains(folders, sub1) === true);
					test.assert(_.contains(folders, sub2) === true);
					test.assert(_.contains(folders, sub3) === false);
					
				}
			}
		]);		
		
	// import

		test.suite("Import", [
			{
				desc: "Import .txt file",
				assert: function() {
				
				
					var stuff = file.import(filepath1);
					test.assert(stuff);  // TODO: make sure content matches
					
				}
			}
		]);
				
	// del
		
		test.suite("Delete", [	
			{
				desc: "Delete single file",
				assert: function() {
				
					file.del(filepath1);					
					test.assert(exists(filepath1) === false);
					
				}
			},
			{
				desc: "Delete multiple files",
				assert: function() {
				
					file.del([filepath2, filepath3]);
					test.assert(exists(filepath2) === false);
					test.assert(exists(filepath3) === false);
					
				}
			},			
			{
				desc: "Delete single folder",
				assert: function() {
				
					file.delFolder(subpath3);
					test.assert(exists(subpath3) === false);
					
				}
			},
			{
				desc: "Delete multiple folders",
				assert: function() {
				
					file.delFolder([subpath2, subpath1, basepath]);					
					test.assert(exists(subpath2) === false);
					test.assert(exists(subpath1) === false);
					test.assert(exists(basepath) === false);
					
				}
			}						
		]);

