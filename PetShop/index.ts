
//create PetObject interface for available pets

interface petObject  {
    petName:string;
    petType:PetType;
    petColor:PetColor;
    petAge:number;
}

// Class for objects of available pets with constructor accepting interface

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


//petEnquiryObject interface

interface petEnquiryObject{

    petType:Array<PetType>;
    petColor:Array<PetColor>;
    petAgeMin:number;
    petAgeMax:number;

}

//Class for objects of enquiry of pets with constructor accepting interface
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

//PetType is Enum

enum PetType{
    Dog="Dog",
    Cat="Cat",
    Bird="Bird",
    Fish="Fish"

}

//PetColor is Enum

enum PetColor{

    Black="Black",
    White="White",
    Brown="Brown",
    Golden="Golden",
    Red="Red",
    Grey="Grey"

}

//Initialize Array of Available Pets
let petAvailable:Array<Pet>=[]

//Initialize Array of Enquiry Pets
let petEnquiry:Array<PetEnquiry>=[]

//Function to check if enum present in array of enums
function arrayMatch(ar:Array<any>,ob:any)
{
    for(let i=0;i<ar.length;i++)
    {
        if(ar[i]==ob)
        {return true;}

    }

    return false;
}

//This function accepts all available pets and an array of enquiry objects -> it returns all available pets which match any enquiry
function matchEnquiry(availablePets:Array<petObject>,enquiredPets:Array<petEnquiryObject>):Array<petObject>{

let to_return:Array<petObject>=[];

availablePets.forEach((avbPetObject)=>{enquiredPets.forEach((enqPetObj)=>{if(avbPetObject.petAge>=enqPetObj.petAgeMin&&avbPetObject.petAge<=enqPetObj.petAgeMax&&arrayMatch(enqPetObj.petColor,avbPetObject.petColor)&&arrayMatch(enqPetObj.petType,avbPetObject.petType)){to_return.push(avbPetObject)}})})

return to_return;
}









//Create New Pet function -> creates new pet object and pushes to global availsble pets array

(<HTMLFormElement>document.querySelector("#addPetForm")).addEventListener("submit",()=>{
    

    
    let toAdd = new Pet(
        {
            petName:(<HTMLInputElement>document.querySelector("#petName")).value,
            petColor:PetColor[(<HTMLInputElement>document.querySelector("#petColor")).value],
            petAge:parseInt((<HTMLInputElement>document.querySelector("#petAge")).value),
            petType:PetType[(<HTMLInputElement>document.querySelector("#petType")).value]

        }
    )

        petAvailable.push(toAdd);
        //Show success message
        document.querySelector("#newPetSuccess").classList.remove("d-none")
        setTimeout(()=>document.querySelector("#newPetSuccess").classList.add("d-none"),2000);
        //Reset Form
        (<HTMLFormElement>document.querySelector("#addPetForm")).reset();

});


//Create New Enquiry function -> creates new enquiry object and pushes to global enquiry for pets array


(<HTMLButtonElement>document.querySelector("#addEnquiryForm")).addEventListener("submit",()=>{

    //Collects all selected options for color of pets into selectedColors array

    let selectedColors:Array<PetColor>=[];

     let selectedColorsHTMLCollection=(<HTMLSelectElement>document.querySelector("#enqPetColorList")).selectedOptions

    for(let i=0;i<selectedColorsHTMLCollection.length;i++)
    {
        selectedColors.push(PetColor[selectedColorsHTMLCollection[i].value])
    }

    //Collects all selected options for type of pets into selectedTypes array

    let selectedTypes:Array<PetType>=[];

     let selectedTypesHTMLCollection=(<HTMLSelectElement>document.querySelector("#enqPetTypeList")).selectedOptions

    for(let i=0;i<selectedTypesHTMLCollection.length;i++)
    {
        selectedTypes.push(PetType[selectedTypesHTMLCollection[i].value])
    }

    //Creates PetEnquiry object

    let toAdd= new PetEnquiry(
    {
    petType:selectedTypes,
    petColor:selectedColors,
    petAgeMin:parseInt((<HTMLInputElement>document.querySelector("#enqPetAgeMin")).value),
    petAgeMax:parseInt((<HTMLInputElement>document.querySelector("#enqPetAgeMax")).value)
    }
    )

    //Push object to main enquiry array
    petEnquiry.push(toAdd);

    //Show success message
    document.querySelector("#newEnqSuccess").classList.remove("d-none")
    setTimeout(()=>document.querySelector("#newEnqSuccess").classList.add("d-none"),2000)


    //Show inquiry in List
    let elem=document.createElement("li");
    elem.classList.add("list-group-item");

    elem.innerText=`A ${ toAdd.petColor.join("/")} ${ toAdd.petType.join("/")} between age ${toAdd.petAgeMin} and ${toAdd.petAgeMax}`
    document.querySelector("#enquiryList").appendChild(elem);
    document.querySelector("#enqListHeading").classList.remove("d-none");
    document.querySelector("#executeInquiry").classList.remove("d-none");

    (<HTMLFormElement>document.querySelector("#addEnquiryForm")).reset();

});

//EventListener for Add/Create Available Pet Button to expand menu
(<HTMLButtonElement>document.querySelector("#addPetToggle")).addEventListener("click",()=>(<HTMLFormElement>document.querySelector("#addPetForm")).classList.toggle("d-none"));
//EventListener for Add/Create Enquiry Button to expand menu
(<HTMLButtonElement>document.querySelector("#addEnqToggle")).addEventListener("click",()=>(<HTMLFormElement>document.querySelector("#addEnquiryForm")).classList.toggle("d-none"));
(<HTMLButtonElement>document.querySelector("#executeInquiry")).addEventListener("click",()=>{

////EventListener for producing Query Results
(<HTMLElement>document.querySelector("#enquiryResults")).innerHTML="";
    //Get final output from function
 let result = matchEnquiry(petAvailable,petEnquiry);
 if(result.length==0){document.querySelector("#noResultEnquiry").classList.remove("d-none")
 setTimeout(()=>document.querySelector("#noResultEnquiry").classList.add("d-none"),2000)}
 let count=[];
 for(let i=0;i<result.length;i++)
 {
    if(!count[result[i].petType]){count[result[i].petType]=0;}
    //set count by Tupe
    count[result[i].petType]++;
    //Create List for Type
    if(!<HTMLButtonElement>document.querySelector(`#${result[i].petType}List`)){let elem=document.createElement("ul");elem.classList.add("list-group");elem.setAttribute("id",`${result[i].petType}List`);<HTMLElement>document.querySelector("#enquiryResults").appendChild(elem);let elem2=document.createElement("li");elem2.classList.add("list-group-item","list-group-item-info");elem2.setAttribute("id",`${result[i].petType}ListHeading`);elem.appendChild(elem2);}

    //Add Result
    let elem=document.createElement("li");elem.classList.add("list-group-item");elem.innerText=`Name: ${result[i].petName}  Type: ${result[i].petType}  Color: ${result[i].petColor}  Age: ${result[i].petAge}`;
    //Set Type Heading
    (<HTMLUListElement>document.querySelector(`#${result[i].petType}ListHeading`)).innerText=`${result[i].petType} - ${count[result[i].petType]}`;
    <HTMLElement>document.querySelector(`#${result[i].petType}List`).appendChild(elem);

 }




});
