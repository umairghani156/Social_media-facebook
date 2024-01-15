import { addDoc, auth, collection, db, doc, getDoc, onAuthStateChanged, signOut, getDocs, deleteDoc, setDoc, ref, storage, uploadBytesResumable, getDownloadURL } from "../utilize/firebaseConfig.js";
import { uploadFile, addInDB, getAllDataOrderedByTimestamp, getData, arr, addInDB2 } from "../utilize/myUsage.mjs";
const imgInput = document.getElementById('input-file');
// Firebase working here
// Profile image js start from here
let profileImg = document.getElementById('profileImg');
let profileImg2 = document.getElementById('profileImg2');
let profileImg3 = document.getElementById('profileImg3');
let inputFile = document.getElementById('input-file');
const userPichey = document.querySelector('#userPichey');
const scrollBarProfileImg = document.getElementById('scrollBarProfileImg');
const createPostUser = document.getElementById('createPostUser');
const uploadImgSample = document.getElementById('uploadImgSample');
const addStoryImgTag = document.getElementById('addStoryImgTag');
const modalImgIcon = document.querySelector('.modalImgIcon');
const profileImg10 = document.getElementById('profileImg10');
const userName10 = document.getElementById('userName10');

//UserName Id here
const userNameInBar = document.getElementById('userNameInBar');
const searchUserName = document.getElementById('searchUserName');
const userName2 = document.getElementById('userName2');
let userEmail;
let userId;
let userProfileImg;
let storyUserName;
const check = () => {

  onAuthStateChanged(auth, async (user) => {
    userEmail = user.email
    if (user) {
      userId = user.uid;
      console.log('user ---->', user);
      console.log('userImg', user);

      // if (location.pathname !== '../home/index.html') {
      //   window.location = '../home/index.html'
      // }
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const { profileImage } = docSnap.data()
        const userName = `${docSnap.data().userName.slice(0, 1).toUpperCase()}${docSnap.data().userName.slice(1).toLowerCase()}`;
        userNameInBar.innerHTML = userName;
        searchUserName.innerHTML = userName;
        createPostUser.innerHTML = userName;
        console.log(userName);
        // userNameForStory = userName;
        userProfileImg = profileImage ? profileImage : './Assets/profile.jpg';
        userName2.innerHTML = userName;
        profileImg3.src = profileImage ? profileImage : './Assets/profile.jpg';
        profileImg2.src = profileImage ? profileImage : './Assets/profile.jpg';
        profileImg.src = profileImage ? profileImage : './Assets/profile.jpg';
        scrollBarProfileImg.src = profileImage ? profileImage : './Assets/profile.jpg';
        userPichey.src = profileImage ? profileImage : './Assets/profile.jpg';
        addStoryImgTag.src = profileImage ? profileImage : './Assets/profile.jpg';
        modalImgIcon.src = profileImage ? profileImage : './Assets/profile.jpg';
        profileImg10.src = profileImage ? profileImage : './Assets/profile.jpg';
        userName10.innerHTML = userName;
        console.log(userProfileImg);
        const spinnerSect2 = document.getElementById('spinnerSect2');
        const hiddenContainer = document.querySelector('.hiddenContainer');
        spinnerSect2.style.display = 'none';
        hiddenContainer.style.display = 'block'
      } else {
        // docSnap.data() will be undefined in this case

      }
    } else {
      console.log('not login');
      if (window.location.pathname !== '../login/index.html')
        window.location = '../signup/index.html'
    }
  });
}
check()




// displayUserProfile

const displayUserProfile = document.getElementById('displayUserProfile');
const sectionC = document.getElementById('sectionC');
const sectionA = document.getElementById('sectionA');
const spinner = document.getElementById('spinner');
window.myHandle1 = () => {
  sectionC.classList.remove('hidden');
  displayUserProfile.setAttribute('onclick', 'myHandle2()')
}
window.myHandle2 = () => {
  sectionC.classList.add('hidden');
  displayUserProfile.setAttribute('onclick', 'myHandle1()')
}
window.myHandle3 = () => {
  sectionC.classList.remove('hide');
  displayUserProfile.setAttribute('onclick', 'myHandle4()')
}
window.myHandle4 = () => {
  sectionC.classList.add('hidden');
  displayUserProfile.setAttribute('onclick', 'myHandle3()')
}

// Profile button 
const profileIdHandler = () => {
  window.location.href = '../Myfolder/index.html'
  console.log('chl rha ha');
}
const profileId = document.getElementById('profileId');
profileId.addEventListener('click', profileIdHandler)

//LogOut Btn
window.logOutHandler = () => {
  signOut(auth).then(() => {
    console.log('logOut Successfull');
    window.location.href = '../login/index.html'
  }).catch((error) => {
    // An error happened.
    console.log(error);
  });
}

