# <span id="top">Vue.JS Project</span>

![프로젝트 배너 이미지](https://github.com/su0797/first-vue-project/assets/95666574/8abb465c-d242-4faa-afce-81daecafba50)


## 0. 목차

1.  [프로젝트 소개](#1-프로젝트-소개)
2.  [기술 및 개발 환경](#2-기술-및-개발-환경)
3.  [폴더구조](#3-폴더구조)
4.  [구현 기능](#4-구현-기능)
5.  [기능 UI](#5-기능-UI)
6.  [후기](#6-후기)

---
## 1. 프로젝트 소개

> - 데이터 바우처 지원 사업에 참여한 인턴들이 주로 진행하는 데이터 입력 업무를 체계적이고 효율적으로 관리하기 위한 웹 서비스입니다. 
> - 관리자는 맡은 사업들의 전체 진행률을 실시간으로 확인하며 작업이 완료된 데이터들을 검수, 수정, 삭제할 수 있으며 모든 인턴들에게 하루 할당량을 지정해줄수도 있습니다. 또한 인턴들의 정보를 관리하고 인턴의 계정 추가, 수정, 삭제(계정정지)를 할 수 있습니다.
> - 인턴은 본인이 할당 받은 데이터 입력, 수정, 보류가 가능합니다.
> - 데이터를 입력, 수정, 삭제하는 진행률 및 과정을 관리자와 인턴 모두 한눈에 효율적으로 확인할 수 있습니다.

<br>

## 2. 기술 및 개발 환경

### [기술 스택]

<table>
<tr>
 <td align="center" width="100px">사용 기술</td>
 <td width="800px">
 <img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D"/>&nbsp  
   <img src="https://img.shields.io/badge/axios-7F2B7B?style=for-the-badge&logo=axios&logoColor=white"/>&nbsp 
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>&nbsp
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>&nbsp
    </td>
</tr>
<tr>
 <td align="center">패키지</td>
 <td>
    <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=NPM&logoColor=ffffff"/>&nbsp 
  </td>
</tr>
<tr>
 <td align="center">협업</td>
 <td>
    <img src="https://img.shields.io/badge/Bitbucket-2684FF?style=for-the-badge&logo=Bitbucket&logoColor=white"/>&nbsp 
    <img src="https://img.shields.io/badge/Discord-4263f5?style=for-the-badge&logo=Discord&logoColor=white"/>&nbsp  
 </td>
<tr>
 <td align="center">IDE</td>
 <td>
    <img src="https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white"/>&nbsp
</tr>
</table>

### [기술스택 상세]

- axios 라이브러리 활용
  - 비동기로 HTTP 통신을 할 수 있어 return을 promise 객체로 해주기 때문에 response 데이터를 쉽게 다루기 위해 사용하였습니다.
  - Promise 기반의 API를 제공하여 비동기적인 방식으로 HTTP 요청을 처리하였습니다.
    <br><br>

## 3. 폴더구조
```
📦src
 ┣ 📂assets
 ┃ ┣ 📂css
 ┃ ┃ ┗ 📜common.css
 ┃ ┗ 📂img
 ┃ ┃ ┣ 📜empty.png
 ┃ ┃ ┣ 📜loading.gif
 ┃ ┃ ┗ 📜loading_circle.gif
 ┣ 📂components
 ┃ ┣ 📜Address.vue
 ┃ ┣ 📜AdminMainView.vue
 ┃ ┣ 📜AdminModal.vue
 ┃ ┣ 📜AppInit.vue
 ┃ ┣ 📜Base.vue
 ┃ ┣ 📜CountrySelect.vue
 ┃ ┣ 📜CustomToast.vue
 ┃ ┣ 📜DataTable.vue
 ┃ ┣ 📜DatePicker.vue
 ┃ ┣ 📜DaumMapApi.vue
 ┃ ┣ 📜FileDrop.vue
 ┃ ┣ 📜Footer.vue
 ┃ ┣ 📜Modal.vue
 ┃ ┣ 📜Phone.vue
 ┃ ┣ 📜Select.vue
 ┃ ┣ 📜Spinner.vue
 ┃ ┣ 📜Table.vue
 ┃ ┣ 📜TimePicker.vue
 ┃ ┣ 📜TopBar.vue
 ┃ ┣ 📜UserInput.vue
 ┃ ┣ 📜UserListRow.vue
 ┃ ┣ 📜UserNote.vue
 ┃ ┣ 📜UserRadioBox.vue
 ┃ ┗ 📜UserSelectBox.vue
 ┣ 📂router
 ┃ ┗ 📜index.js
 ┣ 📂service
 ┃ ┣ 📂admin
 ┃ ┃ ┗ 📜data.js
 ┃ ┣ 📜api.js
 ┃ ┣ 📜axios.js
 ┃ ┣ 📜chat.js
 ┃ ┣ 📜common.js
 ┃ ┣ 📜extension.js
 ┃ ┣ 📜firebase-message.js
 ┃ ┣ 📜global.js
 ┃ ┣ 📜login.js
 ┃ ┣ 📜string.js
 ┃ ┣ 📜user.js
 ┃ ┗ 📜util.js
 ┣ 📂store
 ┃ ┗ 📜index.js
 ┣ 📂views
 ┃ ┣ 📜AdminMain.vue
 ┃ ┣ 📜AdminModifyData.vue
 ┃ ┣ 📜Home.vue
 ┃ ┣ 📜Login.vue
 ┃ ┣ 📜NotFound.vue
 ┃ ┣ 📜TaskList.vue
 ┃ ┣ 📜Test.vue
 ┃ ┣ 📜UserAddData.vue
 ┃ ┣ 📜UserEditData.vue
 ┃ ┣ 📜UserList.vue
 ┃ ┣ 📜UserMainPage.vue
 ┃ ┣ 📜UserModify.vue
 ┃ ┣ 📜UserReg.vue
 ┃ ┗ 📜UserWorkPage.vue
 ┣ 📜.DS_Store
 ┣ 📜App.vue
 ┗ 📜main.js
```


## 4. 구현 기능

### 데이터 입력 및 수정 
![데이터입력및수정(UI-U-002)](https://github.com/su0797/first-vue-project/assets/95666574/d0102b62-0692-4450-859e-2a5c51138383)

### 인턴 개인 작업내역 확인하기
![인턴작업내역(UI-A-003-1)_문정원OTT 선택](https://github.com/su0797/first-vue-project/assets/95666574/20d5e1fb-d040-43da-9003-44d633e2499f)


### 관리자의 인턴 관리
![인턴관리(UI-A-002)](https://github.com/su0797/first-vue-project/assets/95666574/4050c7ca-3619-4c6a-8a7d-ad303eadeddd)

### 전체 진행률 확인 가능한 관리자 메인
![관리자메인(UI-A-001)](https://github.com/su0797/first-vue-project/assets/95666574/bcd10838-4524-441b-8c0d-d590520e74d0)



## 5. 기능 UI



## 6. 후기

