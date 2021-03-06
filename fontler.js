/*
 * -----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * dolsup(Jiwon Choi)<1890mah@gmail.com> wrote this file. As long as you retain
 * this notice you can do whatever you want with this stuff. If we meet some day,
 * and you think this stuff is worth it, you can buy me a beer in return.
 * -----------------------------------------------------------------------------
 */
/*
    fontler.js
    * author : dolsup(Jiwon Choi)<1890mah@gmail.com>, 2015
    * page : github.com/dolsup/fontler
*/


var fs = require('fs');
var spawn = require('child_process').spawn;
var isTTF = require('is-ttf');
var ttf2woff2 = require('ttf2woff2');

var inputBuffer;
var woff2flag = false;

function subset(inputFile, p2, p3, p4, callback) {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    checkFile(inputFile, function(err) {
        if(err) callback(err);
        else {
            if(args.length == 5) {
                // basic parameter option
                // inputFile, outputFile, subString, outputFormat, callback);
                var parsedOps = parseOptions(p4);
                if(woff2flag) {
                    fs.writeFile(removeExt(p2)+'.woff2', ttf2woff2(inputBuffer), function(err) {
                        if(err) callback(fontlerErr(err));
                    });
                }
                if(checkOptions(p4) >= 2) {
                    snftly(inputFile, removeExt(p2)+'.eot', parsedOps.splice(parsedOps.indexOf('-w'), 1), p3, function(code) {
                        if(code) callback(code);
                        snftly(inputFile, removeExt(p2)+'.woff', parsedOps.splice(parsedOps.indexOf('-e'), 1), p3, function(code2) {
                            if(code2) callback(code2);
                            else callback(null);
                        });
                    });
                } else if(checkOptions(p4) == 0) {
                    callback(fontlerErr("Fontler needs one or more output options!"));
                } else {
                    var ops = parsedOps;
                    snftly(inputFile, removeExt(p2)+((hasEOT(parsedOps))?'.eot':'.woff'), ops, p3, function(code) {
                        if(code) callback(code);
                        else callback(null);
                    });
                }
            }
            if(args.length == 4) {
                // simple parameter option
                // inputFile, OutputFile, subString, callback
                snftly(inputFile, removeExt(p2)+'.eot', ['-e'], p3, function(code) {
                    if(code) callback(code);
                    snftly(inputFile, removeExt(p2)+'.woff', ['-w'], p3, function(code2) {
                        if(code2) callback(code2);
                        else fs.writeFile(removeExt(p2)+'.woff2', ttf2woff2(inputBuffer), function(err) {
                                if(err) callback(fontlerErr(err));
                                else p4(null);
                            });
                    });
                });
            }
            if(args.length == 3) {
                // more simple parameter option
                // inputFile, subString, callback
                snftly(inputFile, removeExt(inputFile)+'.eot', ['-e'], p2, function(code) {
                    if(code) callback(code);
                    snftly(inputFile, removeExt(inputFile)+'.woff', ['-w'], p2, function(code2) {
                        if(code2) callback(code2);
                        else fs.writeFile(removeExt(inputFile)+'.woff2', ttf2woff2(inputBuffer), function(err) {
                                if(err) callback(fontlerErr(err));
                                else p3(null);
                            });
                    });
                });
            }
        }
    });
}

function removeExt(filename) {
    if(filename.split('.').length > 1) {
        return filename.split('.').slice(0, -1);
    } else return filename; 
}
function getExt(filename) {
    return filename.split('.').pop();
}

// check whether option parameter includes 'eot' and 'woff'
function checkOptions(ops) {
    // count the number of options (eot, woff);
    return 0 + (ops.indexOf('e') !== -1) + (ops.indexOf('w') !== -1);
}

// old code (outputFormat==='eot')?'-e':((outputFormat==='woff')?'-w':'')
function parseOptions(ops) {
    var options = [];
    if(ops.indexOf('h') !== -1) options.push("-h"); // -hints Strip hints
    if(ops.indexOf('w') !== -1) options.push("-w"); // -woff Output WOFF format
    if(ops.indexOf('e') !== -1) {
        options.push("-e"); // -eot	Output EOT format
        if(ops.indexOf('x') !== -1) options.push("-x");
        // -mtx	Enable Microtype Express compression for EOT format
    }
    if(ops.indexOf('2') !== -1) woff2flag = true; // Output WOFF2 format
    else woff2flag = false;
    return options;
}

function hasEOT(ops) {
    if(ops.indexOf('-e') !== -1) return true;
}

function checkFile(inputFile, callback) {
    var invalid = true;
    try {
        if(inputFile.split('.').pop()=='otf') throw "Sorry, OTF fonts are not supported";
        else if(!isTTF(inputBuffer = fs.readFileSync(inputFile))) {
            throw "This is invalid TTF font!";
        } else {
            try{
                if(fs.statSync(inputFile)) invalid = false;
            } catch(e) {
                if(e) throw "..Where's the file?";
            }
        }
    } catch(err) {
        invalid = fontlerErr(err + " (" + inputFile + ")");
    } finally {
        callback(invalid);
    }
}

function snftly(fontfile, outfile, options, string, callback) {
    var ops;
    // var ops = ['-classpath', __dirname + '/lib/sfntly.jar', 'com.google.typography.font.tools.sfnttool.SfntTool'].concat('-'+options).concat('-s '+string).concat([fontfile, outfile]);
    if(string) ops = ['-jar', __dirname + '/lib/sfntly.jar'].concat(options).concat(['-s', string]).concat([fontfile, outfile]);
    else ops = ['-jar', __dirname + '/lib/sfntly.jar'].concat(options).concat([fontfile, outfile]);
    // console.log(ops);
    
    var cmd = spawn('java', ops);
    cmd.stdout.on('data', function(data){
        // console.log(data.toString());
    });
    cmd.stderr.on('data', function(data){
        callback(fontlerErr(data));
    });
    cmd.on('close', function(code){
        callback(null);
    });
}

function fontlerErr(data) {
    return "\u001b[31mFONTLER : \u001b[39m" + data.toString();
}

module.exports = subset;
