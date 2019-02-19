<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="ui-block responsive-flex">
                        <div class="ui-block-title">
                            <div class="h6 title">Tayfam ({{data.length}})</div>
                            <form class="w-search">
                                <div class="form-group with-button">
                                    <input class="form-control" type="text" placeholder="Ara...">
                                    <button>
                                        <svg class="olymp-magnifying-glass-icon"><use xlink:href="../../assets/svg-icons/sprites/icons.svg#olymp-magnifying-glass-icon"></use></svg>
                                    </button>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

<!-- Friends -->

<div class="container">
	<div class="row">
		<div v-for="item in data" class="col col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
			<div class="ui-block">
				
				<!-- Friend Item -->
				<div class="friend-item">
					<div class="friend-item-content">
				
						<div class="more yukari">
							<svg class="olymp-three-dots-icon"><use xlink:href="../../assets/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
							<ul class="more-dropdown">
									<li>
										<a href="#">Takip Et</a>
									</li>
									<li>
										<a href="#">Özel Mesaj At</a>
									</li>
									<li>
										<a href="#">Şikayet Et</a>
									</li>
									<li>
										<a href="#">Engelle</a>
									</li>
								</ul>
						</div>
						<div class="friend-avatar">
							<div class="author-thumb">
								<img style="width:100px; height:100px;" :src="'../../assets/profile_pics/' + item.userProfilePics" alt="author">
							</div>
							<div class="author-content">
								<a href="#" class="h5 author-name">{{item.name}}</a>
								<div class="country">{{item.userName}}</div>
								<div class="country">{{item.userRank}}</div>
							</div>
						</div>
				
						<div class="swiper-container" data-slide="fade">
							<div class="swiper-wrapper">
								<div class="swiper-slide">
									<div class="friend-count" data-swiper-parallax="-500">
										<a href="#" class="friend-count-item">
											<div class="h6">{{item.createdEntry}}</div>
											<div class="title"><i title="Entry" class="material-icons">record_voice_over</i></div>
										</a>
										<a href="#" class="friend-count-item">
											<div class="h6">{{item.followedUser}}</div>
											<div class="title"><i title="Takip Edilen" class="material-icons">how_to_reg</i></div>
										</a>
										<a href="#" class="friend-count-item">
											<div class="h6">{{item.followerUser}}</div>
											<div class="title"><i title="Takipçiler" class="material-icons">local_library</i></div>
										</a>
									</div>	
								</div>
							</div>
							<!-- If we need pagination -->
							
						</div>
					</div>
				</div>
				
				<!-- ... end Friend Item -->			</div>
		</div>
	</div>
</div>

    </div>
</template>

<script>
import { APIService } from "../../APIService";
const apiService = new APIService();

export default {
    name:"profile-followed",
data() {
    return {
        data: []
    }
  },
methods:{
    getFollowed(userid){
		//console.log(userid);
        apiService.followedService(userid).then(data => {
			this.data=data;
			console.log(data);
            return this.data;
        }).catch(hata => {
    console.log(hata);
  });
    }
},
created(){
    //console.log(this.$store.state.user.id);
    this.getFollowed(this.$cookies.get('user').id);
}
}
</script>
