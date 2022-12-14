// ==UserScript==
// @name         S&box Notifier
// @namespace    https://github.com/DwifteJB/Sbox-Notifier
// @version      1.3.1
// @description  Notifies and Auto-Joins
// @author       Dwifte
// @match        *://asset.party/get/developer/preview
// @icon         https://github.com/DwifteJB.png
// @grant        GM_xmlhttpRequest
// @updateURL    https://raw.githubusercontent.com/DwifteJB/Sbox-Notifier/main/sbox-tampermonkey.js
// @downloadURL  https://raw.githubusercontent.com/DwifteJB/Sbox-Notifier/main/sbox-tampermonkey.js
// ==/UserScript==


(function() {
    'use strict';
    let Timeout = 3 // seconds
    let Silent = false
    let savedTime
    let DiscordWebhook = null

    let LoggedAvatar = document.getElementsByClassName("avatar")[0].src
    let LoggedIn = document.getElementsByClassName("username")[0].innerHTML
    Silent == true ? null : console.log(`S&Box Notifier\n\nWelcome ${LoggedIn}!\nCreated by Dwifte`);
    /*setTimeout(() => {
        location.reload()
    },3600000)*/
    setInterval(() => {
        let Enter = document.getElementsByClassName("button is-large is-primary")[0]
        let Users = document.getElementsByClassName("is-flex is-wrap")[0]

        let Key = document.getElementsByClassName("tag")[0]
        let Timer = document.getElementsByClassName("tag")[1]
        let UsersIn = document.getElementsByClassName("tag")[2]
        let Watchers = document.getElementsByClassName("tag")[3]
        let children = Users.children;
        let InRaff = false;
        for (var i = 0; i < children.length; i++) {
            var User = children[i];
            if (User.title == LoggedIn) {

                InRaff = true
            }
        }
        if (InRaff == false) {
            if (Math.random() < 0.8) { // random-ness, so it doesn't seem like a bot
                Enter.click();
            }

        }
        if (Timer.innerHTML.substr(-10).trim() == savedTime) {
            location.reload();
        }
        if (DiscordWebhook != null) {
            try {
                //`\n${LoggedIn} in raffle: ${InRaff}`
                let embed = {
                    "username": LoggedIn + " | S&Box Notifier",
                    "avatar_url": LoggedAvatar,
                    "content": null,
                    "embeds": [
                        {
                            "title": "Log",
                            "color": 11923696,
                            "fields": [
                                {
                                    "name": "Keys Remaining",
                                    "value": Key.innerHTML.substr(-2).trim(),
                                    "inline": true
                                },
                                {
                                    "name": "Time Remaining",
                                    "value": Timer.innerHTML.split("</i> ")[1],
                                    "inline": true
                                },
                                {
                                    "name": "Users in raffle",
                                    "value": UsersIn.innerHTML.substr(-4).trim(),
                                    "inline": true
                                },
                                {
                                    "name": "Watchers",
                                    "value": Watchers.innerHTML.substr(-4).trim(),
                                    "inline": true
                                },
                                {
                                    "name": "InRaffle",
                                    "value": InRaff,
                                    "inline": true
                                }
                            ],
                            "footer": {
                                "text": "dwifte <3"
                            },
                            "thumbnail": {
                                "url": LoggedAvatar
                            }
                        }
                    ],
                    "attachments": []
                }
                fetch(DiscordWebhook, {
                    "method":"POST",
                    "headers": {"Content-Type": "application/json"},
                    "body": JSON.stringify(embed)
                })
            } catch(err) {}
        }
        Silent == true ? null : console.log(`Keys remaining: ${Key.innerHTML.substr(-2).trim()}\nTime Remaining: ${Timer.innerHTML.split("</i> ")[1]}\nUsers in: ${UsersIn.innerHTML.substr(-4).trim()} \nWatchers: ${Watchers.innerHTML.substr(-4).trim()}\n${LoggedIn} in raffle: ${InRaff}`);
        savedTime = Timer.innerHTML.split("</i> ")[1]
    }, Timeout * 1000);
})();
