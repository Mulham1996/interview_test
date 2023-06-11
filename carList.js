const $ = (selector) => document.getElementById(selector);
import {car_List} from "./carDetails.js";

//console.log(car_List[0]);


//   i will create my own database in a seperate js file carDetails.js,
// its not going to look well but since zk is not being downloaded then its what i have
// i will creat a methode to sort throw my array of cars if the current index is larger and based
// on the return value the sorting way is going to be determined 
// return 1 if the first is biger than the secound which means accending order 
// or return -1 if the other way around which means the secound element is biger then the first so desending order
// or retrurn 0 if they are the same (maybe then i try to compare the second number if its a Numeric or the secound char if i am comparing strings)

// i am thinking about making the header clickable so when the user click on it 
// it is going to sort acsending order and then one more clock decending order
// but first i should show all the cars with the prices and all other info 
// i will render all of this info from the carDetails.js 
// then  i will create the button to show all prices 
// and i will try to add a click event when you click on a car it decreases the price fo the car from the overall price




const table = $("result-table");
const column_model = $("model");
const column_make = $("make");
const column_price = $("price");
const pricesButton = $("car-value-button");
const totalValue = $("total-display");
var i;
var totalCarPrices = 0;



renderCarList();
totalCarPrices = carsPrices();
totalValue.innerHTML = totalCarPrices;


column_model.addEventListener("click",() => {
    sorting(0);
})
column_make.addEventListener("click",() => {
    sorting(1);
})
column_price.addEventListener("click",(event) => {
    sorting(2);
})

table.addEventListener("click",(event) => {
      const tableRow = event.target;
      const pickedCar = parseInt(tableRow.innerHTML);
      if (pickedCar === NaN) {
        return;
      }
      else {
        
      totalCarPrices = totalCarPrices - parseInt(tableRow.innerHTML);
      return totalCarPrices

      // i have a propblem here so when i click on a car it decrease the price of the car from the overall value, however i need to take the 
    /* value inside of the td element by stating .innerHTML and then with parseInt i make it an integer bur i cant do this with the rest of elements in the table 
        i have an idea maybe but it was too complicated . . the idea was if i can takethe value of the id and make a call to get the car with the index id 
        like this carList[id].price this is going to allow me to pick the price of the clicked car but again the same problem happens when the user click on Something else 
        like when the users click on the Description or the Make  */

}
});



function renderCarList() {

table.querySelector("tbody").innerHTML = "";
    car_List.forEach((car) => {
    const row = document.createElement("tr");

    row.innerHTML += `<td>${car.id}</td>`;
    row.innerHTML += `<td>${car.model}</td>`;
    //row.innerText += `<td>${car.model}</td>`;

    row.innerHTML += `<td>${car.make}</td>`;


    row.innerHTML += `<td>${car.description}</td>`;
    // i am thinking about making the description in a seperate place 
    // maybe a dialog that pops when we click on the car 


    row.innerHTML += `<td>${car.price}</td>`;
    table.querySelector("tbody").append(row);

    });
}

function sorting(column) {


    var rowSwitch;
    var numberOfSwitches  = 0;
    var rows;
    var currentRow, nextRow;
    var flag ;
    var Sorting_Direction;

// the falg should work as a starting point for the sorting and also the finshing point
// so i raise a flag, i start sorting then i raise a flag again and i stop.




flag = true;

    Sorting_Direction = "decendingOrder";
    while(flag) {
        flag = false;
        rows = table.rows;

        for( i = 1; i < (rows.length - 1); i++) {
            rowSwitch = false;
             currentRow = rows[i].getElementsByTagName("TD")[column];
             nextRow = rows[i + 1].getElementsByTagName("TD")[column];
             // console.log(currentRow );
             // console.log(nextRow );

            // we have now the element and the next element we need now to sort them in the order descending then Ascending and so on
            // i will make it a click event so when the header is clicked it changes the order.
            // lets start with Descending order and then with a click it changes to Ascednign and whenever i click the same thing happens.
            // i should make it stop at some point (  i am not sure (*-*)  )

            if (Sorting_Direction == "decendingOrder") {
                // console.log(currentRow)
                if (currentRow.innerHTML.toLowerCase() < nextRow.innerHTML.toLowerCase() ) {
                    rowSwitch = true;
                 //   console.log(currentRow);
                    break;
                }
            }
            else if (Sorting_Direction == "AscendingOrder") {
                if (currentRow.innerHTML.toLowerCase() > nextRow.innerHTML.toLowerCase()){
                    rowSwitch = true;
                    break;
                }
            }
        }
    if (rowSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        numberOfSwitches++;
        flag = true;
    }
    
    else {
        if (Sorting_Direction == "decendingOrder" && numberOfSwitches == 0) {
            Sorting_Direction = "AscendingOrder";
            flag = true;
        }
    }
    
}
}


//column_make.addEventListener("click", () => {
//})

//column_price.addEventListener("click", () => {
  //  sorting(2);
//})

/* var total = carsPrices();
totalValue.innerHTML = total;
console.log(total); */

pricesButton.addEventListener("click", () => {
   totalValue.style.visibility = 'visible';

});

function carsPrices() {
   /*  for (i = 1; i < table.rows.length ; i++) {
        totalCarPrices = totalCarPrices + parseInt(
            table.rows[i].cells[2].innerHTML
            );

            
               // console.log(rows[i].cells[1]);
        }
        
            return totalCarPrices; */

            car_List.forEach((car) => {
                totalCarPrices += parseInt(car.price);
            });
            return totalCarPrices;
}






