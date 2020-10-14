//adding main container
var container = document.createElement('div');
container.classList.add('container');
var row = document.createElement('div');
row.classList.add('row');
container.appendChild(row);
document.body.appendChild(container);



//adding weather info modal
var elem0 = document.createElement('div');
elem0.classList.add('modal','fade');
elem0.setAttribute('id','weatherModal');
elem0.setAttribute('tabindex','-1');
var elem1 = document.createElement('div');
elem1.classList.add('modal-dialog');
elem1.setAttribute('role','document');
var elem2 = document.createElement('div');
elem2.classList.add('modal-content');
var elem3 = document.createElement('div');
elem3.classList.add('modal-header');
var elem4 = document.createElement('h5');
elem4.classList.add('modal-title');
elem4.setAttribute('id','countryName');
var txtnode =  document.createTextNode('Modal title');
elem4.appendChild(txtnode);
elem3.appendChild(elem4);
elem2.appendChild(elem3);
var elem5 = document.createElement('div');
elem5.classList.add('modal-body');
elem5.setAttribute('id','weatherInfo');
var txtnode =  document.createTextNode('...');
elem5.appendChild(txtnode);
elem2.appendChild(elem5);
var elem6 = document.createElement('div');
elem6.classList.add('modal-footer');
var elem7 = document.createElement('button');
elem7.setAttribute('type','button');
elem7.classList.add('btn','btn-secondary');
elem7.setAttribute('data-dismiss','modal');
var txtnode =  document.createTextNode('Close');
elem7.appendChild(txtnode);elem6.appendChild(elem7);
elem2.appendChild(elem6);elem1.appendChild(elem2);
elem0.appendChild(elem1);document.body.appendChild(elem0);


//calling function to add all countries
populateCountries()

//adding eventlistener for clicking on close in weather display
document.querySelector(".btn-secondary").addEventListener("click",()=>document.getElementById("weatherModal").style.display="none")




//function to get list of countries and add to DOM
async function populateCountries(){
    const request=await fetch("https://restcountries.eu/rest/v2/all");
    const countryJson= await request.json();
        console.log(countryJson)
    for(var i=0;i<countryJson.length;i++)
    {
        addtoDOM(countryJson[i]);


    }
    //adding eventlister for opening weather info
    document.querySelectorAll(".btn-primary").forEach((element)=>element.addEventListener("click",showWeather))

    }



//function to add single country to DOM
function addtoDOM(country)
{
    
   let main= document.createElement("div");
   main.classList.add("col","col-lg-4","col-sm-12");
   document.getElementsByClassName("row")[0].appendChild(main);
   let card=document.createElement("div");
   card.classList.add("card");
   main.appendChild(card);
   let cardheader=document.createElement("div");
   cardheader.classList.add("card-header");
   cardheader.innerText=country.name;
   card.appendChild(cardheader);
   let cardbody=document.createElement("div");
   cardbody.classList.add("card-body");
   card.appendChild(cardbody);
   let image=document.createElement("img");
   image.setAttribute("src",country.flag);
   cardbody.appendChild(image);
   let capital=document.createElement("div");
   capital.innerText="Capital: "+country.capital;
   cardbody.appendChild(capital);
   let region=document.createElement("div");
   region.innerText="Region: "+country.region;
   cardbody.appendChild(region);
   let code=document.createElement("div");
   code.innerText="Country Code: "+country.alpha3Code;
   cardbody.appendChild(code);
   let coord=document.createElement("div");
   coord.innerText="Lat/Lang: "+country.latlng;
   cardbody.appendChild(coord);
    let btn=document.createElement("Button");
    btn.innerText="Click for Weather";
    btn.setAttribute("data-name",country.name);
    btn.setAttribute("data-lat",country.latlng[0]);
    btn.setAttribute("data-long",country.latlng[1]);
    btn.classList.add("btn","btn-primary")
    cardbody.appendChild(btn);
}


//function to show weather info
async function showWeather(e){

    console.log(e.target.dataset);
    
    let weather = await fetch("https://api.openweathermap.org/data/2.5/weather?units=metric&lat="+e.target.dataset.lat+"&lon="+e.target.dataset.long+"&appid=bf2e4e237a5df58f91e39314379d8183")

   // console.log(await weather.json());
    let weatherJson=await weather.json();

    let modal = document.getElementById("weatherModal");
    document.getElementById("countryName").innerText=e.target.dataset.name;
    let info = document.getElementById("weatherInfo");
    info.innerHTML="";

    let temp=document.createElement("div");
   temp.innerText="Temperature: "+(weatherJson.main.temp);
   info.appendChild(temp);

   let humidity=document.createElement("div");
   humidity.innerText="Humidity: "+weatherJson.main.humidity;
   info.appendChild(humidity);

   let pressure=document.createElement("div");
   pressure.innerText="Pressure: "+weatherJson.main.pressure;
   info.appendChild(pressure);

    modal.classList.add("show");
    modal.style.display="block";

}
