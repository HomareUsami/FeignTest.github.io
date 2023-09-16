// post javascript
writeDocumentPath("src/post.js");
writeDocumentPath("src/table/tableUser/tableUserCommon.js");

// document.write("<script src=\"src/post.js\" charset=\"utf-8\"></script>");
// document.write("<script src=\"src/table/tableUser/tableUserCommon.js\" charset=\"utf-8\"></script>");

var userPostTableRawId = "userPost";
var userPostImageId = "userPostImage";

var userRealPostTableRawId = "userRealPost";
var userRealPostImageId = "userRealPostImage";

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
		if(postImageData.post == noSelect) postImage = "";
        userPostImageElement.src = postImage;
        setPostImageData(userPostImageElement, postImage);

        user.postType = postImageData.postType;
        user.post = postImageData.post;

        closeSelectWindow(userPostSelectElement);
    };

    // 役職用のselectWindowを作成
    var userPostSelectElement = appendChildSelectWindow(userPostElement);

    // 役職用のselectWindow以下に役職設定欄を作成
	createSelectPost(userPostSelectElement, onImageClick, true);
}

// 確定役職欄
function createUserRealPostTableData(userTableRawElement, user) {

    // 役職項目の入力欄を実装
    var userRealPostElement = userTableRawElement.appendChild(document.createElement("td"));
    userRealPostElement.id = userRealPostTableRawId;
    userRealPostElement.onclick = (clickEvent) => {
        window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
        openSelectWindow(userRealPostSelectElement);
    };

    // 役職のimage設定項目を設定
    var userRealPostImageElement = userRealPostElement.appendChild(document.createElement("img"));
    userRealPostImageElement.id = userRealPostImageId;
    userRealPostImageElement.src = "";
    userRealPostImageElement.draggable = false;
    setPostImageData(userRealPostImageElement, "");

    // image click処理
    var onImageClick = (clickEvent, postImageData) => {
        var postImage = clickEvent.currentTarget.src;
		if(postImageData.post == noSelect) postImage = "";
        userRealPostImageElement.src = postImage;
        setPostImageData(userRealPostImageElement, postImage);
        closeSelectWindow(userRealPostSelectElement);
    };

    // 役職用のselectWindowを作成
    var userRealPostSelectElement = appendChildSelectWindow(userRealPostElement);

    // 役職用のselectWindow以下に役職設定欄を作成
	createSelectPost(userRealPostSelectElement, onImageClick, true);
}