// Navbar menu Hidden and Open
const menuHidden = document.getElementById('menuHidden');
menuHidden.addEventListener('click', function () {
  console.log('chl menu bhai');
  sectionA.style.display = 'block'
})
// Cross Icon
const crossIconHidden = document.getElementById('crossIconHidden');
crossIconHidden.addEventListener('click', function () {
  sectionA.style.display = 'none'
})
// searchBar 

const searchBar = document.querySelector('.searchBar');
const postCard2 = document.getElementById('postCard2')
searchBar.addEventListener('click', function () {
  postCard2.style.display = 'block';
  console.log('chl rha hn');
})
// Cross symbol for display none
const crossHandler = document.getElementById('crossHandler');
crossHandler.addEventListener('click', function () {
  postCard2.style.display = 'none'
})
// post display
const postInput = document.getElementById('postInput');
const postBtn = document.getElementById('postBtn');
const postCard = document.querySelector('.postCard');
let userData;
let userDetails;
// post 
// let postInput = document.getElementById('postInput')
// function myPostHandler() {

// }

// Post button Javascript
// let imageUrl;
// const postBtn = document.getElementById('postBtn');
// const postCard = document.querySelector('.postCard')
// const createPostUser = document.getElementById('createPostUser');
// const userNameInBar = document.getElementById('userNameInBar');
const btnParent = document.getElementById('btnParent')

const postDisplayHandler = async (uid) => {
  console.log("===>>> post display handler")
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

    myPostHandler(postsWithData)
  } else {
    console.log("===>>> posts not found")
  }
}

postDisplayHandler()
async function myPostHandler(textPass) {

  console.log(textPass, 'UserDetals I got');
  postCard.innerHTML = ''
  textPass.forEach(element => {
    const randomId = Date.now();
    let card;
    if (element?.imageUrl) {
      card = `
        <div class="card" id="postCard">
        <div class="displayPost">
            <div class="post">
            <img src="${element?.profileImage}" alt="" style="border-radius: 50%; width: 30px; height: 30px; margin-right: 5px" >
                <p>${element.userData.userName}</p>
            </div>
            <div class="postIcon">
            ${userEmail == element.userData?.email ? `<i class="fa-solid fa-ellipsis" id="editBtn" onclick="editBtnHandler('${element.id}')"></i>
            <i class="fa-solid fa-xmark" id="dltBtn" onclick="dltHandler('${element.id}')"></i>` : ''}  
                
            </div>
        </div>
        <p class="postPara">${element.post}</p>
        <div class="postPic m-2">
            <img class="userImg" id="imgUser" src="${element?.imageUrl}" alt=""  >
        </div>
        <p style="margin-left:10px;" class='likeBtn'></p>
        <!-- Like, comment and share -->
        <div class="likeAndComments m-2">
            <div class="thumb" id="likeBtn2">
                <i class="fa-regular fa-thumbs-up"></i>
                <p>Like</p>
            </div>
            <div class="thumb">
                <i class="fa-regular fa-comment"></i>
                <p>Comment</p>
            </div>
            <div class="thumb">
                <i class="fa-solid fa-square-arrow-up-right"></i>
                <p>Send</p>
            </div>
        </div>
    </div> `

    }
    else {
      card = `
                  <div class="card" id="postCard">
                            <div class="displayPost">
                                <div class="post">
                                <img src="${element.profileImage}" alt="" style="border-radius: 50%; width: 30px; height: 30px; margin-right: 5px">
                                <p>${element.userData.userName}</p>
                                </div>
                                <div class="postIcon">
                                ${userEmail == element.userData?.email ? `<i class="fa-solid fa-ellipsis" id="editBtn" onclick="editBtnHandler('${element.id}')"></i>
                                <i class="fa-solid fa-xmark" id="dltBtn" onclick="dltHandler('${element.id}')"></i>` : ''}  
                                    
                                </div>
                                
                            </div>
                            <p class="postPara">${element.post}</p>
                            <!-- Like, comment and share -->
                            <p style="margin-left:10px;" class='likeBtn'></p>
                            <div class="likeAndComments m-2">
                                <div class="thumb" id="likeBtn2">
                                    <i class="fa-regular fa-thumbs-up"></i>
                                    <p>Like</p>
                                </div>
                                <div class="thumb">
                                    <i class="fa-regular fa-comment"></i>
                                    <p>Comment</p>
                                </div>
                                <div class="thumb">
                                    <i class="fa-solid fa-square-arrow-up-right"></i>
                                    <p>Send</p>
                                </div>
                            </div>
                        </div> `
    }
    postCard.innerHTML += card
    postInput.value = ''
  });

  let index = 1;
  const likeBtn2 = document.querySelectorAll('#likeBtn2');
  likeBtn2.forEach((likeBtn) => {
    likeBtn.addEventListener('click', function (e) {
      console.log('Like');
      e.target.style.color = 'blue'
      e.target.parentElement.parentElement.previousElementSibling.innerHTML = '<i class="fa-regular fa-thumbs-up" style="color:blue;"></i>' + `${index++}`
      index = 1
    })
  })
  window.dltHandler = async (uid) => {
    console.log(uid, '------');
    const deleting = await deleteDoc(doc(db, "posts", uid));

  }


  const btn = document.querySelectorAll('#dltBtn');
  btn && btn.forEach((val) => {
    val.addEventListener('click', async function (e) {
      console.log(e.target.parentElement.parentElement.parentElement.remove());


    })
  })

  // Edit Btn Handler
  window.editBtnHandler = async (uid) => {
    console.log('edit handle working', uid);
    myEditCheck(uid)
  }
  async function myEditCheck(docId) {
    console.log('chl rha hn boss');
    postCard2.style.display = 'block';

    const filtered = textPass.find((val) => val.id == docId)
    console.log("filtere", filtered);

    // console.log(postBtnChanging);

    postInput.value = filtered.post;
    postBtn.style.display = 'none'
    console.log(btnParent);
    postInput.value = filtered.post
    btnParent.innerHTML = '<button type="button" class="btn btn-success" id ="edit"> Edit </button>'
    const editBtn = document.getElementById('edit');
    console.log(editBtn);
    editBtn.setAttribute('onclick', `editHandlerFunc('${docId}')`)

    window.editHandlerFunc = async (docId) => {
      console.log('Shukr he ', docId);
      console.log('hi there', filtered);
      let userPosts;
      const imageName = `${new Date().getTime()}-${imgInput.files[0]?.name}`
      if (filtered?.imageUrl) {
        userPosts = {
          authorId: filtered.authorId,
          post: postInput.value,
          timestamp: filtered.timestamp,
          imageUrl: await uploadFile(imgInput.files[0], imageName),
          id: docId,
          userData: filtered.userData,
        }
      } else {
        userPosts = {
          authorId: filtered.authorId,
          post: postInput.value,
          timestamp: filtered.timestamp,
          id: docId,
          userData: filtered.userData,
        }
      }
      const checkKrnaHey = await setDoc(doc(db, "posts", docId), userPosts);
      postDisplayHandler()
      editBtn.style.display = 'none';
      postInput.value = '';
      btnParent.firstElementChild.remove();
      btnParent.innerHTML = '<button type="button" class="btn postBtnChanging" id="postBtn" >Post</button>';
      const postBtn = document.getElementById('postBtn');
      postBtn.setAttribute('onclick', `displayPost()`)
    }
  }


}



