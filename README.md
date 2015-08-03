# Fontler (en / ko)
### Summary / 개요
[![NPM](https://nodei.co/npm/fontler.png?compact=true)](https://nodei.co/npm/fontler/) <br>
Fontler minimize the volume of TTF font by removing unnecessary glyphs, using Google's sfntly(Apache v2.0). You can programmatically use it./ <br>
Fontler는 TTF 글꼴의 필요 없는 글리프를 삭제해서 용량을 최소화 해줍니다. Google의 sfntly(Apache v2.0)를 사용합니다. 프로그램적으로(코드 상에서) 사용할 수 있습니다.

### Feature / 기능
- create lightweight font subset with specified string / 지정한 문자열만 남긴 경량 서브셋 폰트 생성
- woff, eot format output / woff, eot 파일 포맷으로 출력

### Installation / 설치
`npm i fontler --save`

### Change Log / 바뀐 점
- Callback doesn't pass *outputPath* any more / *outputPath* 옵션이 사라짐
- add x, h, 2 option / x, h, 2 옵션 추가
- new dependencies : isTTF, ttf2woff2 / 의존성 모듈 추가

### API
#### Parameter / 인수
- `inputFile`: *String*, the path and name of original font file / 원본 폰트 경로와 이름
- `outputFile`: *String*, name of output file / 결과 파일 이름
- `subString`: *String*, the string to leave / 남길 문자열
- `option` : *String*, option including the following characters / 다음 문자를 포함한 옵션
    - **w** : output WOFF format / WOFF 파일 출력
    - **2** : output WOFF2 format / WOFF2 파일 출력
    - **e** : output EOT format / EOT 파일 출력
    - **x** : Enable Microtype Express compression for EOT format / EOT를 위한 MTX 압축 옵션
    - **h** : strip hints / 힌팅 제거
    - usage : "wexh", "hex", "yeah", "woff2", "woff and eot", "hardware"
- `callback` : *Function* pass (error) / 에러 반환하는 콜백

#### Overloaded! / 과적됐어요!
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

### Usage / 사용법
```js
   var fontler = require('fontler');
   
   // 5 parameter
   fontler('originalFont.ttf', 'subset',
            '첩첩산 방방곡곡 굽굽이 찾아들어', 'woff,hints',
            function(err) {
            	if(err) console.log(err);
            	else console.log("hooray!");
   });
   
   // 4 parameter
   fontler('originalFont.ttf', 'twoFormatOutput', '첩첩산 방방곡곡 굽굽이 찾아들어',
            function(err) {
            	if(err) console.log(err);
            	else console.log("hooray!");
   });
   
   // 3 parameter
   fontler('originalFont.ttf', '첩첩산 방방곡곡 굽굽이 찾아들어', function(err) {
    	if(err) console.log(err);
    	else console.log("hooray!");
   });
```

### :D
[Example Demo Page / 예제 데모 페이지](http://cdn.rawgit.com/dolsup/fontler/master/demopage.html)

### License / 라이센스
[`THE BEER-WARE LICENSE (Revision 42)`](http://en.wikipedia.org/wiki/Beerware)
