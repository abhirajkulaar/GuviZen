//create PetObject interface for available pets
// Class for objects of available pets with constructor accepting interface
var Pet = /** @class */ (function () {
    function Pet(obj) {
        this.petName = obj.petName;
        this.petType = obj.petType;
        this.petColor = obj.petColor;
        this.petAge = obj.petAge;
    }
    return Pet;
}());
//Class for objects of enquiry of pets with constructor accepting interface
var PetEnquiry = /** @class */ (function () {
    function PetEnquiry(obj) {
        this.petAgeMax = obj.petAgeMax;
        this.petAgeMin = obj.petAgeMin;
        this.petColor = obj.petColor;
        this.petType = obj.petType;
    }
    return PetEnquiry;
}());
//PetType is Enum
var PetType;
(function (PetType) {
    PetType["Dog"] = "Dog";
    PetType["Cat"] = "Cat";
    PetType["Bird"] = "Bird";
    PetType["Fish"] = "Fish";
})(PetType || (PetType = {}));
//PetColor is Enum
var PetColor;
(function (PetColor) {
    PetColor["Black"] = "Black";
    PetColor["White"] = "White";
    PetColor["Brown"] = "Brown";
    PetColor["Golden"] = "Golden";
    PetColor["Red"] = "Red";
    PetColor["Grey"] = "Grey";
})(PetColor || (PetColor = {}));
//Initialize Array of Available Pets
var petAvailable = [];
//Initialize Array of Enquiry Pets
var petEnquiry = [];
//Function to check if enum present in array of enums
function arrayMatch(ar, ob) {
    for (var i = 0; i < ar.length; i++) {
        if (ar[i] == ob) {
            return true;
        }
    }
    return false;
}
//This function accepts all available pets and an array of enquiry objects -> it returns all available pets which match any enquiry
function matchEnquiry(availablePets, enquiredPets) {
    var to_return = [];
    availablePets.forEach(function (avbPetObject) { enquiredPets.forEach(function (enqPetObj) { if (avbPetObject.petAge >= enqPetObj.petAgeMin && avbPetObject.petAge <= enqPetObj.petAgeMax && arrayMatch(enqPetObj.petColor, avbPetObject.petColor) && arrayMatch(enqPetObj.petType, avbPetObject.petType)) {
        to_return.push(avbPetObject);
    } }); });
    return to_return;
}
//Create New Pet function -> creates new pet object and pushes to global availsble pets array
document.querySelector("#addPetForm").addEventListener("submit", function () {
    var toAdd = new Pet({
        petName: document.querySelector("#petName").value,
        petColor: PetColor[document.querySelector("#petColor").value],
        petAge: parseInt(document.querySelector("#petAge").value),
        petType: PetType[document.querySelector("#petType").value]
    });
    petAvailable.push(toAdd);
    //Show success message
    document.querySelector("#newPetSuccess").classList.remove("d-none");
    setTimeout(function () { return document.querySelector("#newPetSuccess").classList.add("d-none"); }, 2000);
    //Reset Form
    document.querySelector("#addPetForm").reset();
});
//Create New Enquiry function -> creates new enquiry object and pushes to global enquiry for pets array
document.querySelector("#addEnquiryForm").addEventListener("submit", function () {
    //Collects all selected options for color of pets into selectedColors array
    var selectedColors = [];
    var selectedColorsHTMLCollection = document.querySelector("#enqPetColorList").selectedOptions;
    for (var i = 0; i < selectedColorsHTMLCollection.length; i++) {
        selectedColors.push(PetColor[selectedColorsHTMLCollection[i].value]);
    }
    //Collects all selected options for type of pets into selectedTypes array
    var selectedTypes = [];
    var selectedTypesHTMLCollection = document.querySelector("#enqPetTypeList").selectedOptions;
    for (var i = 0; i < selectedTypesHTMLCollection.length; i++) {
        selectedTypes.push(PetType[selectedTypesHTMLCollection[i].value]);
    }
    //Creates PetEnquiry object
    var toAdd = new PetEnquiry({
        petType: selectedTypes,
        petColor: selectedColors,
        petAgeMin: parseInt(document.querySelector("#enqPetAgeMin").value),
        petAgeMax: parseInt(document.querySelector("#enqPetAgeMax").value)
    });
    //Push object to main enquiry array
    petEnquiry.push(toAdd);
    //Show success message
    document.querySelector("#newEnqSuccess").classList.remove("d-none");
    setTimeout(function () { return document.querySelector("#newEnqSuccess").classList.add("d-none"); }, 2000);
    //Show inquiry in List
    var elem = document.createElement("li");
    elem.classList.add("list-group-item");
    elem.innerText = "A " + toAdd.petColor.join("/") + " " + toAdd.petType.join("/") + " between age " + toAdd.petAgeMin + " and " + toAdd.petAgeMax;
    document.querySelector("#enquiryList").appendChild(elem);
    document.querySelector("#enqListHeading").classList.remove("d-none");
    document.querySelector("#executeInquiry").classList.remove("d-none");
    document.querySelector("#addEnquiryForm").reset();
});
//EventListener for Add/Create Available Pet Button to expand menu
document.querySelector("#addPetToggle").addEventListener("click", function () { return document.querySelector("#addPetForm").classList.toggle("d-none"); });
//EventListener for Add/Create Enquiry Button to expand menu
document.querySelector("#addEnqToggle").addEventListener("click", function () { return document.querySelector("#addEnquiryForm").classList.toggle("d-none"); });
document.querySelector("#executeInquiry").addEventListener("click", function () {
    ////EventListener for producing Query Results
    document.querySelector("#enquiryResults").innerHTML = "";
    //Get final output from function
    var result = matchEnquiry(petAvailable, petEnquiry);
    if (result.length == 0) {
        document.querySelector("#noResultEnquiry").classList.remove("d-none");
        setTimeout(function () { return document.querySelector("#noResultEnquiry").classList.add("d-none"); }, 2000);
    }
    var count = [];
    for (var i = 0; i < result.length; i++) {
        if (!count[result[i].petType]) {
            count[result[i].petType] = 0;
        }
        //set count by Tupe
        count[result[i].petType]++;
        //Create List for Type
        if (!document.querySelector("#" + result[i].petType + "List")) {
            var elem_1 = document.createElement("ul");
            elem_1.classList.add("list-group");
            elem_1.setAttribute("id", result[i].petType + "List");
            document.querySelector("#enquiryResults").appendChild(elem_1);
            var elem2 = document.createElement("li");
            elem2.classList.add("list-group-item", "list-group-item-info");
            elem2.setAttribute("id", result[i].petType + "ListHeading");
            elem_1.appendChild(elem2);
        }
        //Add Result
        var elem = document.createElement("li");
        elem.classList.add("list-group-item");
        elem.innerText = "Name: " + result[i].petName + "  Type: " + result[i].petType + "  Color: " + result[i].petColor + "  Age: " + result[i].petAge;
        //Set Type Heading
        document.querySelector("#" + result[i].petType + "ListHeading").innerText = result[i].petType + " - " + count[result[i].petType];
        document.querySelector("#" + result[i].petType + "List").appendChild(elem);
    }
});
