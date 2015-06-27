var fs = require('fs');
    
var spawn = require('child_process').spawn;    

function subset(inputFile, outputFile, subString, outputFormat, callback) {
    checkFile(inputFile, function(err) {
        if(err) {
            callback(err);
        } else {
            var ops = ['-s', subString, (outputFormat==='eot')?'-e':((outputFormat==='woff')?'-w':'')];
            snftly(inputFile, outputFile, ops, function(code) {
                callback(code);
            });
        }
    });
}

process.on('uncaughtException', function (err) {
    console.log("\u001b[31mFONTLER : \u001b[39m" + err);
});

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
