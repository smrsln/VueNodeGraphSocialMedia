<template>
    <div>
        <div style="top:110px;" class="container fixed-top">
	<div class="row">
		<div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
			<div class="ui-block">
				<div class="top-header">
					
					<div class="profile-section">
						<div class="row">
							<div class="col col-lg-5 col-md-5 col-sm-12 col-12">
								<ul class="profile-menu">
									<li>
										<router-link to="/profil/" exact-active-class="active">Entry</router-link>
									</li>
									<li>
										<router-link to="/profil/likes/" active-class="active">Favorilerim</router-link>
									</li>
									<li>
										<router-link to="/profil/followed/" active-class="active">Takip Edilen</router-link>
									</li>
								</ul>
							</div>
							<div class="col col-lg-5 ml-auto col-md-5 col-sm-12 col-12">
								<ul class="profile-menu">
									<li>
										<router-link to="/profil/followers/" active-class="active">Takipçi</router-link>
									</li>
									<li>
										<router-link to ="/profil/info" active-class="active">Hakkında</router-link>
									</li>
									<li>
										<div class="more">
											<svg class="olymp-three-dots-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
											<ul class="more-dropdown more-with-triangle">
												<li>
													<a href="#">Profili Şikayet Et</a>
												</li>
												<li>
													<a href="#">Bu Kişiyi Engelle</a>
												</li>
											</ul>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="top-header-author">
						<a href="#" class="author-thumb">
							<img :src="'../assets/profile_pics/' + profilPics" alt="author">
						</a>
						<div class="author-content">
							<a href="#" class="h4 author-name">{{profilName}}</a>
							<div class="country">{{profilRank}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="header-spacer"></div>
<!--***********-->
	<router-view></router-view> <!-- here show entry, followed , followers, likes component-->
	<update-header-photo></update-header-photo>

        
    </div>
</template>



<script>
import UpdateHeaderPhoto from './UpdateHeaderPhoto'
export default {
  name: 'UpdatePhoto',
  components: {
    'update-header-photo':UpdateHeaderPhoto
	},
	  computed: {
    profilUserId() {
      return this.$store.getters.profilUserId;
    },
    profilUserName() {
      return this.$store.getters.profilUserName;
    },
    profilName() {
      return this.$store.getters.profilName;
    },
    profilPics() {
      return this.$store.getters.profilPics;
		},
		profilRank() {
      return this.$store.getters.profilRank;
    }
  }
}
</script>
