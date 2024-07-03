<template>
  <div id="container">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <header>
      <div id="page-banner">
        <h1 class="title">جست و جوی کتاب</h1>
        <form id="search-books">
          <span @click="searchBook" class="submit"><i class="fa fa-search"></i></span>
          <input v-model="bookInput" type="text" placeholder="جست و جو بر اساس عنوان" />
        </form>
      </div>
    </header>

    <div id="book-list">
      <h2 class="title">نتایج جست و جو</h2>

      <div class="clear"></div>

      <table>
        <thead>
          <tr>
            <th>عنوان</th>
            <th>نویسنده</th>
            <th>اطلاعات نشر</th>
            <th>سال چاپ</th>
            <th>وضعیت موجودی</th>
            <th>امانت</th>
          </tr>
        </thead>

        <tbody >
          <tr v-for="book in searchResult" :key="book.id">
            <td>{{book.title}}</td>
            <td>{{book.author}}</td>
            <td>{{book.publication_info}}</td>
            <td>{{book.year}}</td>
            <td v-if="book.inventory_status">موجود</td>
            <td v-else>ناموجود</td>
            <td v-if="book.inventory_status" @click="borrow(book)"><button class="borrow">امانت</button></td>
            <td v-else ><button class="borrow" disabled style="cursor:not-allowed">امانت</button></td>
          </tr>
          
        </tbody>
      </table>
      
      <p v-if="error" style="text-align: center;font-size:30px">موردی یافت نشد!</p>

    </div>

    <div class="clear"></div>

  </div>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      info: null,
      bookInput: null,
      searchResult: null,
      response: null,
      error: null,
      borrowRes: '',
      userLog: false
    };
  },
  mounted() {

  },
  methods:{
    async searchBook(){

      axios
      .post("/search", {
        search: this.bookInput
      })
      .then((response) => {
        this.response = response.data.result
        this.error = null
      })
      .catch((error) => {
        this.error = error
        this.response = null
      });

      sleep().then(() => { 
        this.searchResult = JSON.parse(JSON.stringify(this.response))
       });

       function sleep() {
        return new Promise(resolve => setTimeout(resolve, 500));
       }
      },
      
    async borrow (book){
      axios
      .get("/profile")
      .then((response) => {
        this.userLog = response.status == 200 ? true : false
        console.log(this.userLog);
      }).catch((error) => {
        this.userLog = false
        console.log(error);
      })



      sleep().then(() => { 

        if(this.userLog){
        axios
        .post("/borrow", {
          book_id: book.id
        })
        .then((response) => {
          this.borrowRes = response.data.status
          this.$router.go(0)
          alert(`کتاب (${book.title}) برای شما رزرو شد`)
        }).catch((error) => {
          console.log(error);
        })
      }
      else
        alert('ابتدا وارد حساب کاربری خود شوید')
       });

       function sleep() {
        return new Promise(resolve => setTimeout(resolve, 500));
       }
    }
  }
};
</script>

<style>
@import url(../assets/style/fonts.css);
@import url(../assets/style/style.css);
@import url(../assets/style/search.css);
</style>
