import { auth, db, doc, getDoc, onAuthStateChanged, sendEmailVerification, setDoc, updateEmail } from "../utilize/firebaseConfig.js";
import { addInDB2, getAllDataOrderedByTimestamp, getData } from "../utilize/myUsage.mjs";

// User Profiles Details Id
const email1 = document.getElementById('email');
const pNumber1 = document.getElementById('pNumber');
const hobbies1 = document.getElementById('hobbies');
const desc1 = document.getElementById('desc');
const userName1 = document.getElementById('userName1')
const userName2 = document.getElementById('userName2')

// Modal Inputbar Id
const userName3 = document.getElementById('userName3');
const email3 = document.getElementById('email3');
const pNumber3 = document.getElementById('pNumber3');
const hobbies3 = document.getElementById('hobbies3');
const desc3 = document.getElementById('desc3');
const userImg3 = document.getElementById('userImg3');
const userPostContainer = document.getElementById('userPostContainer');
const profileImgDone = document.getElementById('profileImgDone');
const profileImgNav = document.getElementById('profileImg');


let uid;
let useremail;
let userProfileImg;
const stateChangeFunc = async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      uid = user.uid;
      console.log('user ====>', user);
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      // if(!user.emailVerified){
      //   sendEmailVerification(auth.currentUser)
      //   .then(() => {
      //       console.log('Email sent');
      //     });
      // }
      console.log(docSnap);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const { userName, email, pNumber, hobbies, desc, profileImage } = docSnap.data();
        console.log(userName);
        //   const userProfileName = `${userName.slice(0, 1).toUpperCase()}${userName.slice(1).toLowerCase()}`
        userName1.innerHTML = userName ? userName : 'No user name';
        email1.innerHTML = email ? email : 'No email updated';
        pNumber1.innerHTML = pNumber ? pNumber : 'No Phone number';
        hobbies1.innerHTML = hobbies ? hobbies : 'No hobbies ';
        desc1.innerHTML = desc ? desc : 'Leave a description here';
        userName3.value = userName ? userName : "";
        email3.value = email ? email : '';
        pNumber3.value = pNumber ? pNumber : '';
        hobbies3.value = hobbies ? hobbies : '';
        desc3.value = desc ? desc : "";
        useremail = email;
        profileImgDone.src = profileImage ? profileImage : './profile.jpg';
        profileImgNav.src = profileImage ? profileImage : './profile.jpg';

        //   userImg3.value = profileUrl ? profileUrl : '';
        //    desc2.innerHTML = 
        //   userProfileImg.innerHTML = 
        profileImgDone.className = 'show'
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


// Submit Function
const updateHandler = async () => {
  const userObj = {
    userName: userName3.value,
    email: email3.value,
    pNumber: pNumber3.value,
    hobbies: hobbies3.value,
    desc: desc3.value,
    profileImage: userProfileImg,
    uid: uid
  }
  console.log(userObj);
  await setDoc(doc(db, "users", uid), userObj);
  const allFuncChange = await stateChangeFunc();
  //   const emailChange = await updateEmailHnadler(userObj.email)
}
const updateBtn = document.getElementById('updateBtn');
updateBtn.addEventListener('click', updateHandler)


// Log Out Btn
const logOutBtn = document.getElementById('logOutBtn');

// Profile logOut and Home LisT
const profileLogOuT = document.getElementById('profileLogOuT');
const displayUserProfile = document.getElementById('displayUserProfile');
displayUserProfile.addEventListener('click', function(){
  profileLogOuT.style.display = 'block'
  setTimeout(() => {
    profileLogOuT.style.display = 'none'
  }, 5000);
})


// Home directory btn
const homebtn = document.getElementById('homebtn');
homebtn.addEventListener('click', function(){
   window.location.href = '../home/index.html'
})
const logOutOne = document.getElementById('logOutOne');


// const homeBtn = document.getElementById('homeBtn');
// homeBtn.addEventListener('click', homeHandlerBtn)


// Profile image using data storage
/*
const uplaodImageByBtn =  (file) => {
    return new Promise((resolve, reject)=> {
       const fileName = file.name;
       const storageRef = ref(storage, `users/5676gghj${fileName.slice(fileName.lastIndexOf("."))}`);
       const uploadTask = uploadBytesResumable(storageRef, file);
       uploadTask.on('state_changed', 
       (snapshot) => {
    
     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     console.log('Upload is ' + progress + '% done');
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
 const image2 = document.getElementById('image2');
 const uploadImage = async() => {
    const file =document.getElementById('file');
    const check = await uplaodImageByBtn(file.files[0])
    console.log('url=== >', check);
    image2.src = check
 }
 
//  const uploadBtn =document.getElementById('uploadBtn');
//  updateBtn&&uploadBtn.addEventListener('click', uploadImage)
 
 
 const image = document.getElementById('image');
 const imageShow = (e) => {
    image.src = URL.createObjectURL(e.target.files[0])
 }
 file.addEventListener('change', imageShow)
*/

