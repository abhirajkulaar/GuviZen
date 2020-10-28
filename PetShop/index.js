var Pet = /** @class */ (function () {
    function Pet(obj) {
        this.petName = obj.petName;
        this.petType = obj.petType;
        this.petColor = obj.petColor;
        this.petAge = obj.petAge;
    }
    return Pet;
}());
var PetEnquiry = /** @class */ (function () {
    function PetEnquiry(obj) {
        this.petAgeMax = obj.petAgeMax;
        this.petAgeMin = obj.petAgeMin;
        this.petColor = obj.petColor;
        this.petType = obj.petType;
    }
    return PetEnquiry;
}());
var PetType;
(function (PetType) {
    PetType["Dog"] = "Dog";
    PetType["Cat"] = "Cat";
    PetType["Bird"] = "Bird";
    PetType["Fish"] = "Fish";
})(PetType || (PetType = {}));
var PetColor;
(function (PetColor) {
    PetColor["Black"] = "Black";
    PetColor["White"] = "White";
    PetColor["Brown"] = "Brown";
    PetColor["Golden"] = "Golden";
    PetColor["Red"] = "Red";
    PetColor["Grey"] = "Grey";
})(PetColor || (PetColor = {}));
var petAvailable = [];
var petEnquiry = [];
function arrayMatch(ar, ob) {
    for (var i = 0; i < ar.length; i++) {
        if (ar[i] == ob) {
            return true;
        }
    }
    return false;
}
function matchEnquiry(availablePets, enquiredPets) {
    var to_return = [];
    availablePets.forEach(function (avbPetObject) { enquiredPets.forEach(function (enqPetObj) { if (avbPetObject.petAge >= enqPetObj.petAgeMin && avbPetObject.petAge <= enqPetObj.petAgeMax && arrayMatch(enqPetObj.petColor, avbPetObject.petColor) && arrayMatch(enqPetObj.petType, avbPetObject.petType)) {
        to_return.push(avbPetObject);
    } }); });
    return to_return;
}
var newPet = new Pet({ petName: "Puppy", petType: PetType.Dog, petColor: PetColor.Black, petAge: 8 });
var as = "Dog";
newPet = new Pet({ petName: "Puppy", petType: PetType[as], petColor: PetType[as], petAge: 8 });
document.querySelector("#addPetForm").addEventListener("submit", function () {
    var toAdd = new Pet({
        petName: document.querySelector("#petName").value,
        petColor: PetColor[document.querySelector("#petColor").value],
        petAge: parseInt(document.querySelector("#petAge").value),
        petType: PetType[document.querySelector("#petType").value]
    });
    petAvailable.push(toAdd);
    document.querySelector("#newPetSuccess").classList.remove("d-none");
    setTimeout(function () { return document.querySelector("#newPetSuccess").classList.add("d-none"); }, 2000);
});
document.querySelector("#addEnquiryForm").addEventListener("submit", function () {
    var selectedColors = [];
    var selectedColorsHTMLCollection = document.querySelector("#enqPetColorList").selectedOptions;
    for (var i = 0; i < selectedColorsHTMLCollection.length; i++) {
        selectedColors.push(PetColor[selectedColorsHTMLCollection[i].value]);
    }
    var selectedTypes = [];
    var selectedTypesHTMLCollection = document.querySelector("#enqPetTypeList").selectedOptions;
    for (var i = 0; i < selectedTypesHTMLCollection.length; i++) {
        selectedTypes.push(PetType[selectedTypesHTMLCollection[i].value]);
    }
    var toAdd = new PetEnquiry({
        petType: selectedTypes,
        petColor: selectedColors,
        petAgeMin: parseInt(document.querySelector("#enqPetAgeMin").value),
        petAgeMax: parseInt(document.querySelector("#enqPetAgeMax").value)
    });
    petEnquiry.push(toAdd);
    document.querySelector("#newEnqSuccess").classList.remove("d-none");
    setTimeout(function () { return document.querySelector("#newEnqSuccess").classList.add("d-none"); }, 2000);
    var elem = document.createElement("li");
    elem.classList.add("list-group-item");
    elem.innerText = "A " + toAdd.petColor.join("/") + " " + toAdd.petType.join("/") + " between age " + toAdd.petAgeMin + " and " + toAdd.petAgeMax;
    document.querySelector("#enquiryList").appendChild(elem);
    document.querySelector("#enqListHeading").classList.remove("d-none");
    document.querySelector("#executeInquiry").classList.remove("d-none");
});
document.querySelector("#addPetToggle").addEventListener("click", function () { return document.querySelector("#addPetForm").classList.toggle("d-none"); });
document.querySelector("#addEnqToggle").addEventListener("click", function () { return document.querySelector("#addEnquiryForm").classList.toggle("d-none"); });
document.querySelector("#executeInquiry").addEventListener("click", function () {
    document.querySelector("#enquiryResults").innerHTML = "";
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
        count[result[i].petType]++;
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
        var elem = document.createElement("li");
        elem.classList.add("list-group-item");
        elem.innerText = "Name: " + result[i].petName + "  Type: " + result[i].petType + "  Color: " + result[i].petColor + "  Age: " + result[i].petAge;
        document.querySelector("#" + result[i].petType + "ListHeading").innerText = result[i].petType + " - " + count[result[i].petType];
        document.querySelector("#" + result[i].petType + "List").appendChild(elem);
    }
});
