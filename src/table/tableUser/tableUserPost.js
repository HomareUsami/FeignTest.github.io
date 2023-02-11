// post javascript
document.write("<script src=\"src/post.js\" charset=\"utf-8\"></script>");
document.write("<script src=\"src/table/tableUserCommon.js\" charset=\"utf-8\"></script>");

var userPostTableRawId = "userPost";
var userPostImageId = "userPostImage";

// userPost設定テーブルデータの作成
function createUserPostTableData(userTableRawElement, user) {

    // 役職項目の入力欄を実装
    var userPostElement = userTableRawElement.appendChild(document.createElement("td"));
    userPostElement.id = userPostTableRawId;
    userPostElement.onclick = (clickEvent) => {
        window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
        openSelectWindow(userPostSelectElement);
    };

    // 役職のimage設定項目を設定
    var userPostImageElement = userPostElement.appendChild(document.createElement("img"));
    userPostImageElement.id = userPostImageId;
    userPostImageElement.src = "";
    userPostImageElement.draggable = false;
    setPostImageData(userPostImageElement, "");

    // image click処理
    var onImageClick = (clickEvent, postImageData) => {
        var postImage = clickEvent.currentTarget.src;
        userPostImageElement.src = postImage;
        setPostImageData(userPostImageElement, postImage);

        user.postType = postImageData.postType;
        user.post = postImageData.post;

        closeSelectWindow(userPostSelectElement);
    };

    // 役職用のselectWindowを作成
    var userPostSelectElement = appendChildSelectWindow(userPostElement);

    // 役職用のselectWindow以下に役職設定欄を作成
    createSelectPost(userPostSelectElement, onImageClick);
}