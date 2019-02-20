<template>
  <div class="home">
    <div
      class="modal fade bd-example-modal-lg"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" style="max-width: 1200px;" role="document">
        <div class="modal-content">
          <section class="section">
            <horizontal-stepper
              :steps="Steps"
              @completed-step="completeStep"
              @active-step="isStepActive"
              @stepper-finished="isCompleted"
            ></horizontal-stepper>
          </section>
        </div>
      </div>
    </div>
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
import HorizontalStepper from 'vue-stepper';
// @ is an alias to /src
import LeftMenu from "@/components/LeftMenu.vue";
import TitleContent from "@/components/TitleContent.vue";
import RightMenu from "@/components/RightMenu.vue";
import UpdateHeaderPhoto from "@/components/UpdateHeaderPhoto.vue";
import TimeLine from "@/components/TimeLine.vue";
import StepOne from '@/components/StepOne.vue';
import StepTwo from '@/components/StepTwo.vue';
import StepThree from '@/components/StepThree.vue';

export default {
  name: "bakimbi",
  components: {
    "left-menu": LeftMenu,
    "title-content": TitleContent,
    "right-menu": RightMenu,
    "update-header-photo": UpdateHeaderPhoto,
    "time-line": TimeLine,
    HorizontalStepper
  },
  data(){
            return {
                Steps: [
                    {
                        icon: 'person',
                        name: 'first',
                        title: 'Profil Fotoğrafınızı Yükleyin',
                        subtitle: '',
                        component: StepOne,
                        completed: true,
                        canContinue: true

                    },
                    {
                        icon: 'person_add',
                        name: 'second',
                        title: 'Başka Kişileri Takip Edin !',
                        subtitle: '',
                        component: StepTwo,
                        completed: true
                    },
                    {
                        icon: 'insert_emoticon',
                        name: 'third',
                        title: 'İyi Eğlenceler !',
                        subtitle: '',
                        component: StepThree,
                        completed: true
                    }
                ]
            }
        },
        methods: {
            // Executed when @completed-step event is triggered
            completeStep(payload) {
                this.Steps.forEach((step) => {
                    if (step.name === payload.name) {
                        step.completed = true;
                    }
                })
            },
            // Executed when @active-step event is triggered
            isStepActive(payload) {
                this.Steps.forEach((step) => {
                    if (step.name === payload.name) {
                        if(step.completed === true) {
                            step.completed = false;
                        }
                    }
                })
            },
            // Executed when @stepper-finished event is triggered
            isCompleted(){
              $('#exampleModal').modal('hide');
            }
        },
  created() {},
  mounted(){
    $('#exampleModal').modal('show');
  }
};
</script>
