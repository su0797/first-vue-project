<template>
	<div>
		<div class="select-project">
			<select
				v-model="selectedProjectCode"
				class="form-select"
				@change="showProject($event)">
				<option value="" selected disabled>업무 선택</option>
				<option :value="project.work_id" :key="i" v-for="(project, i) in projectList">
					{{ project.work_name }}
				</option>
			</select>
		</div>
		<h4 class="title">{{ user_name }}님의<br class="sp" /> 업무현황 페이지</h4>
		<div class="total-percent bg" >
			<div class="main">
				<h5 class="theme_total">
					{{ projects[assignment_id-1] }} <br class="sp" /><span class="theme_name">전체</span>
				</h5>
				<p class="user_per">
					{{ userAss_progress }}%<br class="sp" /><span class="avg_per"
						>(평균 {{ allUser_progress }}%)</span
					>
				</p>
			</div>
			<p class="temp_storage">
				・임시저장 : <br class="sp" /><span class="ts">{{ userAssSt.data_status3 }}</span
				>개
			</p>
			<p class="actual_measurement">
				・실측 : <br class="sp" />
				<span class="am">{{ userAssSt.data_status4 }}</span
				>개
			</p>
			<p class="completion">
				・완료 : <br class="sp" /><span class="com">{{ userAssSt.data_status6 }}</span
				>개
			</p>
		</div>
		<!-- ▼ 카테고리별 개인 작업 현황 -->
		<div  v-if="selectedProjectCode">
			<div class="total-percent line">
				<div class="main">
					<h5 class="theme_total" @change="showProject($event)">{{ pjName }}</h5>
					<p class="user_per">
						{{ userWork_progress }}% <br class="sp" /><span class="avg_per"
							>(평균 {{ totalWork_progress }}%)</span
						>
					</p>
				</div>

				<p class="temp_storage">
					・임시저장 : <br class="sp" /><span class="ts">{{ userWorkSt.data_status3 }}</span
					>개
				</p>
				<p class="actual_measurement">
					・실측 : <br class="sp" /><span class="am">{{ userWorkSt.data_status4 }}</span
					>개
				</p>
				<p class="completion">
					・완료 : <br class="sp" /><span class="com">{{ userWorkSt.data_status6 }}</span
					>개
				</p>
			</div>
			<!-- 검색영역 -->
			<div class="flex">
				<div class="flex-area"></div>
				<div class="search-area flex-area">
					<select class="form-select">
						<option value="">선택</option>
						<option value="시설명">시설명</option>
						<option value="주소">주소</option>
					</select>
					<input type="text" class="form-control" placeholder="검색어를 입력하세요" />
					<button class="btn" type="button">검색</button>
				</div>
			</div>

			<div class="table-responsive" v-if="selectedProjectCode">			
				<table class="table">
					<thead>
						<tr>
							<th></th>
							<th scope="col" v-for="(dataKey, i) in dataListKey" :key="i">
								{{ dataKey }}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(data, i) in dataListValue" :key="i">
							<td scope="row">
								<button class="btn btn-secondary" type="button" id="buttonInput">
									수정
								</button>
							</td>
							<td v-for="(datakey, j) in dataListKey" :key="j">
								{{ data[datakey] }}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import { getUserWorkId } from "/@service/user";
import {getDataInfo, getUserDataNum} from "/@service/admin/data";

