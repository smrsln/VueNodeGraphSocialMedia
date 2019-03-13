<template>
  <div class="col col-xl-3 order-xl-3 col-lg-6 order-lg-3 col-md-6 col-sm-12 col-12">
    <div class="ui-block" data-mh="pie-chart" v-if="profilUserId != adminUserId">
      <div class="ui-block-title">
        <div>
          <div v-if="checkData_ == 1" class="country mt-3">
            <button
              style="background-color:green;"
              @click.prevent="followControl(profilUserId,checkData_)"
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
              @click.prevent="followControl(profilUserId,checkData_)"
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
    <div class="ui-block" data-mh="pie-chart">
      <div class="ui-block-title">
        <div class="h6 title">İstatistikler</div>
      </div>

      <div class="ui-block-content">
        <div class="monthly-indicator-wrap">
          <div class="monthly-indicator">
            <a href="#" class="btn btn-control bg-bakimbi">
              <i class="material-icons">record_voice_over</i>
            </a>

            <div class="monthly-count">
              {{values.entry}}
              <span class="period">Entry</span>
            </div>
          </div>

          <div class="monthly-indicator">
            <a href="#" class="btn btn-control bg-bakimbi">
              <i title="Takip Edilen" class="material-icons">contacts</i>
            </a>

            <div class="monthly-count">
              {{values.followed}}
              <span class="period">Takip Edilen</span>
            </div>
          </div>

          <div class="monthly-indicator">
            <a href="#" class="btn btn-control bg-bakimbi">
              <i title="Takipçiler" class="material-icons">local_library</i>
            </a>

            <div class="monthly-count">
              {{values.follower}}
              <span class="period">Takipçi</span>
            </div>
          </div>

          <div class="monthly-indicator">
            <a href="#" class="btn btn-control bg-bakimbi">
              <i title="Beğeniler" class="material-icons">favorite</i>
            </a>

            <div class="monthly-count">
              {{values.fav}}
              <span class="period">Beğendiklerin</span>
            </div>
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
  name: "profilStatistics",
  components: {},
  data() {
    return {
	  checkData: "",
	  values:"",
    };
  },
  methods: {
    isYourFriend() {
      if (this.profilUserId == this.adminUserId) {
        console.log("dene");
        return 0; //sıfır dönerse admin kullanıcısının profili
        //alert("Bu sensin");
      } else {
        apiService
          .checkFollow(this.adminUserId, this.profilUserId)
          .then(data => {
            console.log("abc - > " + data);
            if (data > 0) {
              this.checkData = 1;
              return 1;
            } else {
              this.checkData = 0;
              return 0;
            }
          });
      }
      //alert("Bu başkası");
    },
    followControl(profilUserId, followedStatus) {
      console.log(profilUserId + " - - " + followedStatus);
      let item = {
        followedid: profilUserId,
        userName: this.$cookies.get("user").userName
      };

      if (followedStatus > 0) {
        apiService.unfollowService(item).then(data => {
          if (data.data === "deleted") {
            toastr.success("Bağlantınız Silindi.", "Başarılı", {
              timeOut: 4000,
              positionClass: "toast-bottom-right"
            });
            this.isYourFriend();
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
            this.isYourFriend();
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
    getSummaryStatistics() {
      apiService
        .getSummaryStatistics(this.profilUserId)
        .then(data => {
          if (data == "0") {
            this.values = {};
          } else {
            this.values = data;
          }
          console.log("iss " + data);
        });
    }
  },
  created() {},
  mounted() {
	this.isYourFriend();
	this.getSummaryStatistics();
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
      return this.$store.getters.profilUserRank;
    },
    adminUserId() {
      return this.$cookies.get("user").id;
    },
    checkData_() {
      return this.checkData;
    }
  }
};
</script>
