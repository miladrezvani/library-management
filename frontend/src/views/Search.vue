<template>
  <div id="container" v-if="info">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <header>
      <div id="page-banner">
        <h1 class="title">جست و جوی کتاب</h1>
        <form id="search-books">
          <span class="submit"><i class="fa fa-search"></i></span>
          <input type="text" placeholder="جست و جو بر اساس عنوان" />
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

        <tbody>
          <tr>
            <td>صد سال تنهایی</td>
            <td>گابریل گارسیا مارکز</td>
            <td>امیرکبیر</td>
            <td>1396</td>
            <td>موجود</td>
            <td><button class="borrow">امانت</button></td>
          </tr>

          <tr>
            <td>پدر پولدار پدر فقیر</td>
            <td>رابرت کیوساکی</td>
            <td>راز نهان</td>
            <td>1390</td>
            <td>امانت</td>
            <td>
              <button
                class="borrow"
                disabled
                style="cursor: not-allowed"
                title="این کتاب در وضعیت امانت قرار دارد"
              >
                امانت
              </button>
            </td>
          </tr>

          <tr>
            <td>وسعت یا عمق؟</td>
            <td>دیوید اپستین</td>
            <td>ترجمان علوم انسانی</td>
            <td>2019</td>
            <td>موجود</td>
            <td><button class="borrow">امانت</button></td>
          </tr>

          <tr>
            <td>بادبادک باز</td>
            <td>خالد حسینی</td>
            <td>انتشارات مروارید</td>
            <td>1399</td>
            <td>موجود</td>
            <td><button class="borrow">امانت</button></td>
          </tr>
        </tbody>
      </table>

      <p style="display: none; text-align: center">موردی یافت نشد!</p>
    </div>

    <div class="clear"></div>

    <h1>{{ info.status }}</h1>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      info: null,
    };
  },
  mounted() {
    axios
      .post("/search", {
        search: "شب",
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  },
};
</script>

<style>
@import url(../assets/style/fonts.css);
@import url(../assets/style/style.css);
@import url(../assets/style/search.css);
</style>
