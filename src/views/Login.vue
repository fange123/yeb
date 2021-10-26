<template>
    <div>
      <el-form
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        ref='loginForm'
        :model='loginForm'
        class="login_container"
        :rules="rules"
      >
        <h3 class="login_title">系统登录</h3>
        <el-form-item prop='username'>
          <el-input type='text'  v-model='loginForm.username' placeholder='请输入用户名' autocomplete="false"></el-input>
        </el-form-item>
        <el-form-item prop='password'>
          <el-input type='password' v-model='loginForm.password' placeholder='请输入密码' autocomplete="false"></el-input>
        </el-form-item>
        <el-form-item prop='code' >
          <el-input  v-model='loginForm.code' placeholder='点击图片更换验证码' autocomplete="false" type='text' style="width:250px;margin-right:5px"></el-input>
        <img :src="captchaUrl" alt="" @click='updateCaptcha' class="code_img">


        </el-form-item>
        <el-checkbox v-model='checked' class="login_remember">记住我</el-checkbox>
        <el-button type='primary' style="width:100%" @click='submitLogin'>登录</el-button>

      </el-form>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router';
export default {
  name:'Login',
  data(){
    return{
      captchaUrl:'',
      loginForm :{
        username:'admin',
        password:'123',
        code:''
      },
      loading:false,
      checked:true,
      rules: {
          username: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'change' }
          ],

        }

    }
  },
  mounted(){
    axios.get('/api/captcha').then(res => { // 获取数据
        this.captchaUrl = res.data
      })

  },
  methods:{
    updateCaptcha(){
      axios.get('/api/captcha').then(res => { // 获取数据
        this.captchaUrl = res.data
      })

    },
    submitLogin(){
      this.$refs.loginForm.validate((valid) => {
        this.loading = true
          if (!valid) {
            this.$message.error('请填写所有字段')
            return false;
          }

          this.postRequest('/api/login',{
            username:this.loginForm.username,password:this.loginForm.password},
          ).then(res => { // 获取数据
                 if(res.data){
                   //登录成功
                   sessionStorage.setItem('token',res.data.token)
                   router.replace('/welcome')
                   this.loading = false
                 }
             }).catch(()=>{
             })
           });
    },
  },

    components: {

    },

};
</script>

<style>
.login_container {
  width: 350px;
  margin: 180px auto;
  padding: 15px 35px 20px 35px;
  box-shadow: 0 0 25px #c6c6ca;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.login_title {
  margin: 0;
  margin-bottom: 30px;
  text-align: center;
}
.login_remember {
  margin: 0 5px 20px 0;
}

.code_img {
  cursor: pointer;
  width: 94px;
}
.el-form-item__content {
  display: flex;
  align-items: center;
}


</style>
