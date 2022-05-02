<template>
  <div>
    <ol v-for="item in data" :key="item._id">
      {{ item }}
    </ol>
    <form @submit.prevent="onSumb" action="/action_page.php">
      <label>First name:</label>
      <input type="text" v-model="name"><br><br>
      <label for="lname">email:</label>
      <input type="text" v-model="email"><br><br>
      <input type="submit" value="Submit">
</form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data () {
    return {
      name:'',
      email:'',
      data: []
    }
  },
  methods: {
    fetchData() {
      const url = 'http://localhost:3000/api'
      axios.get(url)
      .then((res) => {
        this.data = res.data
      })
      .catch((err) => console.log(err))
    },
    init(){
      this.name = '';
      this.email = ''
    },
    onSumb() {
      const url = 'http://localhost:3000/api'
      axios.post(url, {
        name : this.name,
        email : this.email
      })
      .then((res) =>{
        console.log(res)
        this.init()
        this.fetchData()

      })
    }
  },
  created(){
    this.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
