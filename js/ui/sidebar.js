const sidebar_clicker = document.querySelector("#sidebar-clicker");
const sidebar_inventory = document.querySelector("#sidebar-inventory");
const sidebar_shop = document.querySelector("#sidebar-shop");
const sidebar_progression = document.querySelector("#sidebar-progression");
let selected = sidebar_clicker;

export function setup_sidebar_buttons() {
        sidebar_clicker.addEventListener("click", () => {
                selected.classList.remove("sidebar-button-selected");
                sidebar_clicker.classList.add("sidebar-button-selected");
                selected = sidebar_clicker;
        });

        sidebar_inventory.addEventListener("click", () => {
                selected.classList.remove("sidebar-button-selected");
                sidebar_inventory.classList.add("sidebar-button-selected");
                selected = sidebar_inventory;
        });

        sidebar_shop.addEventListener("click", () => {
                selected.classList.remove("sidebar-button-selected");
                sidebar_shop.classList.add("sidebar-button-selected");
                selected = sidebar_shop;
        });

        sidebar_progression.addEventListener("click", () => {
                selected.classList.remove("sidebar-button-selected");
                sidebar_progression.classList.add("sidebar-button-selected");
                selected = sidebar_progression;
        });
}
