I# fontler
## feature
- create subset of font with specified string
- woff / eot output
- 글꼴에서 지정한 문자열만 남기기
- woff / eot 파일 생성

## install
`npm i fontler --save`

## example code
```
   var fontler = require('fontler');
   fontler('originalFont.ttf', 'subset.woff',
            '첩첩산 방방곡곡 굽굽이 찾아들어', 'woff',
            function(err) {
	if(err) console.log(err);
	else console.log("Success");
   });
```

## usage
[expample usage page](https://raw.githubusercontent.com/dolsup/fontler/master/demo.html)
## licence
`THE BEER-WARE LICENSE (Revision 42)`
