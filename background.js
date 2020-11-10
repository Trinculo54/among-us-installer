"use strict";

/*
 * (C) 2020 Walter Min (Saghetti)
 * All Rights Reserved
 */


var canvasElement = null;
var canvasContext = null
var starsOnScreen = [];

function genRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function initBackground() {
    console.log("initBackground");
    canvasElement = document.getElementById("background-canvas");
    canvasContext = canvasElement.getContext("2d");
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvasElement.width, canvasElement.height);
    setInterval(function() {
        if (!document.hasFocus()) return;
        if (Math.random() <= 0.1) {
            // spawn a new star
            starsOnScreen.push({size:genRandom(1,5),x:-10,y:genRandom(0,window.innerHeight)});
        }
    },50);
    for (var i=0; i<50; i++) {
        starsOnScreen.push({size:genRandom(1,5),x:genRandom(0,window.innerWidth),y:genRandom(0,window.innerHeight)});
    }
    canvasContext.strokeStyle = "white";
    canvasContext.shadowColor = "white";
    canvasContext.shadowBlur = 5;
    canvasContext.font = "30px Arial";
    window.requestAnimationFrame(tickBackground);
}

function tickBackground() {
    if (document.hasFocus()) {
        // scale canvas to whole screen
        canvasElement.width = window.innerWidth;
        canvasElement.height = window.innerHeight;
        var windowWidth = window.innerWidth;
        canvasContext.fillStyle = "black";
        canvasContext.fillRect(0, 0, canvasElement.width, canvasElement.height);
        // update and draw stars (in the same loop now for efficiency)
        canvasContext.fillStyle = "white";
        //canvasContext.fillText("Stars: " + starsOnScreen.length, 100, 100);
        for (var i=0; i<starsOnScreen.length; i++) {
            if (starsOnScreen[i].x > windowWidth) {
                starsOnScreen.splice(i, 1)
                i--;
                continue;
            }
            starsOnScreen[i].x += starsOnScreen[i].size/3;
            canvasContext.beginPath();
            canvasContext.arc(starsOnScreen[i].x, starsOnScreen[i].y, starsOnScreen[i].size, 0, 2 * Math.PI);
            canvasContext.fill();
            canvasContext.stroke();
        }
    }
    window.requestAnimationFrame(tickBackground);
}
