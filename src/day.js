
var day = 1;    // 日数

// 日数リセット
function resetDay() {
    console.log("reset day");
    day = 1;
}

// 次の日に変更
function addDay() {
    ++day;
    console.log("次の日 : " + day + "日目");
}