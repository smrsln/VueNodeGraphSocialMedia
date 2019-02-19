
<template>
    <div style="padding: 2rem 3rem; ">
        <h6>Profil fotoma bakimbi derseniz işte burada... Tabi ki özelleştirebilirsiniz:  </h6>
        <div class="author-thumb mt-3 mb-3">
			<img style="-webkit-box-shadow: 0px 0px 22px -2px rgba(0,0,0,0.71); -moz-box-shadow: 0px 0px 22px -2px rgba(0,0,0,0.71); box-shadow: 0px 0px 22px -2px rgba(0,0,0,0.71);"  width="120" :src="'assets/profile_pics/' + this.$cookies.get('user').profile_pics" alt="author">
		</div>
        <form @submit.prevent="submitFile" enctype="multipart/form-data">
  <div class="form-group col-8 offset-2">
    <label class="mb-3" for="file"><h6>Türkiye'nin en özgür Sosyal Medya Platformu Bakimbi'ye hoşgeldiniz.</h6>
    <input type="file" name="file" ref="file" class="form-control-file" id="file" v-on:change="handleFileUpload()">
    </label>
    <button @click.prevent="submitFile()">Submit</button>
  </div>
</form>
    </div>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import axios from 'axios';
    export default {
        props: ['clickedNext', 'currentStep'],
        mixins: [validationMixin],
        data() {
            return {
                file: '',
            }
        },
        methods: {
            submitFile(){
            let formData = new FormData();

            formData.append('file', this.file);

            axios.post( '/assets/profile_pics',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ).then(function(){
          console.log('SUCCESS!!');
        })
        .catch(function(){
          console.log('FAILURE!!');
        });
      },
            handleFileUpload(){
                this.file = this.$refs.file.files[0];
            }
        },
        
        mounted() {
            this.$emit('can-continue', {value: true});
        }
        
    }
</script>