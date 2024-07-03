<template>
<div>
  <header>
    <div id="menu-container" class="center">
        <router-link id="logo-container" to="/">
            <img src="../src/assets/images/logo2.png" id="logo">
        </router-link>
    

        <div id="right">
            <ul class="menu">
                <li><router-link to="/">صفحه اصلی</router-link></li>
                <li><router-link to="/search">جست و جو</router-link></li>
            </ul>
        </div>

        <div style="flex: 1"></div>

        <div id="left">
            <ul>
                <li><router-link to="/login">ورود</router-link></li>
                <li><router-link id="sign" to="/signup">ثبت نام</router-link></li>
            </ul>
        </div>
        <div style="flex:1"></div>

        <div>
            <router-link to="/profile">
                <img id="prof-menu" src="./assets/images/avatar.jpg" alt="">
            </router-link>
        </div>
    </div>
  </header>
  
  <router-view/>


  <footer>
    <div class="content-container">
        <div class="column">
            <router-link to="/"><img src="../src/assets/images/logo1.png" width="160" height="200"></router-link>
            <h2>سامانه مدیریت کتابخانه Bookland</h2>
        </div>
        <div class="column">
            <h1>&#9664; لینک های مفید</h1>
            <ul>
                <li>
                    <a href="https://www.samanpl.com" target="_blank"><i class="mar">&#128279;</i>سامانه مدیریت کتابخانه های عمومی</a>
                </li>
                <li>
                    <a href="https://www.iranpl.ir" target="_blank"><i class="mar">&#128279;</i>نهاد کتابخانه‌های عمومی کشور</a>
                </li>
                <li>
                    <a href="https://www.ketab.ir" target="_blank"><i class="mar">&#128279;</i>خانه کتاب و ادبیات ایران</a>
                </li>
                <li>
                    <a href="https://www.nlai.ir" target="_blank"><span class="mar">&#128279;</span>سازمان اسناد و کتابخانه ملی ایران</a>
                </li>
            </ul>
        </div>
        
        <div class="column">
            <h1>&#9664; ارتباط با ما</h1>
            <ul>
                <li>
                    <p style="font-size: 17px;"><span class="mar">&#128231;</span>bookland@gmail.com</p>
                </li>
                <li>
                    <p style="font-size: 17px; font-family: yekan;"><span class="mar">&#128222;</span>09300000000</p>
                </li>
            </ul>
        </div>
    </div>
  </footer>
</div>

</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

li a {
  font-weight: bold;
  color: #2c3e50;
}

li a.router-link-exact-active {
  color: #1912ec;
}
</style>
