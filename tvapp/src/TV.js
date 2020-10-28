"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TV = void 0;
//TV Class
var TV = /** @class */ (function () {
    //constructor to initialize object
    function TV(obj) {
        this.activeChannelNumber = obj.activeChannelNumber;
        this.channelLinks = obj.channelLinks;
        this.activeChannelObject = obj.activeChannelObject;
        this.state = obj.state;
        this.volume = obj.volume;
        this.pause = obj.pause;
        this.typeLinks = obj.typeLinks;
        this.activeType = obj.activeType;
    }
    //toggle pause state
    TV.prototype.tooglePause = function () {
        this.pause = !this.pause;
    };
    //toggle power state
    TV.prototype.toggleState = function () {
        this.state = !this.state;
    };
    //increase volume(Max 100)
    TV.prototype.increaseVolume = function () {
        this.volume = Math.min(this.volume + 5, 100);
    };
    //decrease volume(min 0)
    TV.prototype.decreaseVolume = function () {
        this.volume = Math.max(this.volume - 5, 0);
    };
    //next channel (overflow to first channel)
    TV.prototype.nextChannel = function () {
        this.activeChannelNumber = (this.activeChannelNumber + 1) % this.channelLinks.length;
        this.activeChannelObject = this.channelLinks[this.activeChannelNumber];
    };
    //previos channel (underflow to last channel)
    TV.prototype.prevChannel = function () {
        if (this.activeChannelNumber == 0) {
            this.activeChannelNumber = this.channelLinks.length - 1;
        }
        else {
            this.activeChannelNumber = (this.activeChannelNumber - 1) % this.channelLinks.length;
        }
        this.activeChannelObject = this.channelLinks[this.activeChannelNumber];
    };
    //change current TV frame object depending on argument
    TV.prototype.changeTVtype = function (tvType) {
        var val = this.typeLinks.find(function (o) { return o.name == tvType; });
        if (val == undefined) { }
        else {
            this.activeType = val;
        }
    };
    //mute
    TV.prototype.mute = function () {
        this.volume = 0;
    };
    //pause
    TV.prototype.pauseVid = function () {
        this.pause = true;
    };
    //Goto Home i.e First Channel
    TV.prototype.home = function () {
        this.activeChannelObject = this.channelLinks[0];
    };
    return TV;
}());
exports.TV = TV;
