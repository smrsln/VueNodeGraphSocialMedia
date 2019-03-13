<template>
  <div>
    <div style="top: 110px;" class="container fixed-top">
      <div class="row">
        <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div class="ui-block">
            <div class="top-header">
              <div class="profile-section">
                <div class="row">
                  <div class="col col-lg-5 col-md-5 col-sm-12 col-12">
                    <ul class="profile-menu">
                      <li>
                        <a href="#" @click.prevent="scrollPersonalInformation">Profil Ayarları</a>
                      </li>
                      <li>
                        <a href="#" @click.prevent="scrollHobbiesAndInterests">Hobiler ve İlgi Alanları</a>
                      </li>
                    </ul>
                  </div>
                  <div class="col col-lg-5 ml-auto col-md-5 col-sm-12 col-12">
                    <ul class="profile-menu">
                      <li>
                        <a
                          href="#"
                          data-toggle="modal"
                          data-target="#update-header-photo"
                        >Profil Fotoğrafı</a>
                      </li>
                      <li>
                        <a href="#">Şifre Değiştir</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="top-header-author">
                <a href="#" class="author-thumb">
                  <img
                    :src="'/assets/profile_pics/'+ this.$cookies.get('user').profile_pics"
                    alt="author"
                  >assets/profile_pics/orhan_reis.jpg
                </a>
                <div class="author-content">
                  <a href="02-ProfilePage.html" class="h4 author-name">Poyraz Karayel</a>
                  <div class="country">Çaylak</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="header-spacer"></div>
    <div class="container" id="idPersonalInformation">
      <div class="row">
        <div
          class="col col-xl-12 order-xl-2 col-lg-12 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12"
        >
          <div class="ui-block">
            <div class="ui-block-title">
              <h6 class="title">Kişisel Bilgiler</h6>
            </div>
            <div class="ui-block-content">
              <!-- Personal Information Form  -->
              <form>
                <div class="row">
                  <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <div class="form-group label-floating">
                      <label class="control-label">Kullanıcı Adınız</label>
                      <input
                        class="form-control"
                        placeholder
                        type="text"
                        value="Poyraz"
                        v-model="personalInformation.userName"
                      >
                    </div>
                    <div class="form-group label-floating">
                      <label class="control-label">Email</label>
                      <input
                        class="form-control"
                        placeholder
                        type="email"
                        value="poyrazkarayel@abcdmail.com"
                        v-model="personalInformation.email"
                      >
                    </div>
                  </div>
                  <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <div class="form-group label-floating">
                      <label class="control-label">Yaşadığınız Şehir</label>
                      <input
                        class="form-control"
                        placeholder
                        type="text"
                        value="Ankara"
                        v-model="personalInformation.livingCity"
                      >
                    </div>
                    <div class="form-group date-time-picker label-floating">
                      <label class="control-label">Doğum Tarihiniz</label>
                      <input name="datetimepicker" v-model="personalInformation.dateOfBirth">
                      <span class="input-group-addon">
                        <svg class="olymp-month-calendar-icon icon">
                          <use
                            xlink:href="assets/svg-icons/sprites/icons.svg#olymp-month-calendar-icon"
                          ></use>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <div class="form-group label-floating">
                      <label class="control-label">Hakkınızda Kısa Açıklama</label>
                      <textarea
                        class="form-control"
                        placeholder
                        v-model="personalInformation.aboutYou"
                      >Mehaba, ben Poyraz 36 yaşındayım...</textarea>
                    </div>
                  </div>
                  <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <div class="form-group label-floating is-select">
                      <label class="control-label">Cinsiyet</label>
                      <select
                        class="selectpicker form-control"
                        v-model="personalInformation.gender"
                      >
                        <option value="MA">Erkek</option>
                        <option value="FE">Kadın</option>
                      </select>
                    </div>
                  </div>
                  <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="form-group with-icon label-floating">
                      <label class="control-label">Facebook Hesabınız</label>
                      <input
                        class="form-control"
                        type="text"
                        value="www.facebook.com/"
                        v-model="personalInformation.accountOfFacebook"
                      >
                      <i class="fab fa-facebook-f c-facebook" aria-hidden="true"></i>
                    </div>
                    <div class="form-group with-icon label-floating">
                      <label class="control-label">Twitter Hesabınız</label>
                      <input
                        class="form-control"
                        type="text"
                        value="www.twitter.com/"
                        v-model="personalInformation.accountOfTwitter"
                      >
                      <i class="fab fa-twitter c-twitter" aria-hidden="true"></i>
                    </div>
                    <div class="form-group with-icon label-floating">
                      <label class="control-label">Youtube Kanalınız</label>
                      <input
                        class="form-control"
                        type="text"
                        value="www.youtube.com/"
                        v-model="personalInformation.accountOfYoutube"
                      >
                      <i style="color: red;" class="fab fa-youtube c-youtube" aria-hidden="true"></i>
                    </div>
                    <div class="form-group with-icon label-floating">
                      <label class="control-label">Instagram Hesabınz</label>
                      <input
                        class="form-control"
                        type="text"
                        value="www.instagram.com/"
                        v-model="personalInformation.accountOfInstagram"
                      >
                      <i
                        style="color: purple;"
                        class="fab fa-instagram c-instagram"
                        aria-hidden="true"
                      ></i>
                    </div>
                    <div class="form-group with-icon label-floating">
                      <label class="control-label">Spotify Hesabınız</label>
                      <input
                        class="form-control"
                        type="text"
                        value="www.spotify.com/"
                        v-model="personalInformation.accountOfSpotify"
                      >
                      <i class="fab fa-spotify c-spotify" aria-hidden="true"></i>
                    </div>
                  </div>
                  <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <button class="btn btn-secondary btn-lg full-width" @click.prevent="">İptal</button>
                  </div>
                  <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <button
                      class="btn btn-primary btn-lg full-width"
                      @click.prevent="setPersonalInformation()"
                    >Tüm Değişiklikleri Kaydet</button>
                  </div>
                </div>
              </form>

              <!-- ... end Personal Information Form  -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container" id="idHobbiesAndInterests">
      <div class="row">
        <div
          class="col col-xl-12 order-xl-2 col-lg-12 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12"
        >
          <div class="ui-block">
            <div class="ui-block-title">
              <h6 class="title">Hobiler ve İlgi Alanları</h6>
            </div>
            <div class="ui-block-content">
              <!-- Form Hobbies and Interests -->
              <form>
                <div class="row">
                  <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <div class="form-group label-floating">
                      <label class="control-label">Hobiler</label>
                      <textarea
                        class="form-control"
                        placeholder
                        v-model="hobbiesAndInterests.hobbies"
                      ></textarea>
                    </div>
                    <div class="form-group label-floating">
                      <label class="control-label">Favori Diziler</label>
                      <textarea
                        class="form-control"
                        placeholder
                        v-model="hobbiesAndInterests.favoriteSeries"
                      ></textarea>
                    </div>
                    <div class="form-group label-floating">
                      <label class="control-label">Favori Filmler</label>
                      <textarea
                        class="form-control"
                        placeholder
                        v-model="hobbiesAndInterests.favoriteFilms"
                      ></textarea>
                    </div>
                    <div class="form-group label-floating">
                      <label class="control-label">Favori Oyunlar</label>
                      <textarea
                        class="form-control"
                        placeholder
                        v-model="hobbiesAndInterests.favoriteGames"
                      ></textarea>
                    </div>
                    <button class="btn btn-secondary btn-lg full-width" @click.prevent="">İptal</button>
                  </div>

                  <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <div class="form-group label-floating">
                      <label class="control-label">Favori Sanatçılar</label>
                      <textarea
                        class="form-control"
                        placeholder
                        v-model="hobbiesAndInterests.favoriteArtists"
                      ></textarea>
                    </div>
                    <div class="form-group label-floating">
                      <label class="control-label">Favori Kitaplar</label>
                      <textarea
                        class="form-control"
                        placeholder
                        v-model="hobbiesAndInterests.favoriteBooks"
                      ></textarea>
                    </div>
                    <div class="form-group label-floating">
                      <label class="control-label">Favori Yazarlar</label>
                      <textarea
                        class="form-control"
                        placeholder
                        v-model="hobbiesAndInterests.favoriteWritings"
                      ></textarea>
                    </div>
                    <div class="form-group label-floating">
                      <label class="control-label">Diğer İlgi Alanları</label>
                      <textarea
                        class="form-control"
                        placeholder
                        v-model="hobbiesAndInterests.otherInterests"
                      ></textarea>
                    </div>

                    <button
                      class="btn btn-primary btn-lg full-width"
                      @click.prevent="setHobbiesAndInterests"
                    >Tüm Değişiklikleri Kaydet</button>
                  </div>
                </div>
              </form>

              <!-- ... end Form Hobbies and Interests -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div
          class="col col-xl-12 order-xl-2 col-lg-12 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12"
        >
          <div class="ui-block">
            <div class="ui-block-title">
              <h6 class="title">Şifre Değiştir</h6>
            </div>
            <div class="ui-block-content">
              <!-- Change Password Form -->
              <form>
                <div class="row">
                  <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="form-group label-floating">
                      <label class="control-label">Mevcut Şifreyi Onayla</label>
                      <input class="form-control" placeholder type="password" value="Olympus-2017">
                    </div>
                  </div>

                  <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <div class="form-group label-floating is-empty">
                      <label class="control-label">Yeni Şifreniz</label>
                      <input class="form-control" placeholder type="password">
                    </div>
                  </div>
                  <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
                    <div class="form-group label-floating is-empty">
                      <label class="control-label">Yeni Şifreyi Onayla</label>
                      <input class="form-control" placeholder type="password">
                    </div>
                  </div>

                  <div class="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <button class="btn btn-primary btn-lg full-width">Şifreyi Değiştir</button>
                  </div>
                </div>
              </form>

              <!-- ... end Change Password Form -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="update-header-photo"
      tabindex="-1"
      role="dialog"
      aria-labelledby="update-header-photo"
      aria-hidden="true"
    >
      <div class="modal-dialog window-popup update-header-photo" role="document">
        <div class="modal-content">
          <a href="#" class="close icon-close" data-dismiss="modal" aria-label="Close">
            <svg class="olymp-close-icon">
              <use xlink:href="assets/svg-icons/sprites/icons.svg#olymp-close-icon"></use>
            </svg>
          </a>

          <div class="modal-header">
            <h6 class="title">Fotoğraf Yükle</h6>
          </div>

          <div class="modal-body">
            <a href="#" class="upload-photo-item">
              <svg class="olymp-computer-icon">
                <use xlink:href="assets/svg-icons/sprites/icons.svg#olymp-computer-icon"></use>
              </svg>
              
              <span>Browse your computer.</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Window-popup-CHAT for responsive min-width: 768px -->
    <div
      class="ui-block popup-chat popup-chat-responsive"
      tabindex="-1"
      role="dialog"
      aria-labelledby="update-header-photo"
      aria-hidden="true"
    >
      <div class="modal-content">
        <div class="modal-header">
          <span class="icon-status online"></span>
          <h6 class="title">Chat</h6>
          <div class="more">
            <svg class="olymp-three-dots-icon">
              <use xlink:href="svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
            </svg>
            <svg class="olymp-little-delete js-chat-open">
              <use xlink:href="assets/svg-icons/sprites/icons.svg#olymp-little-delete"></use>
            </svg>
          </div>
        </div>
        <div class="modal-body">
          <div class="mCustomScrollbar">
            <ul class="notification-list chat-message chat-message-field">
              <li>
                <div class="author-thumb">
                  <img src="assets/img/avatar14-sm.jpg" alt="author" class="mCS_img_loaded">
                </div>
                <div class="notification-event">
                  <span
                    class="chat-message-item"
                  >Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks</span>
                  <span class="notification-date">
                    <time class="entry-date updated" datetime="2004-07-24T18:18">Yesterday at 8:10pm</time>
                  </span>
                </div>
              </li>

              <li>
                <div class="author-thumb">
                  <img src="assets/img/author-page.jpg" alt="author" class="mCS_img_loaded">
                </div>
                <div class="notification-event">
                  <span class="chat-message-item">Don’t worry Mathilda!</span>
                  <span class="chat-message-item">I already bought everything</span>
                  <span class="notification-date">
                    <time class="entry-date updated" datetime="2004-07-24T18:18">Yesterday at 8:29pm</time>
                  </span>
                </div>
              </li>

              <li>
                <div class="author-thumb">
                  <img src="assets/img/avatar14-sm.jpg" alt="author" class="mCS_img_loaded">
                </div>
                <div class="notification-event">
                  <span
                    class="chat-message-item"
                  >Hi James! Please remember to buy the food for tomorrow! I’m gonna be handling the gifts and Jake’s gonna get the drinks</span>
                  <span class="notification-date">
                    <time class="entry-date updated" datetime="2004-07-24T18:18">Yesterday at 8:10pm</time>
                  </span>
                </div>
              </li>
            </ul>
          </div>

          <form class="need-validation">
            <div class="form-group label-floating is-empty">
              <label class="control-label">Press enter to post...</label>
              <textarea class="form-control" placeholder></textarea>
              <div class="add-options-message">
                <a href="#" class="options-message">
                  <svg class="olymp-computer-icon">
                    <use xlink:href="assets/svg-icons/sprites/icons.svg#olymp-computer-icon"></use>
                  </svg>
                </a>
                <div class="options-message smile-block">
                  <svg class="olymp-happy-sticker-icon">
                    <use xlink:href="assets/svg-icons/sprites/icons.svg#olymp-happy-sticker-icon"></use>
                  </svg>

                  <ul class="more-dropdown more-with-triangle triangle-bottom-right">
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat1.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat2.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat3.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat4.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat5.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat6.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat7.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat8.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat9.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat10.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat11.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat12.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat13.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat14.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat15.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat16.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat17.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat18.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat19.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat20.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat21.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat22.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat23.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat24.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat25.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat26.png" alt="icon">
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="assets/img/icon-chat27.png" alt="icon">
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- ... end Window-popup-CHAT for responsive min-width: 768px -->
    <a class="back-to-top" href="#">
      <img src="assets/svg-icons/back-to-top.svg" alt="arrow" class="back-icon">
    </a>

    <!-- Window-popup Update Header Photo -->
    <!-- ... end Window-popup Update Header Photo -->
  </div>
