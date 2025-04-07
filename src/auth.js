import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "firebase/auth";
import { auth, db } from "./config"; 
import { doc, setDoc, getDocs, collection } from "firebase/firestore"; 

onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log("Signed in user: ", user.email);
        await fetchUserData(user.uid);
    } else {
        console.log("Not signed in ");
    }
});

export function onUserChange(callback) {
    onAuthStateChanged(auth, async (user) => {
        callback(user);
    });
}

async function fetchUserData(userId) {
    try {
        const userDoc = await getDocs(collection(db, "users"));
        const userData = userDoc.docs.find(doc => doc.id === userId)?.data();
        console.log("User data: ", userData);
        document.getElementById("greetings").innerHTML = `<h1>Hello, ${userData.firstname}</h1>`;
    } catch (error) {
        console.error("Error fetching user data: ", error);
    }
} 

export async function signUp(firstName, lastName, email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up: ", userCredential.user.email);
        console.log("User ID: ", userCredential.user.uid);

        const userRef = doc(db, "users", userCredential.user.uid);

        await setDoc(userRef, {
            firstname: firstName,
            lastname: lastName,
            timestamp: new Date() 
        });

        window.location.href = "profile.html";
    } catch (error) {
        console.error("Error signing up: ", error);
    }
}

export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in: ", userCredential.user.email);

        window.location.href = "profile.html";
    } catch (error) {
        console.error("Login error: ", error);
    }
}

export async function logout() {
    try {
        await signOut(auth);
        console.log("User Logged Out");

        window.location.href = "index.html";
    } catch (error) {
        console.error("Logout error: ", error);
    }
}
