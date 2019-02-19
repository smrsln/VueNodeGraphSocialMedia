<template>
  <div class="home">
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-2">
        <left-menu></left-menu>
      </div>
      <div class="col-md-6">
        <title-content ></title-content>
      </div>
      <div class="col-md-2">
        <right-menu></right-menu>  
      </div>
      <div class="col-md-1"></div>
    </div>
      <update-header-photo></update-header-photo>
  </div>
</template>

<script>
// @ is an alias to /src
import LeftMenu from "@/components/LeftMenu.vue";
import TitleContent from "@/components/TitleContent.vue";
import RightMenu from "@/components/RightMenu.vue";
import UpdateHeaderPhoto from "@/components/UpdateHeaderPhoto.vue";

export default {
  name: "bakimbi",
  components: {
    "left-menu": LeftMenu,
    "title-content": TitleContent,
    "right-menu": RightMenu,
    "update-header-photo": UpdateHeaderPhoto
  },
  data() {
    return {
      id: ""
    }
  },
  methods: {
    getTiteContent(id){
      //alert(id)
    }
  },
  created() {
    this.getTiteContent(1);
    
  },
  mounted(){
  }
};
</script>
