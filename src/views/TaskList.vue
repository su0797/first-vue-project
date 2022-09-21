<template>
  <div class="container">
    <!-- 업무선택 영역 -->
    <select class="form-select select-project" v-model="pjSelected" @change="showList($event)">
      <option value=''>업무 선택</option>
      <option :key="i" :value="i+1" v-for="(project, i) in projectListValue" >{{ project }}</option>
    </select>
    <!-- 분배 전, 실측, 조사불가, 완료 선택 영역 -->
    <select class="form-select select-project" v-model="listSelected" @change="showTask($event)">
      <option :key="i" :value="list.value" v-for="(list, i) in lists">{{ list.text }}</option>
    </select>

    <!-- 목록명 영역(제목) -->
    <div class="subject" v-if="listSelected">
      <h4>{{ pjName }} {{ selectText }} 목록</h4>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="taskDivision" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="center">업무를 분배받을 인턴을 선택해주세요.</div>
            <div class="form-group">
              <div class="form-check" :key="i" v-for="(name, i) in assignName">
                <input class="form-check-input float-none" type="radio" name="userName" :id="i" v-model="userSelected" :value="name" @change="checkRadio">
                <label class="form-check-label" :for="i">
                  {{ name }}
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="cancel">취소</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="divideTask()" :disabled="divideBtn">분배</button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex">
      <!-- 업무분배 버튼 영역 -->
      <div class="divide-area flex-area" v-if="listSelected && listSelected !== '조사불가' && pjSelected">
        <button class="btn btn-secondary" type="button" v-if="selectList.length !== 0" data-bs-toggle="modal" data-bs-target="#taskDivision">업무 분배</button>
        <button class="btn btn-secondary" type="button" v-else @click="this.msgbox('분배할 데이터를 선택해주세요.')">업무 분배</button>
      </div>

      <!-- 검색영역 -->
      <div class="search-area flex-area" v-if="pjSelected && listSelected">
        <select class="form-select" v-model="selectedSearchOption" ref="searchSelect">
          <option value="">선택</option>
          <option :value="searchOption" v-for="(searchOption, i) in searchOptionList" :key="i">
            {{ searchOption }}
          </option>
        </select>
        <input type="text" class="form-control" ref="searchInput" :value="searchedData" @input="changeKeyword" @keypress.enter="searchTable" placeholder="검색어를 입력하세요" />
        <button class="btn" type="button" @click="searchTable">검색</button>
      </div>
    </div>

    <div class="show-nothing" v-if="searchedNone">해당 검색어를 찾을 수 없습니다.</div>
    <div class="table-responsive" v-if="pjSelected && listSelected && !searchedNone">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">
              <input type="checkbox"
                      :value="allSelected"
                      v-model="allSelected" /></th>
            <th></th>
            <th :key="i" v-for="(datakey, i) in dataListKey">{{ datakey }}</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="i" v-for="(data, i) in dataListValue">
            <td scope="row">
              <input type="checkbox" 
                      :value="i"
                      v-model="selectList" />
            </td>
            <td>
              <button type="button" class="btn btn-secondary">수정</button>
            </td>
            <td :key="j" v-for="(datakey, j) in dataListKey">{{ data[datakey] }}</td>
          </tr>
        </tbody>
      </table>
      <!-- {{ selectList }} -->
    </div>
  </div>
</template>
<script>
import { getDataInfo, getUserSearch, getUserList, getWorksInfo } from '/@service/admin/data';

