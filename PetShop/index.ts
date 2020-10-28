interface petObject  {
    petName:string;
    petType:PetType;
    petColor:PetColor;
    petAge:number;
}

class Pet{

    petName:string;
    petType:PetType;
    petColor:PetColor;
    petAge:number;


    constructor(obj:petObject){

        this.petName=obj.petName;
        this.petType=obj.petType;
        this.petColor=obj.petColor;
        this.petAge=obj.petAge;

    }

}


interface petEnquiryObject{

    petType:Array<PetType>;
    petColor:Array<PetColor>;
    petAgeMin:number;
    petAgeMax:number;

}


class PetEnquiry{

    petType:Array<PetType>;
    petColor:Array<PetColor>;
    petAgeMin:number;
    petAgeMax:number;


constructor(obj:petEnquiryObject)
{
    this.petAgeMax=obj.petAgeMax;
    this.petAgeMin=obj.petAgeMin;
    this.petColor=obj.petColor;
    this.petType=obj.petType;
}


}

enum PetType{
    Dog="Dog",
    Cat="Cat",
    Bird="Bird",
    Fish="Fish"

}

enum PetColor{

    Black="Black",
    White="White",
    Brown="Brown",
    Golden="Golden",
    Red="Red",
    Grey="Grey"

}


let petAvailable:Array<Pet>=[]
let petEnquiry:Array<PetEnquiry>=[]


function arrayMatch(ar:Array<any>,ob:any)
{
    for(let i=0;i<ar.length;i++)
    {
        if(ar[i]==ob)
        {return true;}

    }

    return false;
}

function matchEnquiry(availablePets:Array<petObject>,enquiredPets:Array<petEnquiryObject>):Array<petObject>{

let to_return:Array<petObject>=[];

availablePets.forEach((avbPetObject)=>{enquiredPets.forEach((enqPetObj)=>{if(avbPetObject.petAge>=enqPetObj.petAgeMin&&avbPetObject.petAge<=enqPetObj.petAgeMax&&arrayMatch(enqPetObj.petColor,avbPetObject.petColor)&&arrayMatch(enqPetObj.petType,avbPetObject.petType)){to_return.push(avbPetObject)}})})

return to_return;
}






let newPet = new Pet({petName:"Puppy",petType:PetType.Dog,petColor:PetColor.Black,petAge:8})


let as = "Dog";

newPet = new Pet({petName:"Puppy",petType:PetType[as],petColor:PetType[as],petAge:8});




(<HTMLFontElement>document.querySelector("#addPetForm")).addEventListener("submit",()=>{
    

    
    let toAdd = new Pet(
        {
            petName:(<HTMLInputElement>document.querySelector("#petName")).value,
            petColor:PetColor[(<HTMLInputElement>document.querySelector("#petColor")).value],
            petAge:parseInt((<HTMLInputElement>document.querySelector("#petAge")).value),
            petType:PetType[(<HTMLInputElement>document.querySelector("#petType")).value]

        }
    )

        petAvailable.push(toAdd);
        document.querySelector("#newPetSuccess").classList.remove("d-none")
        setTimeout(()=>document.querySelector("#newPetSuccess").classList.add("d-none"),2000)


});

(<HTMLButtonElement>document.querySelector("#addEnquiryForm")).addEventListener("submit",()=>{


    let selectedColors:Array<PetColor>=[];

     let selectedColorsHTMLCollection=(<HTMLSelectElement>document.querySelector("#enqPetColorList")).selectedOptions

    for(let i=0;i<selectedColorsHTMLCollection.length;i++)
    {
        selectedColors.push(PetColor[selectedColorsHTMLCollection[i].value])
    }


    let selectedTypes:Array<PetType>=[];

     let selectedTypesHTMLCollection=(<HTMLSelectElement>document.querySelector("#enqPetTypeList")).selectedOptions

    for(let i=0;i<selectedTypesHTMLCollection.length;i++)
    {
        selectedTypes.push(PetType[selectedTypesHTMLCollection[i].value])
    }

let toAdd= new PetEnquiry(
{
    petType:selectedTypes,
    petColor:selectedColors,
    petAgeMin:parseInt((<HTMLInputElement>document.querySelector("#enqPetAgeMin")).value),
    petAgeMax:parseInt((<HTMLInputElement>document.querySelector("#enqPetAgeMax")).value)
}
)

petEnquiry.push(toAdd);
document.querySelector("#newEnqSuccess").classList.remove("d-none")
setTimeout(()=>document.querySelector("#newEnqSuccess").classList.add("d-none"),2000)



let elem=document.createElement("li");
elem.classList.add("list-group-item");

elem.innerText=`A ${ toAdd.petColor.join("/")} ${ toAdd.petType.join("/")} between age ${toAdd.petAgeMin} and ${toAdd.petAgeMax}`
document.querySelector("#enquiryList").appendChild(elem);
document.querySelector("#enqListHeading").classList.remove("d-none");
document.querySelector("#executeInquiry").classList.remove("d-none");


});

(<HTMLButtonElement>document.querySelector("#addPetToggle")).addEventListener("click",()=>(<HTMLFontElement>document.querySelector("#addPetForm")).classList.toggle("d-none"));
(<HTMLButtonElement>document.querySelector("#addEnqToggle")).addEventListener("click",()=>(<HTMLFontElement>document.querySelector("#addEnquiryForm")).classList.toggle("d-none"));
(<HTMLButtonElement>document.querySelector("#executeInquiry")).addEventListener("click",()=>{


(<HTMLElement>document.querySelector("#enquiryResults")).innerHTML="";

 let result = matchEnquiry(petAvailable,petEnquiry);
 if(result.length==0){document.querySelector("#noResultEnquiry").classList.remove("d-none")
 setTimeout(()=>document.querySelector("#noResultEnquiry").classList.add("d-none"),2000)}
 let count=[];
 for(let i=0;i<result.length;i++)
 {
    if(!count[result[i].petType]){count[result[i].petType]=0;}
    count[result[i].petType]++;
    if(!<HTMLButtonElement>document.querySelector(`#${result[i].petType}List`)){let elem=document.createElement("ul");elem.classList.add("list-group");elem.setAttribute("id",`${result[i].petType}List`);<HTMLElement>document.querySelector("#enquiryResults").appendChild(elem);let elem2=document.createElement("li");elem2.classList.add("list-group-item","list-group-item-info");elem2.setAttribute("id",`${result[i].petType}ListHeading`);elem.appendChild(elem2);}

    
    let elem=document.createElement("li");elem.classList.add("list-group-item");elem.innerText=`Name: ${result[i].petName}  Type: ${result[i].petType}  Color: ${result[i].petColor}  Age: ${result[i].petAge}`;
    (<HTMLUListElement>document.querySelector(`#${result[i].petType}ListHeading`)).innerText=`${result[i].petType} - ${count[result[i].petType]}`;
    <HTMLElement>document.querySelector(`#${result[i].petType}List`).appendChild(elem);

 }




});
