import {TVobject} from "./TV-object"
import {channel} from "./TV-object"
import {TVtype} from "./TV-object"

//TV Class
export class TV{

    //this contains the current channel number
    activeChannelNumber:number;
    //this contains an Array of all channels available for this TV with names and links to videos
    channelLinks:Array<channel>;
    //this contains the active channel object
    activeChannelObject:channel;
    //this maintains the current volume
    volume:number;
    //this is the current state of power i.e On/Off (true==On)
    state:boolean;
    //this is the current state og play i.e pause/play (true==Pause)
    pause:boolean;
    //this contains the active TV frame Object with name of brand and image link of frame
    typeLinks:Array<TVtype>;
    //this contains an Array of all frames available for this TV with names and links to images
    activeType:TVtype;

    //constructor to initialize object
    constructor(obj:TVobject)
    {
        this.activeChannelNumber=obj.activeChannelNumber;
        this.channelLinks=obj.channelLinks;
        this.activeChannelObject=obj.activeChannelObject;
        this.state=obj.state;
        this.volume=obj.volume;
        this.pause=obj.pause;
        this.typeLinks=obj.typeLinks;
        this.activeType=obj.activeType;
    }

    //toggle pause state
    tooglePause(){
        this.pause=!this.pause;
    }

    //toggle power state
    toggleState()
    {
        this.state=!this.state;
    }

    //increase volume(Max 100)
    increaseVolume(){
        this.volume=Math.min(this.volume+5,100);
    }

    //decrease volume(min 0)
    decreaseVolume(){
        this.volume=Math.max(this.volume-5,0);
    }

    //next channel (overflow to first channel)
    nextChannel(){
        this.activeChannelNumber= (this.activeChannelNumber+1)%this.channelLinks.length;
        this.activeChannelObject=this.channelLinks[this.activeChannelNumber];
    }

    //previos channel (underflow to last channel)
    prevChannel(){
        if(this.activeChannelNumber==0){this.activeChannelNumber=this.channelLinks.length-1;}
        else{this.activeChannelNumber= (this.activeChannelNumber-1)%this.channelLinks.length;}
        this.activeChannelObject=this.channelLinks[this.activeChannelNumber];
    }

    //change current TV frame object depending on argument
    changeTVtype(tvType:string)
    {
        let val = this.typeLinks.find(o=>o.name==tvType);
        if(val==undefined){}
        else{
        this.activeType=val;}
    }
    //mute
    mute(){
        this.volume=0;
    }
    //pause
    pauseVid()
    {
        this.pause=true;
    }
    //Goto Home i.e First Channel
    home()
    {
        this.activeChannelObject=this.channelLinks[0];
    }


}