</template>
<script>
import { APIService } from "../APIService";
const apiService = new APIService();
export default {
  name: "profile-settings",
  components: {},
  data() {
    return {
      personalInformation: {
        userId: this.$cookies.get("user").id,
        userName: "",
        livingCity: "",
        email: "",
        dateOfBirth: new Date("10/24/1984").toLocaleDateString("en-US"),
        aboutYou: "",
        gender: "MA",
        accountOfFacebook: "",
        accountOfTwitter: "",
        accountOfYoutube: "",
        accountOfInstagram: "",
        accountOfSpotify: ""
      },
      hobbiesAndInterests: {
        userId: this.$cookies.get("user").id,
        hobbies: "",
        favoriteArtists: "",
        favoriteSeries: "",
        favoriteBooks: "",
        favoriteFilms: "",
        favoriteWritings: "",
        favoriteGames: "",
        otherInterests: ""
      }
    };
  },
  methods: {
    setPersonalInformation() {
      //alert(this.personalInformation.userId);
      apiService.setPersonalInformation(this.personalInformation).then(data => {
        console.log(data);
        this.getPersonalInformation();
      });
    },
    getPersonalInformation() {
      apiService
        .getPersonalInformation(this.$cookies.get("user").id)
        .then(data => {
          console.log(data);
          this.personalInformation = data;
        });
    },
    getHobbiesAndInterests() {
      apiService
        .getHobbiesAndInterests(this.$cookies.get("user").id)
        .then(data => {
          console.log(data);
          this.hobbiesAndInterests = data;
        });
    },
    setHobbiesAndInterests() {
      apiService.setHobbiesAndInterests(this.hobbiesAndInterests).then(data => {
        console.log(data);
        this.getHobbiesAndInterests();
      });
    },
    scrollPersonalInformation() {
      $("html, body").animate(
        {
          scrollTop: $("#idPersonalInformation").offset().top - 250
        },
        500
      );
    },
    scrollHobbiesAndInterests() {
      $("html, body").animate(
        {
          scrollTop: $("#idHobbiesAndInterests").offset().top -250
        },
        500
      );
    }
  },
  created() {},
  mounted() {
    this.getPersonalInformation();
    this.getHobbiesAndInterests();
  }
};
</script>


