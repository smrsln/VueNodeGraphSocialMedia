<template>
  <main style=" text-align: left;">
    <div id="newsfeed-items-grid">
      <div class="ui-block">
        <article class="hentry post video">
          <a href>
            <h3 style="font-weight: bold; color: #ff5e3a;">{{$store.state.currentTitle.text}}</h3>
          </a>
        </article>
      </div>
    </div>

    <div class="ui-block" v-for="item in titleCommets">
      <article class="hentry post-devam">
        <p>{{item.text}}</p>

        <div class="post-additional-info inline-items">
          <div class="comments-shared">
            <a
              href="#"
              @click.prevent="repostControl(item.id, item.userRepost)"
              class="post-add-icon inline-items"
            >
              <i
                :class="{'voted' : item.userRepost > 0 , '':item.userRepost === 0}"
                class="material-icons"
              >reply</i>
              <span>{{item.repost}}</span>
            </a>
            
            <a
              href="#"
              @click.prevent="likeControl(item.id,item.userLike)"
              class="post-add-icon inline-items"
            >
              <i
                :class="{'voted' : item.userLike > 0 , '':item.userLike === 0}"
                class="material-icons"
              >sentiment_very_satisfied</i>
              
              <span>{{item.like}}</span>
            </a>
            <a
              href="#"
              @click.prevent="dislikeControl(item.id,item.userDislike)"
              class="post-add-icon inline-items"
            >
              <i
                :class="{'voted' : item.userDislike > 0 , '':item.userDislike === 0}"
                class="material-icons"
              >sentiment_very_dissatisfied</i>
              <span>{{item.dislike}}</span>
            </a>
            <a
              href="#"
              @click.prevent="favoriteControl(item.id,item.userFavorite)"
              class="post-add-icon inline-items"
            >
              <i
                :class="{'voted' : item.userFavorite > 0 , '':item.userFavorite === 0}"
                class="material-icons"
              >favorite</i>
              
              <span>{{item.favorite}}</span>
            </a>
          </div>

          <div
            style="float: right; margin-bottom: 0;"
            class="post__author author vcard inline-items"
          >
            <img src="../assets/img/avatar8-sm.jpg" alt="author">

            <div class="author-date">
              <a class="h6 post__author-name fn" href="#">{{item.name}}</a>
              <div style="margin-right: 20px;" class="post__date">
                <time class="published" datetime="2004-07-24T18:18">{{item.createDate}}</time>
              </div>
              <div
                style="float: right; margin-top: -20px; margin-right: 0 !important;"
                class="more"
              >
                <svg class="olymp-three-dots-icon">
                  <use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
                </svg>
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
                    <a href="#" @click.prevent="deleteEntry(item.id)">Sil</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>

    <nav aria-label="Page navigation example">
      <ul class="pagination pagination-sm justify-content-end">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item" v-for="(index) in countPage">
          <a class="page-link" href="#" @click="cahangePage(index)">{{index}}</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
    <div class="ui-block">
      <div class="news-feed-form">
        <div class="tab-content">
          <div class="tab-pane active" id="home-1" role="tabpanel" aria-expanded="true">
            <form @submit.prevent="addComment">
              <div class="author-thumb">
                <img src="../assets/img/author-page.jpg" alt="author">
              </div>
              <div class="form-group with-icon label-floating is-empty">
                <label class="control-label">Yaz Dostum...</label>
                <textarea class="form-control" v-model="comment" placeholder></textarea>
              </div>
              <div class="add-options-message">
                <a
                  href="#"
                  class="options-message"
                  data-toggle="tooltip"
                  data-placement="top"
                  data-original-title="Fotoğraf Ekle"
                >
                  <svg
                    class="olymp-camera-icon"
                    data-toggle="modal"
                    data-target="#update-header-photo"
                  >
                    <use xlink:href="../assets/svg-icons/sprites/icons.svg#olymp-camera-icon"></use>
                  </svg>
                </a>
                <button class="btn btn-primary btn-md-2">Yapıştır !</button>
                <button
                  class="btn btn-md-2 btn-border-think btn-transparent c-grey"
                  v-if="false"
                >Bakimbi</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<script>
//this.$route.params.sefer_id
import { APIService } from "../APIService";
const apiService = new APIService();

