<template>
    <div class="container">
	<div class="row">

		<!-- Main Content -->

		<div class="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12" style=" text-align: left;">
			<div id="newsfeed-items-grid">

				<div class="ui-block" v-for="item in data">
					
					<article class="hentry post video">
						<a @click.prevent="getEntriesForTitle(item.titleId)" href=""><h3 style="font-weight: bold;">{{item.title}}</h3></a>
						{{item.relType}}
					<div style="border-top: 1px solid #e6ecf5;"></div>
					
						<p>{{item.entryText}}</p>
					
						<div class="post-additional-info inline-items">
							<div class="comments-shared">
								<a href="#" @click.prevent="repostControl(item.entryId,item.userRepost)" class="post-add-icon inline-items">
									<i :class="{'voted' : item.userRepost > 0 , '':item.userRepost === 0}" class="material-icons">reply</i>
									<span>{{item.countRepost}}</span>
								</a>				
								<a href="#" @click.prevent="likeControl(item.entryId,item.userLike)" class="post-add-icon inline-items">
									<i :class="{'voted' : item.userLike > 0 , '':item.userLike === 0}" class="material-icons">sentiment_very_satisfied</i>
									<span>{{item.CountLike}}</span>
								</a>
								<a href="#" @click.prevent="dislikeControl(item.entryId,item.userDislike)" class="post-add-icon inline-items">
								<i :class="{'voted' : item.userDislike > 0 , '':item.userDislike === 0}" class="material-icons">sentiment_very_dissatisfied</i>
								<span>{{item.countDislike}}</span>
							</a>
							<a href="#" @click.prevent="favoriteControl(item.entryId,item.userFavorite)" class="post-add-icon inline-items">
									<i :class="{'voted' : item.userFavorite > 0 , '':item.userFavorite === 0}" class="material-icons">favorite</i>
									<span>{{item.countFav}}</span>
								</a>
							</div>
					<div style="float: right; margin-bottom: 0;" class="post__author author vcard inline-items">
							<img :src="'../../assets/profile_pics/' + item.entryOwnerImg" alt="author">
					
							<div class="author-date">
								<a class="h6 post__author-name fn" href="#">{{item.entryOwnerName}}</a> 
								<div class="post__date">
									<time class="published" datetime="2004-07-24T18:18">
										{{item.entryCreateDate}}
									</time>
								</div>
								<div style="float: right; margin-top: -20px; margin-right: 0 !important;" class="more"><svg class="olymp-three-dots-icon"><use xlink:href="../../assets/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
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
									<hr>
									<li>
										<a href="#">Düzenle</a>
									</li>
									<li>
										<a href="#">Sil</a>
									</li>
								</ul>
							</div>
							</div>
						</div>
						</div>
					</article>
				</div>
			</div>

			<a id="load-more-button" @click.prevent="addPgCounter()" href="#" class="btn btn-control btn-more" data-load-link="items-to-load.html" data-container="newsfeed-items-grid">
				<svg class="olymp-three-dots-icon">
					<use xlink:href="../../assets/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
				</svg>
			</a>
		</div>

		<!-- ... end Main Content -->
		<!-- Left Sidebar -->
        <biography></biography>

		<!-- Right Sidebar -->
       <statistics></statistics>
	</div>
</div>
</template>

