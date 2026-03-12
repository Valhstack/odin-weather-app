const reset = (elemID, className) => {
    const elems = document.getElementById(elemID).querySelectorAll(className);

    elems.forEach(elem => elem.remove());
};

export { reset };