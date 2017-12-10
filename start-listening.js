const watch = require("node-watch");
const { spawn } = require('child_process');

function startWatch() {
	if (process.argv.length < 3) {
		console.log("Usgage: <command> <command arg> <command arg>...");
		console.log("Optional flag: --watch-dirs=foo,bar,file.js -> will recursively watch files and dirs");
		process.exit(1);

	}
	const DIRS_TO_WATCH_FLAG = "--watch-dirs=";
	let userArgs = process.argv.slice(2);
	let dirsToWatch = userArgs.filter(x => x.indexOf(DIRS_TO_WATCH_FLAG) > -1)
		.map(x => x.replace(DIRS_TO_WATCH_FLAG, "").split(","))
		.reduce((x, y) => x.concat(y), []);
	let userCallback = userArgs.filter(x => x.indexOf(DIRS_TO_WATCH_FLAG) < 0);

	if (dirsToWatch.length == 0) {
		dirsToWatch.push(process.cwd());
	}

	let lastProcess = setUpProcessReadWrite(userCallback[0], userCallback.slice(1));
	watch(dirsToWatch, {
		recursive: true
	}, function(evt, name) {
		if (lastProcess !== null) {
			showProcessRestartedSign();
			lastProcess.kill();
		}
		lastProcess = setUpProcessReadWrite(userCallback[0], userCallback.slice(1));
	});

	function setUpProcessReadWrite(command, commandArgsAr) {
		let childProcess = spawn(command, commandArgsAr);
		childProcess.stdout.on('data', x => console.log(x.toString()));
		childProcess.stderr.on('data', x => console.log(x.toString()));
		process.stdin.pipe(childProcess.stdin);

		return childProcess;
	}

	function showProcessRestartedSign() {
		console.log("");
		console.log("");
		console.log("");
		console.log("##################################################");
		console.log("#                                                #");
		console.log("#               process restarted                #");
		console.log("#                                                #");
		console.log("##################################################");
		console.log("");
		console.log("");
		console.log("");
	}

}

startWatch();
