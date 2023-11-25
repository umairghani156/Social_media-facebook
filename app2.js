const logBtn = document.getElementById('logBtn');
const imgHey = document.getElementById('imgHey')
const email = document.getElementById('email')
const password = document.getElementById('password')
password.value = ''
const check = localStorage.getItem('email');
const passwordLocal = localStorage.getItem('password')
console.log(passwordLocal);
console.log(check);
logBtn.addEventListener('click', function(){
     if(email.value == "" || password.value == ""){
        swal("Please insert your email and password correctly");
     }else if(localStorage.getItem('email') !== email.value || localStorage.getItem('password') !== password.value){
        swal("Wrong!", "Please insert correct password and email!");
     }else{
    swal("Good job!", "You logged In Successfully!", './assets/Capture.PNG');
}
 email.value = "";
 password.value = "";
})