import { onUserChange } from "./auth"; 
import { db } from "./config";
import { collection, addDoc, deleteDoc, onSnapshot, doc } from "firebase/firestore";

document.addEventListener("DOMContentLoaded", () => {
    const songForm = document.getElementById("songForm");
    const songNameInput = document.getElementById("songName");
    const songList = document.getElementById("songList");

    let currentUserId = null; 

    async function addSong(songName, userId) {
        if (!userId) return;
        try {
            await addDoc(collection(db, "users", userId, "songs"), {
                name: songName,
                timestamp: new Date()
            });
        } catch (error) {
            console.error("Error adding song:", error);
        }
    }

    async function deleteSong(songId, userId) {
        if (!userId) return;
        try {
            await deleteDoc(doc(db, "users", userId, "songs", songId));
            console.log(`Song with id ${songId} has been deleted from Firebase`);
        } catch (error) {
            console.error("Error deleting song:", error);
        }
    }

    function listenForSongs(userId) {
        const songsRef = collection(db, "users", userId, "songs");
        onSnapshot(songsRef, (snapshot) => {
            songList.innerHTML = "";
            snapshot.forEach((docSnapshot) => {
                const songData = docSnapshot.data();
                const listItem = document.createElement("li");

                const songText = document.createElement("span");
                songText.textContent = songData.name;
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.setAttribute("data-id", docSnapshot.id);
                deleteBtn.addEventListener("click", () => {
                    deleteSong(docSnapshot.id, userId);
                });

                listItem.appendChild(songText);
                listItem.appendChild(deleteBtn);

                songList.appendChild(listItem);
            });
        });
    }

    songForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const songName = songNameInput.value.trim();
        if (songName && currentUserId) {
            addSong(songName, currentUserId);
            songNameInput.value = ""; 
        } else {
            console.log("Either songName is empty or user is not logged in");
        }
    });

    onUserChange((user) => {
        if (user) {
            currentUserId = user.uid;
            document.getElementById("greetings").innerHTML = `<h1>Hello, ${user.displayName || "User"}!</h1>`;
            listenForSongs(user.uid);
        } else {
            currentUserId = null;
            document.getElementById("greetings").innerHTML = "<h1>Please log in.</h1>";
        }
    });
});
