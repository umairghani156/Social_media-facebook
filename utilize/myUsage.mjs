import{addDoc, collection, db, doc, getDoc, getDownloadURL, ref, serverTimestamp, storage, uploadBytes, query ,orderBy, getDocs} from '../utilize/firebaseConfig.js';


const getData = async (id, collectionName) => {
    try {
        //getting data from db and calling firebase db function
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return {
                status: true,
                message: "Data found",
                data: docSnap.data()
            }
        } else {
            return {
                status: false,
                message: "No such document!",
            }
        }
    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}

const getAllDataOrderedByTimestamp = async (collectionName) => {
    try {
        // Creating a query to order the data by timestamp
        const q = query(collection(db, collectionName), orderBy('timestamp'));
        const posts =[];
        // Getting data from db ordered by timestamp
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const data = querySnapshot.docs.map(doc => {
                console.log(doc)
                const singlePost = doc.data();
                posts.push({...singlePost, id:doc.id,})
            });
            return {
                status: true,
                message: "Data found",
                data: posts,
            };
        } else {
            return {
                status: false,
                message: "No documents found!",
            };
        }
    } catch (error) {
        return {
            status: false,
            message: error.message
        };
    }
};




const arr = [];
const addInDB = async (data, collectionName) => {
    try {
        // Add a timestamp to the data
        const dataWithTimestamp = {
            ...data,
            timestamp: serverTimestamp(),
        };
        //adding data in db and calling firebase db function
        const addData = await addDoc(collection(db, collectionName), dataWithTimestamp);
        
        return {
            status: true,
            message: "Data added successfully",
            data: addData,
            userId: addData.id
        }
    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}
const addInDB2 = async (data, collectionName) => {
    try {
        // Add a timestamp to the data
        const dataWithTimestamp = {
            ...data,
            timestamp: serverTimestamp(),
        };
        //adding data in db and calling firebase db function
        const addData = await addDoc(collection(db, collectionName), dataWithTimestamp);
        
        return {
            status: true,
            message: "Data added successfully",
            data: addData,
            userId: addData.id
        }
    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}

const uploadFile = async (file, fileName) => {
    try {
        // Create a storage reference with the specified file name
        const storageRef = ref(storage, fileName);

        // Upload the file to Firebase Storage
        const snapshot = await uploadBytes(storageRef, file);

        // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log(downloadURL, "=====================downloadURL")

        return {
            status: true,
            message: "File uploaded successfully",
            downloadURL: downloadURL
        };
    } catch (error) {
        return {
            status: false,
            message: error.message
        };
    }
};

// const deleteHandler = async(post) => {
//   return post.data.authorId
// }
export {uploadFile, addInDB, getAllDataOrderedByTimestamp, getData, arr, addInDB2}