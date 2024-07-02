<template>
    <div class="container">
        <h2>ثبت‌ نام</h2>
        <form id="signupForm">
            <label for="username">نام کاربری:</label>
            <input class="signup-in" type="text" id="username" name="username" required>

            <label for="email">ایمیل:</label>
            <input class="signup-in" type="email" id="email" name="email" required>

            <label for="firstname">نام:</label>
            <input class="signup-in" type="text" id="firstname" name="firstname" required>

            <label for="lastname">نام خانوادگی:</label>
            <input class="signup-in" type="text" id="lastname" name="lastname" required>

            <label for="phone">شماره تلفن:</label>
            <input class="signup-in" type="tel" id="phone" name="phone" required>

            <label for="birthdate">تاریخ تولد:</label>
            <input class="signup-in" type="date" id="birthdate" name="birthdate" required>

            <label for="password">رمز ورود:</label>
            <input class="signup-in" type="password" id="password" name="password" required>

            <button id="signup-but" type="submit">ثبت‌ نام</button>
        </form>
        <p id="message"></p>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    @import url(../assets/style/style.css);
    @import url(../assets/style/fonts.css);
    @import url(../assets/style/Signup.css);
</style>