const postShow = async () => {
  const posts = await getAllDataOrderedByTimestamp("posts")
  console.log("===>>> posts", posts)
  if (posts.status) {

    // Use Promise.all to await all promises in the loop
    const postsWithDataPromises = posts.data.map(async (post) => {
      const userData = await getData(post.authorId, "users");

      // console.log(userData, "===>>userData")

      // Add user data to the post
      const postWithUserData = {
        ...post,
        userData: userData ? userData.data : null,
      };

      return postWithUserData;
    });

    // Wait for all promises to resolve
    const postsWithData = await Promise.all(postsWithDataPromises);

    console.log("===>>> posts with data", postsWithData)
    postFunc(postsWithData)

  } else {
    console.log("===>>> posts not found")
  }
}
postShow()
async function postFunc(data) {
  userPostContainer.innerHTML = ""
  data.forEach(element => {
    console.log(element);
    let card;
    if (element.userData.email === useremail) {
      if (element?.imageUrl) {
        card = `
        <div class="card mt-4 " id="cardWala2" >
                        <div class="firstLine d-flex justify-content-between align-content-center m-1 ">
                            <div class=" " id="userId">
                                <img src="${userProfileImg}" alt="" width="40px">
                                <span id="userName2">${element.userData.userName}</span>
                            </div>
                            <div class="userBar">
                                <i class="fa-solid fa-ellipsis fs-4 "></i>
                            </div>
                        </div>

                        <p class="card-title mt-2 " style="margin-left: 10px;">${element.post}</p>
                        <img src="${element?.imageUrl}" alt="" >
                        <div class="comments d-flex justify-content-between border-top-1">
                            <button type="button" class="btn btn-light"><i
                                    class="fa-solid fa-thumbs-up"></i><span>Like</span></button>
                            <button type="button" class="btn btn-light"><i
                                    class="fa-solid fa-comment"></i><span>Comment</span></button>
                            <button type="button" class="btn btn-light"><i
                                    class="fa-solid fa-share"></i><span>Share</span></button>
                        </div>
                    </div>`
      } else {
        card = `
      <div class="card m-4 " id="cardWala2" >
                      <div class="firstLine d-flex justify-content-between align-content-center m-1 ">
                          <div class=" " id="userId">
                              <img src="./profile.jpg" alt="" width="40px">
                              <span id="userName2">${element.userData.userName}</span>
                          </div>
                          <div class="userBar">
                              <i class="fa-solid fa-ellipsis fs-4 "></i>
                          </div>
                      </div>

                      <p class="card-title mt-2 " style="margin-left: 10px;">${element.post}</p>
                      <div class="comments d-flex justify-content-between border-top-1">
                          <button type="button" class="btn btn-light"><i
                                  class="fa-solid fa-thumbs-up"></i><span>Like</span></button>
                          <button type="button" class="btn btn-light"><i
                                  class="fa-solid fa-comment"></i><span>Comment</span></button>
                          <button type="button" class="btn btn-light"><i
                                  class="fa-solid fa-share"></i><span>Share</span></button>
                      </div>
                  </div>`
      }
      userPostContainer.innerHTML += card;
    }
  });
}

// User Extra Information Tag Ids
const userExper1 = document.getElementById('userExper1');
const userExper2 = document.getElementById('userExper2');
const userExper3 = document.getElementById('userExper3');
const userExper4 = document.getElementById('userExper4');
const postInformation = async () => {
  const docRef = doc(db, "extraInfor", "5170978");
  const docSnap = await getDoc(docRef);
  console.log(docSnap);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    const userPosts = docSnap.data()
    userExper1.innerText = userPosts.profession;
    userExper2.innerText = userPosts.education;
    userExper3.innerText = userPosts.residence;
    userExper4.innerText = userPosts.locationAdre;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}
postInformation()
const profession = document.getElementById('profession');
const education = document.getElementById('education');
const residence = document.getElementById('residence');
const locationAdre = document.getElementById('locationAdre');
const updateExtraInfor = async () => {
  console.log('chl rha');
  const data = {
    profession: profession.value,
    education: education.value,
    residence: residence.value,
    locationAdre: locationAdre.value,
  }
  console.log("data", data);
  const userData = await setDoc(doc(db, "extraInfor", "5170978"), data);
}



const saveBtn = document.getElementById('saveBtn');
saveBtn.addEventListener('click', updateExtraInfor)