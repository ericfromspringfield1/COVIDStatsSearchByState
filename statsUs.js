const states = [
    {
  AZ: "Arizona",
  AL: "Alabama",
  AK: "Alaska",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DC: "District of Columbia",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
},
]
//console.log(states);

let stateList = []
const statesAbbrevs = states.map((state) => {
  let ak = state.AK
  let az = state.AZ
  let al = state.AL 
  let ar = state.AR
  let ca = state.CA
  let co = state.CO
  let ct = state.CT
  let dc = state.DC
  let de = state.DE
  let fl = state.FL
  let ga = state.GA
  let hi = state.HI
  let ks = state.KS
  let ky = state.KY
  let ia = state.IA
  let la = state.LA
  let id = state.ID
  let il = state.IL
  /*let ar = state.AR
  let ar = state.AR
  let ar = state.AR
  let ar = state.AR
  let ar = state.AR
  let ar = state.AR
  let ar = state.AR
  let ar = state.AR
  let ar = state.AR
  let ar = state.AR
  let ar = state.AR
  let ar = state.AR
  let ar = state.AR
  let ar = state.AR
  let ar = state.AR
*/

  stateList.push(ak, al, az, ar, ca, co, ct, de, dc, fl, ga, hi, id, il, ia, ks, ky, la)
  console.log(stateList)
})

function validateSearchState(searchTerm) {
    for (i = 0; i < states.length; i++) {
  
        
        if (searchTerm.length > 2 || searchTerm.length < 2)  {
            //Validate The User Input (must be 2 letters only and the appropriate two letters -- cannot be blank -- or 
            //if searchTerm equals any of the above States object)
            swal(`Please enter a valid 2-letter state code.`, {
                buttons: {
                    myBad: "My bad",
                },
            });
        }
    }
        
    
    
    // write validation to ensure the user clicks Clear Data button before performing another search
    // something with an if statement that if Clear Data button click event hasn't been evoked, swal('Please clear data before searching
    // another state')
    
    // also, once validation popup is activated, it does not need to popup again once a valid searchTerm is entered
    
    
    
    fetch(`https://api.covidtracking.com/v1/states/${searchTerm}/daily.json`)
    .then((result) => {
        return result.json();
    })
    .then((result) => {
        init(result);
    });
}

