# fontler
## 개요
fontler는 글꼴의 필요 없는 글리프를 삭제해서 용량을 최소화할 수 있습니다.

## 기능
- 글꼴에서 지정한 문자열만 남기기
- woff / eot 파일 출력

## 설치
`npm i fontler --save`

## 사용법
```
   var fontler = require('fontler');
   fontler('originalFont.ttf', 'subset.woff',
            '첩첩산 방방곡곡 굽굽이 찾아들어', 'woff',
            function(err) {
	if(err) console.log(err);
	else console.log("Success");
   });
```

## 예제 데모 페이지
[expample demo page](http://cdn.rawgit.com/dolsup/fontler/master/demopage.html)

## 라이센스
`THE BEER-WARE LICENSE (Revision 42)`
