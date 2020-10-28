
//interface for TV
export interface TVobject{
    activeChannelNumber:number;
    channelLinks:Array<channel>;
    activeChannelObject:channel;
    volume:number;
    state:boolean;
    pause:boolean;
    typeLinks:Array<TVtype>;
    activeType:TVtype;
}

//interface for Channel
export interface channel{
    link:string;
    name:string;
    
}

//interface for TVType
export interface TVtype
{
    link:string;
    name:string;
}