window.displayPost = async () => {
  console.log("===>>> post submit handler")
  // if (!postInput.value) {
  //   alert("Please enter post")
  //   return
  // }

  const data = {
    post: postInput.value,
    authorId: userId,
    profileImage: userProfileImg
  }

  // upload image to storage
  spinner.style.display = 'block'
  spinner.style.margin = '20px auto'
  if (imgInput.files[0]) {
    const imageName = `${new Date().getTime()}-${imgInput.files[0].name}`
    const upload = await uploadFile(imgInput.files[0], imageName)
    console.log('file showing ---->', upload);
    uploadImgSample.src = upload.downloadURL;
    if (upload.status) {
      data.imageUrl = upload.downloadURL
      alert(upload.message)
    } else {
      alert(upload.message)
    }
  }


  const postAddInDB = await addInDB(data, "posts")
  if (postAddInDB.status) {
    console.log('working on id', postAddInDB);
    spinner.style.display = 'none'
    postInput.value = "";
    imgInput.value = "";
    uploadImage.src = '';
    postDisplayHandler(postAddInDB)
  } else {
    alert(postAddInDB.message)
  }
}

postBtn && postBtn.addEventListener('click', displayPost)


// Upload image Handler
const uploadImage = document.getElementById('uploadImage');
uploadImage.addEventListener('click', function () {
  console.log('chl tu rha hn bhai');
})


