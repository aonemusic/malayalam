import { initPlayer, playTrack } from './player.js';
import { renderProfileUI } from './profile.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, updateProfile, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAthFMO8zGT5BtiOkh4zkc71jL06LR_F9c",
    authDomain: "a-one-chat-19ad6.firebaseapp.com",
    databaseURL: "https://a-one-chat-19ad6-default-rtdb.firebaseio.com",
    projectId: "a-one-chat-19ad6",
    storageBucket: "a-one-chat-19ad6.firebasestorage.app",
    messagingSenderId: "691783470864",
    appId: "1:691783470864:web:0b119fcddf984af66e5f95"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const rtdb = getDatabase(app);

// UI Initialize
document.getElementById('player-root').innerHTML = initPlayer();
document.getElementById('profile-root').innerHTML = renderProfileUI();

// --- ഫങ്ക്ഷനുകൾ വിൻഡോയിലേക്ക് ലിങ്ക് ചെയ്യുന്നു (HTML-ൽ വർക്ക് ചെയ്യാൻ) ---

// പ്രൊഫൈൽ തുറക്കാൻ
window.openMyProfile = () => {
    const user = auth.currentUser;
    if(!user) return alert("Please Login!");
    
    document.getElementById('profile-ui').style.display = 'block';
    document.getElementById('view-p-img').src = user.photoURL || 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
    document.getElementById('view-p-name').innerText = user.displayName || "User";
    
    // സ്വന്തം പ്രൊഫൈൽ ആയതുകൊണ്ട് എഡിറ്റ് ഓപ്ഷനുകൾ കാണിക്കുന്നു
    document.getElementById('edit-pic-btn').style.display = 'flex';
    document.getElementById('edit-name-btn').style.display = 'block';
    document.getElementById('fol-btn').style.display = 'none';
};

// ലോഗൗട്ട് ചെയ്യാൻ (Settings ബട്ടണിന് പകരം ഉപയോഗിക്കാം)
window.logout = () => {
    signOut(auth).then(() => location.reload());
};

// പ്രൊഫൈൽ അപ്ഡേറ്റ് ചെയ്യാൻ
window.updateUserInDB = async (data) => {
    if(auth.currentUser) {
        await updateProfile(auth.currentUser, data);
        alert("Updated!");
        location.reload();
    }
};

// --- മറ്റ് പ്രവർത്തനങ്ങൾ ---

onAuthStateChanged(auth, user => {
    if(user) {
        document.getElementById('my-avatar').src = user.photoURL || 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
        loadSongs();
    }
});

function loadSongs() {
    onValue(ref(rtdb, 'songs'), snap => {
        const list = document.getElementById('track-list');
        list.innerHTML = "";
        snap.forEach(child => {
            const s = child.val();
            const div = document.createElement('div');
            div.className = 'track-item';
            div.innerHTML = `<img src="${s.logo}"> <div><b>${s.title}</b><br><small>${s.up}</small></div>`;
            div.onclick = () => playTrack({id: child.key, ...s}, rtdb, auth);
            list.appendChild(div);
        });
    });
}
