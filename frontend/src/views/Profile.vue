<template>
    <body class="profile-page" data-spy="scroll" data-target=".navbar" data-offset="50">

        <header id="header">			
            <img id="profilePic" src="../assets/images/avatar.jpg">
            <div class="container-fluid" id="subheader">
                <div class="row" id="row">
                    <div class="col-md-12">
                        <h1 id="name">نام و نام خانوادگی</h1>
                    </div>
                </div>
            </div>
        </header>
    
        <main>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-3 col-sm-4 col-xs-12">
                    </div>
                    
                    <div class="col-md-6 col-sm-8 col-xs-12">
                        <div class="tab-content">
                            <div id="about" class="tab-pane fade in active">
                                <h3>پروفایل کاربری</h3>
                                <p><span><i class="fa fa-user-circle"></i><strong>نام:</strong></span> firstName </p>
                                <p><span><i class="fa fa-user-circle"></i><strong>نام خانوادگی:</strong></span> lastName </p>
                                <p><span><i class="fa fa-user-circle-o"></i><strong>نام کاربری:</strong></span> username </p>
                                <p><span><i class="fa fa-calendar"></i><strong>تاریخ تولد:</strong></span> yyyy/mm/dd </p>
                                <p><span><i class="fa fa-envelope"></i><strong>پست الکترونیک:</strong></span> example@gmail.com </p>
                                <p><span><i class="fa fa-phone"></i><strong>شماره تلفن:</strong></span> 09123456789 </p>
                                    <table>
                                        <thead>
                                            <tr class="table100-head">
                                                <th class="column1">نام کتاب</th>
                                                <th class="column2">تاریخ امانت</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="column1">book1</td>
                                                <td class="column2">date</td>
                                            </tr>
                                            <tr>
                                                <td class="column1">book2</td>
                                                <td class="column2">date</td>
                                            </tr>
                                            <tr>
                                                <td class="column1">book3</td>
                                                <td class="column2">date</td> 
                                            </tr>
                                        </tbody>
                                    </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    
    
    </body>
</template>

<script>
export default {

}
</script>

<style>
    @import url(../assets/style/font-awesome.min.css);
    @import url(../assets/style/fonts.css);
    @import url(../assets/style/style1.css);
    @import url(../assets/style/style.css);
</style>