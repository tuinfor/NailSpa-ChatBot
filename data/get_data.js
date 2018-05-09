const spawn = require('child_process').spawn;
let PythonShell = require('python-shell');

module.exports = {
	get_current_weather: function (callback) {
    PythonShell.run('./script/get_current_weather.py', (err, data) => {
      spawn('killall', ['-9', 'chrome']);
      spawn('killall', ['-9', 'chromedriver']);
      callback(err, data);
    })
  }
};