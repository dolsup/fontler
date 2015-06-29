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
    * page : github.com/dolsup/actac
*/


var fs = require('fs');
var spawn = require('child_process').spawn;    

function subset(inputFile, p2, p3, p4, callback) {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    checkFile(inputFile, function(err) {
        if(err) {
            callback(err);
        } else {
            if(args.length == 5) {
                // basic parameter option
                // inputFile, outputFile, subString, outputFormat, callback);
                if(checkOptions(p4)) {
                    var ops = ['-s', p3];
                    snftly(inputFile, removeExt(p2)+'.eot', ops.concat(['-e']), function(code) {
                        snftly(inputFile, removeExt(p2)+'.woff', ops.concat(['-w']), function(code2) {
                            callback([code, code2]);
                        });
                    });
                } else {
                    var ops = ['-s', p3, parseOptions(p4)];
                    snftly(inputFile, p2, ops, function(code) {
                        callback(code);
                    });
                }
            }
            if(args.length == 4) {
                // simple parameter option
                // inputFile, OutputFile, subString, callback
                var ops = ['-s', p3];
                snftly(inputFile, removeExt(p2)+'.eot', ops.concat(['-e']), function(code) {
                    snftly(inputFile, removeExt(p2)+'.woff', ops.concat(['-w']), function(code2) {
                        p4([code, code2]);
                    });
                });
            }
            if(args.length == 3) {
                // more simple parameter option
                // inputFile, subString, callback
                var ops = ['-s', p2];
                snftly(inputFile, removeExt(inputFile)+'.eot', ops.concat(['-e']), function(code) {
                    snftly(inputFile, removeExt(inputFile)+'.woff', ops.concat(['-w']), function(code2) {
                        p3([code, code2]);
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

// check whether option parameter includes 'eot' and 'woff'
function checkOptions(ops) {
    return (ops.indexOf('e') !== -1) && (ops.indexOf('w') !== -1)
}

// old code (outputFormat==='eot')?'-e':((outputFormat==='woff')?'-w':'')
function parseOptions(ops) {
    var options = [];
    if(ops.indexOf('e') !== -1) options.push("-e");
    else if(ops.indexOf('w') !== -1) options.push("-w");
    //if(ops.indexOf('h') !== -1) options.push("-h");
    return options.join(' ');
};

function checkFile(inputFile, callback) {
    var invalid = true;
    try {
        if(inputFile.split('.').pop()=='otf') throw "Sorry, OTF fonts are not supported";
        else {
            try{
                if(fs.statSync(inputFile)) invalid = false;
            } catch(e) {
                if(e) throw "..Where's the file? (" + inputFile + ")";
            }
        }
    } catch(err) {
        invalid = "\u001b[31mFONTLER : \u001b[39m" + err;
    } finally {
        callback(invalid);
    }
}

function snftly(fontfile, outfile, options, callback) {
    var ops = ['-classpath', __dirname + '/lib/sfntly.jar', 'com.google.typography.font.tools.sfnttool.SfntTool'].concat(options).concat([fontfile, outfile]);
    
    var cmd = spawn('java', ops);
    cmd.stdout.on('data', function(data){
        //console.log(data.toString());
    });
    cmd.stderr.on('data', function(data){
        console.log("\u001b[31mFONTLER : \u001b[39m" + data.toString());
    });
    cmd.on('close', function(code){
        callback(code);
    });
}

module.exports = subset
