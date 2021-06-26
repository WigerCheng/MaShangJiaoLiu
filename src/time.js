function formatTime(time) {
    let formatTime = new Date(time);
    let nowStr = formatTime.toLocaleString("zh-CN");
    return nowStr;
}

export default formatTime