import { addDoc, app, auth, collection, createUserWithEmailAndPassword, db, doc, getDoc, onAuthStateChanged, setDoc, storage,ref,uploadBytesResumable,
    getDownloadURL } from '../utilize/firebaseConfig.js';

const signUpsubmitBtn = document.getElementById('btn');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const cPassword = document.getElementById('Cpassword');
const signUpHey = document.getElementById('signUpHey');
const loading = document.getElementById('myLoading')
const container = document.querySelector('.container');
const file =document.getElementById('uploadfile');

  onAuthStateChanged(auth, async(user) => {
    if (user) {
      const uid = user.uid;
      // ...
      const docRef = doc(db, "users", uid);
    // alert('User data already exist')
    const docSnap = await getDoc(docRef);
      window.location = '../home/index.html'
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      // window.location.pathname ='../signUp/index.html'
    }
  } else {
    // User is signed out
   
  }
});

const container1 = document.querySelector('.container1')
let circle = document.querySelector('.circle');
let circlValue = document.querySelector('.value');

// Profile image using data storage
const uplaodImageByBtn =  (file) => {
    return new Promise((resolve, reject)=> {

       const fileName = file.name;
       const storageRef = ref(storage, `users/fgfshat23${fileName.slice(fileName.lastIndexOf("."))}`);
       const uploadTask = uploadBytesResumable(storageRef, file);
       uploadTask.on('state_changed', 
       (snapshot) => {
    
     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     console.log('Upload is ' + progress + '% done');
     circle.style.background = `conic-gradient(#042e04 ${progress.toFixed() * 3.6}deg, #ededed 0deg)`;
     circlValue.innerHTML = progress + "%"

     switch (snapshot.state) {
       case 'paused':
         console.log('Upload is paused');
         break;
       case 'running':
         console.log('Upload is running');
         break;
     }
   }, 
   (error) => {
     reject(error)
   }, 
   () => {
     
     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
       resolve(downloadURL);
     });
   }
 );
    })
 }
 
 
//  const uploadBtn =document.getElementById('uploadBtn');
//  uploadBtn.addEventListener('click', uploadImage)
 
 
 const image = document.getElementById('image');
 
const myhandle = async () => {

  if (fullName.value == "" ||
  email.value == "" ||
  password.value == "" ||
  cPassword.value == ""||
  file.value == ""
  ) {
    alert('Plz fill the form correctly')
    return
  }
  if (password.value.length !== cPassword.value.length) {
    swal("Password and Confirm Password should be same");
    return
  }
  const userData = {
    userName: fullName.value,
    email: email.value,
    password: password.value,
    cPassword: cPassword.value,
    profileImage: await uplaodImageByBtn(file.files[0])

    
  }
  createUserWithEmailAndPassword(auth, userData.email, userData.password)
  .then(async (userCredential) => {
    // Signed up 
    const user = userCredential.user;
    try {
      const usersProfile =  await setDoc(doc(db, "users", user.uid), {
        ...userData,
        uid: user.uid,
      });
     
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        console.log(user, '====> users');
        // window.location.href = '../logIn/index.html'
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        // ..
      });
  // const localStore = JSON.parse(localStorage.getItem('usersDetail')) || [];
  //     console.log('chl rha');

  // else if (password.value.length<8){
  //       alert("Password should be minimum 8 characters long")
  // }

  //   else{

  // localStore.push(user)
  //   localStorage.setItem('usersDetail', JSON.stringify(localStore))
  //   setTimeout(() => {
  //       window.location.href ='../logIn/index.html'
  //   }, 2000)
  // }
  // fullName.value = '';
  //   email.value = '';
  //   password.value = '';
  //   cPassword.value = '';
}
signUpsubmitBtn.addEventListener('click', myhandle)
const logIn = document.getElementById('logIn');
logIn.addEventListener('click', function () {
  window.location.href = '../logIn/index.html'
})

