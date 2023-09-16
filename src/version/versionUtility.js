writeDocumentPath("src/version/version.js");

// document.write("<script src=\"src/version/version.js\" charset=\"utf-8\"></script>");

function convertVersionString(versionNo) {
	return versionNo.toFixed(4);
}

function convertSubVersionString(versionNo) {
	return versionNo.toFixed(4);
}

function convertLocalVersionString(versionNo) {
	return versionNo.toFixed(4);
}

function getVersionString() {
	return convertVersionString(mainVersion) + "_" + convertSubVersionString(subVersion) + "_" + convertLocalVersionString(localVersion);
}

function getVersionInfoString() {
	return "ver." + convertVersionString(mainVersion) + "_" + convertSubVersionString(subVersion) + "_" + convertLocalVersionString(localVersion);
}