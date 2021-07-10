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
