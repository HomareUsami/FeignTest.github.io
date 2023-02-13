///////////////////////////////////////////////////////////////////////////
//
// 情報変数
//
///////////////////////////////////////////////////////////////////////////
// 役職タイプ
var none = "none";
var crew = "crew";
var impostor = "impostor";
var neutral = "neutral";
var other = "other";

// 役職名
var mouse = "mouse";
var investigator = "investigator";
var police = "police";
var trapper = "trapper";
var lookout = "lookout";
var provocateur = "provocateur";
var stalker = "stalker";
var doctor = "doctor";
var cleaner = "cleaner";
var braemar = "braemar";
var serialKiller = "serialKiller";
var bomber = "bomber";
var thief = "thief";
var survivor = "survivor";
var magician = "magician";
var ghost = "ghost";
var fool = "fool";

// ?
var hatena = "hatena";

// 画像元となる参照先の文字列を取得
function getPostImageStr(post) {
    var str = "image/post/";
    str += post;
    str += ".png";
    return str;
}

// postData作成関数
function createPostData(postName, imageName, postTypeName) {
    return { post: postName, image: getPostImageStr(imageName), postType: postTypeName };
}

///////////////////////////////////////////////////////////////////////////
//
// 役職情報
//
///////////////////////////////////////////////////////////////////////////
// ?に関する役職情報
var hatenaImages = {
    Green: createPostData(hatena, "hatenaGreen", hatena),
    Red: createPostData(hatena, "hatenaRed", hatena),
    Yellow: createPostData(hatena, "hatenaYellow", hatena),
    Blue: createPostData(hatena, "hatenaBlue", hatena),
};

// 各役職の画像
// ねずみ
var mousePostImages = {
    none: createPostData(mouse, "nezumi1", none),
    impostor: createPostData(mouse, "nezumi2", impostor),
    crew: createPostData(mouse, "nezumi3", crew),
    neutral: null
};
// インベスティゲーター
var investigatorPostImages = {
    none: createPostData(investigator, "in1", none),
    impostor: createPostData(investigator, "in2", impostor),
    crew: createPostData(investigator, "in3", crew),
    neutral: null
};
// ポリス
var policePostImages = {
    none: createPostData(police, "pori1", none),
    impostor: createPostData(police, "pori2", impostor),
    crew: createPostData(police, "pori3", crew),
    neutral: null
};
// トラッパー
var trapperPostImages = {
    none: createPostData(trapper, "tora1", none),
    impostor: createPostData(trapper, "tora2", impostor),
    crew: createPostData(trapper, "tora3", crew),
    neutral: null
};
// ルックアウト
var lookoutPostImages = {
    none: createPostData(lookout, "me1", none),
    impostor: createPostData(lookout, "me2", impostor),
    crew: createPostData(lookout, "me3", crew),
    neutral: null
};
// 挑発者
var provocateurPostImages = {
    none: createPostData(provocateur, "ti1", none),
    impostor: createPostData(provocateur, "ti2", impostor),
    crew: createPostData(provocateur, "ti3", crew),
    neutral: null
};
// ストーカー
var stalkerPostImages = {
    none: createPostData(stalker, "suto1", none),
    impostor: createPostData(stalker, "suto2", impostor),
    crew: createPostData(stalker, "suto3", crew),
    neutral: null
};
// ドクター
var doctorPostImages = {
    none: createPostData(doctor, "do1", none),
    impostor: null,
    crew: createPostData(doctor, "do2", crew),
    neutral: null
};
// クリーナー
var cleanerPostImages = {
    none: createPostData(cleaner, "aka1", impostor),
    impostor: createPostData(cleaner, "aka1", impostor),
    crew: null,
    neutral: null
};
// ブレイマー
var braemarPostImages = {
    none: createPostData(braemar, "aka2", impostor),
    impostor: createPostData(braemar, "aka2", impostor),
    crew: null,
    neutral: null
};
// シリアルキラー
var serialKillerPostImages = {
    none: createPostData(serialKiller, "ao4", neutral),
    impostor: null,
    crew: null,
    neutral: createPostData(serialKiller, "ao4", neutral)
};
// ボマー
var bomberPostImages = {
    none: createPostData(bomber, "ao5", neutral),
    impostor: null,
    crew: null,
    neutral: createPostData(bomber, "ao5", neutral)
};
// シーフ
var thiefPostImages = {
    none: createPostData(thief, "ao6", neutral),
    impostor: null,
    crew: null,
    neutral: createPostData(thief, "ao6", neutral)
};
// サバイバー
var survivorPostImages = {
    none: createPostData(survivor, "ao3", neutral),
    impostor: null,
    crew: null,
    neutral: createPostData(survivor, "ao3", neutral)
};
// 魔術師
var magicianPostImages = {
    none: createPostData(magician, "ao2", neutral),
    impostor: null,
    crew: null,
    neutral: createPostData(magician, "ao2", neutral)
};
// ゴースト
var ghostPostImages = {
    none: createPostData(ghost, "ao1", neutral),
    impostor: null,
    crew: null,
    neutral: createPostData(ghost, "ao1", neutral)
};
// バカ
var foolPostImages = {
    none: createPostData(fool, "baka1", none),
    impostor: createPostData(fool, "baka2", impostor),
    crew: createPostData(fool, "baka3", crew),
    neutral: null
};