export default {
	data() {
		return {
			user_name: '',
			user_id: '',
			pjName: '',
			selectedProjectCode: '',
			projectList: [],
			projects: ['광진구', '순천', '광주', '문정원'],
			
			progress: [],
			avg_progress: [],
			temp_storage: [],
			actual_measurement: [],
			completion: [],
			dataList: [],
			dataListKey: [],
			dataListValue: [],
			assignment_id: '',
			work_name:'',

			userAssSt:[],
			allAss_data:[],
			allAss_dataTotal:0,
			allUser_progress:0,
			userAss_progress:0,
			userWorkSt:[],
			totalWork_progress:0,
			userWork_progress:0,
			data_status1:'',
			data_status2:'',
			data_status3:'',
			data_status4:'',
			data_status5:'',
			data_status6:'',
		};
	},
	created() {
		this.user_name = sessionStorage.getItem('user_name')
		this.user_id = sessionStorage.getItem('user_id')
		this.assignment_id = sessionStorage.getItem('assignment_id')
	},
	mounted() {
		//assignment_id로 프로젝트명 불러오기
		const setData = new FormData();
		setData.set('assignment_id', this.assignment_id);

		getUserWorkId(setData).then((result) => {
			this.projectList = result.data.data;
		});

		// 전체 작업량 확인
		const allAssData = new FormData();
		const userAssData = new FormData();

		allAssData.set('assignment_id', this.assignment_id)
		userAssData.set('assignment_id', this.assignment_id)
		userAssData.set('user_id', this.user_id)

		// 해당 프로젝트의 총 작업량
		getUserDataNum(allAssData).then((data) => {
			this.allAss_data = data.data.data;
			this.allAss_dataTotal = this.allAss_data.data_status1+this.allAss_data.data_status2+this.allAss_data.data_status3+this.allAss_data.data_status4+this.allAss_data.data_status5+this.allAss_data.data_status6;
			//프로젝트 전체 인원의 완료 비율
			this.allUser_progress = ((this.allAss_data.data_status6/this.allAss_dataTotal)*100).toPrecision(2) ;
		})
		//유저 프로젝트 작업량
		getUserDataNum(userAssData).then((data) => {
			this.userAssSt = data.data.data;
			//유저의 작업비율
			this.userAss_progress = ((this.userAssSt.data_status6/this.allAss_dataTotal)*100).toPrecision(2) ;
		})
	},
	methods: {
		showProject(e) {
			this.pjName = e.target.options[e.target.options.selectedIndex].text;
			// 유저의 프로젝트 > 과제별 전체 api
			const allWorkData = new FormData();
			const userWorkData = new FormData();
			allWorkData.set('work_id', this.selectedProjectCode)
			userWorkData.set('work_id', this.selectedProjectCode)
			userWorkData.set('user_id', this.user_id)
			
			// 전체 work_id별 작업량
			getUserDataNum(allWorkData).then((data) =>{
				this.allWork_data = data.data.data;
				this.allWork_dataTotal = this.allWork_data.data_status1+this.allWork_data.data_status2+this.allWork_data.data_status3+this.allWork_data.data_status4+this.allWork_data.data_status5+this.allWork_data.data_status6;
				//work_id별 전체 인원의 완료 비율
				this.totalWork_progress = ((this.allWork_data.data_status6/this.allWork_dataTotal)*100).toPrecision(2) ;
			})
			// 유저 work_id별 작업량
			getUserDataNum(userWorkData).then((data) =>{
				this.userWorkSt = data.data.data;
				// 해당 유저의 work_id 완료 비율
				this.userWork_progress = ((this.userWorkSt.data_status6/this.allWork_dataTotal)*100).toPrecision(2);
			})
			this.showTable();
		},
		showTable() {
			if (this.pjName !== '') {
				const setData = new FormData();

				setData.set('work_id', this.selectedProjectCode);
				setData.set('user_id', this.user_id);

				getDataInfo(setData).then((result) => {
					this.dataList = result.data;

					for (let i = 0; i < this.dataList.data.length; i++) {
						const arr = JSON.parse(this.dataList.data[i].data_json);
						this.dataListKey = Object.keys(arr);
					}
					this.dataListValue = [];
					for (let i = 0; i < this.dataList.data.length; i++) {
						this.dataListValue.push(JSON.parse(this.dataList.data[i].data_json));
					}
				});
			}
		},
		goInput() {
			this.$router.replace('/');
		},
	},
};

</script>

<style scoped>
.select-project {
	margin-right: 0;
}
.selectbox .form-select {
	width: 100%;
	margin-top: 20px;
	min-width: 220px;
	font-size: 0.9rem;
}
option {
	font-size: 0.9rem;
}
.title {
	display: inline-block;
	width: 40%;
	margin-top: 30px;
	margin-left: 10%;
	padding-bottom: 5px;
	text-align: center;
}

.name {
	text-align: center;
	margin-top: 40px;
}
.bg {
	background: #fbebe3;
}
.total-percent.line {
	border: 2px solid #e17b46;
}
.total-percent {
	width: 100%;
	padding: 17px;
	border-radius: 10px;
	margin: 10px 0;
	display: flex;
	align-items: center;
}
.main {
	width: 40%;
}
.theme_total {
	display: inline-block;
	margin-left: 8%;
	font-size: 1.5rem;
	font-weight: 800;
}
.user_per {
	display: inline-block;
	font-size: 1.5em;
	color: #e17b46;
	font-weight: 800;
	margin-left: 20px;
}
.avg_per {
	font-size: 0.8rem;
	color: black;
	font-weight: 700;
	margin-left: 5px;
}
.temp_storage,
.actual_measurement,
.completion {
	margin-left: 8%;
}
.ts {
	color: #d64c57;
	font-weight: 700;
}
.am,
.com {
	color: #3e8cdb;
}
.table-responsive {
	overflow: scroll;
	height: 100%;
	max-height: 700px;
	margin-top: 20px;
	white-space: nowrap;
	scrollbar-color: #e4e4e4;
}

.table-bordered {
	text-align: center;
	vertical-align: middle;
	font-size: 0.8rem;
}
button {
	border: none;
}
th {
	background-color: #fbebe3;
	vertical-align: middle;
	padding: 8px 10px;
}
.sp {
	display: none;
}
@media (max-width: 768px) {
	* {
		font-size: 1rem !important;
	}
	.sp {
		display: block;
	}
	.main,
	.user_per,
	.avg_per,
	.temp_storage,
	.actual_measurement,
	.completion {
		font-size: 0.8rem !important;
	}
	.title {
		width: 40%;
		margin-left: 25%;
	}

	.search-area .form-select {
		min-width: 70px;
	}
}
</style>
