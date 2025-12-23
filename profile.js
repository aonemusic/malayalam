// പ്രൊഫൈൽ പേജും എഡിറ്റിംഗ് സൗകര്യവും
export function renderProfileUI() {
    return `
    <div id="profile-ui" class="overlay">
        <div style="padding: 20px;">
            <i class="fas fa-arrow-left" onclick="document.getElementById('profile-ui').style.display='none'" style="font-size:1.4em; cursor:pointer; color:#fff;"></i>
            
            <div style="text-align:center; margin-top:20px;">
                <div style="position:relative; display:inline-block;">
                    <img id="view-p-img" style="width:110px; height:110px; border-radius:50%; border:3px solid #1DB954; object-fit:cover;">
                    <div id="edit-pic-btn" style="position:absolute; bottom:0; right:0; background:#1DB954; width:30px; height:30px; border-radius:50%; display:none; align-items:center; justify-content:center; cursor:pointer;" onclick="changeProfilePic()">
                        <i class="fas fa-camera" style="font-size:0.8em; color:#000;"></i>
                    </div>
                </div>

                <div style="display:flex; align-items:center; justify-content:center; gap:10px; margin-top:15px;">
                    <h2 id="view-p-name" style="margin:0;"></h2>
                    <i id="edit-name-btn" class="fas fa-pen" style="font-size:0.9em; color:#888; cursor:pointer; display:none;" onclick="editUsername()"></i>
                </div>

                <p id="view-p-fol" style="color:#888; font-size:0.9em; margin-top:5px;">0 Followers</p>
                
                <button id="fol-btn" class="btn" style="width:130px; border-radius:25px; margin-top:15px; display:none;">Follow</button>
            </div>

            <hr style="border:0.1px solid #27272a; margin:25px 0;">
            <h4 style="margin-left:10px;">Tracks</h4>
            <div id="user-songs-list"></div>
        </div>
    </div>`;
}

// പ്രൊഫൈൽ പിക്ചർ മാറ്റാനുള്ള ഫങ്ക്ഷൻ (Cloudinary ഉപയോഗിക്കുന്നു)
window.changeProfilePic = () => {
    cloudinary.openUploadWidget({ cloudName: "dcsczlahu", uploadPreset: "ml_default", resourceType: "image" }, (err, res) => {
        if (!err && res.event === "success") {
            const newPhotoUrl = res.info.secure_url;
            document.getElementById('view-p-img').src = newPhotoUrl;
            // ഈ ലിങ്ക് പിന്നീട് Firebase-ൽ അപ്‌ഡേറ്റ് ചെയ്യാൻ main.js-ലേക്ക് അയക്കാം
            window.updateUserInDB({ photoURL: newPhotoUrl });
        }
    });
};

// പേര് മാറ്റാനുള്ള ഫങ്ക്ഷൻ
window.editUsername = () => {
    const oldName = document.getElementById('view-p-name').innerText;
    const newName = prompt("Enter new username:", oldName);
    if (newName && newName !== oldName) {
        document.getElementById('view-p-name').innerText = newName;
        window.updateUserInDB({ displayName: newName });
    }
};
