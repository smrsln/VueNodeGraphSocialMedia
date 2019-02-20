


<template>
    <div class="card" style="margin: 3rem;">
        
        <div class="container">
	<div class="action">
	<div class="trophy">
		<svg fill="green" width="300" height="300" viewBox="0 0 24 24">
  		<path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"></path>
	</svg>
	</div>
		<h6>Şimdi Hazırsınız ! İyi eğlenceler !</h6>
</div>
</div>
    </div>
</template>

<script>
    export default {
        props: ['currentStep'],
        methods: {
          canContinue() {
              this.$emit('stepper-finished', {value: true});
          }
        },
        mounted() {
//            this.$emit('can-continue', {value: true})
        }
    }
</script>