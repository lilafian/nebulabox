import { display_popup_notification } from "./notification.js";
import { reset_save } from "./save.js";

const splashes = [
        "clickalicker iii",
        "k",
        "mandem is playing nebulabox",
        "he upgraded to cancer-free - amd $5000 ultimate tech upgrade",
        "127.0.0.1 get hacked",
        "our brains are shrinking?",
        "bro has the key to everyone's room, nah get out boii",
        "a day in the life of a bar skin player... / should he die?",
        "does he know?",
        "click to drop, click to open, click to repeat",
        "clicker games in the big 26 <3",
        "your next box might be common",
        "your next box might be semicommon",
        "your next box might be uncommon",
        "your next box might be semirare",
        "your next box might be rare",
        "your next box might be ultrarare",
        "your next box might be legendary",
        "your next box might be ultralegendary",
        "your next box might be mythical",

];

const ele = document.querySelector("#splash");
const title = document.querySelector(".title");
const containers = document.querySelectorAll(".itemcontainer");
const hdr = document.querySelector(".tophdr");

ele.innerText = splashes[Math.floor(Math.random() * splashes.length)];

let clickalickerstr = "";
let canactivateclickalickermode = true;
document.addEventListener("keydown", (e) => {
        if (!canactivateclickalickermode) return;
        clickalickerstr += e.key;
        if (clickalickerstr.includes("clickalicker")) {
                title.innerText = title.innerText.replace("nebulabox", "clickalicker iii");
                document.body.style.backgroundColor = "white";
                document.body.style.color = "black";
                for (const elem of containers) {
                        elem.style.border = "2px solid lightgreen";
                        elem.style.borderRadius = "15px";
                }
                ele.innerText = `clickalicker iii mode activated! - ${ele.innerText}`;
                hdr.style.backgroundColor = "lightgreen";
                canactivateclickalickermode = false;
        }

        if (e.key === "R") {
                display_popup_notification("do you want to reset your progress?", [
                        {msg: "yes", callback: reset_save},
                        {msg: "no", callback: () => {}}
                ]);
        }
});
