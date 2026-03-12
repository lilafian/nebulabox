import { init_cursor_handler, display_cursor_notification, display_popup_notification, display_notification_log } from "./notification.js";
import { init_click_handler, init_tick_handler } from "./clicker.js";
import { load_game, save_game } from "./save.js";
import { disable_overlay } from "./overlay.js";

const page_game = document.querySelector("#page-game");
const page_notis = document.querySelector("#page-notifications");
const page_shop = document.querySelector("#page-shop");
const page_progression = document.querySelector("#page-progression");
const btn_help = document.querySelector("#btn-help");

function display_welcome() {
        display_popup_notification(
                `welcome to nebulabox! the goal of this game is to generate the most value (the two green numbers at the top of the screen).
                to drop a box, click the bottom right quadrant until it reaches 0. then, click the new box to add it to your inventory and
                click it again to open it.
                `, [{msg: "ok!", callback: () => {
                        display_popup_notification("your game autosaves when you unload/reload the page. press [SHIFT] + [R] to reset your progress.", [{msg: "ok!", callback: () => {}}]);
                }}]);
}

if (load_game() === -1) display_welcome();

init_click_handler();
init_cursor_handler();
init_tick_handler();

window.addEventListener("beforeunload", () => {
        save_game();
});

page_game.addEventListener("click", disable_overlay);
page_notis.addEventListener("click", display_notification_log);
page_shop.addEventListener("click", () => display_cursor_notification("shop is not implemented yet!", 0, true));
page_progression.addEventListener("click", () => display_cursor_notification("progression is not implemented yet!", 0, true));
