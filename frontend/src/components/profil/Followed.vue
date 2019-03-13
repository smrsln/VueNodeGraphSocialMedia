<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="ui-block responsive-flex">
            <div class="ui-block-title">
              <div
                class="h6 title"
                style="float:left"
              >Tayfam ({{ !(data.length > 0) ? 0 : data.length}})</div>
              <form class="w-search">
                <div class="form-group with-button">
                  <input class="form-control" type="text" placeholder="Ara...">
                  <button @click.prevent>
                    <svg class="olymp-magnifying-glass-icon">
                      <use
                        xlink:href="../../assets/svg-icons/sprites/icons.svg#olymp-magnifying-glass-icon"
                      ></use>
                    </svg>
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
      <div
        class="alert alert-secondary"
        style=" text-align: center;"
        v-if="!(data.length > 0)"
        role="alert"
      >Takip ettiğiniz kimse yok!</div>
      <div class="row">
        <div v-for="item in data" class="col col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
          <div class="ui-block">
            <!-- Friend Item -->
            <div class="friend-item">
              <div class="friend-item-content">
                <div class="more yukari">
                  <svg class="olymp-three-dots-icon">
                    <use
                      xlink:href="../../assets/svg-icons/sprites/icons.svg#olymp-three-dots-icon"
                    ></use>
                  </svg>
                  <ul class="more-dropdown">
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
                <div class="friend-avatar" style="margin-bottom:0px;">
                  <div class="author-thumb">
                    <img
                      style="width:100px; height:100px;"
                      :src="'../../assets/profile_pics/' + item.userProfilePics"
                      alt="author"
                    >
                  </div>
                  <div class="author-content">
                    <a href="#" class="h5 author-name">{{item.name}}</a>
                    <div class="country">{{item.userName}}</div>
                    <div class="country">{{item.userRank}}</div>
                    <div v-if="item.userId != adminUserId">
                      <div v-if="item.isYourFriend == 1" class="country mt-3">
                        <button
                          style="background-color:green;"
                          @click.prevent="followControl(item.userId,item.isYourFriend)"
                          type="button"
                          class="btn btn-sm"
                        >
                          <span style=" position: relative; margin-bottom: 0;">
                            <i style="font-size: 13px;" class="material-icons">check_circle</i>
                          </span>
                          Takip Edildi
                        </button>
                      </div>

                      <div v-else class="country mt-3">
                        <button
                          @click.prevent="followControl(item.userId,item.isYourFriend)"
                          type="button"
                          class="btn btn-primary btn-sm"
                        >
                          <span style=" position: relative; margin-bottom: 0;">
                            <i style="font-size: 13px;" class="material-icons">person_add</i>
                          </span>
                          Takip Et
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="swiper-container" data-slide="fade">
                  <div class="swiper-wrapper">
                    <div class="swiper-slide">
                      <div class="friend-count" data-swiper-parallax="-500">
                        <a href="#" class="friend-count-item">
                          <div class="h6">{{item.createdEntry}}</div>
                          <div class="title">
                            <i title="Entry" class="material-icons">record_voice_over</i>
                          </div>
                        </a>
                        <a href="#" class="friend-count-item">
                          <div class="h6">{{item.followedUser}}</div>
                          <div class="title">
                            <i title="Takip Edilen" class="material-icons">contacts</i>
                          </div>
                        </a>
                        <a href="#" class="friend-count-item">
                          <div class="h6">{{item.followerUser}}</div>
                          <div class="title">
                            <i title="Takipçiler" class="material-icons">local_library</i>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <!-- If we need pagination -->
                </div>
              </div>
            </div>

            <!-- ... end Friend Item -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { APIService } from "../../APIService";
const apiService = new APIService();

export default {
  name: "profile-followed",
  data() {
    return {
      data: []
    };
  },
  methods: {
    getFollowed(userid) {
      //console.log(userid);
      apiService
        .followedService(userid, this.$cookies.get("user").id)
        .then(data => {
          if (data == "0") {
            this.data = {};
          } else {
            this.data = data;
          }
          return this.data;
        })
        .catch(hata => {
          console.log(hata);
        });
    },
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
            this.getFollowed(this.profilUserId);
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
            this.getFollowed(this.profilUserId);
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
    }
  },
  created() {},
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
    profilUserType() {
      return this.$store.getters.profilUserType;
    },
    adminUserId(){
      return  this.$cookies.get('user').id;
    }
  },
  mounted() {
    this.getFollowed(this.profilUserId); //this.$cookies.get('user').id)
  }
};
</script>
