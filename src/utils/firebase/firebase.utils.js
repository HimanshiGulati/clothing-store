import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAnlj0ZM4daQzDkbQiEtBv0E3ggn8oPLmI",
    authDomain: "clothing-store-db-e63da.firebaseapp.com",
    projectId: "clothing-store-db-e63da",
    storageBucket: "clothing-store-db-e63da.appspot.com",
    messagingSenderId: "608879031749",
    appId: "1:608879031749:web:4c677022389ef9dd8207ac"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(); // Google authentication setup
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); 

export const db = getFirestore();

export const creatUserDocumentFromAuth = async (userAuth) => { // used in sign in component
    const userDocRef = doc(db, 'users', userAuth.uid); //userAuth.uid is unique id returned by google after login with popup

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        }
        catch (error) {
            console.log('error creating the user', error.message)
        }
    }
    
    return userDocRef;
}