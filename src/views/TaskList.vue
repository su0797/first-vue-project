<template>
	<div class="container">
		<!-- 업무선택 영역 -->
		<select
			class="form-select select-project"
			v-model="pjSelected"
			@change="showList($event)">
			<option value="">업무 선택</option>
			<option :key="i" :value="project.pjcode" v-for="(project, i) in projectList">
				{{ project.pjname }}
			</option>
		</select>
		<!-- 분배 전, 실측, 조사불가, 완료 선택 영역 -->
		<select
			class="form-select select-project"
			v-model="listSelected"
			@change="showTask($event)">
			<option :key="i" :value="list.value" v-for="(list, i) in lists">
				{{ list.text }}
			</option>
		</select>

		<!-- 목록명 영역(제목) -->
		<div class="subject" v-if="listSelected">
			<h4>{{ pjName }} {{ selectText }} 목록</h4>
		</div>

		<!-- Modal -->
		<div
			class="modal fade"
			id="taskDivision"
			tabindex="-1"
			aria-hidden="true"
			data-bs-backdrop="static">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-body">
						업무를 분배받을 인턴을 선택해주세요.
						<div class="form-group">
							<div class="form-check" :key="i" v-for="(name, i) in names">
								<input
									class="form-check-input float-none"
									type="radio"
									name="userName"
									:id="i"
									v-model="userSelected"
									:value="name.name"
									@change="checkRadio" />
								<label class="form-check-label" :for="i">
									{{ name.name }}
								</label>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-secondary"
							data-bs-dismiss="modal"
							@click="cancel">
							취소
						</button>
						<button
							type="button"
							class="btn btn-primary"
							data-bs-dismiss="modal"
							@click="divideTask()"
							:disabled="divideBtn">
							분배
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="flex">
			<!-- 업무분배 버튼 영역 -->
			<div
				class="divide-area flex-area"
				v-if="listSelected && listSelected !== '조사불가' && pjSelected">
				<button
					class="btn btn-secondary"
					type="button"
					v-if="selectList.length !== 0"
					data-bs-toggle="modal"
					data-bs-target="#taskDivision">
					업무 분배
				</button>
				<button
					class="btn btn-secondary"
					type="button"
					v-else
					@click="this.msgbox('분배할 데이터를 선택해주세요.')">
					업무 분배
				</button>
			</div>

			<!-- 검색영역 -->
			<div class="search-area flex-area" v-if="pjSelected && listSelected">
				<select class="form-select">
					<option value="">선택</option>
					<option value="시설명">시설명</option>
					<option value="주소">주소</option>
				</select>
				<input type="text" class="form-control" placeholder="검색어를 입력하세요" />
				<button class="btn" type="button">검색</button>
			</div>
		</div>

		<div class="table-responsive">
			<table class="table" v-if="pjSelected && listSelected">
				<thead>
					<tr>
						<th scope="col">
							<input type="checkbox" :value="allSelected" v-model="allSelected" />
						</th>
						<th></th>
						<th :key="i" v-for="(datakey, i) in dataListKey">{{ datakey }}</th>
					</tr>
				</thead>
				<tbody>
					<tr :key="i" v-for="(data, i) in dataListValue">
						<td scope="row">
							<input type="checkbox" :value="data" v-model="selectList" />
						</td>
						<td>
							<button type="button" class="btn btn-secondary">수정</button>
						</td>
						<td :key="j" v-for="(datakey, j) in dataListKey">{{ data[datakey] }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
// import datalists from '/@assets/data/list.json';
import { getDataInfo } from '/@service/user';

export default {
	data() {
		return {
			items: datalists.lists,
			listSelected: '',
			data: {
				work_id: '',
				data_status: '',
			},
			lists: [
				{ text: '목록 선택', value: '' },
				{ text: '분배 전', value: '1' },
				{ text: '실측필요', value: '3' },
				{ text: '조사불가', value: '4' },
				{ text: '완료', value: '5' },
			],
			pjName: '',
			pjSelected: '',
			projectList: datalists.projectList,
			dataList: [],
			dataListKey: [],
			dataListValue: [],
			selectedTaskList: [],
			allChecked: false,
			selectText: '',
			selectList: [],
			names: [
				{ name: '김인턴' },
				{ name: '이인턴' },
				{ name: '임인턴' },
				{ name: '사인턴' },
				{ name: '조인턴' },
				{ name: '신인턴' },
				{ name: '유인턴' },
				{ name: '오인턴' },
			],
			tasks: [],
			ownName: '',
			userSelected: '',
			modalShow: false,
			divideBtn: true,
			testArray: [],
		};
	},
	methods: {
		showList(e) {
			this.pjName = e.target.options[e.target.options.selectedIndex].text;
			this.showAll();
		},
		showTask(e) {
			this.selectText = e.target.options[e.target.options.selectedIndex].text;
			this.showAll();
		},
		showAll() {
			if (this.selectText !== '') {
				const setData = new FormData();

				setData.set('work_id', this.pjSelected);
				setData.set('data_status', this.listSelected);

				getDataInfo(setData).then((result) => {
					console.log('result: ', result);
					this.dataList = result.data;

					for (let i = 0; i < this.dataList.data.length; i++) {
						const arr = JSON.parse(this.dataList.data[i].data_json);
						this.dataListKey = Object.keys(arr);
					}

					for (let i = 0; i < this.dataList.data.length; i++) {
						this.dataListValue.push(JSON.parse(this.dataList.data[i].data_json));
					}

					console.log(this.dataListKey[0]);
					console.log(this.dataListValue[0][this.dataListKey[0]]);
				});
			}

			this.selectedTaskList = this.dataList.filter(
				(data) => data.data === this.selectText,
			);
			console.log(this.selectedTaskList);
			this.selectList = [];
		},
		checkRadio() {
			this.divideBtn = false;
		},
		divideTask() {
			this.ownName = this.userSelected;
			this.tasks = this.selectList;

			console.log(this.ownName + '님의 업무');
			for (let i = 0; i < this.tasks.length; i++) {
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
	},
	computed: {
		allSelected: {
			get: function () {
				return this.selectedTaskList
					? this.selectList
						? this.selectList.length === this.selectedTaskList.length
						: false
					: false;
			},
			set: function (e) {
				if (e) {
					// for(let i in this.selectedTaskList) {
					//   this.selectList[i] = this.selectedTaskList[i].name;
					//   console.log("값 : " + this.selectList[i]);
					// }

					for (let i = 0; i < this.selectedTaskList.length; i++) {
						this.selectList[i] = this.selectedTaskList[i].name;
					}
				} else {
					this.selectList = [];
				}
				// this.selectList = e ? this.selectedTaskList : [];
			},
		},
	},
};
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
	font-size: 0.8rem;
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
	text-align: center;
	padding-top: 20px;
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
	padding-top: 3px;
	margin-left: 10px;
}

@media (max-width: 420px) {
	.divide-area {
		display: none;
	}
}
</style>
