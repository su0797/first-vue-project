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
		<div class="total-percent bg">
			<div class="main">
				<h5 class="theme_total">
					{{ projects[assignment_id-1] }} <br class="sp" /><span class="theme_name">전체</span>
				</h5>
				<p class="user_per">
					{{ progress[0] }}%<br class="sp" /><span class="avg_per"
						>(평균 {{ avg_progress[0] }}%)</span
					>
				</p>
			</div>
			<p class="temp_storage">
				・임시저장 : <br class="sp" /><span class="ts">{{ userAssigmentStatus.data_status3 }}</span
				>개
			</p>
			<p class="actual_measurement">
				・실측 : <br class="sp" />
				<span class="am">{{ userAssigmentStatus.data_status4 }}</span
				>개
			</p>
			<p class="completion">
				・완료 : <br class="sp" /><span class="com">{{ userAssigmentStatus.data_status6 }}</span
				>개
			</p>
		</div>
		<!-- ▼ 카테고리별 개인 작업 현황 -->
		<div  v-if="selectedProjectCode">
			<div class="total-percent line">
				<div class="main">
					<h5 class="theme_total" @change="showProject($event)">{{ pjName }}</h5>
					<p class="user_per">
						{{ progress[0] }}% <br class="sp" /><span class="avg_per"
							>(평균 {{ avg_progress[0] }}%)</span
						>
					</p>
				</div>

				<p class="temp_storage">
					・임시저장 : <br class="sp" /><span class="ts">{{ userWorkStatus.data_status3 }}</span
					>개
				</p>
				<p class="actual_measurement">
					・실측 : <br class="sp" /><span class="am">{{ userWorkStatus.data_status4 }}</span
					>개
				</p>
				<p class="completion">
					・완료 : <br class="sp" /><span class="com">{{ userWorkStatus.data_status6 }}</span
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
				<!-- <vue-awesome-paginate
						:total-items="defineTotalItems"
						:items-per-page="itemsPerPage"
						:max-pages-shown="MaxPagesShown"
						:current-page="currentPage"
						:on-click="onClickHandler"
						:show-breakpoint-buttons="false"/> -->
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import { getUserWorkId } from "/@service/user";
import {getDataInfo} from "/@service/admin/data";

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

			userAssigmentStatus:[],
			userWorkStatus:[],
			data_status3:'',
			data_status4:'',
			data_status6:'',
		};
	},
	created() {
		this.user_name = sessionStorage.getItem('user_name')
		this.user_id = sessionStorage.getItem('user_id')
		this.assignment_id = sessionStorage.getItem('assignment_id')
		
		// 유저의 각 프로젝트 별 전체  api
		axios.post('http://49.50.164.147:8090/web/work/nums',{
			assignment_id : this.assignment_id,
			user_id : this.user_id
		}).then(({ data }) => {
			this.userAssigmentStatus = data.data.data;
			console.log(this.userAssigmentStatus);
		})
	},
	mounted() {
		const setData = new FormData();
		setData.set('assignment_id', this.assignment_id);

		getUserWorkId(setData).then((result) => {
			this.projectList = result.data.data;
		});
	},
	methods: {
		showProject(e) {
			this.pjName = e.target.options[e.target.options.selectedIndex].text;
			// 유저의 프로젝트 > 과제별 전체 api
			axios.post('http://49.50.164.147:8090/web/work/nums',{
				user_id : this.user_id,
				work_id : this.selectedProjectCode
			}).then(({ data }) => {
				this.userWorkStatus = data.data.data;
				console.log(this.userWorkStatus);
			})
			this.showTable();
		},
		//유저 프로젝트 작업량
		userAssignment_progress(){

		},
		// 프로젝트 전체 작업량
		totalAssignment_progress(){

		},
		// 유저 과제별 작업량
		userWork_progress(){

		},
		// 전체 과제별 작업량
		totalWork_progress(){

		},
		showTable() {
			if (this.pjName !== '') {
				const setData = new FormData();

				setData.set('work_id', this.selectedProjectCode);

				getDataInfo(setData).then((result) => {
					// console.log('result: ', result);
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
		// total_progress( data_status4 , data_status6 , data_status2) {
        // this.totals =  data_status4 + data_status6 + data_status2
        // // console.log(this.totals);
		// }, 
		// asd(data_status6, totals) {
		// 	this.asds = Math.round(data_status6/totals)
		// 	// console.log(this.asds);
		// },

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
