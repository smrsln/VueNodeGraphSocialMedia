<template>
    <div class="container" style="margin-top:4%;">
	<div class="row">
		<div class="col col-xl-8 offset-xl-2 order-xl-2 col-lg-8 offset-lg-2 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
			<ul v-if="err.length > 0" class="alert alert-danger">
				<li v-for="item in err" class="alert alert-danger">{{item}}</li>
			</ul>
			<div class="ui-block">
				<div class="ui-block-title">
					<h3 class="title bold">Üyelik Formu</h3>
				</div>
				<div class="ui-block-content">
					
					<form class="content">
							<div class="row">
								<div class="col col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12">
									<div class="form-group label-floating is-empty">
										<label class="control-label">Adınız Soyadınız</label>
										<input class="form-control" placeholder="" type="text" v-model="userObj.name">
									</div>
								</div>
								<div class="col col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12">
									<div class="form-group label-floating is-empty">
										<label class="control-label">Kullanıcı Adınız (@kullanıcıadı)</label>
										<input class="form-control" placeholder="" type="text" v-model="userObj.userName">
									</div>
								</div>
								<div class="col col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12">
									<div class="form-group label-floating is-empty">
										<label class="control-label">Eposta</label>
										<input class="form-control" placeholder="" id="email" type="text" v-model="userObj.email">
									</div>
								</div>
								<div class="col col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12">
								<div class="form-group label-floating is-empty">
										<label class="control-label">Şifre</label>
										<input class="form-control" placeholder="" type="password" v-model="userObj.pass">
									</div>
								</div>
								<div class="col col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12">
								<div class="form-group label-floating is-empty">
										<label class="control-label">Şifre Onay</label>
										<input class="form-control" placeholder="" type="password" v-model="userObj.passVerif">
									</div>
								</div>
								<div class="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
									<div class="remember">
										<div class="checkbox">
											<label for="checkbox">
												<input name="optionsCheckboxes" type="checkbox" id="checkbox" v-model="userObj.policy">
												 <a href="#">Bakimbi Kullanıcı Sözleşmesini</a> okudum ve kabul ettim.
											</label>
										</div>
									</div>
			
									<a href="#" class="btn btn-danger btn-lg full-width" @click="register">İşlemi Tamamla</a>
								</div>

								<div class="veya"></div>
			
									<a href="#" class="btn btn-lg bg-facebook full-width btn-icon-left"><i class="fab fa-facebook-f" aria-hidden="true"></i>Facebook ile Üye Ol</a>
			
									<a href="#" class="btn btn-lg bg-twitter full-width btn-icon-left"><i class="fab fa-twitter" aria-hidden="true"></i>Twitter ile Üye Ol</a>
							</div>
						</form>

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
          email:'',
          pass:'',
          passVerif:'',
		  policy:'',
		  
	  },
	  err:[]
    };
  },
  methods: {
	  validEmail:function(email) {
	  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
    },
	  register(){
		  //alert(this.userObj.pass.length);
		  //this.$store.dispatch('clearUser');
		  this.err = [];
		  if(!this.userObj.userName){
			  this.err.push("Kullanıcı adı alanı boş bırakılamaz!");
		  }
          if(this.userObj.policy == 'false' || this.userObj.policy == ''){
			  this.err.push("Kullanıcı sözleşmemizi okumayı unuttunuz!");
          }
          if(!this.userObj.email){
			  this.err.push("Mail Adresi alanı boş bırakılamaz!");
		  }else if (!this.validEmail(this.userObj.email)) {
        	  this.err.push('Mail adresinizi hatalı girdiniz');
			  }
		  if(!this.userObj.pass || !this.userObj.passVerif){
			  this.err.push("Şifre alanı boş bırakılamaz!");
          }else if(!(this.userObj.pass === this.userObj.passVerif)){
              this.err.push("Girdiğiniz şifreler birbiriyle uyuşmuyor!");
          }else if(this.userObj.pass.length < 6){
			  this.err.push("Şifre en az 6 karakterden oluşmalıdır!");
		  }
		  if(!(this.err.length > 0)){
			  console.log("register işlemi");
			  apiService.register(this.userObj).then(data => {
				  if(data.data.name == 'Neo4jError'){
				  this.err.push('Kullanıcı adı veya mail adresiniz sistemizde mevcuttur.');
				  } else {
					  this.$cookies.set('user',data.data);
					  this.$router.push({ name: 'home'});
				  }
					
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