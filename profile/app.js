import { auth, db, doc, getDoc, onAuthStateChanged, sendEmailVerification, setDoc, updateEmail } from "../utilize/firebaseConfig.js";

// Ids here
const desc2 = document.getElementById('desc');
const email2 = document.getElementById('email');
const pNumber2 = document.getElementById('pNumber');
const hobbies2 = document.getElementById('hobbies');
const userProfileImg = document.getElementById('userProfileImg');
const userName5 = document.getElementById('userName5');


// desc2.textContent = desc? desc  : 'No User description';
// email2.textContent = email ? email : 'No Email';
// pNumber2.textContent = pNumber? pNumber : 'No phone number';
// hobbies2.textContent = hobbies ? hobbies : 'No hobbies ';


// if(profileUrl){
//   userProfileImg.src = profileUrl
// }else{
//   userProfileImg.src = './Assets/profile.jpg'
// }
// Modal Inputbar Id
const userName3 = document.getElementById('userName3');
const email3 = document.getElementById('email3');
const pNumber3 = document.getElementById('pNumber3');
const hobbies3 = document.getElementById('hobbies3');
const desc3 = document.getElementById('desc3');
const userImg3 = document.getElementById('userImg3');

//Getting documents from firebase
const spinnerId = document.getElementById('spinnerId');
const containerParent = document.getElementById('containerParent');
// setTimeout(() => {
//   spinnerId.style.display = 'none';
//   containerParent.style.display = 'block'
// }, 2000)
let uid ;

// Update email
const updateEmailHnadler = async(email) => {
  updateEmail(auth.currentUser, email).then(() => {
    // Email updated!
    console.log('Email updated');
  }).catch((error) => {
    // An error occurred
    console.log(error.message);
  });
}
const stateChangeFunc = async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      uid = user.uid;
      console.log('user ====>', user);
      spinnerId.style.display = 'none';
      containerParent.style.display = 'flex'
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if(!user.emailVerified){
        sendEmailVerification(auth.currentUser)
        .then(() => {
            console.log('Email sent');
          });
      }
      
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const {userName, email, pNumber, profileUrl, hobbies, desc} = docSnap.data();
        const userProfileName = `${userName.slice(0, 1).toUpperCase()}${userName.slice(1).toLowerCase()}`
        userName5.innerHTML = userProfileName ? userProfileName : 'No user name';
        email2.innerHTML = email ? email : 'No email updated';
        pNumber2.innerHTML = pNumber ? pNumber : 'No Phone number';
        hobbies2.innerHTML = hobbies ? hobbies : 'No hobbies ';
        userProfileImg.src = profileUrl ? profileUrl : './Assets/profile.jpg';
        desc2.innerHTML = desc ? desc : 'No description';
        userName3.value = userName ? userName : "";
        email3.value = email ? email : '';
        pNumber3.value = pNumber ? pNumber : '';
        hobbies3.value = hobbies ? hobbies : '';
        desc3.value = desc ? desc : "";
        userImg3.value = profileUrl ? profileUrl : '';
        //    desc2.innerHTML = 
        //   userProfileImg.innerHTML = 
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
}
stateChangeFunc()





const updateHandler =async () => {
     const userObj = {
      userName: userName3.value,
      email: email3.value,
      pNumber: pNumber3.value,
      hobbies: hobbies3.value,
      profileUrl: userImg3.value,
      desc: desc3.value,
      uid: uid
     }
   console.log(userObj);
   await setDoc(doc(db, "users", uid), userObj);
   const allFuncChange = await stateChangeFunc();
   const emailChange = await updateEmailHnadler(userObj.email)
}
const updateBtn = document.getElementById('updateBtn');
updateBtn.addEventListener('click', updateHandler)

/*
// logOut Handler and Image Icon event
const imgIcon = document.getElementById('imgIcon');
const logOutBar = document.getElementById('logOutBar')
const homePageBar = document.getElementById('homePageBar')
const logId = document.getElementById('logId')
imgIcon.addEventListener('click', function(){
  console.log('chl tu rha hn');
  logOutBar.style.transform = 'translate(-100px)'
 
})

homePageBar.addEventListener('click', function(){
  swal("Diverting to Home page");
  window.location.href = '../home/index.html'
})

logId.addEventListener('click', function(){
  localStorage.removeItem('logInUser')
  window.location.href = '../logIn/index.html'
})
*/