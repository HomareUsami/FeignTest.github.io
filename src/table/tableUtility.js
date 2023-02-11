// table
function removeAllChild(nodeElement) {
    console.log("remove all child : object-> " + nodeElement + " ,id-> " + nodeElement.id);
    while (nodeElement.firstChild) {
        nodeElement.removeChild(nodeElement.firstChild);
    }
}
// 次のnode取得
function getNextChildNodeResult(childNode) {
    var value = { result: false, nextNode: null };
    if (childNode.parentNode == null) {
        console.log("childNodeのparentNodeが存在しません");
        value.result = false;
        return value;
    }
    var children = childNode.parentNode.children;
    for (var i = 0; i < children.length; ++i) {
        if (children[i] == childNode) {
            value.nextNode = (i + 1) < children.length ? children[i + 1] : null;
            value.result = true;
            return value;
        }
    }
    console.log("childNodeのparentNodeが存在しません");
    value.result = false;
    return value;
}

// table data add
function addTableData(tableRawElement, txt) {
    var tableDataElement = tableRawElement.appendChild(document.createElement("td"));
    tableDataElement.appendChild(document.createTextNode(txt));
}

// 全子要素から特定のelementIdのものを検索する
function findAllChildrenByElementId(id,element) {
    if(element.id == id) return element;
    for(var i = 0;i < element.children.length; ++i) {
        var findElement = findAllChildrenByElementId(id,element.children[i]);
        if(findElement != null) return findElement;
    }
    return null;
}

// 全子要素から特定のelementIdのものを検索する
function findChildrenByElementId(id,element) {
    for(var i = 0;i < element.children.length; ++i) {
        if(element.children[i].id == id) return element.children[i];
    }
    return null;
}

// 全子要素から特定のclassNameのものを検索する
function findAllChildrenByClassName(className,element) {
    if(element.className == className) return element;
    for(var i = 0;i < element.children.length; ++i) {
        var findElement = findAllChildrenByClassName(className,element.children[i]);
        if(findElement != null) return findElement;
    }
    return null;
}

// 全子要素から特定のclassNameのものを検索する
function findChildrenByClassName(className,element) {
    for(var i = 0;i < element.children.length; ++i) {
        if(element.children[i].className == className) return element.children[i];
    }
    return null;
}

// 削除文字の設定
function setDeleteTextStyle(element) {
	element.innerHTML = "×";
	element.style.width = "20px";
	element.style.height = "20px";
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