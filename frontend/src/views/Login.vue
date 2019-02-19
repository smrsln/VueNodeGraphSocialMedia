<template>
    <div class="container" style="margin-top:4%;">
	<div class="row">
		<div class="col col-xl-8 offset-xl-2 order-xl-2 col-lg-8 offset-lg-2 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
			<ul v-if="err.length > 0" class="alert alert-danger">
				<li v-for="item in err" class="alert alert-danger">{{item}}</li>
			</ul>
			<div class="ui-block">
				<div class="ui-block-title">
					<h3 class="title bold">Giriş Yap</h3>
				</div>
				<div class="ui-block-content">	
					<form class="content">
							<div class="row">
								<div class="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
									<div class="form-group label-floating is-empty">
										<label class="control-label">Kullanıcı Adı</label>
										<input class="form-control" placeholder="" type="text" v-model="userObj.userName">
									</div>
									<div class="form-group label-floating is-empty">
										<label class="control-label">Şifre</label>
										<input class="form-control" placeholder="" v-model="userObj.pass" type="password">
									</div>
			
									<div class="remember">
			
										<div class="checkbox" style="float:left">
											<label>
												<input name="optionsCheckboxes" type="checkbox">
												Beni Hatırla
											</label>
										</div>
										<a href="#" class="forgot">Şifremi Unuttum</a>
									</div>
			
									<a href="#" class="btn btn-lg btn-primary full-width" @click="login">Giriş Yap</a>
			
									<div class="veya"></div>
			
									<a href="#" class="btn btn-lg bg-facebook full-width btn-icon-left"><i class="fab fa-facebook-f" aria-hidden="true"></i>Facebook ile Giriş Yap</a>
			
									<a href="#" class="btn btn-lg bg-twitter full-width btn-icon-left"><i class="fab fa-twitter" aria-hidden="true"></i>Twitter ile Giriş Yap</a>
			
			
									<p>Bakimbi Üyeliğiniz yok mu ? <a href="#">Üye Ol</a></p>
								</div>
							</div>
						</form>
					
					<!-- ... end Personal Information Form  -->
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import { APIService } from "../APIService";
const apiService = new APIService();
export default {
  name: "bakimbi",
  components: {

  },
  data() {
    return {
      userObj:{
		  userName:'',
		  pass:''
	  },
	  err:[]
    };
  },
  methods: {
	  login(){
		  this.err = [];
		  if(!this.userObj.userName){
			  this.err.push("Kullanıcı adı alanı boş bırakılamaz!");
		  }
		  if(!this.userObj.pass){
			  this.err.push("Şifre alanı boş bırakılamaz!");
		  }else if(this.userObj.pass.length < 6){
			this.err.push("şifre en az 6 karakterden oluşmalıdır!");
		  }
		  
		  if(!(this.err.length > 0)){
				apiService.login(this.userObj).then(data => {
					this.$cookies.set('user',data.data);
					this.$router.push({ name: 'home'});
				});
		  }

	  }
  },
  created() {
	  
  },
  mounted(){
  }
};
</script>