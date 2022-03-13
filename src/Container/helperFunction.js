export function sinxronDate(){
    let DateNow = new Date()
    let yil = DateNow.getFullYear();
    let oy = (DateNow.getMonth() + 1) < 10 ? `0${DateNow.getMonth() + 1}` : DateNow.getMonth() + 1;
    let sana = DateNow.getDate() < 10 ? `0${DateNow.getDate()}` : DateNow.getDate();
    let soat = DateNow.getHours() < 10 ? `0${DateNow.getHours()}` : DateNow.getHours();
    let daqiqa = DateNow.getMinutes() < 10 ? `0${DateNow.getMinutes()}` : DateNow.getMinutes();
    let secund = DateNow.getSeconds() < 10 ? `0${DateNow.getSeconds()}` : DateNow.getSeconds();
    return `${yil}${oy}${sana}${soat}${daqiqa}${secund}`
}