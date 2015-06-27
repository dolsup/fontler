# fontler
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
<style>
    @font-face { font-family: 'kopub'; src: url('https://raw.githubusercontent.com/dolsup/fontler/master/KoPubBatangBold.woff') };
</style>
<h1 style="font-family: kopub">
    우리가 살고있는 오늘은 어제 자살한 이가<br>
    그렇게도 살기 싫어했던 내일이다.
</h1>
<style>
    @font-face { font-family: 'wkw'; src: url('https://raw.githubusercontent.com/dolsup/fontler/master/WKWGothic.woff') };
</style>
<h1 style="font-family: wkw">
    파괴의 열정은 창조적 희열
</h1>

## licence
`THE BEER-WARE LICENSE (Revision 42)`
