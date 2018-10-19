# on-change-process-reloader-js

Reloads a process on change in given directories/files.

## Dependencies
* nodejs
    * [node.js](https://nodejs.org/) version 8 works for me


## Installation

* install npm  dependencies
	```bash
	cd ~/my/js/scripts/on-change-process-reloader-js
	npm install
	```

# Usage
* create an alias for the script in ~/.bashrc for easier usage (optional)
	```bash
    alias refresher-jr='expect ~/my/script/dir/on-change-process-reloader-js/start-listening.js'
	```

* go to some folder
	```bash
	cd ~/my/folder/to/watch 
	```

* then run the script in such a way: refresher-script-alias your-script-executor your-script

	Once started if there is change in the directory in which the refresher was called or any of its subdirectories your script executor will execute your script.
	If an old execution is still running it will be killed.

	eg:
	```bash
	refresher-js bash say-hello-on-change.sh
	```
	or
	```bash
	refresher-js node do-things.js
	```
	or 
	```bash
	refresher-js gulp eslint	
	```

	* You can add extra parameters if you want to watch only a particular file or directory
	eg:
	```bash
	refresher-js bash say-hello-on-change.sh --watch-dirs=./my/particular/file.txt,./my/other/file.sh
	```

	it works with particular sub directories as well
	eg:
	```bash
	refresher-js gulp eslint --watch-dirs=./my/js/source/dir/*
	```

	* You can also add arguments for your script. You can place the --watch-dirs flag anywhere there as well and it will not be included in your script's command line arguments
	eg:
	```bash
	refresher-js bash greetPerson.sh Ivan
	```
	or
	```bash
	refresher-js bash --watch-dirs=./particular-file.txt your-script.sh some args here
	```
