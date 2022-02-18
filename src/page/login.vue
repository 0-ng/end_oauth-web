<template>
  	<div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" v-show="showLogin">
		  		<div class="manage_tip">
		  			<p>elm后台管理系统</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
				  	</el-form-item>
				</el-form>
				<p class="tip">温馨提示：</p>
				<p class="tip">未登录过的新用户，自动注册</p>
				<p class="tip">注册过的用户可凭账号密码登录</p>
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
	import {login, getAdminInfo} from '@/api/getData'
	import {mapActions, mapState} from 'vuex'

	export default {
	    data(){
			return {
				loginForm: {
					username: '',
					password: '',
				},
				rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
				showLogin: false,
			}
		},
		mounted(){
			this.showLogin = true;
			if (!this.adminInfo.id) {
    			this.getAdminData()
    		}
		},
		computed: {
			...mapState(['adminInfo']),
		},
		methods: {
			...mapActions(['getAdminData']),
            getParamsData(params) {
			    var data = '';
                for (let attr in params){
                    data += '&' + attr + '=' + encodeURIComponent(params[attr]);
                }//转键值对，然后设置下content-type。axios的content-type是application/json的，不是键值对
                data = data.substring(1)
				return data
            },
            submitForm(formName) {
				this.$refs[formName].validate((valid) => {
				    var username = this.loginForm.username
				    var password = this.loginForm.password
				    var params = { username: username, password: password};
                    var data = this.getParamsData(params)
				    if (valid) {
					    this.$axios.post('/login', data, {headers: { 'content-type': "application/x-www-form-urlencoded" }})
                        .then((res) => {
                            console.log(res)
                            if(res.data.code == "0"){
                                // Axios.interceptors.request.use(config => {
                                //     config.header['Authorization'] = res.data.token
                                // })
                                console.log(res.data.data.token.type)
                                localStorage.setItem('oauth-token', res.data.data.token)
                                window.sessionStorage.setItem('oauth-token', res.data.data.token)
                                console.log(localStorage.getItem('oauth-token'))
                                console.log(window.sessionStorage.getItem('oauth-token'))
                                var params = {oauth_token:res.data.data.token}
                                var data = this.getParamsData(params)
                                this.$axios.post('/getEnv', data, {headers: { 'content-type': "application/x-www-form-urlencoded" }})
                                .then((res) => {
                                    console.log(res)
                                    window.location.href = res.data.data.env.redirectUrl + "?code=" + res.data.data.code + "&username=" + username
                                    // this.$router.push(res.data.data.env.redirectUrl)
                                })
                            }else{

                            }
                        })
					} else {
						this.$notify.error({
							title: '错误',
							message: '请输入正确的用户名密码',
							offset: 100
						});
						return false;
					}
				});
			},
		},
		watch: {
			adminInfo: function (newValue){
				if (newValue.id) {
					this.$message({
                        type: 'success',
                        message: '检测到您之前登录过，将自动登录'
                    });
					this.$router.push('manage')
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.login_page{
		background-color: #324057;
	}
	.manage_tip{
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		p{
			font-size: 34px;
			color: #fff;
		}
	}
	.form_contianer{
		.wh(320px, 210px);
		.ctp(320px, 210px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.submit_btn{
			width: 100%;
			font-size: 16px;
		}
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
