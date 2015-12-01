/* setup */

	var fileExists = require("exists-file"),
		fs = require("fs"),
		recursiveReadSync = require("recursive-readdir-sync"),
		path = require("path"),
		jsonfile = require("jsonfile"),
		json2csv = require("json2csv");

	var fileHelper = {};
	
/* path aliases */

	fileHelper.join = path.join;
	
	fileHelper.ext = path.ext;
	
	fileHelper.basename = path.basename;	

/* import */	
	
	fileHelper.import = function(filepath) {
		
		// if file exists, return its contents
		if (this.exists(filepath)) return fs.readFileSync(filepath, "utf8");
		else return false;
				
	}
	
/* exists */	
	
	fileHelper.exists = function(files) {
	
		// if given an array
		if (typeof files == "object") {
			// check each element
			for (var key in files) {
				if (!fileExists(files[key])) return false;
			}
			return true;
		}
			
		// if given single file	
		else return fileExists(files);
		
	}
	
/* get recursive files */
		
	fileHelper.getFilesRecursive = function(folderpath) {
		
		var files;
		 
		try {
		  files = recursiveReadSync(folderpath);
		} catch(err){
		  if(err.errno === 34){
		    console.log('Path does not exist');
		  } else {
		    //something unrelated went wrong, rethrow 
		    throw err;
		  }
		}
		 
		return files;
	
	}	
	
/* get folders */

	fileHelper.getFolders = function(folderpath) {
	
  		return fs.readdirSync(folderpath).filter(function(file) {
    		return fs.statSync(path.join(folderpath, file)).isDirectory();
  		});
	
	}
	
/* mkdir */	
	
	fileHelper.mkdir = function(filepath) {		
	
		if (typeof filepath == "string") {
			if (!this.exists(filepath)) fs.mkdirSync(filepath);
		} else if (typeof filepath == "object") {
			for (var key in filepath) {
				if (!this.exists(filepath[key])) fs.mkdirSync(filepath[key]);	
			}
		}	
		
	}
	
/* delete */	
	
	fileHelper.del = function(filepath) {
	
		if (typeof filepath == "string") {
			if (this.exists(filepath)) fs.unlinkSync(filepath);
		} else if (typeof filepath == "object") {
			for (var key in filepath) {
				if (this.exists(filepath[key])) fs.unlinkSync(filepath[key]);	
			}
		}
		
	}

	fileHelper.delFolder = function(filepath) {
	
		if (typeof filepath == "string") {
			if (this.exists(filepath)) fs.rmdir(filepath);
		} else if (typeof filepath == "object") {
			for (var key in filepath) {
				if (this.exists(filepath[key])) fs.rmdir(filepath[key]);	
			}
		}
		
	}
	
	fileHelper.rmdir = fileHelper.delFolder;
			
/* export(s) */
	
	fileHelper.export = function(filepath, content, fields) {
	
		if (filepath.indexOf(".json")) this.exportJSON(filepath, content);
		
		else if (filepath.indexOf(".csv")) this.exportCSV(filepath, content, fields);
		
		else this.save(filepath, content);
	
	}
	
	
	fileHelper.save = function(filepath, content) {
	
		fs.writeFile(filename, function(err) {
			if (err) throw err;
		 });
		 
	}
	
	fileHelper.exportJSON = function(filepath, content) {
	
		jsonfile.writeFileSync(filepath, content);
				
	}
	
	fileHelper.exportCSV = function(filename, results, fields) {	
	
		json2csv({data: results, fields: fields}, function(err, csv) {
		  if (err) console.log(err);
		  fs.writeFileSync(filename, csv);	
		});			
		
	}	
	
/* export module */

	module.exports = fileHelper;