export default {
  name: "TitleContent",
  components: {},
  data() {
    return {
      comment: "",
      pgNum: 1
    };
  },
  methods: {
    addComment() {
      /*
      apiService.getMainFlow(this.$store.state.user.id).then(data => {
        alert(data);
      });
      return;
      */

      if (!this.comment) {
        toastr.warning("Lütfen Yorum Giriniz!.", "Başarısız!", {
          timeOut: 4000,
          positionClass: "toast-bottom-right"
        });
      } else {
        let commentObj = {
          titleId: this.$store.state.currentTitle.id,
          userName: this.$cookies.get("user").userName,
          name: this.$cookies.get("user").name,
          userId: this.$cookies.get("user").id,
          comment: this.comment
        };

        console.log(commentObj);
        apiService.addComment(commentObj).then(data => {
          this.comment = "";
          if (data.data === "ok") {
            apiService
              .setCurrentTitle(this.currentTitleId)
              .then(currentTitleData => {
                let pageNum = 1;
                apiService
                  .setTitleComments(
                    this.currentTitleId,
                    this.$cookies.get("user").id,
                    pageNum
                  )
                  .then(titleCommentsData => {
                    this.$store.dispatch("setCurrentTitle", {
                      currentTitleData: currentTitleData,
                      titleCommentsData: titleCommentsData,
                      entryCount: this.titleEntryCount
                    });
                  });
              });
            toastr.success("Yorumunuz Eklendi.", "Başarılı", {
              timeOut: 4000,
              positionClass: "toast-bottom-right"
            });
          } else {
            toastr.error("Yorumunuz Eklenemedi.", "Hata!", {
              timeOut: 4000,
              positionClass: "toast-bottom-right"
            });
          }
        });
      }
    },
    likeControl(id, userLike) {
      let item = {
        id: id,
        userName: this.$cookies.get("user").userName
      };

      if (userLike > 0) {
        apiService.unlikeService(item).then(data => {
          if (data.data === "deleted") {
            apiService
              .setCurrentTitle(this.currentTitleId)
              .then(currentTitleData => {
                let pageNum = this.pageNum;
                apiService
                  .setTitleComments(
                    this.currentTitleId,
                    this.$cookies.get("user").id,
                    pageNum
                  )
                  .then(titleCommentsData => {
                    this.$store.dispatch("setCurrentTitle", {
                      currentTitleData: currentTitleData,
                      titleCommentsData: titleCommentsData,
                      entryCount: this.titleEntryCount
                    });
                  });
              });
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
            apiService
              .setCurrentTitle(this.currentTitleId)
              .then(currentTitleData => {
                let pageNum = this.pageNum;
                apiService
                  .setTitleComments(
                    this.currentTitleId,
                    this.$cookies.get("user").id,
                    pageNum
                  )
                  .then(titleCommentsData => {
                    this.$store.dispatch("setCurrentTitle", {
                      currentTitleData: currentTitleData,
                      titleCommentsData: titleCommentsData,
                      entryCount: this.titleEntryCount
                    });
                  });
              });
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
    favoriteControl(id, userFavorite) {
      let item = {
        id: id,
        userName: this.$cookies.get("user").userName
      };

      if (userFavorite > 0) {
        apiService.unfavoriteService(item).then(data => {
          if (data.data === "deleted") {
            apiService
              .setCurrentTitle(this.currentTitleId)
              .then(currentTitleData => {
                let pageNum = this.pageNum;
                apiService
                  .setTitleComments(
                    this.currentTitleId,
                    this.$cookies.get("user").id,
                    pageNum
                  )
                  .then(titleCommentsData => {
                    this.$store.dispatch("setCurrentTitle", {
                      currentTitleData: currentTitleData,
                      titleCommentsData: titleCommentsData,
                      entryCount: this.titleEntryCount
                    });
                  });
              });
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
            apiService
              .setCurrentTitle(this.currentTitleId)
              .then(currentTitleData => {
                let pageNum = this.pageNum;
                apiService
                  .setTitleComments(
                    this.currentTitleId,
                    this.$cookies.get("user").id,
                    pageNum
                  )
                  .then(titleCommentsData => {
                    this.$store.dispatch("setCurrentTitle", {
                      currentTitleData: currentTitleData,
                      titleCommentsData: titleCommentsData,
                      entryCount: this.titleEntryCount
                    });
                  });
              });
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
    dislikeControl(id, userDislike) {
      let item = {
        id: id,
        userName: this.$cookies.get("user").userName
      };

      if (userDislike > 0) {
        apiService.undislikeService(item).then(data => {
          if (data.data === "deleted") {
            //id->titleId
            apiService.setCurrentTitle(this.currentTitleId).then(currentTitleData => {
              let pageNum = this.pageNum;
              apiService
                .setTitleComments(this.currentTitleId, this.$cookies.get("user").id, pageNum)
                .then(titleCommentsData => {
                  this.$store.dispatch("setCurrentTitle", {
                    currentTitleData: currentTitleData,
                    titleCommentsData: titleCommentsData,
                    entryCount: this.titleEntryCount
                  });
                });
            });
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
            apiService
              .setCurrentTitle(this.currentTitleId)
              .then(currentTitleData => {
                let pageNum = this.pageNum;
                apiService
                  .setTitleComments(
                    this.currentTitleId,
                    this.$cookies.get("user").id,
                    pageNum
                  )
                  .then(titleCommentsData => {
                    this.$store.dispatch("setCurrentTitle", {
                      currentTitleData: currentTitleData,
                      titleCommentsData: titleCommentsData,
                      entryCount: this.titleEntryCount
                    });
                  });
              });
            toastr.success(
              "Sen beğenmediysen kendi kaybetmiştir.",
              "Başarılı",
              {
                timeOut: 4000,
                positionClass: "toast-bottom-right"
              }
            );
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
    repostControl(id, userRepost) {
      let item = {
        id: id,
        userName: this.$cookies.get("user").userName
      };

      if (userRepost > 0) {
        apiService.unrepostService(item).then(data => {
          if (data.data === "deleted") {
            apiService
              .setCurrentTitle(this.currentTitleId)
              .then(currentTitleData => {
                let pageNum = this.pageNum;
                apiService
                  .setTitleComments(
                    this.currentTitleId,
                    this.$cookies.get("user").id,
                    pageNum
                  )
                  .then(titleCommentsData => {
                    this.$store.dispatch("setCurrentTitle", {
                      currentTitleData: currentTitleData,
                      titleCommentsData: titleCommentsData,
                      entryCount: this.titleEntryCount
                    });
                  });
              });
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
            apiService
              .setCurrentTitle(this.currentTitleId)
              .then(currentTitleData => {
                let pageNum = this.pageNum;
                apiService
                  .setTitleComments(
                    this.currentTitleId,
                    this.$cookies.get("user").id,
                    pageNum
                  )
                  .then(titleCommentsData => {
                    this.$store.dispatch("setCurrentTitle", {
                      currentTitleData: currentTitleData,
                      titleCommentsData: titleCommentsData,
                      entryCount: this.titleEntryCount
                    });
                  });
              });
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
    cahangePage(pageNumber) {
      //this.pgNum = pageNumber;
      this.$store.dispatch("setPageNumber", { pgNum: pageNumber });
      apiService.setCurrentTitle(this.currentTitleId).then(currentTitleData => {
        let pageNum = pageNumber;
        apiService
          .setTitleComments(
            this.currentTitleId,
            this.$cookies.get("user").id,
            pageNum
          )
          .then(titleCommentsData => {
            this.$store.dispatch("setCurrentTitle", {
              currentTitleData: currentTitleData,
              titleCommentsData: titleCommentsData,
              entryCount: this.titleEntryCount
            });
          });
      });
    },
    deleteEntry(entryId) {
      let item = {
        entryId: entryId,
        userId: this.$cookies.get("user").id
      };
      //alert(item.userId);
      apiService.deleteEntry(item).then(data => {
        console.log(data);
              apiService.setCurrentTitle(this.currentTitleId).then(currentTitleData => {
        apiService
          .setTitleComments(
            this.currentTitleId,
            this.$cookies.get("user").id,
            this.pageNum
          )
          .then(titleCommentsData => {
            this.$store.dispatch("setCurrentTitle", {
              currentTitleData: currentTitleData,
              titleCommentsData: titleCommentsData,
              entryCount: this.titleEntryCount
            });
          });
      });

      });
      //alert(entryId);
    }
  },
  computed: {
    countPage() {
      return (
        Math.floor(this.titleEntryCount / 5) +
        (this.titleEntryCount % 5 > 0 ? 1 : 0)
      );
    },
    titleCommets() {
      return this.$store.getters.titleComments;
    },
    currentTitleId() {
      return this.$store.getters.currentTitleId;
    },
    titleEntryCount() {
      return this.$store.getters.titleEntryCount;
    },
    pageNum(){
      return this.$store.getters.pageNum;
    }
  },
  created() {
    //salert(this.$route.params.id);
  }
};
</script>