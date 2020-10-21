
 //Chunk Function Divides array into chunks of size mentioned and outputs array of generated chunks
  function chunk(inputArr:Array<any>,count:number):Array<any>
 {

    let output = [];
    let i:number=0;
    while(inputArr.length>0)
    {   let obj=[];
        i=0;
        while(i<count&&inputArr.length>0)
        {
        obj.push(inputArr[i]);
        inputArr.splice(i,1);
        i++;
        }

        output.push(obj);
    }

    return output;
 }


 //Reduce function reduces the array to single value by assigning value genertaed by function each time to the accumulator
function reduce(inputArr:Array<any>,fn:Function,accumulator:any):any
{   

    if(!Array.isArray(inputArr)){throw ("TypeError:reduce can be applied only on arrays!");}
    
    inputArr.forEach(element => {accumulator=fn(accumulator,element);})
        
    return accumulator;

}

//Filter runs a supplied mfunction on each item of the array and return the subarray of itwms foir which the function returns true
 function filter(inputArr:Array<any>,fn:Function){

    let output: any[] = [];
    
    if(!Array.isArray(inputArr)){throw ("TypeError:reduce can be applied only on arrays!");}
    inputArr.forEach(element => {if(fn(element)){output.push(element)}}); 



    return output;

 }


//Find runs a supplied function on each item and return the first item it returns true
 function find(inputArr:Array<any>,fn:Function){
    let output;
    if(!Array.isArray(inputArr)){throw ("TypeError:reduce can be applied only on arrays!");}
    for(let i=0;i<inputArr.length;i++)
    {if(fn(inputArr[i])){return inputArr[i];}}
    return undefined;

 }

//Given an array of numbers sum returns the sum of all it's members
 function sum(inputArr:Array<number>) :number{
     let sum:number=0;
    inputArr.forEach((num)=>sum=sum+num)
    return sum;
     
 }
 