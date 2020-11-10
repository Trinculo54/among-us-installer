/*
 * (C) 2020 Walter Min (Saghetti)
 * All rights reserved
 */

"use strict";

function initPlayercount() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById("live-player-count").innerHTML = "Live player count: " + this.responseText;
        }
    };
    request.open("GET", "https://skeld.net/api/playercount", true);
    request.send();
    setInterval(function() {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              document.getElementById("live-player-count").innerHTML = "Live player count: " + this.responseText;
            }
        };
        request.open("GET", "https://skeld.net/api/playercount", true);
        request.send();
    },30000);
}
