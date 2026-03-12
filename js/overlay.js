const overlayele = document.querySelector("#overlayedpane");

export function enable_overlay() {
        overlayele.style.pointerEvents = "auto"; 
        overlayele.style.backgroundColor = "black";
        overlayele.innerHTML = "";
}

export function disable_overlay() {
        overlayele.style.pointerEvents = "none"; 
        overlayele.style.backgroundColor = "";
        overlayele.innerHTML = "";
}

export function get_overlay() {
        return overlayele;
}
