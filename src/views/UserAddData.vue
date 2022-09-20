<template>
	<div class="container">
		<div>
			<h3>{{ projectName }}</h3>
		</div>
		<form class="need-validation" @submit.prevent="submitForm($event)" novalidate>
			<div v-for="(column, i) in columnList.data" :key="i">
				<UserInput
					:label="column.meta_name"
					:inputValue="(inputValueList[column.meta_name] = inputValue)"
					@inputFromChild="inputValueList[column.meta_name] = $event.target.value"
					v-if="column.meta_type === '1'" />
				<UserSelectBox
					:label="column.meta_name"
					:selectValue="(inputValueList[column.meta_name] = selectValue)"
					@selectFromChild="inputValueList[column.meta_name] = $event.target.value"
					v-else-if="column.meta_type === '2'" />
				<UserNote
					:label="column.meta_name"
					:note="(inputValueList[column.meta_name] = note)"
					@inputFromChild="inputValueList[column.meta_name] = $event.target.value"
					v-else-if="column.meta_type === '5'" />
				<UserRadioBox
					:label="column.meta_name"
					:radioValue="(inputValueList[column.meta_name] = radioValue)"
					@radioFromChild="inputValueList[column.meta_name] = $event.target.value"
					v-else-if="column.meta_type === '4'" />
			</div>
			<UserRadioBox
				:radioValue="(data_status = null)"
				@radioFromChild="data_status = $event.target.value" />
			<button type="submit" class="btn btn-secondary">저장</button>
		</form>
	</div>
</template>

<script>
import UserInput from '/@components/UserInput.vue';
import Address from '/@components/Address.vue';
import UserSelectBox from '/@components/UserSelectBox.vue';
import UserRadioBox from '/@components/UserRadioBox.vue';
import UserNote from '/@components/UserNote.vue';
import axios from 'axios';
import { getUserAddForm } from '../service/user';
export default {
	name: 'UserAddData',
	data() {
		return {
			inputValueList: {},
			columnList: [],
			inputValue: null,
			selectValue: null,
			radioValue: null,
			note: null,
			data_status: null,
			errors: [],
			projectName: '',
			projectCode: '',
			znCode: null,
			rdAddress: null,
			jbAddress: null,
			extraRdAddress: null,
			detailAddress: null,
		};
	},
	created() {
		const setData = new FormData();

		this.projectCode = sessionStorage.getItem('projectCode');
		this.projectName = sessionStorage.getItem('projectName');

		setData.set('work_id', this.projectCode);

		getUserAddForm(setData).then((result) => {
			this.columnList = result.data;
		});
	},
	methods: {
		openApi() {
			new window.daum.Postcode({
				oncomplete: (data) => {
					var roadAddr = data.roadAddress;
					var jibunAddr = data.jibunAddress;
					var zoneCd = data.zonecode;
					var extraRoadAddr = '';
					var detailAddr = '';
					if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
						extraRoadAddr += data.bname;
					}
					if (data.buildingName !== '' && data.apartment === 'Y') {
						extraRoadAddr +=
							extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName;
					}
					if (extraRoadAddr !== '') {
						extraRoadAddr = ' (' + extraRoadAddr + ')';
					}
					document.getElementById('postcode').value = zoneCd;
					document.getElementById('roadAddress').value = roadAddr;
					document.getElementById('jibunAddress').value = jibunAddr;
					if (roadAddr !== '') {
						document.getElementById('extraAddress').value = extraRoadAddr;
					} else {
						document.getElementById('extraAddress').value = '';
					}
					this.rdAddress = roadAddr;
					this.jbAddress = jibunAddr;
					this.znCode = zoneCd;
					this.extraRdAddress = extraRoadAddr;
					this.detailAddress = detailAddr;
				},
			}).open();
		},
		checkForm() {
			this.errors = [];
			for (var key in this.inputValueList) {
				if (this.inputValueList[key] === '') {
					this.errors.push('error');
				}
			}
			if (!this.data_status) {
				this.errors.push('error');
			}
			if (this.errors.length) {
				alert('모든 입력폼을 다 채워주세요');
				var forms = document.querySelectorAll('.needs-validation');
				Array.prototype.slice.call(forms).forEach(function (form) {
					form.classList.add('was-validated');
				});
			}
		},
		submitForm(e) {
			this.checkForm();
			if (this.errors.length === 0) {
				var inputData = JSON.stringify(this.inputValueList);
				axios({
					method: 'post',
					url: 'http://52.22.216.42:8090/web/db/store',
					data: {
						work_id: 10,
						user_id: 2,
						data_json: inputData,
						data_status: this.data_status,
					},
				})
					.then((res) => {
						console.log(inputData, this.data_status);
						e.target.reset();
						this.inputValueList = {};
						var forms = document.querySelectorAll('.needs-validation');
						Array.prototype.slice.call(forms).forEach(function (form) {
							form.classList.remove('was-validated');
						});
					})
					.catch((err) => {
						console.log(err);
					});
			}
		},
	},
	components: { UserInput, Address, UserSelectBox, UserRadioBox, UserNote },
};
</script>

<style scoped>
.container {
	margin-top: 20px;
}
h3 {
	margin: 50px;
	text-align: center;
}
.btn-secondary {
	display: flex;
	justify-content: center;
	margin: 30px auto;
	font-size: 0.9rem;
	border: none;
	width: 15%;
	background-color: #e17b46;
}
.btn-secondary:hover {
	background-color: #c15a33;
}
@media (max-width: 768px) {
	h3 {
		margin: 50px;
		text-align: center;
	}
	.btn {
		display: flex;
		justify-content: center;
		margin: 30px auto;
		font-size: 0.9rem;
		border: none;
		width: 20%;
		background-color: #e17b46;
	}
	.btn-secondary:hover {
		background-color: #c15a33;
	}
}
</style>
