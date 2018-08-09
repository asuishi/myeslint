// var a = 5;
var obj = {
    a: 6
}
with(obj) {
    console.log(a)
}
with(obj) {
    console.log(a)
}
const a = 5