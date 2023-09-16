writeDocumentPath("src/favorite/favorite.js");
writeDocumentPath("src/saveData/saveDataClass.js");

// document.write("<script src=\"src/favorite/favorite.js\" charset=\"utf-8\"></script>");
// document.write("<script src=\"src/saveData/saveDataClass.js\" charset=\"utf-8\"></script>");

// 保存要求
function requestSaveData() {
	var saveDatas = new SaveDatas();

	// 成功
	saveDatas.result = true;

	saveFavoriteData(saveDatas);

	return saveDatas;
}