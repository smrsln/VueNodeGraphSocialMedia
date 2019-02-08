<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col col-xl-8 order-xl-2 col-lg-8 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
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
                                            <span class="text">{{data.hobbies}}
                                                                </span>
                                        </li>
                                        <li>
                                            <span class="title">Favori Diziler:</span>
                                            <span class="text">{{data.tvSeries}}</span>
                                        </li>
                                        <li>
                                            <span class="title">Favori Filmler:</span>
                                            <span class="text">{{data.films}} </span>
                                        </li>
                                        <li>
                                            <span class="title">Favori Oyunlar:</span>
                                            <span class="text">{{data.games}} </span>
                                        </li>
                                    </ul>
                                    
                                    <!-- ... end W-Personal-Info -->
                                </div>
                                <div class="col col-lg-6 col-md-6 col-sm-12 col-12">

                                    
                                    <!-- W-Personal-Info -->
                                    
                                    <ul class="widget w-personal-info item-block">
                                        <li>
                                            <span class="title">Favori Sanatçılar:</span>
                                            <span class="text"> {{data.artists}}</span>
                                        </li>
                                        <li>
                                            <span class="title">Favori Kitaplar:</span>
                                            <span class="text">{{data.books}}</span>
                                        </li>
                                        <li>
                                            <span class="title">Favori Yazarlar:</span>
                                            <span class="text">{{data.writers}} </span>
                                        </li>
                                        <li>
                                            <span class="title">Diğer İlgi Alanları:</span>
                                            <span class="text">{{data.others}}</span>
                                        </li>
                                    </ul>
                                    
                                    <!-- ... end W-Personal-Info -->
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div class="col col-xl-4 order-xl-1 col-lg-4 order-lg-1 col-md-12 order-md-2 col-sm-12 col-12" style=" text-align: left;">
                    <div class="ui-block">
                        <div class="ui-block-title">
                            <h6 class="title">Hakkımda</h6>
                            
                        </div>
                        <div class="ui-block-content">

                            
                            <!-- W-Personal-Info -->
                            
                            <ul class="widget w-personal-info">
                                <li>
                                    <span class="title">Hakkımda:</span>
                                    <span class="text">{{data.about}}
                                                        </span>
                                </li>
                                <li>
                                    <span class="title">Doğum Tarihi:</span>
                                    <span class="text">{{data.b_day.day.low}}.{{data.b_day.month.low}}.{{data.b_day.year.low}}</span>
                                </li>
                                <li>
                                    <span class="title">Yaşadığı Yer:</span>
                                    <span class="text">{{data.location}}</span>
                                </li>
                                <li>
                                    <span class="title">Üyelik Tarihi:</span>
                                    <span class="text">{{data.createDate.day.low}}.{{data.createDate.month.low}}.{{data.createDate.year.low}}</span>
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
    name:"profile-info",
    components: {},
data() {
    return {
        data: {}
    }
  },
methods:{
    getAbout(userid){
        apiService.aboutService(userid).then(data => {
            this.data=data;
            return this.data;
        }).catch(hata => {
    console.log(hata);
  });
    }
},
created(){
    //console.log(this.$store.state.user.id);
    this.getAbout(this.$cookies.get('user').id);
}
}
</script>