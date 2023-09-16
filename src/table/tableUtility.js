// table data add
function addTableData(tableRawElement, txt) {
    var tableDataElement = tableRawElement.appendChild(document.createElement("td"));
    tableDataElement.appendChild(document.createTextNode(txt));
}

// 削除文字の設定
function setDeleteTextStyle(element) {
	element.innerHTML = "×";
	element.style.width = "30px";
	element.style.height = "30px";
	element.style.color = "gray";
	element.style.display = "none";
	element.style.margin = "0px";

	element.onmouseover = (event) => {
		element.style.color = "red";
	};
	element.onmouseout = (event) => {
		element.style.color = "gray";
	};
};