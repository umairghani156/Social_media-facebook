const btn = document.getElementById('btn');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const cPassword = document.getElementById('Cpassword');
const signUpHey = document.getElementById('signUpHey')
 function myhandle(){
  
      if(firstName.value == "" ||
          lastName.value == "" ||
          email.value == "" ||
          password.value == "" ||
          cPassword.value == ""
           ){
            alert('Plz fill the form correctly')
      }else if (password.value.length<8){
        alert("Password should be minimum 8 characters long")
    }else if(password.value.length !== cPassword.value.length){
      swal("Password and Confirm Password should be same");
    }
    else{
         localStorage.setItem('firstName', firstName.value);
         localStorage.setItem('lastName', lastName.value);
        localStorage.setItem('email', email.value);
        localStorage.setItem('password', password.value);
        localStorage.setItem('cPassword', cPassword.value);
        
        location.pathname = 'logIn.html';
      }
      firstName.value = '';
        lastName.value = '';
        email.value = '';
        password.value = '';
        cPassword.value = '';
 }

  const logIn = document.getElementById('logIn');
  logIn.addEventListener('click', function(){
    location.pathname = 'logIn.html';
  })
 
 