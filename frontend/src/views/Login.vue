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
                    <router-link to="/Signup">ثبت نام</router-link>
                </p>
            </div>

            <div v-if="error">
                <p style="color: red; font-size:20px">نام کاربری یا رمز عبور وارد شده اشتباه است!</p>
                <p style="color: red">لطفا دوباره امتحان کنید</p>
            </div>

        </form>
    </div>
</template>

<script>
import router from "@/router";

const axios = require("axios");

export default {
    data(){
        return {
            userIn: null,
            passIn: null,
            result: null,
            userLog: false,
            error: null
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
        this.userLog = true
        this.error = null
      })
      .catch((error) => {
        this.userLog = false
        this.error = error
      });

    
      sleep().then(() => { 
            if(this.userLog){
            router.push('/profile')
            }
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