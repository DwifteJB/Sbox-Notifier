let Timeout = 3 // seconds

let LoggedIn = document.getElementsByClassName("username")[0].innerHTML

let Enter = document.getElementsByClassName("button is-large is-primary")[0]
let Users = document.getElementsByClassName("is-flex is-wrap")[0]

let Key = document.getElementsByClassName("tag")[0]
let Timer = document.getElementsByClassName("tag")[1]
let UsersIn = document.getElementsByClassName("tag")[2]
let Watchers = document.getElementsByClassName("tag")[3]

try {
    
    if (Interval) {
        console.log("Loop is already running... had to restart.")
        clearInterval(Interval)
        Interval = null
    }

} catch {}
console.log(`S&Box Notifier\n\nWelcome ${LoggedIn}!\nCreated by Dwifte`)
let Interval = setInterval(() => {
    let children = Users.children
    let InRaff = false
    for (var i = 0; i < children.length; i++) {
        var User = children[i];
        if (User.title == LoggedIn) {
            InRaff = true
        }
    }
    if (InRaff == false) {
        Enter.click()
    }
    console.log(`Keys remaining: ${Key.innerHTML.substr(-2).trim()}\nTime Remaining: ${Timer.innerHTML.substr(-11).trim()}\nUsers in: ${UsersIn.innerHTML.substr(-4).trim()} \nWatchers: ${Watchers.innerHTML.substr(-4).trim()}\n${LoggedIn} in raffle: ${InRaff}`)
}, Timeout * 1000);
