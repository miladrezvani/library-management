<template>
    <div class="wrapper">
        <form>
            <h1>ورود به حساب کاربری</h1>
            <div class="input_box">
                <input type="text" v-model="userIn" placeholder="نام کاربری" required>
            </div>
            <div class="input_box">
                <input type="password" v-model="passIn" placeholder="رمز عبور" required>
            </div>
            <div class="btn">
                <button @click="submit" type="button" class="btn">ورود</button>
               
            </div>
            <div class="register_link">
                <p> حساب کاربری ندارید؟
                    <a href="#">ثبت نام</a>
                </p>
            </div>

            <div v-if="status != 200 && status != 0">
                <p style="color: red; font-size:20px">نام کاربری یا رمز عبور وارد شده اشتباه است!</p>
                <p style="color: red">لطفا دوباره امتحان کنید</p>
            </div>

        </form>
    </div>
</template>

<script>
const axios = require("axios");

export default {
    data(){
        return {
            userIn: null,
            passIn: null,
            result: null,
            status: 0

        }
    },

    methods:{
    async submit(){
        
      axios
      .post("/login", {
        username: this.userIn,
        password: this.passIn
      })
      .then((response) => {
        this.result = response
      })
      .catch((error) => {
        this.error = error
      });

      sleep().then(() => { 
        this.status = this.result.status
       });

      function sleep() {
       return new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }
}
</script>

<style>
    @import url(../assets/style/fonts.css);
    @import url(../assets/style/login.css);
    @import url(../assets/style/style.css);
</style>