<script>
import Biography from './Biography'
import Statistics from './Statistics'
import { APIService } from "../../APIService";
const apiService = new APIService();
export default {
  name: 'Entry',
    data() {
    return {
		data: [],
		pg : 1
    }
  },
  components: {
    biography :Biography,
    statistics:Statistics
  },
  methods:{
    getMyEntries(userid){
		//console.log(userid);
		//
    	apiService.getMyEntriesForProfilPage(userid,this.pg).then(result => {
			this.data=result;	
        	return this.data;
    }).catch(hata => {
    	console.log(hata);
  	});
	},
   	likeControl(entryId, userLike) {
      let item = {
          id: entryId,//entry id
          userName: this.$cookies.get('user').userName
      };

      if (userLike > 0) {
        apiService.unlikeService(item).then(data => {
          if (data.data === "deleted") {
				this.getMyEntries(this.$cookies.get('user').id);
          } else {
            toastr.error(
              "Beğeni geri çekerken birşeyler yanlış gitti. Kesinlikle yazılımcıların suçu değil ama yine de bir bakacaklar rahat ol.",
              "Hata!",
              {
                timeOut: 4000,
                positionClass: "toast-bottom-right"
              }
            );
          }
        });
      } else {
        apiService.likeService(item).then(data => {
          if (data.data === "ok") {
				this.getMyEntries(this.$cookies.get('user').id);
            toastr.success("Ne güzel beğendin öyle.", "Başarılı", {
              timeOut: 4000,
              positionClass: "toast-bottom-right"
            });
          } else {
            toastr.error(
              "Beğenirken birşeyler yanlış gitti. Kesinlikle yazılımcıların suçu değil ama yine de bir bakacaklar rahat ol.",
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
	repostControl(entryId, userRepost) {
      let item = {
        id: entryId,
        userName: this.$cookies.get('user').userName
      };

      if (userRepost > 0) {
        apiService.unrepostService(item).then(data => {
          if (data.data === "deleted") {
			this.getMyEntries(this.$cookies.get('user').id);
          } else {
            toastr.error(
              "Entry geri çekerken birşeyler yanlış gitti. Kesinlikle yazılımcıların suçu değil ama yine de bir bakacaklar rahat ol.",
              "Hata!",
              {
                timeOut: 4000,
                positionClass: "toast-bottom-right"
              }
            );
          }
        });
      } else {
        apiService.repostService(item).then(data => {
          if (data.data === "ok") {
				this.getMyEntries(this.$cookies.get('user').id);
            toastr.success("Hmmm güzel entrymiş.", "Başarılı", {
              timeOut: 4000,
              positionClass: "toast-bottom-right"
            });
          } else {
            toastr.error(
              "Birşeyler yanlış gitti. Kesinlikle yazılımcıların suçu değil ama yine de bir bakacaklar rahat ol.",
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
	dislikeControl(entryId, userDislike) {
      let item = {
        id: entryId,
        userName: this.$cookies.get('user').userName
      };

      if (userDislike > 0) {
        apiService.undislikeService(item).then(data => {
          if (data.data === "deleted") {
				this.getMyEntries(this.$cookies.get('user').id);
          } else {
            toastr.error(
              "Dislike geri çekerken birşeyler yanlış gitti. Kesinlikle yazılımcıların suçu değil ama yine de bir bakacaklar rahat ol.",
              "Hata!",
              {
                timeOut: 4000,
                positionClass: "toast-bottom-right"
              }
            );
          }
        });
      } else {
        apiService.dislikeService(item).then(data => {
          if (data.data === "ok") {
				this.getMyEntries(this.$cookies.get('user').id);
            toastr.success("Sen beğenmediysen kendi kaybetmiştir.", "Başarılı", {
              timeOut: 4000,
              positionClass: "toast-bottom-right"
            });
          } else {
            toastr.error(
              "Diss atarken birşeyler yanlış gitti. Kesinlikle yazılımcıların suçu değil ama yine de bir bakacaklar rahat ol.",
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
		favoriteControl(entryId, userFavorite) {
      let item = {
        id: entryId,
        userName: this.$cookies.get('user').userName
      };

      if (userFavorite > 0) {
        apiService.unfavoriteService(item).then(data => {
          if (data.data === "deleted") {
				this.getMyEntries(this.$cookies.get('user').id);
          } else {
            toastr.error(
              "Fav geri çekerken birşeyler yanlış gitti. Kesinlikle yazılımcıların suçu değil ama yine de bir bakacaklar rahat ol.",
              "Hata!",
              {
                timeOut: 4000,
                positionClass: "toast-bottom-right"
              }
            );
          }
        });
      } else {
        apiService.favoriteService(item).then(data => {
          if (data.data === "ok") {
				this.getMyEntries(this.$cookies.get('user').id);
            toastr.success("Ne güzel favladın öyle.", "Başarılı", {
              timeOut: 4000,
              positionClass: "toast-bottom-right"
            });
          } else {
            toastr.error(
              "Favlarken birşeyler yanlış gitti. Kesinlikle yazılımcıların suçu değil ama yine de bir bakacaklar rahat ol.",
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
	addPgCounter(){
		this.pg++;
		this.getMyEntries(this.$cookies.get('user').id);
	},
	getEntriesForTitle(titleId){
      apiService.getEntryCountForCurrentTitle(titleId).then(entryCount => {
        apiService.setCurrentTitle(titleId).then(currentTitleData => {
		    let pageNum = 1;
        	apiService.setTitleComments(titleId,this.$cookies.get('user').id,pageNum).then(titleCommentsData => {
        		console.log(titleCommentsData);
        		this.$store.dispatch('setCurrentTitle', { currentTitleData: currentTitleData, titleCommentsData: titleCommentsData, entryCount : entryCount});
        		this.$router.push({name: 'title_page'});
        	});
      	});
      });
	}
  },
  created(){
	this.getMyEntries(this.$cookies.get('user').id);
	this.pg = 1;
}
}
</script>



