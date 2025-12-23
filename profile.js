export function renderProfileUI() {
    return `
    <div id="profile-ui" class="overlay">
        <i class="fas fa-times" onclick="this.parentElement.style.display='none'" style="font-size:1.5em; cursor:pointer;"></i>
        <div style="text-align:center; padding:20px;">
            <img id="view-p-img" style="width:100px; height:100px; border-radius:50%; border:3px solid #1DB954; object-fit:cover;">
            <h2 id="view-p-name"></h2>
            <p id="view-p-fol">0 Followers</p>
            <button class="btn" id="fol-btn" style="width:120px; border-radius:20px;">Follow</button>
        </div>
        <div id="user-songs-list"></div>
    </div>`;
}
