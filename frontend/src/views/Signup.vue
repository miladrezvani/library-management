<template>
    <div class="container">
        <h2>ثبت‌ نام</h2>
        <form id="signupForm">
            <label for="username">نام کاربری:</label>
            <input class="signup-in"  type="text" id="username" v-model="username" required>
            <h5 id="warnUser" style="display:none;color:red"></h5>

            <label for="email">ایمیل:</label>
            <input class="signup-in" type="email" id="email" v-model="email" required>
            <h5 id="warnEmail" style="display:none;color:red"></h5>

            <label for="firstname">نام:</label>
            <input class="signup-in" type="text" id="firstname" v-model="firstname" required>
            <h5 id="warnFirst" style="display:none;color:red"></h5>

            <label for="lastname">نام خانوادگی:</label>
            <input class="signup-in" type="text" id="lastname" v-model="lastname" required>
            <h5 id="warnLast" style="display:none;color:red"></h5>

            <label for="phone">شماره تلفن:</label>
            <input class="signup-in" type="tel" id="phone" v-model="phone" required>
            <h5 id="warnPhone" style="display:none;color:red"></h5>

            <label for="birthdate">تاریخ تولد:</label>
            <input class="signup-in" type="date" id="birthdate" v-model="birthday" required>
            <h5 id="warnBirth" style="display:none;color:red"></h5>

            <label for="password">رمز ورود:</label>
            <input class="signup-in" type="password" id="password" v-model="password" required>
            <h5 id="warnPassword" style="display:none;color:red"></h5>

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
            password: ''
        }
    },
    methods:{

        signup(){

            if(this.username == ''){
                document.getElementById('warnUser').innerHTML = "نام کاربری خود را وارد کنید!"
                document.getElementById('warnUser').style.display = 'inline-block'
            }else {document.getElementById('warnUser').style.display = 'none'}
            
            if(this.email == ''){
                document.getElementById('warnEmail').innerHTML = "ایمیل خود را وارد کنید!"
                document.getElementById('warnEmail').style.display = 'inline-block'
            }else {document.getElementById('warnEmail').style.display = 'none'}

            if(this.firstname == ''){
                document.getElementById('warnFirst').innerHTML = "نام خود را وارد کنید!"
                document.getElementById('warnFirst').style.display = 'inline-block'
            }else {document.getElementById('warnFirst').style.display = 'none'}

            if(this.lastname == ''){
                document.getElementById('warnLast').innerHTML = "نام خانوادگی خود را وارد کنید!"
                document.getElementById('warnLast').style.display = 'inline-block'
            }else {document.getElementById('warnLast').style.display = 'none'}

            if(this.phone == ''){
                document.getElementById('warnPhone').innerHTML = "شماره تلفن خود را وارد کنید!"
                document.getElementById('warnPhone').style.display = 'inline-block'
            }else {document.getElementById('warnPhone').style.display = 'none'}

            if(this.birthday == ''){
                document.getElementById('warnBirth').innerHTML = "تاریخ تولد خود را وارد کنید!"
                document.getElementById('warnBirth').style.display = 'inline-block'
            }else {document.getElementById('warnBirth').style.display = 'none'}

            if(this.password == ''){
                document.getElementById('warnPassword').innerHTML = "رمز عبور خود را وارد کنید!"
                document.getElementById('warnPassword').style.display = 'inline-block'
            }else 
            if(this.password.length < 6){
                document.getElementById('warnPassword').innerHTML = "رمز عبور باید بیشتر از 6 کاراکتر باشد!"
                document.getElementById('warnPassword').style.display = 'inline-block'
            }else {document.getElementById('warnPassword').style.display = 'none'}
            
            if(this.username!='' && this.email!='' && this.firstname!='' && this.lastname!=''
                   && this.phone != 0 && this.birthday!='' && this.password!='' && this.password.length > 6){
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
                .then(() => {
                })
                .catch(() => {
                });

                sleep().then(() => { 
                    alert('ثبت نام شما با موفقیت انجام شد')
                    router.push('/profile')
                });
        
                function sleep() {
                    return new Promise(resolve => setTimeout(resolve, 500));
                }

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