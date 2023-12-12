# Vue.JS Project


## 0. 목차

1.  [프로젝트 소개](#1-프로젝트-소개)
2.  [기술 및 개발 환경](#2-기술-및-개발-환경)
3.  [폴더구조](#3-폴더구조)
4.  [구현 기능](#4-구현-기능)
5.  [기능 UI](#5-기능-UI)
6.  [후기](#6-후기)

---
## 1. 프로젝트 소개

```
데이터 바우처 지원 사업에 참여한 인턴들이 주로 진행하는 데이터 입력 업무를 체계적이고 효율적으로 관리하기 위한 웹 서비스입니다. 

관리자는 맡은 사업들의 전체 진행률을 실시간으로 확인하며 작업이 완료된 데이터들을 검수, 수정, 삭제할 수 있으며 모든 인턴들에게 하루 할당량을 지정해줄수도 있습니다. 
또한 인턴들의 정보를 관리하고 인턴의 계정 추가, 수정, 삭제(계정정지)를 할 수 있습니다.

인턴은 본인이 할당 받은 데이터 입력, 수정, 보류가 가능합니다.
```

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



## 5. 기능 UI



## 6. 후기

