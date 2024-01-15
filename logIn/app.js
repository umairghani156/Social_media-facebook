import {app, auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from '../utilize/firebaseConfig.js';

const logBtn = document.getElementById('logBtn');
const imgHey = document.getElementById('imgHey')
const email = document.getElementById('email')
const password = document.getElementById('password')
password.value = ''
const logInHey = document.querySelector('.logInHey');
// const users =JSON.parse(localStorage.getItem('usersDetail')) || [] ;
// console.log(users[0].userName);
// if(!users) window.location.href = '../signUp/index.html'
// const logInUser = JSON.parse(localStorage.getItem('logInUser')) || [];
// console.log(logInUser);
// console.log(logInUser);
onAuthStateChanged(auth, (user) => {
   if (user) {
       const uid = user.uid;
       let userEmail =  user.email;
       console.log('user ---->', user);
       
       
   } else {
      console.log('not login');
      // if(window.location.href !== '../home/index.html')
      // window.location = '../home/index.html'
   }
 });

const logInHandler = () => {


   signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log('user==',user);
    alert('Now we are diverting to home page');
    setTimeout(() => {
      window.location.href = '../home/index.html'
    }, 1000)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    alert('Password is not match');
  });
}
const logInSubmitBtn = document.getElementById('logInSubmitBtn');
logInSubmitBtn.addEventListener('click', logInHandler)

// logBtn.addEventListener('click', function(){
//    const logInUser = JSON.parse(localStorage.getItem('logInUser'));
//      if(email.value == "" || password.value == ""){
//         swal("Please insert your email and password correctly");
//      }
//     users.filter(element => {
//          console.log(element.userName);
//          if(element.email !== email.value || element.password!== password.value){
//             swal("Wrong!", "Please insert correct password and email!");
//          }else{
            
//             const logInUserObject = {
//                userName: element.userName,
//                email: element.email,
//                password: element.password,
//             }
//            localStorage.setItem('logInUser', JSON.stringify(logInUserObject))
//            setTimeout(() => {
//             window.location.href ='../home/index.html'
//         }, 2000)
//          }
         
//       });
//    if(!logInUser){
//       alert('No user found')
//       window.location.href = '../signUp/index.html'
//    }
 
//  email.value = "";
//  password.value = "";
// })


const check = [
   {
      name: 'Umair',
   },
   {
      name: 'Habib',
   },
   {
      name: 'Talha',
   },
]
// check.filter((val) => {
//    if(val.name){
//       console.log(val.email);
//    }
// })
// console.log(check.name);

