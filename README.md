# Vending-machine

## <sapn id="intro"> 1. 프로젝트 소개 </span>

소지금을 자판기에 투입하여 원하는 음료를 구매할 수 있는 간단한 웹 서비스입니다.

<img width="500" alt="image" src="https://user-images.githubusercontent.com/96678570/218245789-b326345e-f314-4f0e-94e1-fa3ffd317631.png">
<br/><br/>

## <sapn id="intro"> 2. 개발 환경 </span>

- 개발기간: 약 1주일
- Html, css, JavaScript
  <br/><br/>

## <sapn id="intro"> 3. 실행 화면 및 기능 소개</span>

1. 입금 버튼 기능

   <img src="https://user-images.githubusercontent.com/96678570/218247180-406874de-41f0-4ceb-9d52-38b9c84214aa.gif" width="334"/>

   - 입금액을 입력하고 입금 버튼을 누르면 소지금이 줄어들고, 잔액이 증가합니다.
   - 입금액이 소지금 보다 많을경우 경고창이 발생합니다.

<br/>

2. 거스름돈 반환 버튼 기능

   <img src="https://user-images.githubusercontent.com/96678570/218247381-3f59f813-84ba-4f49-9116-4ac60b5b6a3d.gif" width="334"/>

   - 반환 버튼을 누르면 잔액이 초기화되고, 소지금이 증가합니다.

<br/>

3. 자판기 메뉴 기능

   <img src="https://user-images.githubusercontent.com/96678570/218247636-5deff0ea-afca-41a3-b70e-945f4cb4ad62.gif" width="334"/>

   - 아이템을 누르면 잔액이 음료 가격만큼 줄어들며, 아이템이 획득가능 창에 등록됩니다.
   - 아이템이 소진될 시 품절 표시가 됩니다.
   - 아이템 가격보다 잔액이 적다면 경고창이 나타납니다.

<br/>

4. 획득 버튼 기능

   <img src="https://user-images.githubusercontent.com/96678570/218247804-983c01c8-a91e-47ef-bc92-92c95a5f6a39.gif" width="334"/>

   - 획득 버튼을 누르면 선택한 음료수 목록이 획득한 음료 목록으로 이동합니다.
   - 획득한 음료의 금액을 모두 합하여 총금액을 업데이트 합니다.

<br/>

5. 반응형 구현

   <img src="https://user-images.githubusercontent.com/96678570/218248095-2686139b-a819-4cd6-b549-57f62cd0e132.gif" width="334"/>

<br/>

## <sapn id="intro"> 4. 핵심 코드 </span>

### 1) 반응형 웹

- 모바일, 데스크톱 2가지 버전의 반응형 웹을 구현하였습니다.

### 2) 웹 접근성

- 시맨틱한 마크업과 IR기법을 사용하여 웹 접근성을 향상하였으며, Lighthouse 접근성 점수 100점을 달성하였습니다.

### 3) 성능 최적화

- DocumentFragment를 사용하여 DOM 접근 및 업데이트를 최소화함으로써 성능을 최적화하였습니다.

<br/>

## <sapn id="intro"> 5. 파일 구조 </span>

```
📦vending-machine
 ┣ 📂src
 ┃ ┣ 📂images
 ┃ ┣ 📂js
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜colaGenerator.js
 ┃ ┃ ┃ ┗ 📜vendingmachine.js
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜item.json
 ┃ ┗ 📂style
 ┃ ┃ ┣ 📜reset.css
 ┃ ┃ ┗ 📜style.css
 ┗ 📜index.html
```