/*
const user = auth.currentUser;
let userObj;
if (user.uid === auth.currentUser.uid) {
// User is signed in, see docs for a list of available properties
// https://firebase.google.com/docs/reference/js/auth.user
// ...
console.log(user, 'current user');
const docRef = doc(db, "users", user.uid);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
 console.log("Document data:", docSnap.data());
const {userName, email, uid, password} = await docSnap.data()
 // const userName= `${docSnap.data().userName.slice(0, 1).toUpperCase()}${docSnap.data().userName.slice(1).toLowerCase()}`;
 console.log(userName, 'User name agiya he');
 userObj={
     userName: userName,
     email: email,
     uid: uid,
     password: password
 }
} else {
 // docSnap.data() will be undefined in this case
 console.log("No such document!");
}
} else {
// No user is signed in.
console.log('No user found');

}
 let obj = {
     userText: postInput.value,
     userDetails: userObj,
     
 }
 try {
     if(imgInput.files[0]){ 
     const imageName = `${new Date().getTime()}-${imgInput.files[0].name}`
     const upload = await uploadFile(obj, imageName)
     console.log("Document written with ID: ", docRef.id);
     userId = docRef.id;
     if (upload.status) {
         data.imageUrl = upload.downloadURL
         alert(upload.message)
       } else {
         alert(upload.message)
       }
     }
     // if(docRef){
     //     checkOut()
     // }
   } catch (e) {
     console.error("Error adding document: ", e);
   }
   */

/*  check function
 postCard.innerHTML = ''
   try{
       
       const querySnapshot = await getDocs(collection(db, 'posts'));
       if(querySnapshot){
           querySnapshot.forEach( async(doc) => {
               // doc.data() is never undefined for query doc snapshots
               console.log(doc.id, " => ", doc.data());
               console.log('Umair mila?',doc.data());
               if(doc.data() == undefined){
                   return false
               }else{
               userDetails = await myPostHandler(doc.data());
               
               }
           });
       }else{
           console.log('no documents available');
       }
   }catch(error){
      console.log(error.message);
   }
   */

const container1 = document.querySelector('.container1')
let circle = document.querySelector('.circle');
let circlValue = document.querySelector('.value');
const parentStoryImage = document.getElementById('parentStoryImage');


// Story Image Getting
const storyUploadHandler  = async (data) => {
  // console.log('working', data);
  const posts = await getAllDataOrderedByTimestamp("storyPic")
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
      console.log('hello 3', postWithUserData);
      return postWithUserData;
    });

    // Wait for all promises to resolve
    const postsWithData = await Promise.all(postsWithDataPromises);

    console.log("===>>> posts with data", postsWithData)

    // Upload post 



    uploadIng(postsWithData)
  } else {
    console.log("===>>> posts not found")
  }
}
storyUploadHandler()
async function uploadIng(data) {
  console.log("hello", data);
  parentStoryImage.innerHTML = "";
  let card;
  data.forEach((elem) => {
    card = `
      <div class="card slide1 position-relative " style="width: 10rem; height: 250px;">
                              <img src="${elem.imgUrl}" alt="..."
                                  id="addStoryPhotoUpload">
                              <div class="card-body d-flex flex-column align-items-center position-absolute  ">
                                  <button class="btn btn-primary " id="addStoryPhoto"><img src="${elem.profileImg}"
                                          width="30px" height='30px' alt="" style="border-radius: 50%;"></button>
                                  <p class="card-title" id="addStoryName"></p>
                              </div>
                          </div>`
    parentStoryImage.innerHTML += card
  });



}
const uplaodImageByBtn = (file) => {
  return new Promise((resolve, reject) => {

    const fileName = file.name;
    const randomId = new Date().getTime()
    const storageRef = ref(storage, `${randomId}-${fileName.slice(fileName.lastIndexOf("."))}`);
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
const container4 = document.querySelector('.container4');
const modal4 = document.querySelector('.modal4');
const uplImage = document.getElementById('uplImgae');
const addStoryhandler = async () => {
  const storyupdata = document.getElementById('storyupdata')
  container4.style.display = 'flex';
  console.log('btn chl rha he');
  const check1 = await uplaodImageByBtn(storyupdata.files[0]);
  modal4.style.display = 'block';
  uplImage.src = check1
  console.log(check1);
  // object
  const data = {
    imgUrl: check1,
    profileImg: userProfileImg,
    // userName: storyUserName,
  }
  // uploadNow
  const uploadNowBtn = document.getElementById('uploadNowBtn');
  uploadNowBtn.addEventListener('click', async function () {
    console.log('chl rga n');
    const postAddInDB = await addInDB2(data, "storyPic")
    if (postAddInDB.status) {
      console.log('working on id', postAddInDB);
      spinner.style.display = 'none'
      postInput.value = "";
      imgInput.value = "";
      uploadImage.src = '';
      storyUploadHandler(postAddInDB)
    } else {
      modal4.style.display = 'none'
      alert(postAddInDB.message)
    }
    swal("Good job!", "Image Uploaded!", "success");

  })
}
const checkOutUpload = document.getElementById('checkOutUpload');
checkOutUpload.addEventListener('click', addStoryhandler);



const uploadNowBtn = document.getElementById('uploadNowBtn');
uploadNowBtn.addEventListener('click', function () {
  setTimeout(() => {
    modal4.style.display = 'none'
  }, 3000)
})