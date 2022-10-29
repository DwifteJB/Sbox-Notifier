// ==UserScript==
// @name         S&box Notifier
// @namespace    https://raw.githubusercontent.com/DwifteJB/Sbox-Notifier/main/sbox-tampermonkey.js
// @version      1.0
// @description  Notifies and Auto-Joins
// @author       Dwifte
// @match        *://asset.party/get/developer/preview
// @icon         https://github.com/DwifteJB.png
// @grant        GM_xmlhttpRequest
// @updateURL    https://raw.githubusercontent.com/cyprille/tampermonkey-scripts/master/scripts/github-calculate-pr-records.user.js
// @downloadURL  https://raw.githubusercontent.com/cyprille/tampermonkey-scripts/master/scripts/github-calculate-pr-records.user.js
// ==/UserScript==


(function() {
    'use strict';
    let Timeout = 3 // seconds
    let Silent = false
    
    let DiscordWebhook = null
        
    let LoggedAvatar = document.getElementsByClassName("avatar")[0].src
    let LoggedIn = document.getElementsByClassName("username")[0].innerHTML
    Silent == true ? null : console.log(`S&Box Notifier\n\nWelcome ${LoggedIn}!\nCreated by Dwifte`);
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
            if (Math.random() < 0.5) { // random-ness, so it doesn't seem like a bot
                Enter.click();
            }

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
                                    "value": Timer.innerHTML.substr(-10).trim(),
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
        Silent == true ? null : console.log(`Keys remaining: ${Key.innerHTML.substr(-2).trim()}\nTime Remaining: ${Timer.innerHTML.substr(-10).trim()}\nUsers in: ${UsersIn.innerHTML.substr(-4).trim()} \nWatchers: ${Watchers.innerHTML.substr(-4).trim()}\n${LoggedIn} in raffle: ${InRaff}`)
    }, Timeout * 1000);
})();
