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

  var title1 = document.getElementById("title1");
  title1.innerHTML = "EUR to " + currencyValue + " Comparisons";

  var title2 = document.getElementById("title2");
  title2.innerHTML = "EUR to All Currency Comparison";
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
        temp2 += "<tr>";
        // temp += "<td>" + data[itemData].base + "</td>";
        temp2 += "<td>" + itemData + "</td>";
        temp2 += "<td>" + data.rates[itemData] + "</td></tr>";
      });
      chart1(currencyRates);
      chart2(currencyRates);
      chart3(currencyRates);
      chart4(currencyRates);
      chart5(currencyRates);
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

function historicalExchange() {
  let xhr1 = new XMLHttpRequest();
  let xhr2 = new XMLHttpRequest();
  let xhr3 = new XMLHttpRequest();
  let xhr4 = new XMLHttpRequest();
  let xhr5 = new XMLHttpRequest();
  var dateValue1 = "2021-06-15";
  var dateValue2 = "2020-06-15";
  var dateValue3 = "2019-06-15";
  var dateValue4 = "2018-06-15";
  var dateValue5 = "2017-06-15";

  let dataArr = [];
  const url1 =
    "http://api.exchangeratesapi.io/v1/" +
    dateValue1 +
    "?access_key=3a765ee97086b4b9f5b08d7aedfeba78&symbols=&symbols=USD,AUD,CAD,PLN,NZD,SEK,EUR,GBP,AED,DKK,ANG&format=1";

  const url2 =
    "http://api.exchangeratesapi.io/v1/" +
    dateValue2 +
    "?access_key=3a765ee97086b4b9f5b08d7aedfeba78&symbols=&symbols=USD,AUD,CAD,PLN,NZD,SEK,EUR,GBP,AED,DKK,ANG&format=1";

  const url3 =
    "http://api.exchangeratesapi.io/v1/" +
    dateValue3 +
    "?access_key=3a765ee97086b4b9f5b08d7aedfeba78&symbols=&symbols=USD,AUD,CAD,PLN,NZD,SEK,EUR,GBP,AED,DKK,ANG&format=1";

  const url4 =
    "http://api.exchangeratesapi.io/v1/" +
    dateValue4 +
    "?access_key=3a765ee97086b4b9f5b08d7aedfeba78&symbols=&symbols=USD,AUD,CAD,PLN,NZD,SEK,EUR,GBP,AED,DKK,ANG&format=1";

  const url5 =
    "http://api.exchangeratesapi.io/v1/" +
    dateValue5 +
    "?access_key=3a765ee97086b4b9f5b08d7aedfeba78&symbols=&symbols=USD,AUD,CAD,PLN,NZD,SEK,EUR,GBP,AED,DKK,ANG&format=1";

  xhr1.open("get", url1);
  xhr1.onreadystatechange = function () {
    if (xhr1.readyState !== 4) return;
    if (xhr1.status === 200) {
      var data1 = JSON.parse(xhr1.responseText);
      dataArr.push(data1);
    } else {
      console.log("HTTP error", xhr1.status, xhr1.statusText);
    }
  };
  xhr1.send();

  xhr2.open("get", url2);
  xhr2.onreadystatechange = function () {
    if (xhr2.readyState !== 4) return;
    if (xhr2.status === 200) {
      var data2 = JSON.parse(xhr2.responseText);
      dataArr.push(data2);
    } else {
      console.log("HTTP error", xhr2.status, xhr2.statusText);
    }
  };
  xhr2.send();

  xhr3.open("get", url3);
  xhr3.onreadystatechange = function () {
    if (xhr3.readyState !== 4) return;
    if (xhr3.status === 200) {
      var data3 = JSON.parse(xhr3.responseText);
      dataArr.push(data3);
    } else {
      console.log("HTTP error", xhr3.status, xhr3.statusText);
    }
  };
  xhr3.send();
  // console.log(dataArr);

  xhr4.open("get", url4);
  xhr4.onreadystatechange = function () {
    if (xhr4.readyState !== 4) return;
    if (xhr4.status === 200) {
      var data4 = JSON.parse(xhr4.responseText);
      dataArr.push(data4);
    } else {
      console.log("HTTP error", xhr4.status, xhr4.statusText);
    }
  };
  xhr4.send();

  xhr5.open("get", url5);
  xhr5.onreadystatechange = function () {
    if (xhr5.readyState !== 4) return;
    if (xhr5.status === 200) {
      var data5 = JSON.parse(xhr5.responseText);
      dataArr.push(data5);
      chart6(dataArr);
    } else {
      console.log("HTTP error", xhr1.status, xhr5.statusText);
    }
  };
  xhr5.send();

  // console.log(dataArr);

  // chart6(dataArr);

  // localStorage.setItem("data", dataArr);
  // console.log(localStorage.getItem("data"));
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
      text: "EUR to " + currencyValue + "Comparison Bar Chart",
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
      text: "EUR to " + currencyValue + "Comparison Pie Chart",
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
      text: "EUR to " + currencyValue + "Comparison Bar Chart",
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
      text: "EUR to All Currency Comparison Bar Chart",
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
  var chart5 = new CanvasJS.Chart("chartContainer5", {
    exportEnabled: true,
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "EUR to All Currency Comparison Pie Chart",
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
  chart5.render();
}

function chart6(dataArr) {
  console.log(dataArr);

  var dps1 = [];
  var dps2 = [];
  var dps3 = [];
  var dps4 = [];
  var dps5 = [];
  // for (let i = 0; i <= dataArr.length; i++) {
  // console.log(dataArr[1]);
  // Object.keys(dataArr).forEach((itemData) => {
  //   dps1.push({
  //     x: new Date(itemData.date),
  //     y: itemData.rates[2],
  //   });
  // });
  // }

  var result = dataArr.map((item) => {
    var newDate = item.date.split("-").join(",");
    dps1.push({
      x: new Date(newDate),
      y: item.rates.AUD,
    });
  });

  // let base = dataArr.map((item) => item.rates.USD);
  // console.log(base);

  var newArr = Object.assign({}, dataArr);
  // console.log(newArr);

  var size = Object.keys(dataArr).length;
  // console.log(size);

  // console.log(obj);
  document.getElementById("array").innerHTML = dataArr;
  console.log(dps1);
  var chart6 = new CanvasJS.Chart("chartContainer6", {
    title: {
      text: "House Median Price",
    },
    axisX: {
      valueFormatString: "MMM YYYY",
    },
    axisY2: {
      title: "Median List Price",
      prefix: "$",
      suffix: "K",
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      verticalAlign: "top",
      horizontalAlign: "center",
      dockInsidePlotArea: true,
      // itemclick: toogleDataSeries,
    },
    data: [
      {
        type: "line",
        axisYType: "secondary",
        name: "AUD",
        showInLegend: true,
        markerSize: 0,
        yValueFormatString: "$#,###k",
        dataPoints: dps1,
      },
      {
        type: "line",
        axisYType: "secondary",
        name: "Seatle",
        showInLegend: true,
        markerSize: 0,
        yValueFormatString: "$#,###k",
        dataPoints: [
          { x: new Date(2014, 00, 01), y: 409 },
          { x: new Date(2014, 01, 01), y: 415 },
          { x: new Date(2014, 02, 01), y: 419 },
          { x: new Date(2014, 03, 01), y: 429 },
          { x: new Date(2014, 04, 01), y: 429 },
          { x: new Date(2014, 05, 01), y: 450 },
          { x: new Date(2014, 06, 01), y: 450 },
          { x: new Date(2014, 07, 01), y: 445 },
          { x: new Date(2014, 08, 01), y: 450 },
          { x: new Date(2014, 09, 01), y: 450 },
          { x: new Date(2014, 10, 01), y: 440 },
          { x: new Date(2014, 11, 01), y: 429 },
          { x: new Date(2015, 00, 01), y: 435 },
          { x: new Date(2015, 01, 01), y: 450 },
          { x: new Date(2015, 02, 01), y: 475 },
          { x: new Date(2015, 03, 01), y: 475 },
          { x: new Date(2015, 04, 01), y: 475 },
          { x: new Date(2015, 05, 01), y: 489 },
          { x: new Date(2015, 06, 01), y: 495 },
          { x: new Date(2015, 07, 01), y: 495 },
          { x: new Date(2015, 08, 01), y: 500 },
          { x: new Date(2015, 09, 01), y: 508 },
          { x: new Date(2015, 10, 01), y: 520 },
          { x: new Date(2015, 11, 01), y: 525 },
          { x: new Date(2016, 00, 01), y: 525 },
          { x: new Date(2016, 01, 01), y: 529 },
          { x: new Date(2016, 02, 01), y: 549 },
          { x: new Date(2016, 03, 01), y: 550 },
          { x: new Date(2016, 04, 01), y: 568 },
          { x: new Date(2016, 05, 01), y: 575 },
          { x: new Date(2016, 06, 01), y: 579 },
          { x: new Date(2016, 07, 01), y: 575 },
          { x: new Date(2016, 08, 01), y: 585 },
          { x: new Date(2016, 09, 01), y: 589 },
          { x: new Date(2016, 10, 01), y: 595 },
          { x: new Date(2016, 11, 01), y: 595 },
          { x: new Date(2017, 00, 01), y: 595 },
          { x: new Date(2017, 01, 01), y: 600 },
          { x: new Date(2017, 02, 01), y: 624 },
          { x: new Date(2017, 03, 01), y: 635 },
          { x: new Date(2017, 04, 01), y: 650 },
          { x: new Date(2017, 05, 01), y: 675 },
        ],
      },
      {
        type: "line",
        axisYType: "secondary",
        name: "Los Angeles",
        showInLegend: true,
        markerSize: 0,
        yValueFormatString: "$#,###k",
        dataPoints: [
          { x: new Date(2014, 00, 01), y: 529 },
          { x: new Date(2014, 01, 01), y: 540 },
          { x: new Date(2014, 02, 01), y: 539 },
          { x: new Date(2014, 03, 01), y: 565 },
          { x: new Date(2014, 04, 01), y: 575 },
          { x: new Date(2014, 05, 01), y: 579 },
          { x: new Date(2014, 06, 01), y: 589 },
          { x: new Date(2014, 07, 01), y: 579 },
          { x: new Date(2014, 08, 01), y: 579 },
          { x: new Date(2014, 09, 01), y: 579 },
          { x: new Date(2014, 10, 01), y: 569 },
          { x: new Date(2014, 11, 01), y: 525 },
          { x: new Date(2015, 00, 01), y: 535 },
          { x: new Date(2015, 01, 01), y: 575 },
          { x: new Date(2015, 02, 01), y: 599 },
          { x: new Date(2015, 03, 01), y: 619 },
          { x: new Date(2015, 04, 01), y: 639 },
          { x: new Date(2015, 05, 01), y: 648 },
          { x: new Date(2015, 06, 01), y: 640 },
          { x: new Date(2015, 07, 01), y: 645 },
          { x: new Date(2015, 08, 01), y: 648 },
          { x: new Date(2015, 09, 01), y: 649 },
          { x: new Date(2015, 10, 01), y: 649 },
          { x: new Date(2015, 11, 01), y: 649 },
          { x: new Date(2016, 00, 01), y: 650 },
          { x: new Date(2016, 01, 01), y: 665 },
          { x: new Date(2016, 02, 01), y: 675 },
          { x: new Date(2016, 03, 01), y: 695 },
          { x: new Date(2016, 04, 01), y: 690 },
          { x: new Date(2016, 05, 01), y: 699 },
          { x: new Date(2016, 06, 01), y: 699 },
          { x: new Date(2016, 07, 01), y: 699 },
          { x: new Date(2016, 08, 01), y: 699 },
          { x: new Date(2016, 09, 01), y: 699 },
          { x: new Date(2016, 10, 01), y: 709 },
          { x: new Date(2016, 11, 01), y: 699 },
          { x: new Date(2017, 00, 01), y: 700 },
          { x: new Date(2017, 01, 01), y: 700 },
          { x: new Date(2017, 02, 01), y: 724 },
          { x: new Date(2017, 03, 01), y: 739 },
          { x: new Date(2017, 04, 01), y: 749 },
          { x: new Date(2017, 05, 01), y: 740 },
        ],
      },
    ],
  });
  chart6.render();
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

var fetch = require("node-fetch");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function currencyInfo() {
  var currencyInfoData = [
    {
      id: 1,
      name: "USD",
      title: "USD - US Dollar",
      icon: "https://www.countryflags.io/us/flat/64.png",
      info: "The United States dollar is the official currency of the United States and its territories. The currency code for US Dollars is USD. The currency symbol is $.",
    },
    {
      id: 2,
      name: "EUR",
      title: "EUR - Euro",
      icon: "https://www.countryflags.io/eu/flat/64.png",
      info: "The euro is the official currency of 19 of the 27 member states of the European Union. The currency code for Euros is EUR. The currency symbol is €.",
    },
    {
      id: 3,
      name: "CAD",
      title: "CAD - Canadian Dollar",
      icon: "https://www.countryflags.io/ca/flat/64.png",
      info: "he Canadian dollar is the currency of Canada. The currency code for Canadian Dollars is CAD. The currency symbol is $ or CA$,.",
    },
    {
      id: 4,
      name: "GBP",
      title: "GBP - British Pound",
      icon: "https://www.countryflags.io/gb/flat/64.png",
      info: "The pound sterling, known in some contexts simply as the pound or sterling, is the official currency of the United Kingdom, Jersey, Guernsey, the Isle of Man, Gibraltar, South Georgia and the South Sandwich Islands, the British Antarctic Territory, and Tristan da Cunha. The currency code for British Pounds is GBP. The currency symbol is £.",
    },
    {
      id: 5,
      name: "NZD",
      title: "NZD - New Zealand Dollar",
      icon: "https://www.countryflags.io/nz/flat/64.png",
      info: "The New Zealand dollar is the official currency and legal tender of New Zealand, the Cook Islands, Niue, the Ross Dependency, Tokelau, and a British territory, the Pitcairn Islands.  The currency code for New Zealand Dollars is NZD. The currency symbol is $ or NZ$‎.",
    },
    {
      id: 6,
      name: "AUD",
      title: "AUD - Australian Dollar",
      icon: "https://www.countryflags.io/au/flat/64.png",
      info: "The Australian dollar is the currency of Australia, including its external territories: Christmas Island, Cocos Islands, and Norfolk Island. The currency code for Australian Dollars is AUD. The currency symbol is $ or A$.",
    },
  ];

  var currencyValue = document.getElementById("currency").value;
  var titleCurrency = "";
  var iconCurrency = "";
  var infoCurrency = "";

  if (currencyValue === "USD") {
    titleCurrency = currencyInfoData.find((item) => item.name === "USD").title;
    iconCurrency = currencyInfoData.find((item) => item.name === "USD").icon;
    infoCurrency = currencyInfoData.find((item) => item.name === "USD").info;
    console.log(titleCurrency);
  } else if (currencyValue === "EUR") {
    titleCurrency = currencyInfoData.find((item) => item.name === "EUR").title;
    iconCurrency = currencyInfoData.find((item) => item.name === "EUR").icon;
    infoCurrency = currencyInfoData.find((item) => item.name === "EUR").info;
    console.log(titleCurrency);
  } else if (currencyValue === "CAD") {
    titleCurrency = currencyInfoData.find((item) => item.name === "CAD").title;
    iconCurrency = currencyInfoData.find((item) => item.name === "CAD").icon;
    infoCurrency = currencyInfoData.find((item) => item.name === "CAD").info;
    console.log(titleCurrency);
  } else if (currencyValue === "GBP") {
    titleCurrency = currencyInfoData.find((item) => item.name === "GBP").title;
    iconCurrency = currencyInfoData.find((item) => item.name === "GBP").icon;
    infoCurrency = currencyInfoData.find((item) => item.name === "GBP").info;
    console.log(titleCurrency);
  } else if (currencyValue === "NZD") {
    titleCurrency = currencyInfoData.find((item) => item.name === "NZD").title;
    iconCurrency = currencyInfoData.find((item) => item.name === "NZD").icon;
    infoCurrency = currencyInfoData.find((item) => item.name === "NZD").info;
    console.log(titleCurrency);
  } else if (currencyValue === "AUD") {
    titleCurrency = currencyInfoData.find((item) => item.name === "AUD").title;
    iconCurrency = currencyInfoData.find((item) => item.name === "AUD").icon;
    infoCurrency = currencyInfoData.find((item) => item.name === "AUD").info;
    console.log(titleCurrency);
  } else {
    return false;
  }
  var titleCurrencyValue = document.getElementById("titleCurrency");
  titleCurrencyValue.innerHTML = titleCurrency;

  var iconCurrencyValue = document.getElementById("iconCurrency");
  iconCurrencyValue.src = iconCurrency;

  var infoCurrencyValue = document.getElementById("infoCurrency");
  infoCurrencyValue.innerHTML = infoCurrency;
}

function exchange() {
  let xhr = new XMLHttpRequest();

  document.getElementById("main").style.display = "block";

  var currencyValue = document.getElementById("currency").value;
  console.log(currencyValue);

  var dateValue = document.getElementById("date").value;
  console.log(dateValue);

  var title1 = document.getElementById("title1");
  title1.innerHTML = "EUR to " + currencyValue + " Comparisons";

  var title2 = document.getElementById("title2");
  title2.innerHTML = "EUR to All Currency Comparison";

  // var currency2 = document.getElementById("currency2");
  // currency2.innerHTML = currencyValue;
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
        temp2 += "<tr>";
        // temp += "<td>" + data[itemData].base + "</td>";
        temp2 += "<td>" + itemData + "</td>";
        temp2 += "<td>" + data.rates[itemData] + "</td></tr>";
      });
      chart1(currencyRates);
      chart2(currencyRates);
      chart3(currencyRates);
      chart4(currencyRates);
      chart5(currencyRates);
      chart6();
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

function historicalExchange() {
  let xhr1 = new XMLHttpRequest();
  let xhr2 = new XMLHttpRequest();
  let xhr3 = new XMLHttpRequest();
  let xhr4 = new XMLHttpRequest();
  let xhr5 = new XMLHttpRequest();
  var dateValue1 = "2021-06-15";
  var dateValue2 = "2020-06-15";
  var dateValue3 = "2019-06-15";
  var dateValue4 = "2018-06-15";
  var dateValue5 = "2017-06-15";

  let dataArr = [];
  const url1 =
    "http://api.exchangeratesapi.io/v1/" +
    dateValue1 +
    "?access_key=3a765ee97086b4b9f5b08d7aedfeba78&symbols=&symbols=USD,AUD,CAD,PLN,NZD,SEK,EUR,GBP,AED,DKK,ANG&format=1";

  const url2 =
    "http://api.exchangeratesapi.io/v1/" +
    dateValue2 +
    "?access_key=3a765ee97086b4b9f5b08d7aedfeba78&symbols=&symbols=USD,AUD,CAD,PLN,NZD,SEK,EUR,GBP,AED,DKK,ANG&format=1";

  const url3 =
    "http://api.exchangeratesapi.io/v1/" +
    dateValue3 +
    "?access_key=3a765ee97086b4b9f5b08d7aedfeba78&symbols=&symbols=USD,AUD,CAD,PLN,NZD,SEK,EUR,GBP,AED,DKK,ANG&format=1";

  const url4 =
    "http://api.exchangeratesapi.io/v1/" +
    dateValue4 +
    "?access_key=3a765ee97086b4b9f5b08d7aedfeba78&symbols=&symbols=USD,AUD,CAD,PLN,NZD,SEK,EUR,GBP,AED,DKK,ANG&format=1";

  const url5 =
    "http://api.exchangeratesapi.io/v1/" +
    dateValue5 +
    "?access_key=3a765ee97086b4b9f5b08d7aedfeba78&symbols=&symbols=USD,AUD,CAD,PLN,NZD,SEK,EUR,GBP,AED,DKK,ANG&format=1";

  xhr1.open("get", url1);
  xhr1.onreadystatechange = function () {
    if (xhr1.readyState !== 4) return;
    if (xhr1.status === 200) {
      var data1 = JSON.parse(xhr1.responseText);
      dataArr.push(data1);
    } else {
      console.log("HTTP error", xhr1.status, xhr1.statusText);
    }
  };
  xhr1.send();

  xhr2.open("get", url2);
  xhr2.onreadystatechange = function () {
    if (xhr2.readyState !== 4) return;
    if (xhr2.status === 200) {
      var data2 = JSON.parse(xhr2.responseText);
      dataArr.push(data2);
    } else {
      console.log("HTTP error", xhr2.status, xhr2.statusText);
    }
  };
  xhr2.send();

  xhr3.open("get", url3);
  xhr3.onreadystatechange = function () {
    if (xhr3.readyState !== 4) return;
    if (xhr3.status === 200) {
      var data3 = JSON.parse(xhr3.responseText);
      dataArr.push(data3);
    } else {
      console.log("HTTP error", xhr3.status, xhr3.statusText);
    }
  };
  xhr3.send();
  // console.log(dataArr);

  xhr4.open("get", url4);
  xhr4.onreadystatechange = function () {
    if (xhr4.readyState !== 4) return;
    if (xhr4.status === 200) {
      var data4 = JSON.parse(xhr4.responseText);
      dataArr.push(data4);
    } else {
      console.log("HTTP error", xhr4.status, xhr4.statusText);
    }
  };
  xhr4.send();

  xhr5.open("get", url5);
  xhr5.onreadystatechange = function () {
    if (xhr5.readyState !== 4) return;
    if (xhr5.status === 200) {
      var data5 = JSON.parse(xhr5.responseText);
      dataArr.push(data5);
      chart6(dataArr);
    } else {
      console.log("HTTP error", xhr1.status, xhr5.statusText);
    }
  };
  xhr5.send();

  // console.log(dataArr);

  // chart6(dataArr);

  // localStorage.setItem("data", dataArr);
  // console.log(localStorage.getItem("data"));
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
      text: "EUR to " + currencyValue + "Comparison Bar Chart",
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
      text: "EUR to " + currencyValue + "Comparison Pie Chart",
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
      text: "EUR to " + currencyValue + "Comparison Bar Chart",
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
      text: "EUR to All Currency Comparison Bar Chart",
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
    dps.push({
      name: itemData,
      y: currencyRates[itemData],
    });
  });
  console.log(dps);
  var chart5 = new CanvasJS.Chart("chartContainer5", {
    exportEnabled: true,
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "EUR to All Currency Comparison Pie Chart",
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
  chart5.render();
}

function chart6() {
  let dataArr = [
    {
      base: "EUR",
      date: "2017-06-15",
      historical: true,
      rates: {
        AED: 4.09464,
        ANG: 1.981814,
        AUD: 1.469724,
        CAD: 1.478106,
        DKK: 7.436504,
        EUR: 1,
        GBP: 0.873995,
        NZD: 1.547769,
        PLN: 4.230556,
        SEK: 9.756015,
        USD: 1.114946,
      },
      success: true,
      timestamp: 1497571199,
    },
    {
      base: "EUR",
      date: "2018-06-15",
      historical: true,
      rates: {
        AED: 4.262141,
        ANG: 2.093507,
        AUD: 1.559241,
        CAD: 1.531737,
        DKK: 7.44534,
        EUR: 1,
        GBP: 0.873479,
        NZD: 1.670067,
        PLN: 4.283958,
        SEK: 10.19612,
        USD: 1.160491,
      },
      success: true,
      timestamp: 1529107199,
    },
    {
      base: "EUR",
      date: "2019-06-15",
      historical: true,
      rates: {
        AED: 4.12775,
        ANG: 2.112086,
        AUD: 1.634771,
        CAD: 1.511383,
        DKK: 7.486966,
        EUR: 1,
        GBP: 0.892328,
        NZD: 1.731361,
        PLN: 4.256307,
        SEK: 10.664471,
        USD: 1.123746,
      },
      success: true,
      timestamp: 1560643199,
    },
    {
      base: "EUR",
      date: "2020-06-15",
      historical: true,
      rates: {
        AED: 4.164231,
        ANG: 2.035798,
        AUD: 1.629384,
        CAD: 1.534446,
        DKK: 7.455815,
        EUR: 1,
        GBP: 0.897163,
        NZD: 1.744676,
        PLN: 4.416207,
        SEK: 10.504867,
        USD: 1.133742,
      },
      success: true,
      timestamp: 1592265599,
    },
    {
      base: "EUR",
      date: "2021-06-15",
      historical: true,
      rates: {
        AED: 4.453982,
        ANG: 2.176368,
        AUD: 1.577612,
        CAD: 1.477523,
        DKK: 7.436925,
        EUR: 1,
        GBP: 0.8611,
        NZD: 1.702381,
        PLN: 4.527519,
        SEK: 10.093114,
        USD: 1.212561,
      },
      success: true,
      timestamp: 1623801599,
    },
  ];
  console.log(dataArr);

  var dps1 = [];
  var dps2 = [];
  var dps3 = [];
  var dps4 = [];
  var dps5 = [];

  dataArr.map((item) => {
    var newDate = item.date.split("-").join(",");
    dps1.push({
      x: new Date(newDate),
      y: item.rates.USD,
      exploded: true,
    });
  });

  dataArr.map((item) => {
    var newDate = item.date.split("-").join(",");
    dps2.push({
      x: new Date(newDate),
      y: item.rates.CAD,
    });
  });

  dataArr.map((item) => {
    var newDate = item.date.split("-").join(",");
    dps3.push({
      x: new Date(newDate),
      y: item.rates.AUD,
    });
  });

  dataArr.map((item) => {
    var newDate = item.date.split("-").join(",");
    dps4.push({
      x: new Date(newDate),
      y: item.rates.GBP,
    });
  });

  dataArr.map((item) => {
    var newDate = item.date.split("-").join(",");
    dps5.push({
      x: new Date(newDate),
      y: item.rates.NZD,
    });
  });

  // console.log(dps1);
  // console.log(dps2);
  // console.log(dps3);
  // console.log(dps4);
  // console.log(dps5);
  var chart6 = new CanvasJS.Chart("chartContainer6", {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title: {
      text: "Historical Data Comparison",
    },
    axisX: {
      valueFormatString: "MMM, YYYY",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    axisY: {
      title: "Exchange Rate",
      includeZero: true,
      crosshair: {
        enabled: true,
      },
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      verticalAlign: "bottom",
      horizontalAlign: "left",
      dockInsidePlotArea: true,
      itemclick: toogleDataSeries,
    },
    data: [
      {
        type: "line",
        showInLegend: true,
        name: "USD",
        markerType: "square",
        xValueFormatString: "DD MMM, YYYY",
        color: "#F08080",
        dataPoints: dps1,
      },
      {
        type: "line",
        showInLegend: true,
        name: "CAD",
        markerType: "square",
        color: "#6d78ad",
        dataPoints: dps2,
      },
      {
        type: "line",
        showInLegend: true,
        name: "AUD",
        markerType: "square",
        color: "#51cda0",
        dataPoints: dps3,
      },
      {
        type: "line",
        showInLegend: true,
        name: "GBP",
        markerType: "square",
        color: "#e3cb64",
        dataPoints: dps4,
      },
      {
        type: "line",
        showInLegend: true,
        name: "NZD",
        markerType: "square",
        color: "#24aeea",
        dataPoints: dps5,
      },
    ],
  });
  chart6.render();
}

function toogleDataSeries(e) {
  if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
    e.dataSeries.visible = false;
  } else {
    e.dataSeries.visible = true;
  }
  chart6.render();
}

function fnExcelReport1() {
  var table1 = document.getElementById("theTable1");
  var tableHTML1 = table1.outerHTML;
  var fileName = "Currency-Exchange-Table1-Export.xls";

  var msie = window.navigator.userAgent.indexOf("MSIE ");

  // If Internet Explorer
  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    dummyFrame.document.open("txt/html", "replace");
    dummyFrame.document.write(tableHTML1);
    dummyFrame.document.close();
    dummyFrame.focus();
    return dummyFrame.document.execCommand("SaveAs", true, fileName);
  }
  //other browsers
  else {
    var a = document.createElement("a");
    tableHTML1 = tableHTML1.replace(/  /g, "").replace(/ /g, "%20"); // replaces spaces
    a.href = "data:application/vnd.ms-excel," + tableHTML1;
    a.setAttribute("download", fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

function fnExcelReport2() {
  var table2 = document.getElementById("theTable2");
  var tableHTML2 = table2.outerHTML;
  var fileName = "Currency-Exchange-Table2-Export.xls";

  var msie = window.navigator.userAgent.indexOf("MSIE ");

  // If Internet Explorer
  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    dummyFrame.document.open("txt/html", "replace");
    dummyFrame.document.write(tableHTML2);
    dummyFrame.document.close();
    dummyFrame.focus();
    return dummyFrame.document.execCommand("SaveAs", true, fileName);
  }
  //other browsers
  else {
    var a = document.createElement("a");
    tableHTML2 = tableHTML2.replace(/  /g, "").replace(/ /g, "%20"); // replaces spaces
    a.href = "data:application/vnd.ms-excel," + tableHTML2;
    a.setAttribute("download", fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
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
  currencyInfo();
  // historicalExchange();
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
