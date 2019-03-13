<template>
  <div>
    <div class="container">
      <div class="row">
        <div
          class="col col-xl-8 order-xl-2 col-lg-8 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12"
        >
          <div class="ui-block">
            <div class="ui-block-title">
              <h6 class="title">Hobiler ve İlgi Alanları</h6>
            </div>
            <div class="ui-block-content" style=" text-align: left;">
              <div class="row">
                <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
                  <!-- W-Personal-Info -->
                  <ul class="widget w-personal-info item-block">
                    <li>
                      <span class="title">Hobiler:</span>
                      <span class="text">{{data.hobbies}}</span>
                    </li>
                    <li>
                      <span class="title">Favori Diziler:</span>
                      <span class="text">{{data.favoriteSeries}}</span>
                    </li>
                    <li>
                      <span class="title">Favori Filmler:</span>
                      <span class="text">{{data.favoriteFilms}}</span>
                    </li>
                    <li>
                      <span class="title">Favori Oyunlar:</span>
                      <span class="text">{{data.favoriteGames}}</span>
                    </li>
                  </ul>

                  <!-- ... end W-Personal-Info -->
                </div>
                <div class="col col-lg-6 col-md-6 col-sm-12 col-12">
                  <!-- W-Personal-Info -->
                  <ul class="widget w-personal-info item-block">
                    <li>
                      <span class="title">Favori Sanatçılar:</span>
                      <span class="text">{{data.favoriteArtists}}</span>
                    </li>
                    <li>
                      <span class="title">Favori Kitaplar:</span>
                      <span class="text">{{data.favoriteBooks}}</span>
                    </li>
                    <li>
                      <span class="title">Favori Yazarlar:</span>
                      <span class="text">{{data.favoriteWritings}}</span>
                    </li>
                    <li>
                      <span class="title">Diğer İlgi Alanları:</span>
                      <span class="text">{{data.otherInterests}}</span>
                    </li>
                  </ul>

                  <!-- ... end W-Personal-Info -->
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="col col-xl-4 order-xl-1 col-lg-4 order-lg-1 col-md-12 order-md-2 col-sm-12 col-12"
          style=" text-align: left;"
        >
          <div class="ui-block">
            <div class="ui-block-title">
              <h6 class="title">Hakkımda</h6>
            </div>
            <div class="ui-block-content">
              <!-- W-Personal-Info -->
              <ul class="widget w-personal-info">
                <li>
                  <span class="title">Hakkımda:</span>
                  <span class="text">{{data.aboutYou}}</span>
                </li>
                <li>
                  <span class="title">Doğum Tarihi:</span>
                  <span class="text">{{data.dateOfBirth}}</span>
                </li>
                <li>
                  <span class="title">Yaşadığı Yer:</span>
                  <span class="text">{{data.livingCity}}</span>
                </li>
                <li>
                  <span class="title">Üyelik Tarihi:</span>
                  <span class="text">{{data.creatDate}}</span>
                </li>
                <li>
                  <span class="title">Bakimbi Rütbesi:</span>
                  <span class="text">{{this.$cookies.get('user').rank}}</span>
                </li>
              </ul>

              <!-- ... end W-Personal-Info -->
              <!-- W-Socials -->
              <div class="widget w-socials">
                <h6 class="title">Diğer Sosyal Medya Hesaplarım:</h6>
                <a href="#" class="social-item bg-facebook">
                  <i class="fab fa-facebook-f" aria-hidden="true"></i>
                  Facebook
                </a>
                <a href="#" class="social-item bg-twitter">
                  <i class="fab fa-twitter" aria-hidden="true"></i>
                  Twitter
                </a>
              </div>

              <!-- ... end W-Socials -->
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
  name: "profile-info",
  components: {},
  data() {
    return {
      data: {}
    };
  },
  methods: {
    getAbout(userId) {
      apiService
        .personalInformation(userId)
        .then(data => {
          if (data == "0") {
            this.data = {};
          } else {
            this.data = data[0];
            console.log("about : ");
            console.log(data);
          }

          return this.data;
        })
        .catch(hata => {
          console.log(hata);
        });
    }
  },
  created() {
    //console.log(this.$store.state.user.id);
    //this.getAbout(this.$cookies.get("user").id);
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
    profilUserType() {
      return this.$store.getters.profilUserType;
    },
    adminUserId() {
      return this.$cookies.get("user").id;
    }
  },
  mounted() {
    this.getAbout(this.profilUserId);
  }
};
</script>