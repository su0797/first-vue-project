<template>
    <Modal :isAct="isModalAct" @closeModal="closeModal" :user_name="user_name" />
    <tr> 
        <td>{{user_name}}</td>
        <td>{{user_email}}</td>
        <td>{{user_password}}</td>
        <td>{{user_phone}}</td>
        <td>
            {{assignment_name[assignment_id - 1]}}
            <!-- <div v-if="assignment_id === 1">
                광진구
            </div>
            <div v-else-if="assignment_id === 2">
                순천
            </div>
            <div v-else-if="assignment_id === 3">
                광주
            </div>
            <div v-else-if="assignment_id === 4">
                문정원
            </div>
            <div v-else>
                지역이 없습니다.
            </div>   -->
        </td>
        <td>    
            <router-link :to="{ name: 'UserModify', params: {user_id: user_id} }"><button type="button" class="btn btn-primary btn-modal">수정</button></router-link>
            <button type="button" class="btn btn-primary btn-modal btn-stop" @click="openModal()">활성화</button> 
            <!-- <router-link :to="{ name: 'UserWorkPage', params: {user_id: user_id} }"><button class="btn btn-primary btn-modal btn-stop" >작업 내역</button></router-link> -->
            <button class="btn btn-primary btn-modal btn-stop" >작업 내역</button>
        </td>
    </tr>    
</template>

<script>
import Modal from '/@components/Modal.vue';

export default {
    name: 'UserListRow',
    props: {
        user_id : Number,
        user_type : Number,
        user_name : String,
        user_email : String,
        user_password : String,
        user_phone : String,
        assignment_id : Number,
        assignment_name: Array,
        user_status: Number,
        create_time: String,
        update_time: String,
        user_type_name: String,
        user_status_name: String,
        role: String,
    },
    data() {
    return {
      isModalAct: false,
      message: ''
    }
  },
  methods: {
    openModal() {
      this.isModalAct = true;
  },
    closeModal() {
      this.isModalAct = false;
    },
},
components: { Modal }
}
</script>

<style scoped>
.btn {
    background-color:#e17b45;
    border-color: #e17b45;
    color: white;
}
.btn-primary-add {
    background-color: #e17b45;
    border-color: #e17b45;
    color: white;
}
.btn-primary-add:hover {
    background-color: #dc6425;
    border-color: #dc6425;
    color: white;
}
.btn-modal{
    font-size: .8rem;
} 
.btn-modal:hover{
    background-color: #dc6425;
} 

.flex-area .btn-secondary {
  font-size: .8rem;
  border: none;
  background-color: #e17b46 !important;
}

.flex-area .btn-secondary:hover {
  background-color: #dc6425 !important;
}

.btn-stop {
    background-color: white; 
    border-color: #e17b45;
    color: #e17b45;
}
.btn-stop:hover {
    background: #FBEBE3;
    border-color: #e17b45;
}
.pull-right, .btn-modal {
    margin-right: 5px;
}
.items {
    display: block;
    font-size: 0; 
	margin: 0 -5px;
    margin-top: 50px;
    text-align: right;
}
.btn-primary-add {
    float: left;
}
.search-area {
    margin-right: 5px;
}
.form-select {
    display: inline-block;
    width: 10%;
    margin-right: 10px;
}
.form-control {
    display: inline-block;
    width: 30%;
    margin-right: 10px;
} 

.btn-primary {
    font-size: .8rem;
}

</style>