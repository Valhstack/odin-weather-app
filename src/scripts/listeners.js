const attachListeners = (items, handler) => {
    for (let item of items) {
        item.addEventListener("click", handler);
    }
};

/*const listeners = () => {
    document.getElementById("search-btn").addEventListener("click", (e) => {
        console.log(e);
        console.log(document.getElementById("city-search").value);
    });
}*/

export { attachListeners };