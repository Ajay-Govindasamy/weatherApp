
//fetch all the REST countries
async function getCountriesList(){
	const response = await fetch(`https://restcountries.eu/rest/v2/all`);
	const responseData = await response.json();
	return responseData;
}

//weather details based on country's capital and alpha2Code
async function weatherDetails(capital,alpha2Code){
	const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital},${alpha2Code}&appid=3c1145541f4dd4f86ad50a2697490b1b`);
    const weatherResponse = await response.json();

    if(weatherResponse.cod==404) {
        swal(weatherResponse.message);
    } else {//Displaying results using Sweet Alert
         swal("Temperature: "+weatherResponse.main.temp +'°C\nDescription: '
         +weatherResponse.weather[0].description+','+weatherResponse.weather[0].main
         +'\nWind Speed: '+weatherResponse.wind.speed);
    }
	
}

//Display countries with FLAG's
(function() {
	getCountriesList()
	.then(result =>{
		result.forEach(element => {
		    //Display all the countries with Name and it's corresponding flag
            $('#displayCountries').append(`<div class="card card-body ">
            <div class="country-info">
            <div class="img"><img src="${element.flag}"></div>
            <div class="right-text">
            <p class=".text-primary form-control bg-dark text-white">${element.name}</p>
            <p> Capital: ${element.capital} </p>
            <button type="button" id="weatherId" class="btn btn-info " onclick="weatherDetails('${(element.capital.replace(/'/g,'%27')).replace(/ /g,'%20')}','${element.alpha2Code}');">weather Info</button>
            </div></div></div>`);
		});
		
	})
	.catch(error =>console.log(error));
})();