function init(data) {
  const stateWrapper = document.querySelector("table");
  const renderToDom = (resultsString) => {
    stateWrapper.innerHTML += resultsString;

  };


  if (data[0].state) {
    data[0].state;
    console.log(data[0].state);

    switch (data[0].state) {
      case "TN":
        let covidHeadlineTN = document.getElementById("CovidHeadline");
        let stateAfterSearchTN = document.getElementById("stateAfterSearch");
        

        covidHeadlineTN.style.backgroundColor = "#ff8200";

        stateAfterSearchTN.style.color = "white";
        stateAfterSearchTN.style.backgroundColor = "#ff8200";
       // stateAfterSearchTN.style.content = "url(tnFlag.jpg)";
        
        break;

      case "FL":
        covidHeadlineFL = document.getElementById("CovidHeadline");
        stateAfterSearchFL = document.getElementById("stateAfterSearch");

        covidHeadlineFL.style.backgroundColor = "#fa4616";

        stateAfterSearchFL.style.color = "white";
        stateAfterSearchFL.style.backgroundColor = "#fa4616";
        // stateAfterSearch.style.content = 'url(tnFlag.jpg)'
        break;

      default:
        break;
    }

    /*Could possibly just put some of the facts in the html rendering rather than/in tandem with a conditional alert box. */

    let compPositive = (
      (data[0].positive / data[0].totalTestResults) *
      100
    ).toFixed(2);
    let todayPositive = (
      (data[0].positiveIncrease / data[0].totalTestResultsIncrease) *
      100
    ).toFixed(2);
    let differencePositive = todayPositive - compPositive;
    let differencePositiveComp = compPositive - todayPositive;
    let compPositiveYesterday = (
      (data[1].positive / data[1].totalTestResults) *
      100
    ).toFixed(2);
    let yesterdayPositive = (
      (data[1].positiveIncrease / data[1].totalTestResultsIncrease) *
      100
    ).toFixed(2);
    let differencePositiveYesterday = todayPositive - yesterdayPositive;

    //If daily positive for "today" is greater than 10%, alert popup// POSSIBLE SWITCH
    if (todayPositive > 10) {
      swal(
        `THAT RONA IS ON THE RISE IN ${data[0].state}!`,
        `More than 10% of tests came back positive as of our last update on ${data[0].lastUpdateEt}pm. ${todayPositive}% to be exact. In other words, back up off each other and consider a mask!`,
        "warning",
        {
          buttons: {
            mask: "I'll Wear A Mask",
            noMask: {
              text: "I Don't Care For Others",
              value: "No Mask",
            },
          },
        }
      );
    } else if (todayPositive < 10 && differencePositiveComp > 0) {
      swal(
        `Less than 10% of tests came back positive as of our last update on ${data[0].lastUpdateEt}p, and...`,
        `${data[0].state} is ${differencePositiveComp.toFixed(
          2
        )}% below the overall positive percentage average of ${compPositive}%.`,
        "success",
        {
          buttons: {
            mask: "I'll Wear A Mask",
            noMask: {
              text: "I Don't Care For Others",
              value: "No Mask",
            },
          },
        }
      );
    } else if (todayPositive < 10) {
      swal(
        `KEEP UP THE GREAT WORK IN THE ${data[0].state}!`,
        `Less than 10% of tests came back positive as of our last update on ${data[0].lastUpdateEt}pm. ${todayPositive}% to be exact. In other words, keep doing you!`,
        "success",
        {
          buttons: {
            mask: "I'll Wear A Mask",
            noMask: {
              text: "I Don't Care For Others",
              value: "No Mask",
            },
          },
        }
      );
    } else if (todayPositive < 10 && todayPositive > yesterdayPositive)
      swal(
        `Less than 10% of tests came back positive as of our last update on ${data[0].lastUpdateEt}p, but...`,
        `${
          data[0].state
        }'s lastest results are ${differencePositiveYesterday.toFixed(
          2
        )}% higher than yesterday's results`,
        "warning",
        {
          buttons: {
            mask: "I'll Wear A Mask",
            noMask: {
              text: "I Don't Care For Others",
              value: "No Mask",
            },
          },
        }
      );
    console.log(swal.getState());

    /* RETURN HIGHEST NUMBER OF DAILY DEATHS OVER SEVEN DAYS  */
    // To return highest over all days, try to split deathIncrease with reduce array method //
    let deathIncreaseNumsToday = data[0].deathIncrease;
    let deathIncreaseNumsYesterday = data[1].deathIncrease;
    let deathIncreaseNums2Days = data[2].deathIncrease;
    let deathIncreaseNums3Days = data[3].deathIncrease;
    let deathIncreaseNums4Days = data[4].deathIncrease;
    let deathIncreaseNums5Days = data[5].deathIncrease;
    let deathIncreaseNums6Days = data[6].deathIncrease;
    let deathIncreaseNums7Days = data[7].deathIncrease;
    let deathIncreaseNums8Days = data[8].deathIncrease;
    let deathIncreaseNums9Days = data[9].deathIncrease;
    let deathIncreaseNums10Days = data[10].deathIncrease;
    let deathIncreaseNums11Days = data[11].deathIncrease;
    let deathIncreaseNums12Days = data[12].deathIncrease;
    let deathIncreaseNums13Days = data[13].deathIncrease;
    let deathIncreaseNums14Days = data[14].deathIncrease;
    let arrayOfDeathIncrease = [];

    arrayOfDeathIncrease.push(
      deathIncreaseNumsToday,
      deathIncreaseNumsYesterday,
      deathIncreaseNums2Days,
      deathIncreaseNums3Days,
      deathIncreaseNums4Days,
      deathIncreaseNums5Days,
      deathIncreaseNums6Days,
      deathIncreaseNums7Days,
      deathIncreaseNums8Days,
      deathIncreaseNums9Days,
      deathIncreaseNums10Days,
      deathIncreaseNums11Days,
      deathIncreaseNums12Days,
      deathIncreaseNums13Days,
      deathIncreaseNums14Days
    );

    console.log(deathIncreaseNumsToday);
    console.log(arrayOfDeathIncrease);

    const maxDailyDeath = arrayOfDeathIncrease.reduce(function (a, b) {
      return Math.max(a, b);
    });
    console.log(maxDailyDeath);

    const getMaxDeathDate = () => {
      for (i = 0; i < deathDateArray.length; i++) {
        deathDateArray.indexOf(i)
        
        
      }
      if (i = arrayOfDeathIncrease.indexOf(maxDailyDeath)){

      }
       return data[i].lastUpdateEt
    
  }

  let maxDailyDeathElement = document.getElementById("maxDailyDeath");
  maxDailyDeathElement.innerHTML = `Most DEATHS in 24-hour period (last 15 days) - ${maxDailyDeath} on ${getMaxDeathDate()}`;

    //****RETURN Highest Number of Daily Positive Results  Results Over 15 Days*******//
    let dailyPositiveIncreaseToday = data[0].positiveIncrease;
    let dailyPositiveIncreaseYesterday = data[1].positiveIncrease;
    let dailyPositiveIncrease2Days = data[2].positiveIncrease;
    let dailyPositiveIncrease3Days = data[3].positiveIncrease;
    let dailyPositiveIncrease4Days = data[4].positiveIncrease;
    let dailyPositiveIncrease5Days = data[5].positiveIncrease;
    let dailyPositiveIncrease6Days = data[6].positiveIncrease;
    let dailyPositiveIncrease7Days = data[7].positiveIncrease;
    let dailyPositiveIncrease8Days = data[8].positiveIncrease;
    let dailyPositiveIncrease9Days = data[9].positiveIncrease;
    let dailyPositiveIncrease10Days = data[10].positiveIncrease;
    let dailyPositiveIncrease11Days = data[11].positiveIncrease;
    let dailyPositiveIncrease12Days = data[12].positiveIncrease;
    let dailyPositiveIncrease13Days = data[13].positiveIncrease;
    let dailyPositiveIncrease14Days = data[14].positiveIncrease;
    let dailyPositiveIncrease15Days = data[15].positiveIncrease;
    let dailyPositiveIncrease16Days = data[16].positiveIncrease;
    let dailyPositiveIncrease17Days = data[17].positiveIncrease;
    let dailyPositiveIncrease18Days = data[18].positiveIncrease;
    let dailyPositiveIncrease19Days = data[19].positiveIncrease;
    let dailyPositiveIncrease20Days = data[20].positiveIncrease;
    let dailyPositiveIncrease21Days = data[21].positiveIncrease;
    let dailyPositiveIncrease22Days = data[22].positiveIncrease;
    let dailyPositiveIncrease23Days = data[23].positiveIncrease;
    let dailyPositiveIncrease24Days = data[24].positiveIncrease;
    let dailyPositiveIncrease25Days = data[25].positiveIncrease;
    let dailyPositiveIncrease26Days = data[26].positiveIncrease;
    let dailyPositiveIncrease27Days = data[27].positiveIncrease;
    let dailyPositiveIncrease28Days = data[28].positiveIncrease;
    let dailyPositiveIncrease29Days = data[29].positiveIncrease;
    let dailyPositiveIncrease30Days = data[30].positiveIncrease;
    let dailyPositiveIncrease31Days = data[31].positiveIncrease;
    let dailyPositiveIncrease32Days = data[32].positiveIncrease;
    let dailyPositiveIncrease33Days = data[33].positiveIncrease;
    let dailyPositiveIncrease34Days = data[34].positiveIncrease;
    let arrayOfPositiveIncrease = [];

    arrayOfPositiveIncrease.push(
      dailyPositiveIncreaseToday,
      dailyPositiveIncreaseYesterday,
      dailyPositiveIncrease2Days,
      dailyPositiveIncrease3Days,
      dailyPositiveIncrease4Days,
      dailyPositiveIncrease5Days,
      dailyPositiveIncrease6Days,
      dailyPositiveIncrease7Days,
      dailyPositiveIncrease8Days,
      dailyPositiveIncrease9Days,
      dailyPositiveIncrease10Days,
      dailyPositiveIncrease11Days,
      dailyPositiveIncrease12Days,
      dailyPositiveIncrease13Days,
      dailyPositiveIncrease14Days
    );

    console.log(dailyPositiveIncreaseToday);
    console.log(arrayOfPositiveIncrease);

    const maxDailyPositiveIncrease = arrayOfPositiveIncrease.reduce(function (
      a,
      b
    ) {
      return Math.max(a, b);
    });
    console.log(maxDailyPositiveIncrease);

    let maxDailyPositiveIncreaseElement = document.getElementById(
      "maxDailyPositiveIncrease"
    );
    maxDailyPositiveIncreaseElement.innerHTML = `Most POSITIVE CASES in 24-hour period (last 15 days) - ${maxDailyPositiveIncrease}.`;

    /* RETURN TOTAL DAILY POSITIVE INCREASE OVER 15 DAYS */
    const totalDailyPositiveIncrease = arrayOfPositiveIncrease.reduce(function (
      a,
      b
    ) {
      return a + b;
    },
    0);
    console.log(totalDailyPositiveIncrease);
    // let totalDailyPositiveIncreaseElement = document.getElementById('totalDailyPositiveIncrease')
    // totalDailyPositiveIncreaseElement.innerHTML = `Total NEW CASES (last 15 days) - ${totalDailyPositiveIncrease}.`

    /* ************************************ */

    //*************RETURN rolling average over 15 days***************//
    let averageDailyPositiveIncreaseToday = data[0].positiveIncrease;
    let averageDailyPositiveIncreaseYesterday = data[1].positiveIncrease;
    let averageDailyPositiveIncrease2Days = data[2].positiveIncrease;
    let averageDailyPositiveIncrease3Days = data[3].positiveIncrease;
    let averageDailyPositiveIncrease4Days = data[4].positiveIncrease;
    let averageDailyPositiveIncrease5Days = data[5].positiveIncrease;
    let averageDailyPositiveIncrease6Days = data[6].positiveIncrease;
    let averageDailyPositiveIncrease7Days = data[7].positiveIncrease;
    let averageDailyPositiveIncrease8Days = data[8].positiveIncrease;
    let averageDailyPositiveIncrease9Days = data[9].positiveIncrease;
    let averageDailyPositiveIncrease10Days = data[10].positiveIncrease;
    let averageDailyPositiveIncrease11Days = data[11].positiveIncrease;
    let averageDailyPositiveIncrease12Days = data[12].positiveIncrease;
    let averageDailyPositiveIncrease13Days = data[13].positiveIncrease;
    let averageDailyPositiveIncrease14Days = data[14].positiveIncrease;
    let arrayAverageOfPositiveIncrease = [];

    arrayAverageOfPositiveIncrease.push(
      averageDailyPositiveIncreaseToday,
      averageDailyPositiveIncreaseYesterday,
      averageDailyPositiveIncrease2Days,
      averageDailyPositiveIncrease3Days,
      averageDailyPositiveIncrease4Days,
      averageDailyPositiveIncrease5Days,
      averageDailyPositiveIncrease6Days,
      averageDailyPositiveIncrease7Days,
      averageDailyPositiveIncrease8Days,
      averageDailyPositiveIncrease9Days,
      averageDailyPositiveIncrease10Days,
      averageDailyPositiveIncrease11Days,
      averageDailyPositiveIncrease12Days,
      averageDailyPositiveIncrease13Days,
      averageDailyPositiveIncrease14Days
    );

    var total = 0;
    for (var i = 0; i < arrayAverageOfPositiveIncrease.length; i++) {
      total += arrayAverageOfPositiveIncrease[i];
    }
    var averageDailyPositiveIncrease =
      total / arrayAverageOfPositiveIncrease.length;
    console.log(`Average Positive Increase is ${averageDailyPositiveIncrease}`);

    let averageDailyPositiveIncreaseElement = document.getElementById(
      "averageDailyPositiveIncrease"
    );
    averageDailyPositiveIncreaseElement.innerHTML = `AVERAGE CASES PER DAY (last 15 days) - ${averageDailyPositiveIncrease.toFixed(
      0
    )}.`;

    /* ************************************************ */

    /* NEED DATE FOR MAX NUMBERS */

    /****************************MAX DAILY PERCENT POSITIVE OVER 15 DAYS***************************************************** */
    let maxDailyPercentPositiveToday = (
      (data[0].positiveIncrease / data[0].totalTestResultsIncrease) *
      100
    ).toFixed(2);
    let maxDailyPercentPositiveYesterday = (
      (data[1].positiveIncrease / data[1].totalTestResultsIncrease) *
      100
    ).toFixed(2);
    let maxDailyPercentPositive2Days = (
      (data[2].positiveIncrease / data[2].totalTestResultsIncrease) *
      100
    ).toFixed(2);
    let maxDailyPercentPositive3Days = (
      (data[3].positiveIncrease / data[3].totalTestResultsIncrease) *
      100
    ).toFixed(2);
    let maxDailyPercentPositive4Days = (
      (data[4].positiveIncrease / data[4].totalTestResultsIncrease) *
      100
    ).toFixed(2);
    let maxDailyPercentPositive5Days = (
      (data[5].positiveIncrease / data[5].totalTestResultsIncrease) *
      100
    ).toFixed(2);
    let maxDailyPercentPositive6Days = (
      (data[6].positiveIncrease / data[6].totalTestResultsIncrease) *
      100
    ).toFixed(2);
    let maxDailyPercentPositive7Days = (
      (data[7].positiveIncrease / data[7].totalTestResultsIncrease) *
      100
    ).toFixed(2);
    let maxDailyPercentPositive8Days = (
      (data[8].positiveIncrease / data[8].totalTestResultsIncrease) *
      100
    ).toFixed(2);
    let maxDailyPercentPositive9Days = (
      (data[9].positiveIncrease / data[9].totalTestResultsIncrease) *
      100
    ).toFixed(2);
    let maxDailyPercentPositive10Days = (
      (data[10].positiveIncrease / data[10].totalTestResultsIncrease) *
      100
    ).toFixed(2);
    let maxDailyPercentPositive11Days = (
      (data[11].positiveIncrease / data[11].totalTestResultsIncrease) *
      100
    ).toFixed(2);
    let maxDailyPercentPositive12Days = (
      (data[12].positiveIncrease / data[12].totalTestResultsIncrease) *
      100
    ).toFixed(2);
    let maxDailyPercentPositive13Days = (
      (data[13].positiveIncrease / data[13].totalTestResultsIncrease) *
      100
    ).toFixed(2);
    let maxDailyPercentPositive14Days = (
      (data[14].positiveIncrease / data[14].totalTestResultsIncrease) *
      100
    ).toFixed(2);

    let arrayOfDailyPercentPositive = [];

    arrayOfDailyPercentPositive.push(
      maxDailyPercentPositiveToday,
      maxDailyPercentPositiveYesterday,
      maxDailyPercentPositive2Days,
      maxDailyPercentPositive3Days,
      maxDailyPercentPositive4Days,
      maxDailyPercentPositive5Days,
      maxDailyPercentPositive6Days,
      maxDailyPercentPositive7Days,
      maxDailyPercentPositive8Days,
      maxDailyPercentPositive9Days,
      maxDailyPercentPositive10Days,
      maxDailyPercentPositive11Days,
      maxDailyPercentPositive12Days,
      maxDailyPercentPositive13Days,
      maxDailyPercentPositive14Days
    );

    //If array contains a zero (0), it will return as NaN, creating a result of NaN when considering those items in the array.
    //For example, Max Daily Positive Percent would return NaN if any Daily Percent Positive is zero(0).
    //The first function removes the NaN once and removes all instances of the NaN in the array, allowing only numbers to be considered
    function removeItemOnce(arrayOfDailyPercentPositive, value) {
      var index = arrayOfDailyPercentPositive.indexOf(value);
      if (index > -1) {
        arrayOfDailyPercentPositive.splice(index, 1);
      }
      return arrayOfDailyPercentPositive;
    }
    function removeItemAll(arrayOfDailyPercentPositive, value) {
      var i = 0;
      while (i < arrayOfDailyPercentPositive.length) {
        if (arrayOfDailyPercentPositive[i] === value) {
          arrayOfDailyPercentPositive.splice(i, 1);
        } else {
          ++i;
        }
      }
      return arrayOfDailyPercentPositive;
    }

    console.log(removeItemOnce(arrayOfDailyPercentPositive, "NaN"));
    console.log(removeItemAll(arrayOfDailyPercentPositive, "NaN"));

    const maxDailyPercentPositive = arrayOfDailyPercentPositive.reduce(
      function (a, b) {
        return Math.max(a, b);
      }
    );
    console.log(maxDailyPercentPositive);
    let maxDailyPercentPositiveElement = document.getElementById(
      "maxDailyPercentPositive"
    );
    maxDailyPercentPositiveElement.innerHTML = `MAX DAILY POSITIVE PERCENT (last 15 days) - ${maxDailyPercentPositive}%. `;

    /* MAX FOR TOTAL TESTS AND AVERAGE OF TOTAL TESTS OVER 15 DAYS*/
    let maxNewTestsToday = data[0].totalTestResultsIncrease;
    let maxNewTestsYesterday = data[1].totalTestResultsIncrease;
    let maxNewTests2Days = data[2].totalTestResultsIncrease;
    let maxNewTests3Days = data[3].totalTestResultsIncrease;
    let maxNewTests4Days = data[4].totalTestResultsIncrease;
    let maxNewTests5Days = data[5].totalTestResultsIncrease;
    let maxNewTests6Days = data[6].totalTestResultsIncrease;
    let maxNewTests7Days = data[7].totalTestResultsIncrease;
    let maxNewTests8Days = data[8].totalTestResultsIncrease;
    let maxNewTests9Days = data[9].totalTestResultsIncrease;
    let maxNewTests10Days = data[10].totalTestResultsIncrease;
    let maxNewTests11Days = data[11].totalTestResultsIncrease;
    let maxNewTests12Days = data[12].totalTestResultsIncrease;
    let maxNewTests13Days = data[13].totalTestResultsIncrease;
    let maxNewTests14Days = data[14].totalTestResultsIncrease;
    let maxNewTests15Days = data[15].totalTestResultsIncrease;
    let maxNewTests16Days = data[16].totalTestResultsIncrease;
    let maxNewTests17Days = data[17].totalTestResultsIncrease;
    let maxNewTests18Days = data[18].totalTestResultsIncrease;
    let maxNewTests19Days = data[19].totalTestResultsIncrease;
    let maxNewTests20Days = data[20].totalTestResultsIncrease;
    let maxNewTests21Days = data[21].totalTestResultsIncrease;
    let maxNewTests22Days = data[22].totalTestResultsIncrease;
    let maxNewTests23Days = data[23].totalTestResultsIncrease;
    let maxNewTests24Days = data[24].totalTestResultsIncrease;
    let maxNewTests25Days = data[25].totalTestResultsIncrease;
    let maxNewTests26Days = data[26].totalTestResultsIncrease;
    let maxNewTests27Days = data[27].totalTestResultsIncrease;
    let maxNewTests28Days = data[28].totalTestResultsIncrease;
    let maxNewTests29Days = data[29].totalTestResultsIncrease;
    let maxNewTests30Days = data[30].totalTestResultsIncrease;
    let maxNewTests31Days = data[31].totalTestResultsIncrease;
    let maxNewTests32Days = data[32].totalTestResultsIncrease;
    let maxNewTests33Days = data[33].totalTestResultsIncrease;
    let maxNewTests34Days = data[34].totalTestResultsIncrease;

    let arrayOfNewTests = [];
    let arrayOfNewTestsSevenDays = [];
    let arrayOfNewTestsPreviousSevenDays = [];
    let arrayOfNewTestsPreviousSevenDays2Weeks = [];
    let arrayOfNewTestsPreviousSevenDays3Weeks = [];
    let arrayOfNewTestsPreviousSevenDays4Weeks = [];

    arrayOfNewTests.push(
      maxNewTestsToday,
      maxNewTestsYesterday,
      maxNewTests2Days,
      maxNewTests3Days,
      maxNewTests4Days,
      maxNewTests5Days,
      maxNewTests6Days,
      maxNewTests7Days,
      maxNewTests8Days,
      maxNewTests9Days,
      maxNewTests10Days,
      maxNewTests11Days,
      maxNewTests12Days,
      maxNewTests13Days,
      maxNewTests14Days
    );

    arrayOfNewTestsSevenDays.push(
      maxNewTestsToday,
      maxNewTestsYesterday,
      maxNewTests2Days,
      maxNewTests3Days,
      maxNewTests4Days,
      maxNewTests5Days,
      maxNewTests6Days
    );

    arrayOfNewTestsPreviousSevenDays.push(
      maxNewTests7Days,
      maxNewTests8Days,
      maxNewTests9Days,
      maxNewTests10Days,
      maxNewTests11Days,
      maxNewTests12Days,
      maxNewTests13Days
    );

    arrayOfNewTestsPreviousSevenDays2Weeks.push(
      maxNewTests14Days,
      maxNewTests15Days,
      maxNewTests16Days,
      maxNewTests17Days,
      maxNewTests18Days,
      maxNewTests19Days,
      maxNewTests20Days
    );

    arrayOfNewTestsPreviousSevenDays3Weeks.push(
      maxNewTests21Days,
      maxNewTests22Days,
      maxNewTests23Days,
      maxNewTests24Days,
      maxNewTests25Days,
      maxNewTests26Days,
      maxNewTests27Days
    );

    arrayOfNewTestsPreviousSevenDays4Weeks.push(
      maxNewTests28Days,
      maxNewTests29Days,
      maxNewTests30Days,
      maxNewTests31Days,
      maxNewTests32Days,
      maxNewTests33Days,
      maxNewTests34Days
    );

    const maxNewTests = arrayOfNewTests.reduce(function (a, b) {
      return Math.max(a, b);
    });
    console.log(maxNewTests);

    let maxNewTestsElement = document.getElementById("maxNewTests");
    maxNewTestsElement.innerHTML = `Most NEW TESTS ADMINISTERED in one day (last 15 days) - ${maxNewTests}. `;

    /*RETURN TOTAL NUMBER OF NEW TESTS OVER THE LAST 15 DAYS*/
    const totalNewTests = arrayOfNewTests.reduce(function (a, b) {
      return a + b;
    }, 0);
    console.log(`Total New Tests 15 Days ${totalNewTests}`);

    /*RETURN TOTAL NUMBER OF NEW TESTS OVER THE LAST 7 DAYS*/
    const totalNewTestsSevenDays = arrayOfNewTestsSevenDays.reduce(function (
      a,
      b
    ) {
      return a + b;
    },
    0);
    console.log(`Total New Test Seven Days ${totalNewTestsSevenDays}`);

    /*RETURN TOTAL NUMBER OF NEW TESTS OVER THE PREVIOUS 7 DAYS (1 weeks ago)*/
    const totalNewTestsPreviousSevenDays = arrayOfNewTestsPreviousSevenDays.reduce(
      function (a, b) {
        return a + b;
      },
      0
    );
    console.log(
      `Total New Test Previous Seven Days (1 Week Ago) ${totalNewTestsPreviousSevenDays}`
    );

    /*RETURN TOTAL NUMBER OF NEW TESTS OVER THE PREVIOUS 7 DAYS (2 weeks ago)*/
    const totalNewTestsPreviousSevenDays2Weeks = arrayOfNewTestsPreviousSevenDays2Weeks.reduce(
      function (a, b) {
        return a + b;
      },
      0
    );
    console.log(
      `Total New Test Previous Seven Days (2 Weeks Ago) ${totalNewTestsPreviousSevenDays2Weeks}`
    );

    /*RETURN TOTAL NUMBER OF NEW TESTS OVER THE PREVIOUS 7 DAYS (3 weeks ago)*/
    const totalNewTestsPreviousSevenDays3Weeks = arrayOfNewTestsPreviousSevenDays3Weeks.reduce(
      function (a, b) {
        return a + b;
      },
      0
    );
    console.log(
      `Total New Test Previous Seven Days (3 Weeks Ago) ${totalNewTestsPreviousSevenDays3Weeks}`
    );

    /*RETURN TOTAL NUMBER OF NEW TESTS OVER THE PREVIOUS 7 DAYS (4 weeks ago)*/
    const totalNewTestsPreviousSevenDays4Weeks = arrayOfNewTestsPreviousSevenDays4Weeks.reduce(
      function (a, b) {
        return a + b;
      },
      0
    );
    console.log(
      `Total New Test Previous Seven Days (4 Weeks Ago) ${totalNewTestsPreviousSevenDays4Weeks}`
    );

    //let totalNewTestsElement = document.getElementById('totalNewTests')
    //totalNewTestsElement.innerHTML = `${data[i].state}'s TOTAL number of NEW TESTS ADMINISTERED over the last 15 days is ${totalNewTests}. `

    /* RETURN TOTAL DAILY POSITIVE INCREASE OVER 7 DAYS AND PREVIOUS 7 DAYS*/
    let arrayOfPositiveIncrease7Days = [];
    arrayOfPositiveIncrease7Days.push(
      dailyPositiveIncreaseToday,
      dailyPositiveIncreaseYesterday,
      dailyPositiveIncrease2Days,
      dailyPositiveIncrease3Days,
      dailyPositiveIncrease4Days,
      dailyPositiveIncrease5Days,
      dailyPositiveIncrease6Days
    );
    const totalDailyPositiveIncrease7Days = arrayOfPositiveIncrease7Days.reduce(
      function (a, b) {
        return a + b;
      },
      0
    );
    console.log(
      `Total Daily Positive Increase Over 7 Days ${totalDailyPositiveIncrease7Days}`
    );

    let arrayOfPositiveIncreasePrevious7Days = [];
    arrayOfPositiveIncreasePrevious7Days.push(
      dailyPositiveIncrease7Days,
      dailyPositiveIncrease8Days,
      dailyPositiveIncrease9Days,
      dailyPositiveIncrease10Days,
      dailyPositiveIncrease11Days,
      dailyPositiveIncrease12Days,
      dailyPositiveIncrease13Days
    );
    const totalDailyPositiveIncreasePrevious7Days = arrayOfPositiveIncreasePrevious7Days.reduce(
      function (a, b) {
        return a + b;
      },
      0
    );
    console.log(
      `Total Daily Positive Increase Previous 7 Days (1 Week Ago) ${totalDailyPositiveIncreasePrevious7Days}`
    );

    let arrayOfPositiveIncreasePrevious7Days2Weeks = [];
    arrayOfPositiveIncreasePrevious7Days2Weeks.push(
      dailyPositiveIncrease14Days,
      dailyPositiveIncrease15Days,
      dailyPositiveIncrease16Days,
      dailyPositiveIncrease17Days,
      dailyPositiveIncrease18Days,
      dailyPositiveIncrease19Days,
      dailyPositiveIncrease20Days
    );
    const totalDailyPositiveIncreasePrevious7Days2Weeks = arrayOfPositiveIncreasePrevious7Days2Weeks.reduce(
      function (a, b) {
        return a + b;
      },
      0
    );
    console.log(
      `Total Daily Positive Increase Previous 7 Days (2 Weeks Ago) ${totalDailyPositiveIncreasePrevious7Days2Weeks}`
    );

    let arrayOfPositiveIncreasePrevious7Days3Weeks = [];
    arrayOfPositiveIncreasePrevious7Days3Weeks.push(
      dailyPositiveIncrease21Days,
      dailyPositiveIncrease22Days,
      dailyPositiveIncrease23Days,
      dailyPositiveIncrease24Days,
      dailyPositiveIncrease25Days,
      dailyPositiveIncrease26Days,
      dailyPositiveIncrease27Days
    );
    const totalDailyPositiveIncreasePrevious7Days3Weeks = arrayOfPositiveIncreasePrevious7Days3Weeks.reduce(
      function (a, b) {
        return a + b;
      },
      0
    );
    console.log(
      `Total Daily Positive Increase Previous 7 Days (3 Weeks Ago) ${totalDailyPositiveIncreasePrevious7Days3Weeks}`
    );

    let arrayOfPositiveIncreasePrevious7Days4Weeks = [];
    arrayOfPositiveIncreasePrevious7Days4Weeks.push(
      dailyPositiveIncrease28Days,
      dailyPositiveIncrease29Days,
      dailyPositiveIncrease30Days,
      dailyPositiveIncrease31Days,
      dailyPositiveIncrease32Days,
      dailyPositiveIncrease33Days,
      dailyPositiveIncrease34Days
    );
    const totalDailyPositiveIncreasePrevious7Days4Weeks = arrayOfPositiveIncreasePrevious7Days4Weeks.reduce(
      function (a, b) {
        return a + b;
      },
      0
    );
    console.log(
      `Total Daily Positive Increase Previous 7 Days (4 Weeks Ago) ${totalDailyPositiveIncreasePrevious7Days4Weeks}`
    );

    /*RENDER POSITIVE % OVER 15 DAYS, 7 DAYS, 1 Week Ago, 2 Weeks Ago, 3 Weeks Ago, 4 Weeks Ago*/
    const percentPositiveOver15Days = (
      (totalDailyPositiveIncrease / totalNewTests) *
      100
    ).toFixed(2);
    let percentPositiveOver15DaysElement = document.getElementById(
      "percentPositiveOver15Days"
    );
    percentPositiveOver15DaysElement.innerHTML = `PERCENT POSITIVE RATE (last 15 days) - ${percentPositiveOver15Days}%`;

    const percentPositiveOver7Days = (
      (totalDailyPositiveIncrease7Days / totalNewTestsSevenDays) *
      100
    ).toFixed(2);
    let percentPositiveOver7DaysElement = document.getElementById(
      "percentPositiveOver7Days"
    );
    percentPositiveOver7DaysElement.innerHTML = `PERCENT POSITIVE RATE (last 7 days) - ${percentPositiveOver7Days}%`;

    const percentPositiveOverPrevious7Days = (
      (totalDailyPositiveIncreasePrevious7Days /
        totalNewTestsPreviousSevenDays) *
      100
    ).toFixed(2);
    let percentPositiveOverPrevious7DaysElement = document.getElementById(
      "percentPositiveOverPrevious7Days"
    );
    percentPositiveOverPrevious7DaysElement.innerHTML = `PERCENT POSITIVE RATE (7 days 1 week ago) - ${percentPositiveOverPrevious7Days}%`;

    const percentPositiveOverPrevious7Days2Weeks = (
      (totalDailyPositiveIncreasePrevious7Days2Weeks /
        totalNewTestsPreviousSevenDays2Weeks) *
      100
    ).toFixed(2);
    let percentPositiveOverPrevious7Days2WeeksElement = document.getElementById(
      "percentPositiveOverPrevious7Days2Weeks"
    );
    percentPositiveOverPrevious7Days2WeeksElement.innerHTML = `PERCENT POSITIVE RATE (7 days 2 weeks ago) - ${percentPositiveOverPrevious7Days2Weeks}%`;

    const percentPositiveOverPrevious7Days3Weeks = (
      (totalDailyPositiveIncreasePrevious7Days3Weeks /
        totalNewTestsPreviousSevenDays3Weeks) *
      100
    ).toFixed(2);
    let percentPositiveOverPrevious7Days3WeeksElement = document.getElementById(
      "percentPositiveOverPrevious7Days3Weeks"
    );
    percentPositiveOverPrevious7Days3WeeksElement.innerHTML = `PERCENT POSITIVE RATE (7 days 3 weeks ago) - ${percentPositiveOverPrevious7Days3Weeks}%`;

    const percentPositiveOverPrevious7Days4Weeks = (
      (totalDailyPositiveIncreasePrevious7Days4Weeks /
        totalNewTestsPreviousSevenDays4Weeks) *
      100
    ).toFixed(2);
    let percentPositiveOverPrevious7Days4WeeksElement = document.getElementById(
      "percentPositiveOverPrevious7Days4Weeks"
    );
    percentPositiveOverPrevious7Days4WeeksElement.innerHTML = `PERCENT POSITIVE RATE (7 days 4 weeks ago) - ${percentPositiveOverPrevious7Days4Weeks}%`;

    /***************************  REMOVE ANY 0's or less FROM AVERAGE - ANY 0's DISTORT AVERAGE ************************/

    function removeZeroOnce(arrayOfPositiveIncrease7Days, value) {
      var index = arrayOfPositiveIncrease7Days.indexOf(value);
      if (index > -1) {
        arrayOfPositiveIncrease7Days.splice(index, 1);
      }
      return arrayOfPositiveIncrease7Days;
    }
    function removeZeroAll(arrayOfPositiveIncrease7Days, value) {
      var i = 0;
      while (i < arrayOfPositiveIncrease7Days.length) {
        if (arrayOfPositiveIncrease7Days[i] === value) {
          arrayOfPositiveIncrease7Days.splice(i, 1);
        } else {
          ++i;
        }
      }
      return arrayOfPositiveIncrease7Days;
    }

    console.log(removeZeroOnce(arrayOfPositiveIncrease7Days, 0));
    console.log(removeZeroAll(arrayOfPositiveIncrease7Days, 0));

    /***************************  REMOVE ANY 0's FROM PREVIOUS SEVEN DAY AVERAGE - ANY 0's DISTORT AVERAGE ************************/

    function removeOneZero(arrayOfPositiveIncreasePrevious7Days, value) {
      var index = arrayOfPositiveIncreasePrevious7Days.indexOf(value);
      if (index > -1) {
        arrayOfPositiveIncreasePrevious7Days.splice(index, 1);
      }
      return arrayOfPositiveIncreasePrevious7Days;
    }
    function removeAllZero(arrayOfPositiveIncreasePrevious7Days, value) {
      var i = 0;
      while (i < arrayOfPositiveIncreasePrevious7Days.length) {
        if (arrayOfPositiveIncreasePrevious7Days[i] === value) {
          arrayOfPositiveIncreasePrevious7Days.splice(i, 1);
        } else {
          ++i;
        }
      }
      return arrayOfPositiveIncreasePrevious7Days;
    }

    console.log(removeOneZero(arrayOfPositiveIncreasePrevious7Days, 0));
    console.log(removeAllZero(arrayOfPositiveIncreasePrevious7Days, 0));

    /***************************  REMOVE ANY 0's FROM PREVIOUS SEVEN DAY AVERAGE 2 WEEKS - ANY 0's DISTORT AVERAGE ************************/

    function removeOneZero2Weeks(
      arrayOfPositiveIncreasePrevious7Days2Weeks,
      value
    ) {
      var index = arrayOfPositiveIncreasePrevious7Days2Weeks.indexOf(value);
      if (index > -1) {
        arrayOfPositiveIncreasePrevious7Days2Weeks.splice(index, 1);
      }
      return arrayOfPositiveIncreasePrevious7Days2Weeks;
    }
    function removeAllZero2Weeks(
      arrayOfPositiveIncreasePrevious7Days2Weeks,
      value
    ) {
      var i = 0;
      while (i < arrayOfPositiveIncreasePrevious7Days2Weeks.length) {
        if (arrayOfPositiveIncreasePrevious7Days2Weeks[i] === value) {
          arrayOfPositiveIncreasePrevious7Days2Weeks.splice(i, 1);
        } else {
          ++i;
        }
      }
      return arrayOfPositiveIncreasePrevious7Days2Weeks;
    }

    console.log(
      removeOneZero2Weeks(arrayOfPositiveIncreasePrevious7Days2Weeks, 0)
    );
    console.log(
      removeAllZero2Weeks(arrayOfPositiveIncreasePrevious7Days2Weeks, 0)
    );

    /***************************  REMOVE ANY 0's FROM PREVIOUS SEVEN DAY AVERAGE 3 WEEKS - ANY 0's DISTORT AVERAGE ************************/

    function removeOneZero3Weeks(
      arrayOfPositiveIncreasePrevious7Days3Weeks,
      value
    ) {
      var index = arrayOfPositiveIncreasePrevious7Days3Weeks.indexOf(value);
      if (index > -1) {
        arrayOfPositiveIncreasePrevious7Days3Weeks.splice(index, 1);
      }
      return arrayOfPositiveIncreasePrevious7Days3Weeks;
    }
    function removeAllZero3Weeks(
      arrayOfPositiveIncreasePrevious7Days3Weeks,
      value
    ) {
      var i = 0;
      while (i < arrayOfPositiveIncreasePrevious7Days3Weeks.length) {
        if (arrayOfPositiveIncreasePrevious7Days3Weeks[i] === value) {
          arrayOfPositiveIncreasePrevious7Days3Weeks.splice(i, 1);
        } else {
          ++i;
        }
      }
      return arrayOfPositiveIncreasePrevious7Days3Weeks;
    }

    console.log(
      removeOneZero3Weeks(arrayOfPositiveIncreasePrevious7Days3Weeks, 0)
    );
    console.log(
      removeAllZero3Weeks(arrayOfPositiveIncreasePrevious7Days3Weeks, 0)
    );

    /***************************  REMOVE ANY 0's FROM PREVIOUS SEVEN DAY AVERAGE 4 WEEKS - ANY 0's DISTORT AVERAGE ************************/

    function removeOneZero4Weeks(
      arrayOfPositiveIncreasePrevious7Days4Weeks,
      value
    ) {
      var index = arrayOfPositiveIncreasePrevious7Days4Weeks.indexOf(value);
      if (index > -1) {
        arrayOfPositiveIncreasePrevious7Days4Weeks.splice(index, 1);
      }
      return arrayOfPositiveIncreasePrevious7Days4Weeks;
    }
    function removeAllZero4Weeks(
      arrayOfPositiveIncreasePrevious7Days4Weeks,
      value
    ) {
      var i = 0;
      while (i < arrayOfPositiveIncreasePrevious7Days4Weeks.length) {
        if (arrayOfPositiveIncreasePrevious7Days4Weeks[i] === value) {
          arrayOfPositiveIncreasePrevious7Days4Weeks.splice(i, 1);
        } else {
          ++i;
        }
      }
      return arrayOfPositiveIncreasePrevious7Days4Weeks;
    }

    console.log(
      removeOneZero4Weeks(arrayOfPositiveIncreasePrevious7Days4Weeks, 0)
    );
    console.log(
      removeAllZero4Weeks(arrayOfPositiveIncreasePrevious7Days4Weeks, 0)
    );

    // If Positive Increase Percent decreases 5 Consecutive Weeks, seagreen background

    if (
      percentPositiveOverPrevious7Days3Weeks <
        percentPositiveOverPrevious7Days4Weeks &&
      percentPositiveOverPrevious7Days2Weeks <
        percentPositiveOverPrevious7Days3Weeks &&
      percentPositiveOverPrevious7Days <
        percentPositiveOverPrevious7Days2Weeks &&
      percentPositiveOver7Days < percentPositiveOverPrevious7Days
    ) {
      document.getElementById("section4").style.backgroundColor = "seagreen";
    }

    // If Positive Increase Percent increases 5 Consecutive Weeks, red background //

      if (
        percentPositiveOverPrevious7Days3Weeks >
          percentPositiveOverPrevious7Days4Weeks &&
        percentPositiveOverPrevious7Days2Weeks >
          percentPositiveOverPrevious7Days3Weeks &&
        percentPositiveOverPrevious7Days >
          percentPositiveOverPrevious7Days2Weeks &&
        percentPositiveOver7Days > percentPositiveOverPrevious7Days
      ){
        document.getElementById("section4").style.backgroundColor = "red";
      }

    //*************RETURN rolling average over 15 days***************//
    let averageNewTestsToday = data[0].totalTestResultsIncrease;
    let averageNewTestsYesterday = data[1].totalTestResultsIncrease;
    let averageNewTests2Days = data[2].totalTestResultsIncrease;
    let averageNewTests3Days = data[3].totalTestResultsIncrease;
    let averageNewTests4Days = data[4].totalTestResultsIncrease;
    let averageNewTests5Days = data[5].totalTestResultsIncrease;
    let averageNewTests6Days = data[6].totalTestResultsIncrease;
    let averageNewTests7Days = data[7].totalTestResultsIncrease;
    let averageNewTests8Days = data[8].totalTestResultsIncrease;
    let averageNewTests9Days = data[9].totalTestResultsIncrease;
    let averageNewTests10Days = data[10].totalTestResultsIncrease;
    let averageNewTests11Days = data[11].totalTestResultsIncrease;
    let averageNewTests12Days = data[12].totalTestResultsIncrease;
    let averageNewTests13Days = data[13].totalTestResultsIncrease;
    let averageNewTests14Days = data[14].totalTestResultsIncrease;
    let arrayAverageOftotalTestResultsIncrease = [];

    arrayAverageOftotalTestResultsIncrease.push(
      averageNewTestsToday,
      averageNewTestsYesterday,
      averageNewTests2Days,
      averageNewTests3Days,
      averageNewTests4Days,
      averageNewTests5Days,
      averageNewTests6Days,
      averageNewTests7Days,
      averageNewTests8Days,
      averageNewTests9Days,
      averageNewTests10Days,
      averageNewTests11Days,
      averageNewTests12Days,
      averageNewTests13Days,
      averageNewTests14Days
    );

    var total = 0;
    for (var i = 0; i < arrayAverageOftotalTestResultsIncrease.length; i++) {
      total += arrayAverageOftotalTestResultsIncrease[i];
    }
    var averageNewTests = total / arrayAverageOftotalTestResultsIncrease.length;
    console.log(`Average New Tests Per Day is ${averageNewTests}`);

    let averageNewTestsElement = document.getElementById("averageNewTests");
    averageNewTestsElement.innerHTML = `NEW TESTS PER DAY (15-day Avg) - ${averageNewTests.toFixed(
      0
    )}`;

    let dailyPercentPositiveDifference =
      maxDailyPercentPositiveToday - maxDailyPercentPositiveYesterday;
    let dailyPercentPositiveDifference2 =
      maxDailyPercentPositiveYesterday - maxDailyPercentPositiveToday;
    console.log(`Today's difference is ${dailyPercentPositiveDifference}%`);

    if (dailyPercentPositiveDifference < 0) {
      let dailyPercentPositiveDifferenceElement = document.getElementById(
        "dailyPercentPositiveDifferenceElement"
      );
      dailyPercentPositiveDifferenceElement.innerHTML = `Today's Positive Rate decreased by ${dailyPercentPositiveDifference2.toFixed(
        2
      )}%.`;
    }

    if (dailyPercentPositiveDifference > 0) {
      dailyPercentPositiveDifferenceElement = document.getElementById(
        "dailyPercentPositiveDifferenceElement"
      );
      dailyPercentPositiveDifferenceElement.innerHTML = `Positive Rate increased by ${dailyPercentPositiveDifference.toFixed(
        2
      )}% over last 24 hours.`;
    }

    //If MaxDailyPercentPositiveToday is 0 and New Tests is 0,  Do not show a Difference. Just state there were no new tests today.
    if (maxDailyPercentPositiveToday === "NaN") {
      maxDailyPercentPositiveToday = 0;
    }

    if (maxDailyPercentPositiveToday === 0 && averageNewTestsToday === 0) {
      let dailyPercentPositiveDifferenceElement = document.getElementById(
        "dailyPercentPositiveDifferenceElement"
      );
      dailyPercentPositiveDifferenceElement.innerHTML = `There were no new tests today.`;
    }
    console.log(maxDailyPercentPositiveToday);

    let compareTodayTo15DayAverageElement = document.getElementById(
      "compareTodayTo15DayAverageElement"
    );
    compareTodayTo15DayAverageElement.innerHTML = `TODAY'S POSITIVE RATE - ${maxDailyPercentPositiveToday}% <hr> 15-DAY ROLLING AVERAGE - ${percentPositiveOver15Days}%.`;

    const resultsHtmlRepresentation = (stateObj) => {
      let percentPositive = (
        (stateObj.positive / stateObj.totalTestResults) * 100).toFixed(2);
      let percentDeathOfPositive = (
        (stateObj.death / stateObj.positive) * 100).toFixed(2);

      //If the increase is greater than zero for positive increase and test increase, do the calculation. Else, just assume 0%.

      //Otherwise, the cell will render NaN.
      /* Possibly refactor to a Switch Statement */

      if (
        stateObj.positiveIncrease > 0 ||
        stateObj.totalTestResultsIncrease > 0
      ) {
        dailyPercentPositive = (
          (stateObj.positiveIncrease / stateObj.totalTestResultsIncrease) *
          100
        ).toFixed(2);
      }
      if (
        stateObj.positiveIncrease === 0 ||
        stateObj.totalTestResultsIncrease === 0
      )
        dailyPercentPositive = 0;

      if (stateObj.positiveIncrease < 0 || stateObj.totalTestResults < 0)
        dailyPercentPositive = 0;

      if (stateObj.death === null) {
        stateObj.death = 0;
      }

      if (stateObj.lastUpdateEt === null) {
        stateObj.lastUpdateEt = 0;
      }

      if (stateObj.negative === null) {
        stateObj.negative = 0;
      }

      /* CURRENTLY HOSPITALIZED */
      const hospitalizedCurrently = data[0].hospitalizedCurrently;
      let currentlyHospitalizedElement = document.getElementById(
        "currentlyHospitalized"
      );
      currentlyHospitalizedElement.innerHTML = `CURRENTLY HOSPITALIZED - ${hospitalizedCurrently}. `;

      return `
                <body>
                <div class=${"wrapper"}>
                <table rowspan=${data.length} style="width:100%">
                <p id=${"writtenP1"}></p>
                <tr>
                <td id=${"dateData"}>${stateObj.lastUpdateEt}</td>
                <td id=${"stateData"}>${stateObj.state}</td>
                <td id=${"positiveData"}>${stateObj.positive}</td>
                <td id=${"negativeData"}>${stateObj.negative}</td>
                <td id=${"totalTestResultsData"}>${
        stateObj.totalTestResults
      }</td>
                <td id=${"deathData"}>${stateObj.death}</td>
                <td id=${"percentPositiveRow"}>${percentPositive}%</td>
                <td id=${"percentDeathOfPositiveData"}>${percentDeathOfPositive}%</td>
                <td id=${"newTestsData"}>${
        stateObj.totalTestResultsIncrease
      }</td>
                <td id=${"newCasesData"}>${stateObj.positiveIncrease}</td>
                <td id=${"dailyPercentPositiveData"}>${dailyPercentPositive}%</td>
                <td id=${"newDeathsData"}>${stateObj.deathIncrease}</td>
                </tr>
                </table>
                </div>
                `;
    };

    data.forEach((stateObj) => {
      const HtmlString = resultsHtmlRepresentation(stateObj);
      renderToDom(HtmlString);
    });
  }
  console.log(data);
}

document.getElementById("searchBtn").addEventListener("click", () => {
  let searchTerm = document.getElementById("searchInput").value;
  if (searchTerm) 
  validateSearchState(searchTerm);
});

const reloadButton = document.querySelector("#reload");
// Reload everything:
function reload() {
  // Event listeners for reload
  reloadButton.addEventListener("click", reload, false);
  reload = location.reload();
}

function showElements() {
  var sectionContainer = document.getElementById("sectionContainer");
  sectionContainer.style.display = "inline-flex"; // <-- Set it to inline-flex
}
