<template>
<div class="container">
    <div v-text="names"></div>
        <br>
        <span>Listele Bakim</span>
        <table class="table table-hover">
            <tr v-for="(item, index) in todos">
                <td>id
                    <h4>{{item._id}}</h4>
                </td>
                <td>name
                    <h4>{{ item.name }} </h4>
                </td>
                <td>
                    <button class="btn btn-success" @click="deleteTodo(item._id)">Sil</button>
                </td>
                <td>
                  <button class="btn btn-success" @click="editTodo(item._id)">Düzelt</button>
                </td>
            </tr>
        </table>
        <br>
        <span>Yeni Kayıt</span><br>
        <b>*************</b>
        <form @submit.prevent="createTodo">
          <input type="text" v-model="todo.name">
          <input type="submit" class="btn btn-success" value="Kaydet">
        </form>
        <br>
        <br>
        <span>Düzelt</span><br>
        <b>*********</b>
        <form @submit.prevent="updateTodo">
          <div class="row">
            <div class="col-md-8">
              <span>İd</span>
            </div>
            <div class="col-md-4">
              <span>Name</span>
            </div>
          </div>
          <div class="row">
            <div class="col-md-8">
              <span v-text="editdata.id"></span>
            </div>
            <div class="col-md-4">
              <input type="text" v-model="editdata.name">
            </div>
          </div>
          <div class="row">
            <div class="col-md-9"></div>
            <div class="col-md-3">
              <input type="submit" class="btn btn-success mt-3" value="Güncelle">
            </div>
            
          </div>

          
        </form>
    
</div>
</template>

<script>
import { APIService } from "../APIService";
//const API_URL = 'http://localhost:4000';

const apiService = new APIService();

export default {
  name: "ListTodo",

  components: {},

  data() {
    return {
      todos: [],
      numberOfTodos: 0,
      todo: {},
      names: "",
      editdata:{
        id:'',
        name :''
      }
    };
  },

  methods: {
    getTodos() {
      apiService.getTodos().then(data => {
        console.log(data[0].name);
        this.names = data[0].name;
        this.todos = data;
        this.numberOfProducts = data.count;
      });
    },
    deleteTodo(id) {
      apiService.deleteTodo(id).then(r => {
        if (r.status === 200) {
          alert("Todo deleted");
          this.getTodos();
          //this.$router.go();
        }
      });
    },
    createTodo() {
      apiService.createTodo(this.todo).then(
        result => {
          console.log(result);
          if (result.status === 200) {
            //this.todo = result.data;
            console.log('veri eklendi' + result.data);
            this.getTodos();

          }
        },
        error => {
          this.showError = true;
        }
      );
    },
    editTodo(id){
      apiService.getTodo(id).then(result =>{
        console.log(result);
        this.editdata.id = result._id;
        this.editdata.name = result.name;
        console.log("id: " + this.editdata.id);
      });
    },
    updateTodo(){
      if( (this.editdata.id.length > 0 ) &&  (this.editdata.name.length > 0 ) ){
        console.log("Görev seçtiniz.");
        apiService.updateTodo(this.editdata).then(result =>{
          console.log(result);
        });
      }else
      {
        alert("Lütfen görev seçiniz!");
      }
    }
  },
  mounted() {
    this.getTodos();
  }
};
</script>

<style scoped>
.list-horizontal li {
  display: inline-block;
}

.list-horizontal li:before {
  content: "\00a0\2022\00a0\00a0";

  color: #999;

  color: rgba(0, 0, 0, 0.5);

  font-size: 11px;
}

.list-horizontal li:first-child:before {
  content: "";
}
</style>