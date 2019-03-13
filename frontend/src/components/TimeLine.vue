<template>
    		<main class="" style=" text-align: left;">

			<div id="newsfeed-items-grid">
      <div class="alert alert-secondary" v-if="!(timeLine.length > 0)" role="alert">
        Ana akış için lütfen kullanıcı takip edin.
      </div>
				<div class="ui-block" v-for="item in timeLine">
					
					<article class="hentry post video">
						<a @click.prevent="getEntriesForTitle(item.titleId)" href=""><h3 style="font-weight: bold;">{{item.title}}</h3>
						<div  style="float:right">
							<div class="row">
							<span class="badge badge-info">{{item.hasRelName + ' - ' + (item.relType=='like' ? 'Beğendi' : item.relType=='fav' ? 'Favladı' : item.relType=='rePost' ? 'Paylaştı': item.relType=='dislike' ? 'Beğenmedi' :'Oluşturdu')  }}</span>
							</div>
						</div>				
						</a>
						
					<div style="border-top: 1px solid #e6ecf5;"></div>
					
						<p>{{item.entry}}</p>
					
						<div class="post-additional-info inline-items">
							<div class="comments-shared">
								<a href="#"  @click.prevent="repostControl(item.entryId, item.userRepost)" class="post-add-icon inline-items">
									<i :class="{'voted' : item.userRepost > 0 , '' :item.userRepost === 0}"
              						class="material-icons">reply</i>
									<span>{{item.countRepost}}</span>
								</a>
					
								<a href="#" @click.prevent="likeControl(item.entryId,item.userLike)" class="post-add-icon inline-items">
									<i :class="{'voted' : item.userLike > 0 , '' : item.userLike === 0}"
              						class="material-icons">sentiment_very_satisfied</i>
					
									<span>{{item.CountLike}}</span>
								</a>
								<a href="#" @click.prevent="dislikeControl(item.entryId,item.userDislike)" class="post-add-icon inline-items">
								<i :class="{'voted' : item.userDislike > 0 , '' :item.userDislike === 0}"
              						class="material-icons">sentiment_very_dissatisfied</i>
								<span>{{item.countDislike}}</span>
							</a>
							<a href="#" @click.prevent="favoriteControl(item.entryId,item.userFavorite)" class="post-add-icon inline-items">
									<i :class="{'voted' : item.userFavorite > 0 , '' :item.userFavorite === 0}"
              						class="material-icons">favorite</i>
					
									<span>{{item.countFav}}</span>
								</a>
							</div>
							
					
					<div style="float: right; margin-bottom: 0;" class="post__author author vcard inline-items">
							<img :src="'assets/profile_pics/' + item.createdEntryUserImg" alt="author">
					
							<div class="author-date">
								<a class="h6 post__author-name fn" @click.prevent="goProfilePage(item.createdEntryUserId, item.createdEntryUserName, item.createdEntryUser, item.createdEntryUserImg, 'yazar')" href="#">{{item.createdEntryUser}}</a>
								<div style="margin-right: 20px;" class="post__date">
									<time class="published" datetime="2004-07-24T18:18">
										{{item.createdEntryTime}}
									</time>
								</div>
								<div style="float: right; margin-top: -20px; margin-right: 0 !important;" class="more"><svg class="olymp-three-dots-icon"><use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg>
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

			<a id="load-more-button" v-if="(timeLine.length > 0)" @click.prevent="addPgCounter()" href="#" class="btn btn-control btn-more" data-load-link="items-to-load.html" data-container="newsfeed-items-grid"><svg class="olymp-three-dots-icon"><use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use></svg></a>

		</main>
</template>


<script>
import { APIService } from "../APIService";
const apiService = new APIService();

export default {
  name: "timeLine",
  components: {},
  data() {
	  return {
      timeLine:[],
      arrangedTimeLine:[],
      pg:1,
      test:[]
	  }

  },
  methods: {
	  getTimeLine(){
			apiService.getMainFlow(this.$cookies.get('user').id,this.pg).then(data => {
         //
         if(data == "0") 
         {
           this.timeLine = {};
         }
         else{
            this.timeLine= data;  
         }
        console.log("veri:" + data);
        //this.mytest();
    	});
	  },
		repostControl(entryId, userRepost) {
      let item = {
        id: entryId,
        userName: this.$cookies.get('user').userName
      };

      if (userRepost > 0) {
        apiService.unrepostService(item).then(data => {
          if (data.data === "deleted") {
						this.getTimeLine();
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
						this.getTimeLine();
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
	likeControl(entryId, userLike) {
      let item = {
          id: entryId,//entry id
          userName: this.$cookies.get('user').userName
      };

      if (userLike > 0) {
        apiService.unlikeService(item).then(data => {
          if (data.data === "deleted") {
			  		this.getTimeLine();
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
						this.getTimeLine();
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
	dislikeControl(entryId, userDislike) {
      let item = {
        id: entryId,
        userName: this.$cookies.get('user').userName
      };

      if (userDislike > 0) {
        apiService.undislikeService(item).then(data => {
          if (data.data === "deleted") {
						this.getTimeLine();
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
						this.getTimeLine();
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
						this.getTimeLine();
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
						this.getTimeLine();
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
		  this.getTimeLine();
    },
    loadTimeLine(){
      this.pg = 1;
      this.getTimeLine();
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
  },
  mytest(){//test için yazıldı sonra silinecek
    //new Date(year, month, date, hours, minutes, seconds, ms) 21.1.2019 12:32
 
/*
    let abc = this.timeLine;
    this.timeLine.forEach(function (value, key) {
     console.log(value.entry);
     console.log(value.eventTime);
        //let dateAndHour = value.eventTime.split(' ');
        //let date = dateAndHour[0].split('.');//0->gün, 1 ay, 2 yıl
        //let hour = dateAndHour[1].split(':'); //2019-01-21T12:35:20.403000000Z
     //console.log(new Date('2019-01-21T12:35:20.403000000Z'));
      //this.arrangedTimeLine.push();//this.sehirler.filter(x=>x.hasRelUserId === value.hasRelUserId && x.entryId === value.entryId) .find(y=> y.eventTime)
      //.find(y=> Math.max(new Date(y.eventTime)))
      //console.log(abc.filter(x=>x.hasRelUserId === value.hasRelUserId && x.entryId === value.entryId));
      console.log(abc.filter(x=>x.hasRelUserId === value.hasRelUserId && x.entryId === value.entryId).find(y=> Math.max()));


    });*/
  },
  goProfilePage(userId, userName, name, profile_pics,rank){
      
     let userType = userId ==  this.$cookies.get('user').id ? 1 : 2;
				this.$store.dispatch('setProfile', { userId: userId, userName: userName, name:name, profile_pics:profile_pics, rank:rank, type : userType});
				this.$router.push({name: 'profil-entry'});
		}
  },
  created(){

    
  },
  mounted(){
    this.loadTimeLine();
  }

};
</script>
