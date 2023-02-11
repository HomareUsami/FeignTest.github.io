// table
var tableId = "feignTable"; // table id

// selectWidnow
var selectWindowClassName = "selectWindow";
var selectWindowParentClassName = "selectWindowParent";


// selectWindow appendChild
function appendChildSelectWindow(nowElement) {
    // selectWindowのtable用意
    var selectWindowParentElement = nowElement.appendChild(document.createElement("div"));
    selectWindowParentElement.className = selectWindowParentClassName;

    // 本体となるselectWindowの枠を用意
    var selectWindowElement = selectWindowParentElement.appendChild(document.createElement("div"));
    selectWindowElement.style.display = "none";
    selectWindowElement.className = selectWindowClassName;
    
    selectWindowElement.onclick = (clickEvet) => {
        window.event.stopPropagation(); // 親のclickイベントに伝播しないように。
        closeSelectWindow(clickEvet.currentTarget);
    };
    // onOpen/onCloseを作成 array形式
    selectWindowElement.onOpen = [];
    selectWindowElement.onOpen.push((elem) => {
        console.log("onOpen selectWindow function" + elem);
    });
    selectWindowElement.onClose = [];
    selectWindowElement.onClose.push((elem) => {
        console.log("onClose selectWindow function" + elem);
    });

    return selectWindowElement;
}
// select window
function openSelectWindow(selectWindowElement) {
    if (selectWindowElement.style.display == "block") {
        closeSelectWindow(selectWindowElement);
    } else {
        console.log("open select window");
        selectWindowElement.style.display = "block";

        // open
        for(var i = 0;i < selectWindowElement.onOpen.length; ++i) {
            selectWindowElement.onOpen[i](selectWindowElement);
        }

        // other selectWindow all close
        closeOtherSelectWindow(selectWindowElement);
    }
}
function closeSelectWindow(selectWindowElement) {
    console.log("close select window");
    selectWindowElement.style.display = "none";

    for(var i = 0; i < selectWindowElement.onClose.length; ++i) {
        selectWindowElement.onClose[i](selectWindowElement);
    }
}

function closeOtherSelectWindow(selectWindowElement) {
    // table内のselectWindowを全てclose
    var tableElement = document.getElementById(tableId);
    closeOtherSelectWindowChild(selectWindowElement, tableElement);
}
function closeOtherSelectWindowChild(selectWindowElement, childElement) {
    if (childElement.className == selectWindowClassName && childElement.style.display == "block") {
        if (selectWindowElement != childElement) {
            closeSelectWindow(childElement);
        }
    }
    for (var i = 0; i < childElement.children.length; ++i) {
        closeOtherSelectWindowChild(selectWindowElement, childElement.children[i]);
    }
}
// 子要素からselectWindowの要素を取得
function getChildSelectWindowElement(tableDataElement) {
    var children = tableDataElement.children;
    for (var i = 0; i < children.length; ++i) {
        if (children[i].className == selectWindowClassName) {
            return children[i];
        }
        var selectWindowElement = getChildSelectWindowElement(children[i]);
        if(selectWindowElement != null) return selectWindowElement;
    }
    return null;
}