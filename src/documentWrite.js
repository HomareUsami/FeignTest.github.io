// document 記載を1度だけにする
var writedDocumentsPath=[];
function writeDocumentPath(pathStr) {
	for (var i = 0; i < writedDocumentsPath.length; ++i) {
		if(writedDocumentsPath[i] == pathStr) return; // 既に記載済み
	}
	document.write("<script src=\"" + pathStr + "\" charset=\"utf-8\"></script>");
	writedDocumentsPath.push(pathStr);
}