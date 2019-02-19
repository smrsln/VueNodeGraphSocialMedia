<template>
    <div class="container mt-5">
	<div class="row">
		<div v-for="useradvice in data" class="col col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
			<div class="ui-block">
				
				<div class="friend-item">
					<div class="friend-item-content">
						<div class="friend-avatar">
							<div class="author-thumb">
								<img class="mt-3" style="width:100px; height:100px; -webkit-box-shadow: 0px 0px 22px -2px rgba(0,0,0,0.71); -moz-box-shadow: 0px 0px 22px -2px rgba(0,0,0,0.71); box-shadow: 0px 0px 22px -2px rgba(0,0,0,0.71);"  :src="'../../assets/profile_pics/' + useradvice.profile_pics">
							</div>
							<div class="author-content mt-4">
								<a href="#" class="h5 author-name">{{useradvice.name}}</a>
								<div class="country">{{useradvice.userName}}</div>
								<div class="country">{{useradvice.rank}}</div>
                                
                                <div v-if="useradvice.followedStatus == 1" class="country mt-3"><button style="background-color:green;" @click.prevent="followControl(useradvice.userId,useradvice.followedStatus)" type="button" class="btn btn-sm">
                                    <span style=" position: relative; margin-bottom: 0;"><i style="font-size: 13px;" class="material-icons">check_circle</i></span> 
                                    Takip Edildi
                                </button>
                                </div> 
                                
                                <div v-else class="country mt-3"><button @click.prevent="followControl(useradvice.userId,followedStatus)" type="button" class="btn btn-primary btn-sm">
                                    <span style=" position: relative; margin-bottom: 0;"><i style="font-size: 13px;" class="material-icons">person_add</i></span> 
                                    Takip Et
                                </button>
                                </div>  
                                
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script type="text/javascript">

import { APIService } from "../APIService";
const apiService = new APIService();
    export default {
        name:"stepTwo",
        props: ['clickedNext','currentStep'],
        data() {
    return {
        data: [],
        followedStatus: ''
    }
  },
        methods: {
         followControl(userId, followedStatus) {
      let item = {
        followedid: userId,
        userName: this.$cookies.get("user").userName
      };

      if (followedStatus > 0) {
        
        apiService.unfollowService(item).then(data => {
          if (data.data === "deleted") {
            toastr.success("Bağlantınız Silindi.", "Başarılı", {
              timeOut: 4000,
              positionClass: "toast-bottom-right"
            });
            this.userAdvice(this.$cookies.get('user').id);
          } else {
            toastr.error(
              "Takibi geri çekerken birşeyler yanlış gitti. Kesinlikle yazılımcıların suçu değil ama yine de bir bakacaklar rahat ol.",
              "Hata!",
              {
                timeOut: 4000,
                positionClass: "toast-bottom-right"
              }
            );
          }
        });
      } else {
        apiService.followService(item).then(data => {
          if (data.data === "ok") {
            toastr.success("Takip İşlemi.", "Başarılı", {
              timeOut: 4000,
              positionClass: "toast-bottom-right"
            });
            this.userAdvice(this.$cookies.get('user').id);
          } else {
            toastr.error(
              "Takip işleminde birşeyler yanlış gitti. Kesinlikle yazılımcıların suçu değil ama yine de bir bakacaklar rahat ol.",
              "Hata!",
              {
                timeOut: 6000,
                positionClass: "toast-bottom-right"
              }
            );
          }
        });
      }
    },
    userAdvice(loggedId){
      let item={
        loggedId: loggedId,
      };
        apiService.userAdviceService(item).then(data => {
            this.data=data.data;
            return this.data;
        }).catch(hata => {
            console.log(hata);
  });
    }
        },
        mounted() {
            this.$emit('can-continue', {value: true})
        },
        created(){
            this.userAdvice(this.$cookies.get('user').id);
}
    }
</script>