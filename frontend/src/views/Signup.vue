<template>
    <div class="container">
        <h2>ثبت‌ نام</h2>
        <form id="signupForm">
            <label for="username">نام کاربری:</label>
            <input class="signup-in"  type="text" id="username" v-model="username" required>

            <label for="email">ایمیل:</label>
            <input class="signup-in" type="email" id="email" v-model="email" required>

            <label for="firstname">نام:</label>
            <input class="signup-in" type="text" id="firstname" v-model="firstname" required>

            <label for="lastname">نام خانوادگی:</label>
            <input class="signup-in" type="text" id="lastname" v-model="lastname" required>

            <label for="phone">شماره تلفن:</label>
            <input class="signup-in" type="tel" id="phone" v-model="phone" required>

            <label for="birthdate">تاریخ تولد:</label>
            <input class="signup-in" type="date" id="birthdate" v-model="birthday" required>

            <label for="password">رمز ورود:</label>
            <input class="signup-in" type="password" id="password" v-model="password" required>

            <button id="signup-but" @click="signup" type="button">ثبت‌ نام</button>
        </form>
        <p id="message"></p>
    </div>
</template>

<script>
import router from "@/router";

const axios = require("axios");

export default {
    data(){
        return{
            username: '',
            email: '',
            firstname: '',
            lastname: '',
            phone: 0,
            birthday: '',
            password: '',
            userReg: false
        }
    },
    methods:{

        signup(){

            axios
            .post("/register", {
                username: this.username,
                email: this.email,
                password: this.password,
                first_name: this.firstname,
                last_name: this.lastname,
                birthday: this.birthday,
                phone_number: this.phone
            })
            .then((response) => {
                this.result = response
                this.userReg = true
            })
            .catch(() => {
                this.userReg = false
            });

            sleep().then(() => { 
             if(this.userReg){
                alert('ثبت نام شما با موفقیت انجام شد')
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
    @import url(../assets/style/style.css);
    @import url(../assets/style/fonts.css);
    @import url(../assets/style/Signup.css);
</style>