export default {
  data() {
    return {
      listSelected: '',
      data: {
        work_id: '',
        data_status: ''
      },
      lists: [
        { text: "목록 선택", value: '' },
        { text: "분배 전", value: "1" },
        { text: "실측필요", value: "3" },
        { text: "조사불가", value: "4" },
        { text: "완료", value: "5" },
      ],
      pjName: '',
      pjSelected: '',
      projectList: [],
      projectListValue: [],
      dataList: [],
      dataListKey: [],
      dataListValue: [],
      selectedTaskList: [],
      allChecked: false,
      selectText: '',
      selectList: [],
      names: [],
      assignName: [],
      tasks: [],
      ownName: '',
      userSelected: '',
      modalShow: false,
      divideBtn: true,
      searchedNone: false,
      searchedData: '',
      selectedSearchOption: '',
      searchOptionList: [],
      assignment_id: '',
    }
  },
  methods: {
    showList(e) {
      this.pjName = e.target.options[e.target.options.selectedIndex].text;

      const setData = new FormData();
      setData.set('assignment_id', this.assignment_id);

      getUserList(setData).then((result) => {
        this.names = result.data;

        for(let i = 0; i < this.names.user.length; i++) {
          this.assignName.push(this.names.user[i].user_name);
        }
      });

      this.showAll();
    },
    showTask(e) {
      this.selectText = e.target.options[e.target.options.selectedIndex].text;
      this.showAll();
    },
    showAll() {
      if(this.selectText !== '') {
        const setData = new FormData();

        setData.set('work_id', this.pjSelected);
        setData.set('data_status', this.listSelected);
        
        getDataInfo(setData).then((result) => {
          // console.log("result: ", result);
          this.dataList = result.data;

          for(let i = 0; i < this.dataList.data.length; i++) {
            const arr = JSON.parse(this.dataList.data[i].data_json);
            this.dataListKey = Object.keys(arr);
            this.searchOptionList = this.dataListKey;
          }
          this.dataListValue = [];
          for(let i = 0; i < this.dataList.data.length; i++) {
            this.dataListValue.push(JSON.parse(this.dataList.data[i].data_json));
          }
          // checkbox
          // this.selectedTaskList = this.dataListValue.filter(
          //   (data) => data === this.selectText
          // )

          for(let i = 0; i < this.dataListValue.length; i++) {
            this.selectedTaskList[i] = this.dataListValue[i];
          }
          // console.log(this.selectedTaskList);

        });
      }
      this.selectList = [];
    },
    checkRadio() {
      this.divideBtn = false;
    },
    divideTask() {
      this.ownName = this.userSelected;
      this.tasks = this.selectList;

      console.log(this.ownName + "님의 업무");
      for(let i = 0; i < this.tasks.length; i++) { 
        console.log(this.tasks[i]);
      }
      
      this.cancel();
      this.divideBtn = true;
      this.selectList = [];
    },
    cancel() {
      this.userSelected = '';
      this.selectList = [];
      
      return;
    },
    changeKeyword(w) {
      this.searchedData = w.target.value;
    },
    resetSearchOption() {
      this.selectedSearchOption= '';
    },
    searchTable() {
      if(this.selectedSearchOption !== '' && this.searchedData !== '') {
        const setSearch = new FormData();

        setSearch.set('work_id', this.pjSelected);
        setSearch.set('data_status', this.listSelected);
        setSearch.set('columnName', this.selectedSearchOption);
        setSearch.set('keyword', this.searchedData);

        getUserSearch(setSearch).then((result) => {
          this.dataList = result.data;

          for(let i = 0; i < this.dataList.data.length; i++) {
            const arr = JSON.parse(this.dataList.data[i].data_json);
            this.dataListKey = Object.keys(arr);
            this.searchOptionList = this.dataListKey;
          }
          this.dataListValue = [];
          for(let i = 0; i < this.dataList.data.length; i++) {
            this.dataListValue.push(JSON.parse(this.dataList.data[i].data_json));
          }
          if (this.dataListValue.length === 0) {
              this.searchedNone = true;
            }
        });

        this.resetSearchOption();
        this.searchedData = '';
      } else if ((this.selectedSearchOption === '') & (this.searchedData !== '')) {
				alert('검색할 칼럼을 선택해주세요');
				this.$refs.searchSelect.focus();
			} else if ((this.selectedSearchOption !== '') & (this.searchedData === '')) {
				alert('검색할 키워드를 입력해주세요');
				this.$refs.searchInput.focus();
			} else {
				this.searchedNone = false;
				this.resetSearchOption();
				this.searchedData = '';
				this.showAll();
			}
    },
  },
  mounted() {
    this.assignment_id = sessionStorage.getItem('assignment_id');
    const setData = new FormData();
    setData.set('assignment_id', this.assignment_id);

    getWorksInfo(setData).then((result) => {
      this.projectList = result.data;

      for(let i = 0; i < this.projectList.data.length; i++) {
        this.projectListValue.push(this.projectList.data[i].work_name);
      }
    
    })
  },
  computed: {
    allSelected: {
      get: function() {
          return this.selectedTaskList ? (this.selectList ? (this.selectList.length === this.selectedTaskList.length) : false) : false;
      },
      set: function(e) {
        if(e) {
          // for(let i in this.selectedTaskList) {
          //   this.selectList[i] = this.selectedTaskList[i].name;
          //   console.log("값 : " + this.selectList[i]);
          // }

          for(let i = 0; i < this.selectedTaskList.length; i++) {
            // this.selectList[i] = this.selectedTaskList[i];
            this.selectList[i] = i;
          }
        } else {
          this.selectList = [];
        }
        // this.selectList = e ? this.selectedTaskList : [];
      },
    },
  }
}

</script>
<style scoped>
  .container {
    margin-top: 20px;
    padding: 0;
  }

  .subject {
    text-align: center;
    margin: 30px;
  }
  .divide-area .btn-secondary {
    font-size: .8rem;
    border: none;
    background-color: #e17b46 !important;
  }
  .divide-area .btn-secondary:hover {
    background-color: #dc6425 !important;
  }
  .modal-content {
    width: 80%;
    margin: 0 auto;
  }
  .modal-body {
    padding-top: 20px;
  }
  .center {
    text-align: center;
  }
  .modal-footer {
    justify-content: center;
    border: none;
  }
  .form-group {
    margin: 0 auto;
    width: 60%;
    padding-top: 20px;
  }
  .form-check {
    display: inline-block;
    width: 50%;
  }
  .form-check-label {
    width: 80%;
    text-align: left;
    padding-top: 3px;
    margin-left: 10px;
  }
  .show-nothing {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    margin-top: 15rem;
  }
  
  @media (max-width: 420px) {
    .divide-area {
      display: none;
    }
  }
</style>