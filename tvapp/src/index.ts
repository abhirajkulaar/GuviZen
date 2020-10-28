import {TVobject} from "./TV-object"
import {channel} from "./TV-object"
import {TVtype} from "./TV-object"
import {TV} from "./TV"
//Set Up Links for Channels
let videolinks=[{link:"./videos/Movie.mp4",name:"HBO"},{link:"./videos/Sports.mp4",name:"Start Sports"},{link:"./videos/Music.mp4",name:"VH1"},{link:"./videos/News.mp4",name:"FOX"}];
//Set up links for TV frames
let frameLinks=[{link:"./images/samsungTV.jpg",name:"Samsung"},{link:"./images/sonyTV.jpg",name:"Sony"},{link:"./images/LGTV.jpg",name:"LG"}];
//Create TV Object
let myTV = new TV({activeChannelNumber:0,
    channelLinks:videolinks,
    activeChannelObject:videolinks[0],
    volume:80,
    state:true,
    pause:true,
    typeLinks:frameLinks,
    activeType:frameLinks[0]
});


//This function updates the DOM Video according to the TV object in JS
function updateTV(obj:TV){

    //update channel in DOM only if channel changed otherwise video loads from beginning
    
    if((<HTMLVideoElement>document.querySelector("#myTV")).getAttribute("src")!=obj.activeChannelObject.link)
    {(<HTMLVideoElement>document.querySelector("#myTV")).setAttribute("src",obj.activeChannelObject.link);}

    //update Channel Name at Top
    (<HTMLElement>document.querySelector("#channelName")).innerText=obj.activeChannelObject.name;

    //update volume in DOM
 
    (<HTMLVideoElement>document.querySelector("#myTV")).volume=obj.volume/100;
    (<HTMLElement>document.querySelector(".progress-bar")).style.width=obj.volume+"%";


    //update On/Off State in DOM
    
        if(!obj.state){(<HTMLVideoElement>document.querySelector("#myTV")).classList.add("d-none");(<HTMLElement>document.querySelector(".progress")).classList.add("d-none")}
        else{(<HTMLVideoElement>document.querySelector("#myTV")).classList.remove("d-none");(<HTMLElement>document.querySelector(".progress")).classList.remove("d-none")}


    //update Pause/Play state in DOM 
    if(obj.pause){(<HTMLVideoElement>document.querySelector("#myTV")).pause();(<HTMLVideoElement>document.querySelector("#pauseIcon")).classList.remove("d-none")}else{(<HTMLVideoElement>document.querySelector("#myTV")).play();(<HTMLVideoElement>document.querySelector("#pauseIcon")).classList.add("d-none")};

    //update TV Frame

    (<HTMLImageElement>document.querySelector("#tvFrameImg")).setAttribute("src",obj.activeType.link)    

}




//Add Event-Listener for nextChannel
(<HTMLButtonElement>document.querySelector("#nextChannel")).addEventListener("click",()=>{myTV.nextChannel();updateTV(myTV)});
//Add Event-Listener for prevChannel
(<HTMLButtonElement>document.querySelector("#prevChannel")).addEventListener("click",()=>{myTV.prevChannel();updateTV(myTV);});
//Add Event-Listener for increaseVolume
(<HTMLButtonElement>document.querySelector("#increaseVolume")).addEventListener("click",()=>{myTV.increaseVolume();updateTV(myTV)});
//Add Event-Listener for decreaseVolume
(<HTMLButtonElement>document.querySelector("#decreaseVolume")).addEventListener("click",()=>{myTV.decreaseVolume();updateTV(myTV)});
//Add Event-Listener for tooglePause
(<HTMLButtonElement>document.querySelector("#togglePause")).addEventListener("click",()=>{myTV.tooglePause();updateTV(myTV)});
//Add Event-Listener for toggleState i.e On/Off TV
(<HTMLButtonElement>document.querySelector("#toggleState")).addEventListener("click",()=>{myTV.toggleState();myTV.pauseVid();updateTV(myTV)});
//Add Event-Listener for mute
(<HTMLButtonElement>document.querySelector("#mute")).addEventListener("click",()=>{myTV.mute();updateTV(myTV)});
//Add Event-Listener for home i.e GoTo Channel 1
(<HTMLButtonElement>document.querySelector("#home")).addEventListener("click",()=>{myTV.home();updateTV(myTV)});
//Add Event-Listener for changeTVtype i.e change frame of TV
(<HTMLSelectElement>document.querySelector("#tvType")).addEventListener("change",(e)=>{myTV.changeTVtype((<HTMLInputElement>e.target).value);updateTV(myTV);})

//updateTV called to sync created object
updateTV(myTV);