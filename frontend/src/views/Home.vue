<template>
  <div>
  
  <div id="welcome">
      <h1 id="text-effect">
          <span>سامانه مدیریت</span>
          <span>کتابخانه</span>
          <span>Bookland</span>
      </h1>
  </div>

  <section>
      <div class="content-container">
          <div class="card">
              <div id="element-style"><img class="icon-style" src="../assets/images/person.png">
              </div>
              <div class="static">
                  <h2>مجموع کاربران</h2>
                  <h3>{{userCount}}</h3>
              </div>
          </div>
          <div class="card">
              <div id="element-style"><img class="icon-style" src="../assets/images/books.png">
              </div>
              <div class="static">
                  <h2>تعداد کل منابع</h2>
                  <h3>{{bookCount}}</h3>
              </div>
          </div>

          <div class="card">
              <div id="element-style"><img class="icon-style" src="../assets/images/new.png">
              </div>
              <div class="static">
                  <h2>منابع جدید</h2>
                  <h3>{{newBookCount}}</h3>
              </div>
          </div>
      </div>
      <div class="content-container" style="background-color: #fff;margin-bottom: 40px;">
          <h3 id="new-book-title">تازه های کتاب</h3>
          <div id="new-book-list">
              <div class="book-box" v-for="book in books" :key="book.id">
                  <h5 class="box-title">{{book.title}}</h5>
                  <ul>
                      <li><span>نویسنده: </span>{{book.author}}</li>
                      <li><span>ناشر: </span>{{book.publication_info}}</li>
                      <li><span>سال نشر: </span>{{book.year}}</li>
                  </ul>
              </div>
          </div>
      </div>
  </section>
</div>
</template>

<script>
const axios = require("axios");

export default {
  name: 'HomeView',
  components: {
  },
  data(){
    return{
        books: [],
        userCount: 0,
        bookCount: 0,
        newBookCount: 0
    }
  },
  mounted(){

      axios
      .get("/statistics")
      .then((response) => {
        this.userCount = JSON.parse(JSON.stringify(response.data.usercount))
        this.newBookCount = JSON.parse(JSON.stringify(response.data.newbookcount))
        this.bookCount = JSON.parse(JSON.stringify(response.data.bookcount))
      })
      .catch((error) => {
        console.log(error);
        this.response = null
      });

      axios
      .get("/new-books")
      .then((response) => {
        this.books = JSON.parse(JSON.stringify(response.data.result))
      })
      .catch((error) => {
        console.log(error);
        this.response = null
      });
  }
}
</script>

<style>
  @import url(../assets/style/fonts.css);
  @import url(../assets/style/style.css);
</style>
