document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var phone = document.getElementById('phone').value;
    var birthdate = document.getElementById('birthdate').value;
    var password = document.getElementById('password').value;

    if (!validateForm(username, email, firstname, lastname, phone, birthdate, password)) {
        document.getElementById('message').innerText = 'لطفاً تمام فیلدها را به درستی پر کنید.';
    } else {
        document.getElementById('message').innerText = 'ثبت‌ نام با موفقیت انجام شد!';
    }
});

function validateForm(username, email, firstname, lastname, phone, birthdate, password) {
    if (username === '' || email === '' || firstname === '' || lastname === '' || phone === '' || birthdate === '' || password === '') {
        return false;
    }
    // اعتبارسنجی ساده ایمیل
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        return false;
    }
    return true;
}
