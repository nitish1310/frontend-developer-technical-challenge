var fetch = require("node-fetch");
// import fetch from "node-fetch";
// import XMLHttpRequest from ("xmlhttprequest").XMLHttpRequest;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// fetch('http://jsonplaceholder.typicode.com/users', {
//   method: 'GET'
// }).then((response) => {
//   response.json().then((jsonResponse) => {
//     console.log(jsonResponse)
//   })
//   // assuming your json object is wrapped in an array
//   response.json().then(i => i.forEach(i => console.log(i.name)))
// }).catch((err) => {
//   console.log(`Error: ${err}` )
// });

async function fetchText() {
  const url =
    "http://api.exchangeratesapi.io/v1/latest?access_key=3a765ee97086b4b9f5b08d7aedfeba78&symbols=USD,AUD,CAD,PLN,MXN&format=1";
  // const url = "http://jsonplaceholder.typicode.com/users/1";
  let response = await fetch(url);

  console.log(response.status); // 200
  console.log(response.statusText); // OK

  if (response.status === 200) {
    let data = await response.json();
    // handle data
    console.log(data);
  }
}

//fetchText();

function fetchUserData() {
  fetch("https://jsonplaceholder.typicode.com/users/1")
    .then((response) => response.json())
    .then((json) => console.log(json))
    .then(alert(json));
}

function fetchData() {
  fetch("https://jsonplaceholder.typicode.com/users/").then((res) => {
    res.json().then((data) => {
      console.log(data);
      // if (data.data.length > 0) {
      var temp = "";
      // data?.map((itemData) => {
      // for (var itemData in data) {
      Object.keys(data).forEach((itemData) => {
        temp += "<tr>";
        temp += "<td>" + data[itemData].id + "</td>";
        temp += "<td>" + data[itemData].name + "</td>";
        temp += "<td>" + data[itemData].email + "</td></tr>";
      });
      document.getElementById("data").innerHTML = temp;
      // }
    });
  });
}

// fetchUserData();

function exchange() {
  let xhr = new XMLHttpRequest();

  document.getElementById("main").style.display = "block";

  var currencyValue = document.getElementById("currency").value;
  console.log(currencyValue);

  var dateValue = document.getElementById("date").value;
  console.log(dateValue);

  var title = document.getElementById("title");
  title.innerHTML = "EUR to " + currencyValue + " Comparisons";
  // const url =
  //   "http://api.exchangeratesapi.io/v1/latest?access_key=3a765ee97086b4b9f5b08d7aedfeba78&symbols=USD,AUD,CAD,PLN,MXN,EUR&format=1";

  const url =
    "http://api.exchangeratesapi.io/v1/" +
    dateValue +
    "?access_key=3a765ee97086b4b9f5b08d7aedfeba78&symbols=&symbols=USD,AUD,CAD,PLN,NZD,SEK,EUR,GBP,AED,DKK,ANG&format=1";
  // +
  // currencyValue +
  // ",EUR&format=1";

  xhr.open("get", url);

  // request state change event
  xhr.onreadystatechange = function () {
    // request completed?
    if (xhr.readyState !== 4) return;

    if (xhr.status === 200) {
      // request successful - show response
      const data = JSON.parse(xhr.responseText);
      // console.log(data.rates.USD);
      // console.log(data);
      // document.getElementById("data").innerHTML = data;
      // document.getElementById("s1").value = data.rates.USD;
      var temp = "";
      var currencyRates = data.rates;
      Object.keys(currencyRates).forEach((itemData) => {
        if (itemData == "USD" || itemData == "EUR") {
          temp += "<tr>";
          // temp += "<td>" + data[itemData].base + "</td>";
          temp += "<td>" + itemData + "</td>";
          temp += "<td>" + data.rates[itemData] + "</td></tr>";
        }
      });

      var temp2 = "";
      Object.keys(currencyRates).forEach((itemData) => {
        temp += "<tr>";
        // temp += "<td>" + data[itemData].base + "</td>";
        temp += "<td>" + itemData + "</td>";
        temp += "<td>" + data.rates[itemData] + "</td></tr>";
      });
      chart1(currencyRates);
      chart2(currencyRates);
      chart3(currencyRates);
      chart4(currencyRates);
      document.getElementById("tableData1").innerHTML = temp;
      document.getElementById("tableData2").innerHTML = temp2;
      //   console.log(xhr.responseText);
    } else {
      // request error
      console.log("HTTP error", xhr.status, xhr.statusText);
    }
  };

  // start request
  xhr.send();
}

