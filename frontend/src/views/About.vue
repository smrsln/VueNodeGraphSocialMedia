<template>
  <div class="about">
    <h1>This is an about page</h1>
    
    <list-todo></list-todo>
  </div>
</template>


<script>
// @ is an alias to /src
import ListTodo from '@/components/ListTodo.vue'

export default {
  name: 'about',
  components: {
    'list-todo' : ListTodo
  }
}
</script>
