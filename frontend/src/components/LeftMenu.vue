<template>
  <aside style=" text-align: left;">
    <div class="ui-block">
      <div class="friend-item">
        <div class="friend-item-content">
          <div class="friend-avatar">
            <div class="author-thumb">
              <router-link to="/profil/">
                <img @click="goProfile"
                  width="100"
                  :src="'assets/profile_pics/' + this.$cookies.get('user').profile_pics"
                  alt="author"
                >
              </router-link>
            </div>
            <div class="author-content">
              <router-link to="/profil/" class="h5 author-name">{{this.$cookies.get('user').name}}</router-link>
              <div class="country">{{this.$cookies.get('user').userName}}</div>
            </div>
          </div>

          <div class="swiper-container" data-slide="fade">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="friend-count" data-swiper-parallax="-500">
                  <a href="#" class="friend-count-item">
                    <div class="h6">{{statistics.followed}}</div>
                    <div class="title">
                      <i title="Takip Edilen" class="material-icons">contacts</i>
                    </div>
                  </a>
                  <a href="#" class="friend-count-item">
                    <div class="h6">{{statistics.follower}}</div>
                    <div class="title">
                      <i title="Takipçiler" class="material-icons">local_library</i>
                    </div>
                  </a>
                  <a href="#" class="friend-count-item" style="color:#f44336">
                    <div class="h6">{{statistics.fav}}</div>
                    <div class="title">
                      <i title="Beğeniler" class="material-icons">favorite</i>
                    </div>
                  </a>
                </div>
                <div class="friend-since" data-swiper-parallax="-100">
                  <span>Bakimbi Rütbesi:</span>
                  <div class="h6">{{this.$cookies.get('user').rank}}</div>
                </div>
              </div>
            </div>
            <!-- If we need pagination -->
          </div>
        </div>
      </div>
    </div>

    <div class="ui-block">
      <div class="ui-block-title">
        <h6 class="title">Neler Oluyor ?</h6>
        <a href="#" @click="getLeftData()" class="more">
          <i title="Yenile" class="material-icons">refresh</i>
        </a>
      </div>
      <ul class="list-group" style="overflow-y: auto; overflow-x: hidden; height: 750px;">
        <li
          @click="getCurrentLeftData(item.id, item.COUNT)"
          class="listem-eleman d-flex justify-content-between align-items-center"
          style="padding-top:3px; padding-bottom:4px;"
          v-for="item in leftData"
        >
          <router-link to="/TitlePage">{{item.text}}</router-link>
          <a href>
            <span class="badge badge-primary badge-pill">{{item.COUNT}}</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>


<script>
import { APIService } from "../APIService";
const apiService = new APIService();

export default {
  name: "leftMenu",
  components: {},
  data() {
    return {
      leftData: [],
      currentLeftData: {},
      statistics:{}
    };
  },
  methods: {
    getLeftData() {
      apiService.getLeftData().then(data => {
        this.leftData = data;
      });
    },
    getCurrentLeftData(titleId, entryCount) {
      apiService.setCurrentTitle(titleId).then(currentTitleData => {
        let pageNum = 1;
        apiService
          .setTitleComments(titleId, this.$cookies.get("user").id, pageNum)
          .then(titleCommentsData => {
            this.$store.dispatch("setCurrentTitle", {
              currentTitleData: currentTitleData,
              titleCommentsData: titleCommentsData,
              entryCount: entryCount
            });
          });
      });
		},
		goProfile(){
			 this.$store.dispatch('setProfile', { userId: this.$cookies.get('user').id, userName: this.$cookies.get('user').userName, name:this.$cookies.get('user').name, profile_pics:this.$cookies.get('user').profile_pics, rank:this.$cookies.get('user').rank, type : 1});
    },
    getSummaryStatistics(){
      apiService.getSummaryStatistics(this.$cookies.get('user').id).then(data => {

        if(data == "0"){
         this.statistics = {};
        }
        else{
          this.statistics = data;
        }
        console.log("iss "+data);
      });
    }
  },
  created() {
    
  },
  mounted() {
    this.getLeftData();
    this.getSummaryStatistics();
  }
};
</script>