function chart1(currencyRates) {
  var dps = [];
  var currencyValue = document.getElementById("currency").value;
  Object.keys(currencyRates).forEach((itemData) => {
    if (itemData == "USD" || itemData == "EUR") {
      dps.push({
        label: itemData,
        y: currencyRates[itemData],
      });
    }
  });
  // console.log(dps);
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title: {
      text: "EUR to " + currencyValue + " Bar Chart",
    },
    axisY: {
      title: "Rate",
    },
    axisX: {
      title: "Currency",
    },
    data: [
      {
        type: "bar",
        indexLabel: "{y}",
        dataPoints: dps,
      },
    ],
  });
  chart.render();
}

function chart2(currencyRates) {
  var dps = [];
  var currencyValue = document.getElementById("currency").value;
  Object.keys(currencyRates).forEach((itemData) => {
    if (itemData == "USD" || itemData == "EUR") {
      dps.push({
        name: itemData,
        y: currencyRates[itemData],
      });
    }
  });
  var chart2 = new CanvasJS.Chart("chartContainer2", {
    exportEnabled: true,
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "EUR to " + currencyValue + " Pie Chart",
    },
    legend: {
      cursor: "pointer",
      itemclick: explodePie,
    },
    data: [
      {
        type: "pie",
        showInLegend: true,
        toolTipContent: "{name}: <strong>{y}%</strong>",
        indexLabel: "{name} - {y}%",
        dataPoints: dps,
      },
    ],
  });
  chart2.render();
}

function explodePie(e) {
  if (
    typeof e.dataSeries.dataPoints[e.dataPointIndex].exploded === "undefined" ||
    !e.dataSeries.dataPoints[e.dataPointIndex].exploded
  ) {
    e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
  } else {
    e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
  }
  e.chart.render();
}

function chart3(currencyRates) {
  var dps = [];
  console.log(currencyRates);
  var currencyValue = document.getElementById("currency").value;
  Object.keys(currencyRates).forEach((itemData) => {
    if (itemData == "USD" || itemData == "EUR") {
      dps.push({
        label: itemData,
        y: currencyRates[itemData],
      });
    }
  });
  console.log(dps);
  var chart3 = new CanvasJS.Chart("chartContainer3", {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    title: {
      text: "EUR to " + currencyValue + " Bar Chart",
    },
    axisY: {
      title: "Rate",
    },
    axisX: {
      title: "Currency",
    },
    data: [
      {
        type: "column",
        dataPoints: dps,
      },
    ],
  });
  chart3.render();
}

function chart4(currencyRates) {
  var dps = [];
  Object.keys(currencyRates).forEach((itemData) => {
    dps.push({
      label: itemData,
      y: currencyRates[itemData],
    });
  });
  console.log(dps);
  var chart4 = new CanvasJS.Chart("chartContainer4", {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    title: {
      text: "EUR to All Currency Bar Chart",
    },
    axisY: {
      title: "Rate",
    },
    axisX: {
      title: "Currency",
    },
    data: [
      {
        type: "column",
        dataPoints: dps,
      },
    ],
  });
  chart4.render();
}

function chart5(currencyRates) {
  var dps = [];
  var currencyValue = document.getElementById("currency").value;
  Object.keys(currencyRates).forEach((itemData) => {
    if (itemData == "USD" || itemData == "EUR") {
      dps.push({
        name: itemData,
        y: currencyRates[itemData],
      });
    }
  });
  console.log(dps);
  var chart2 = new CanvasJS.Chart("chartContainer2", {
    exportEnabled: true,
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "EUR to " + currencyValue + " Pie Chart",
    },
    legend: {
      cursor: "pointer",
      itemclick: explodePie,
    },
    data: [
      {
        type: "pie",
        showInLegend: true,
        toolTipContent: "{name}: <strong>{y}%</strong>",
        indexLabel: "{name} - {y}%",
        dataPoints: dps,
      },
    ],
  });
  chart2.render();
}

// exchange();

function formCheck() {
  var dateValue = document.getElementById("date").value;
  console.log(dateValue);
  if (dateValue == "") {
    alert("Please select date");
    return false;
  }

  var selectedDate = dateValue;
  var currentDate = new Date();
  console.log(currentDate);
  selectedDate = new Date(selectedDate);
  console.log(selectedDate);
  if (selectedDate > currentDate) {
    document.getElementById("dateError").style.display = "block";
    return false;
  } else {
    document.getElementById("dateError").style.display = "none";
  }

  var currencySelected = document.getElementById("currency");
  if (currencySelected.selectedIndex == 0) {
    document.getElementById("currencyError").style.display = "block";
    return false;
  } else {
    document.getElementById("currencyError").style.display = "none";
  }
  exchange();
}

function test() {
  var currencySelected = document.getElementById("currency").value;
  var currencyValue = currencySelected.value;
  console.log(currencySelected);

  var dateValue = document.getElementById("date").value;
  console.log(dateValue);
  // var x = "Click me";
  // document.getElementById("s1").value = x;
}
