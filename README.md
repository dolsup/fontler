# Fontler (en / ko)
## Summary / 개요
Fontler can minimize the volume of font by removing unnecessary glyphs, using Google's sfntly(Apache v2.0) / <br>
Fontler는 글꼴의 필요 없는 글리프를 삭제해서 용량을 최소화할 수 있습니다. Google의 sfntly(Apache v2.0)를 사용합니다.

## Feature / 기능
- create lightweight font subset with specified string / 지정한 문자열만 남긴 경량 서브셋 폰트 생성
- woff, eot format output / woff, eot 파일 포맷으로 출력

## Installation / 설치
`npm i fontler --save`

## API
#### Parameter / 인수
- `inputFile`: *String*, the path and name of original font file / 원본 폰트 경로와 이름
- `outputFile`: *String*, name of output file / 결과 파일 이름
- `subString`: *String*, the string to leave / 남길 문자열
- `option` : *String*, output format including 'e' as eot or 'w' as woff or both
    / 'e' 또는 'w' 또는 둘 다를 포함한 결과 파일 포맷 옵션
- `callback` : *Function*, error passed from this / 에러를 넘겨주는 콜백

#### Overided! / 과적(?)됐어요!
##### 5 parameter
```js
fontler(inputFile, outputFile, subString, option, callback);
```
basic use case

##### 4 parameter
```js
fontler(inputFile, outputFile, subString, callback);
```
create both .eot and .woff file in the default option 
/ 기본 옵션으로 .eot와 .woff 모두 생성

##### 3 parameter
```js
fontler(inputFile, subString, callback);
```
output file names are the same with input file name 
/ 결과 파일이 원본 파일과 이름이 같게 됨

## Usage / 사용법
```js
   var fontler = require('fontler');
   
   // 5 parameter
   fontler('originalFont.ttf', 'subset',
            '첩첩산 방방곡곡 굽굽이 찾아들어', 'woff',
            function(err) {
            	if(err) console.log(err);
            	else console.log("Success");
   });
   
   // 4 parameter
   fontler('originalFont.ttf', 'twoFormatOutput', '첩첩산 방방곡곡 굽굽이 찾아들어',
            function(err) {
            	if(err) console.log(err);
            	else console.log("Success");
   });
   
   // 3 parameter
   fontler('originalFont.ttf', '첩첩산 방방곡곡 굽굽이 찾아들어', function(err) {
    	if(err) console.log(err);
    	else console.log("Success");
   });
```

## 예제 데모 페이지
[expample demo page](http://cdn.rawgit.com/dolsup/fontler/master/demopage.html)

## 라이센스
`THE BEER-WARE LICENSE (Revision 42)`
