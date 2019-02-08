<template>
  <div class="home">
    <div class="row">
      <div class="col-md-1"></div>
      <div class="col-md-2">
        <left-menu></left-menu>
      </div>
      <div class="col-md-6">
        <time-line></time-line>
      </div>
      <div class="col-md-2">
        <right-menu></right-menu>  
      </div>
      <div class="col-md-1"></div>
      <update-header-photo></update-header-photo>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LeftMenu from '@/components/LeftMenu.vue'
import TitleContent from '@/components/TitleContent.vue'
import RightMenu from '@/components/RightMenu.vue'
import UpdateHeaderPhoto from '@/components/UpdateHeaderPhoto.vue'
import TimeLine from '@/components/TimeLine.vue'

export default {
  name: 'bakimbi',
  components: {
    'left-menu':LeftMenu,
    'title-content':TitleContent,
    'right-menu':RightMenu,
    'update-header-photo':UpdateHeaderPhoto,
    'time-line':TimeLine
  },
  created(){
  }
}
</script>
