/* Global Variables */
const api_keyNum = '39dd55d764a0ce65eade8a748c24a90d';
const accessEntryData = document.getElementById("generate");


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();



// start generate data
accessEntryData.addEventListener('click', async() =>{
    const zip_num = document.getElementById('zip').value;
    const felling_info = document.getElementById('feelings').value;
    // confirm condition for zipcode field
    if(isNaN(zip_num) || zip_num === ""){
        return alert(`Zip Code field can only contain numeric values`);
    }
    // gathering full path for api
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip_num}&appid=${api_keyNum}&units=metric`;
    // fetch data using api url
    //converting data to json
    const response = await fetch(url);
    if (response.status >= 200 && response.status <= 299) {
    var jsonData = await response.json();
    } else {
    // Handle errors
    //console.log(response.status, response.statusText);
    return alert(`zip code field is not in the right format`);
    }
    //const jsonData = await result.json();
    // extract temperature degree
    const temDegree = jsonData.main.temp;
    // calling a post function
    await postProcess (temDegree, felling_info)
    // calling a get function
    const data_body = await getProcess()
    //converting data to json
    const finalData = await data_body.json();
    // calling a viewData function
    viewData(finalData)
});


// function to post data in projectData variable 
function postProcess (temDegree, fellingInfo){
    return fetch('/gatheringData', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date: newDate,
            temp: temDegree,
            feelings: fellingInfo
        })
    });
}

// function to get data from projectData variable
function getProcess(){
    return fetch('/retrieveData', {
        method: 'GET',
        credentials: 'same-origin',
    });
}

// function to represent data into correct fields
function viewData(data){
    document.getElementById('date').innerHTML = data.date;
    document.getElementById('temp').innerHTML = data.temp;
    document.getElementById('content').innerHTML = data.feelings;

}
