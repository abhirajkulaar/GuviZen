"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TV_1 = require("./TV");
//Set Up Links for Channels
var videolinks = [{ link: "./videos/Movie.mp4", name: "HBO" }, { link: "./videos/Sports.mp4", name: "Start Sports" }, { link: "./videos/Music.mp4", name: "VH1" }, { link: "./videos/News.mp4", name: "FOX" }];
//Set up links for TV frames
var frameLinks = [{ link: "./images/samsungTV.jpg", name: "Samsung" }, { link: "./images/sonyTV.jpg", name: "Sony" }, { link: "./images/LGTV.jpg", name: "LG" }];
//Create TV Object
var myTV = new TV_1.TV({ activeChannelNumber: 0,
    channelLinks: videolinks,
    activeChannelObject: videolinks[0],
    volume: 80,
    state: true,
    pause: true,
    typeLinks: frameLinks,
    activeType: frameLinks[0]
});
//This function updates the DOM Video according to the TV object in JS
function updateTV(obj) {
    //update channel in DOM only if channel changed otherwise video loads from beginning
    if (document.querySelector("#myTV").getAttribute("src") != obj.activeChannelObject.link) {
        document.querySelector("#myTV").setAttribute("src", obj.activeChannelObject.link);
    }
    //update Channel Name at Top
    document.querySelector("#channelName").innerText = obj.activeChannelObject.name;
    //update volume in DOM
    document.querySelector("#myTV").volume = obj.volume / 100;
    document.querySelector(".progress-bar").style.width = obj.volume + "%";
    //update On/Off State in DOM
    if (!obj.state) {
        document.querySelector("#myTV").classList.add("d-none");
        document.querySelector(".progress").classList.add("d-none");
    }
    else {
        document.querySelector("#myTV").classList.remove("d-none");
        document.querySelector(".progress").classList.remove("d-none");
    }
    //update Pause/Play state in DOM 
    if (obj.pause) {
        document.querySelector("#myTV").pause();
        document.querySelector("#pauseIcon").classList.remove("d-none");
    }
    else {
        document.querySelector("#myTV").play();
        document.querySelector("#pauseIcon").classList.add("d-none");
    }
    ;
    //update TV Frame
    document.querySelector("#tvFrameImg").setAttribute("src", obj.activeType.link);
}
//Add Event-Listener for nextChannel
document.querySelector("#nextChannel").addEventListener("click", function () { myTV.nextChannel(); updateTV(myTV); });
//Add Event-Listener for prevChannel
document.querySelector("#prevChannel").addEventListener("click", function () { myTV.prevChannel(); updateTV(myTV); });
//Add Event-Listener for increaseVolume
document.querySelector("#increaseVolume").addEventListener("click", function () { myTV.increaseVolume(); updateTV(myTV); });
//Add Event-Listener for decreaseVolume
document.querySelector("#decreaseVolume").addEventListener("click", function () { myTV.decreaseVolume(); updateTV(myTV); });
//Add Event-Listener for tooglePause
document.querySelector("#togglePause").addEventListener("click", function () { myTV.tooglePause(); updateTV(myTV); });
//Add Event-Listener for toggleState i.e On/Off TV
document.querySelector("#toggleState").addEventListener("click", function () { myTV.toggleState(); myTV.pauseVid(); updateTV(myTV); });
//Add Event-Listener for mute
document.querySelector("#mute").addEventListener("click", function () { myTV.mute(); updateTV(myTV); });
//Add Event-Listener for home i.e GoTo Channel 1
document.querySelector("#home").addEventListener("click", function () { myTV.home(); updateTV(myTV); });
//Add Event-Listener for changeTVtype i.e change frame of TV
document.querySelector("#tvType").addEventListener("change", function (e) { myTV.changeTVtype(e.target.value); updateTV(myTV); });
//updateTV called to sync created object
updateTV(myTV);