// 未選択
var noSelect = "noSelect";
var noSelectImage = createPostData(noSelect, noSelect, other);

// 真主張
var realClaim = "realClaim";
var realClaimImage = createPostData(realClaim, realClaim, other);

///////////////////////////////////////////////////////////////////////////
//
// 役職のタイプ別情報
//
///////////////////////////////////////////////////////////////////////////
// 役職一覧のpostType別区分
var postImageArrayByPostType = {
    none: [mousePostImages[none], investigatorPostImages[none], policePostImages[none], trapperPostImages[none], lookoutPostImages[none]
        , provocateurPostImages[none], stalkerPostImages[none], doctorPostImages[none], foolPostImages[none]
        , serialKillerPostImages[none], bomberPostImages[none], thiefPostImages[none], survivorPostImages[none], magicianPostImages[none] , ghostPostImages[none]
        , cleanerPostImages[none], braemarPostImages[none]
        , hatenaImages["Green"], hatenaImages["Red"], hatenaImages["Yellow"], hatenaImages["Blue"]],
    crew: [mousePostImages[crew], investigatorPostImages[crew], policePostImages[crew], trapperPostImages[crew], lookoutPostImages[crew]
        , provocateurPostImages[crew], stalkerPostImages[crew], doctorPostImages[crew], foolPostImages[crew]
        , hatenaImages["Green"], hatenaImages["Red"], hatenaImages["Yellow"], hatenaImages["Blue"]],
    impostor: [mousePostImages[impostor], investigatorPostImages[impostor], policePostImages[impostor], trapperPostImages[impostor], lookoutPostImages[impostor]
        , provocateurPostImages[impostor], stalkerPostImages[impostor], cleanerPostImages[impostor], braemarPostImages[impostor], foolPostImages[impostor]
        , hatenaImages["Green"],hatenaImages["Red"],hatenaImages["Yellow"],hatenaImages["Blue"]],
    neutral: [serialKillerPostImages[neutral], bomberPostImages[neutral], thiefPostImages[neutral], survivorPostImages[neutral], magicianPostImages[neutral]
        , ghostPostImages[neutral]
        , hatenaImages["Green"], hatenaImages["Red"], hatenaImages["Yellow"], hatenaImages["Blue"]],
	other: [realClaimImage, noSelectImage]
};

///////////////////////////////////////////////////////////////////////////
//
// 役職関連関数
//
///////////////////////////////////////////////////////////////////////////
// post image array get
function getPostImageArray(postType) {
    return postImageArrayByPostType[postType];
}
function getOtherPostImageArray() {
	return postImageArrayByPostType[other];
}
// post image
function setPostImageData(imageElement,imagePath) {
    if(imagePath != "") {
        imageElement.style.width = imageElement.style.height = defaultSize;
    } else {
        imageElement.style.width = "0px";
		imageElement.style.height = defaultSize;
    }
}