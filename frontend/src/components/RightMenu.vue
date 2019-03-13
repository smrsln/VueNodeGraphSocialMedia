<template>
  <div style=" text-align: left;">
    <!-- Right Sidebar -->
    <aside>
      <div class="col-12">
        <div class="ui-block">
          <div class="ui-block-title">
            <h6 class="title">Arkadaş Önerileri</h6>        
			<a href="#" @click="getMutualFriend(userId)" class="more">
          <i title="Yenile" class="material-icons">refresh</i>
        </a>
          </div>

          <!-- W-Activity-Feed -->
		<a href="#" class="badge badge-primary" style="float:left; margin-left:23%; margin-top:4%;" v-if="!(newData.length > 0)">Arkadaşlık öneriniz bulunmamaktadır.</a>
          <ul class="widget w-activity-feed notification-list" style="height:350px;">
            <li v-for="item in newData">
              <div class="author-thumb">
                <img :src="'../assets/profile_pics/' + item.profile_pics" alt="author">
              </div>
              <div class="notification-event">
                <a href="#" class="h6 notification-friend">{{item.name}}</a> -
                <a href="#" class="notification-link">{{item.userName}}</a>
                <span class="notification-date">{{item.totalMutualFriend}} adet ortak arkadaş</span>
              </div>
              <button style="float:right; margin-right:3%;" type="button" class="btn btn-primary" @click.prevent="followControl(item.advisedUserId)">Takip Et</button>
            </li>
          </ul>

          <!-- .. end W-Activity-Feed -->
        </div>
      </div>
      <div class="col-12">
        <div class="ui-block">
          <div class="ui-block-title">
            <h6 class="title">Haftanın ENtryleri</h6>
          </div>

          <!-- W-Friend-Pages-Added -->
          <ul class="widget w-friend-pages-added notification-list friend-requests">
            <li class="inline-items">
              <div class="author-thumb">
                <a href="#">
                  <img src="../assets/img/avatar41-sm.jpg" alt="author">
                </a>
              </div>
              <div class="notification-event">
                <a href="#" class="h6 notification-friend">Falanca Yazar</a>
                <span class="chat-message-item">
                  <a href="#">Harika bir görsel...</a>
                </span>
              </div>
            </li>

            <li class="inline-items">
              <div class="author-thumb">
                <a href="#">
                  <img src="../assets/img/avatar42-sm.jpg" alt="author">
                </a>
              </div>
              <div class="notification-event">
                <a href="#" class="h6 notification-friend">Top Rock</a>
                <span class="chat-message-item">
                  <a href="#">Mettalica konserinden...</a>
                </span>
              </div>
            </li>

            <li class="inline-items">
              <div class="author-thumb">
                <a href="#">
                  <img src="../assets/img/avatar43-sm.jpg" alt="author">
                </a>
              </div>
              <div class="notification-event">
                <a href="#" class="h6 notification-friend">Voldemortun Burnu</a>
                <span class="chat-message-item">
                  <a href="#">Dumbledore en büyük bir...</a>
                </span>
              </div>
            </li>

            <li class="inline-items">
              <div class="author-thumb">
                <a href="#">
                  <img src="../assets/img/avatar44-sm.jpg" alt="author">
                </a>
              </div>
              <div class="notification-event">
                <a href="#" class="h6 notification-friend">Eminem</a>
                <span class="chat-message-item">
                  <a href="#">I can't tell you...</a>
                </span>
              </div>
            </li>

            <li class="inline-items">
              <div class="author-thumb">
                <a href="#">
                  <img src="../assets/img/avatar45-sm.jpg" alt="author">
                </a>
              </div>
              <div class="notification-event">
                <a href="#" class="h6 notification-friend">Chatlak Shanzel</a>
                <span class="chat-message-item">
                  <a href="#">Ankara'nın en güzel...</a>
                </span>
              </div>
            </li>

            <li class="inline-items">
              <div class="author-thumb">
                <a href="#">
                  <img src="../assets/img/avatar46-sm.jpg" alt="author">
                </a>
              </div>
              <div class="notification-event">
                <a href="#" class="h6 notification-friend">Shez Long</a>
                <span class="chat-message-item">
                  <a href="#">En tatil gibi tatil...</a>
                </span>
              </div>
            </li>
          </ul>

          <!-- .. end W-Friend-Pages-Added -->
        </div>
      </div>
    </aside>

    <div
      class="modal fade"
      id="choose-from-my-photo"
      tabindex="-1"
      role="dialog"
      aria-labelledby="choose-from-my-photo"
      aria-hidden="true"
    >
      <div class="modal-dialog window-popup choose-from-my-photo" role="document">
        <div class="modal-content">
          <a href="#" class="close icon-close" data-dismiss="modal" aria-label="Close">
            <svg class="olymp-close-icon">
              <use xlink:href="svg-icons/sprites/icons.svg#olymp-close-icon"></use>
            </svg>
          </a>
          <div class="modal-header">
            <h6 class="title">Choose from My Photos</h6>

            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  data-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-expanded="true"
                >
                  <svg class="olymp-photos-icon">
                    <use xlink:href="svg-icons/sprites/icons.svg#olymp-photos-icon"></use>
                  </svg>
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  data-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-expanded="false"
                >
                  <svg class="olymp-albums-icon">
                    <use xlink:href="svg-icons/sprites/icons.svg#olymp-albums-icon"></use>
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div class="modal-body">
            <!-- Tab panes -->
            <div class="tab-content">
              <div class="tab-pane active" id="home" role="tabpanel" aria-expanded="true">
                <div class="choose-photo-item" data-mh="choose-item">
                  <div class="radio">
                    <label class="custom-radio">
                      <img src="img/choose-photo1.jpg" alt="photo">
                      <input type="radio" name="optionsRadios">
                    </label>
                  </div>
                </div>
                <div class="choose-photo-item" data-mh="choose-item">
                  <div class="radio">
                    <label class="custom-radio">
                      <img src="img/choose-photo2.jpg" alt="photo">
                      <input type="radio" name="optionsRadios">
                    </label>
                  </div>
                </div>
                <div class="choose-photo-item" data-mh="choose-item">
                  <div class="radio">
                    <label class="custom-radio">
                      <img src="img/choose-photo3.jpg" alt="photo">
                      <input type="radio" name="optionsRadios">
                    </label>
                  </div>
                </div>

                <div class="choose-photo-item" data-mh="choose-item">
                  <div class="radio">
                    <label class="custom-radio">
                      <img src="img/choose-photo4.jpg" alt="photo">
                      <input type="radio" name="optionsRadios">
                    </label>
                  </div>
                </div>
                <div class="choose-photo-item" data-mh="choose-item">
                  <div class="radio">
                    <label class="custom-radio">
                      <img src="img/choose-photo5.jpg" alt="photo">
                      <input type="radio" name="optionsRadios">
                    </label>
                  </div>
                </div>
                <div class="choose-photo-item" data-mh="choose-item">
                  <div class="radio">
                    <label class="custom-radio">
                      <img src="img/choose-photo6.jpg" alt="photo">
                      <input type="radio" name="optionsRadios">
                    </label>
                  </div>
                </div>

                <div class="choose-photo-item" data-mh="choose-item">
                  <div class="radio">
                    <label class="custom-radio">
                      <img src="img/choose-photo7.jpg" alt="photo">
                      <input type="radio" name="optionsRadios">
                    </label>
                  </div>
                </div>
                <div class="choose-photo-item" data-mh="choose-item">
                  <div class="radio">
                    <label class="custom-radio">
                      <img src="img/choose-photo8.jpg" alt="photo">
                      <input type="radio" name="optionsRadios">
                    </label>
                  </div>
                </div>
                <div class="choose-photo-item" data-mh="choose-item">
                  <div class="radio">
                    <label class="custom-radio">
                      <img src="img/choose-photo9.jpg" alt="photo">
                      <input type="radio" name="optionsRadios">
                    </label>
                  </div>
                </div>

                <a href="#" class="btn btn-secondary btn-lg btn--half-width">Vazgeç</a>
                <a href="#" class="btn btn-primary btn-lg btn--half-width">Confirm Photo</a>
              </div>
              <div class="tab-pane" id="profile" role="tabpanel" aria-expanded="false">
                <div class="choose-photo-item" data-mh="choose-item">
                  <figure>
                    <img src="img/choose-photo10.jpg" alt="photo">
                    <figcaption>
                      <a href="#">South America Vacations</a>
                      <span>Last Added: 2 hours ago</span>
                    </figcaption>
                  </figure>
                </div>
                <div class="choose-photo-item" data-mh="choose-item">
                  <figure>
                    <img src="img/choose-photo11.jpg" alt="photo">
                    <figcaption>
                      <a href="#">Photoshoot Summer 2016</a>
                      <span>Last Added: 5 weeks ago</span>
                    </figcaption>
                  </figure>
                </div>
                <div class="choose-photo-item" data-mh="choose-item">
                  <figure>
                    <img src="img/choose-photo12.jpg" alt="photo">
                    <figcaption>
                      <a href="#">Amazing Street Food</a>
                      <span>Last Added: 6 mins ago</span>
                    </figcaption>
                  </figure>
                </div>

                <div class="choose-photo-item" data-mh="choose-item">
                  <figure>
                    <img src="img/choose-photo13.jpg" alt="photo">
                    <figcaption>
                      <a href="#">Graffity & Street Art</a>
                      <span>Last Added: 16 hours ago</span>
                    </figcaption>
                  </figure>
                </div>
                <div class="choose-photo-item" data-mh="choose-item">
                  <figure>
                    <img src="img/choose-photo14.jpg" alt="photo">
                    <figcaption>
                      <a href="#">Amazing Landscapes</a>
                      <span>Last Added: 13 mins ago</span>
                    </figcaption>
                  </figure>
                </div>
                <div class="choose-photo-item" data-mh="choose-item">
                  <figure>
                    <img src="img/choose-photo15.jpg" alt="photo">
                    <figcaption>
                      <a href="#">The Majestic Canyon</a>
                      <span>Last Added: 57 mins ago</span>
                    </figcaption>
                  </figure>
                </div>

                <a href="#" class="btn btn-secondary btn-lg btn--half-width">Vazgeç</a>
                <a href="#" class="btn btn-primary btn-lg disabled btn--half-width">Confirm Photo</a>
              </div>
            </div>
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
  name: "right-menu",
  data() {
    return {
      data: []
    };
  },
  methods: {
    getMutualFriend(userid) {
      //console.log(userid);
      apiService
        .getMutualFriend(userid)
        .then(data => {
          if (data == "0") {
            this.data = {};
          } else {
            this.data = data;
          }
          console.log(data);
          return this.data;
        })
        .catch(hata => {
          console.log(hata);
        });
    },
    followControl(followedid) {
      let item = {
        followedid: followedid,
        userName: this.$cookies.get("user").userName
      };

      apiService.followService(item).then(data => {
        if (data.data === "ok") {
          toastr.success("Takip İşlemi.", "Başarılı", {
            timeOut: 4000,
            positionClass: "toast-bottom-right"
          });
          this.getMutualFriend(this.userId);
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
  created() {},
  computed: {
    newData() {
      return this.data.filter(i => i.followedStatus == 0);
    },
    userId() {
      return this.$cookies.get("user").id;
    }
  },
  mounted() {
    this.getMutualFriend(this.userId); //this.$cookies.get('user').id)
  }
};
</script>
