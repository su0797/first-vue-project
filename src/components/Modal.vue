<template>
<!-- <div class="modal-dialog" v-if="isAct"> -->
  <div class="modal-content" v-if="isAct">
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
    <div class="modal-body">
      <h4 style="margin-top: 20px; margin-bottom:10px;">{{ user_name }}님의 계정을 정지하시겠습니까?</h4>
      <span>(한 번 정지한 계정은 다시 활성화시킬 수 없습니다.)</span>
    </div>
    <div class="modal--box">
      <button type="button" class="modal-clo" data-bs-dismiss="modal" @click="closeModal">취소</button>
      <button type="button" class="modal-del" @click="dataDelete">정지</button>
    </div>
  </div>
<!-- </div>  -->
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
  
    };
  },
  // created() {
  //   axios.get('http://52.22.216.42:8090/common/user/info/').then(({ data }) => {
  //       // console.log(data.data.user.user_id);
  //       this.user_id = data.data.user.user_id;
  //       this.user_name = data.data.user.user_name;
  //       this.user_email = data.data.user.user_email;
  //       this.user_phone = data.data.user.user_phone;
  //       this.user_status = data.data.user.user_status;
  //       this.user_type = data.data.user.user_type;
  //   })
    // .then(({ data }) => {
    //   this.users = data.user;
    //   // console.log(data);
    // })
  // },
    name: 'Modal',
    props: {
      product: Object,
      isAct: Boolean,
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
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    dataDelete() {
      axios.get('http://52.22.216.42:8090/common/user/edit/', {
      user_id: this.user_id,
      user_email:  this.user_email,
      user_type: this.user_type,
      user_status: 0
    })
      .then(({ data }) => {
        this.users = data.user;
        console.log(data);
          let msg = "계정을 정지하였습니다.";
          alert(msg);
          this.$router.push("/admin/user/list");
        })
    },
  },
};
</script>

<style scoped>
.modal-dialog {
  display: flex;
  position: fixed;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  margin: 0;
}
.modal-content {
  position: fixed;
  background-color: white;
  border-radius: 5px;
  width: 440px;
  height: 250px;
}

.modal-body {
  margin-top: 5px;
  max-width: 450px;
  user-select: none;
  color: #828282;
}

.modal--box {
  margin-bottom: 30px;
}

.modal-del {
  margin-left: 15px; 
  background-color: #D64C57;
  border-color: #D64C57;
  color: white;
  border-radius: 10px;
  margin-top: 15px;
  padding: 6px 23px;
  font-size: 19px;
}
.modal-clo {
  margin-right: 15px;
  background-color: white;
  border-color: #B9B9B9;
  color: #828282;
  border-radius: 10px;
  margin-top: 15px;
  padding: 6px 23px;
  font-size: 19px;
}
.btn-close {
  margin-left: 390px;
  margin-top: 10px;
}
</style>