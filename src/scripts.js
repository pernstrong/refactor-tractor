import './css/base.scss';
import './css/styles.scss';

import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
let userRepository = new UserRepository();
let sleepData = []
let activityData = []
let hydrationData = []
let user;

let todayDate = "2019/09/22";

Promise.all([
  fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/users/userData').then(response => response.json()),
  fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData').then(response => response.json()),
  fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData').then(response => response.json()),
  fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData').then(response => response.json())
]).then(data => createDataSets(data[0].userData, data[1].sleepData, data[2].activityData, data[3].hydrationData))

function createDataSets(userInfo, sleepInfo, activityInfo, hydrationInfo) {
  createUserRepo(userInfo)
  createSleepInfo(sleepInfo)
  createActivityInfo(activityInfo)
  createHydrationInfo(hydrationInfo)
  displayAllInfo()
}

function createUserRepo(userInfo) {
  userInfo.forEach(user => {
    const person = new User(user);
    userRepository.users.push(person)
  })
  assignUser()
}

function assignUser() {
  let randomNum = Math.floor((Math.random() * 49));
  user = userRepository.users[randomNum]
}

function createSleepInfo(sleepInfo) {
  sleepInfo.forEach(curSleep => {
    const newSleep = new Sleep(curSleep, userRepository)
    sleepData.push(newSleep)
  })
}

function createActivityInfo(activityInfo) {
  activityInfo.forEach(curActivity => {
    const newActivity = new Activity(curActivity, userRepository)
    activityData.push(newActivity)
  })
}

function createHydrationInfo(hyrdrationInfo) {
  hyrdrationInfo.forEach(curHydration => {
    const newHydration = new Hydration(curHydration, userRepository)
    hydrationData.push(newHydration)
  })
}

let dailyOz = document.querySelectorAll('.daily-oz');
let dropdownEmail = document.querySelector('#dropdown-email');
let dropdownFriendsStepsContainer = document.querySelector('#dropdown-friends-steps-container');
let dropdownGoal = document.querySelector('#dropdown-goal');
let dropdownName = document.querySelector('#dropdown-name');
let headerName = document.querySelector('#header-name');
let hydrationCalendarCard = document.querySelector('#hydration-calendar-card');
let hydrationFriendOuncesToday = document.querySelector('#hydration-friend-ounces-today');
let hydrationFriendsCard = document.querySelector('#hydration-friends-card');
let hydrationInfoCard = document.querySelector('#hydration-info-card');
let hydrationInfoGlassesToday = document.querySelector('#hydration-info-glasses-today');
let hydrationMainCard = document.querySelector('#hydration-main-card');
let hydrationUserOuncesToday = document.querySelector('#hydration-user-ounces-today');
let mainPage = document.querySelector('main');
let profileButton = document.querySelector('#profile-button');
let sleepCalendarCard = document.querySelector('#sleep-calendar-card');
let sleepCalendarHoursAverageWeekly = document.querySelector('#sleep-calendar-hours-average-weekly');
let sleepCalendarQualityAverageWeekly = document.querySelector('#sleep-calendar-quality-average-weekly');
let sleepFriendLongestSleeper = document.querySelector('#sleep-friend-longest-sleeper');
let sleepFriendsCard = document.querySelector('#sleep-friends-card');
let sleepFriendWorstSleeper = document.querySelector('#sleep-friend-worst-sleeper');
let sleepInfoCard = document.querySelector('#sleep-info-card');
let sleepInfoHoursAverageAlltime = document.querySelector('#sleep-info-hours-average-alltime');
let sleepInfoQualityAverageAlltime = document.querySelector('#sleep-info-quality-average-alltime');
let sleepInfoQualityToday = document.querySelector('#sleep-info-quality-today');
let sleepMainCard = document.querySelector('#sleep-main-card');
let sleepUserHoursToday = document.querySelector('#sleep-user-hours-today');
let stairsCalendarCard = document.querySelector('#stairs-calendar-card');
let stairsCalendarFlightsAverageWeekly = document.querySelector('#stairs-calendar-flights-average-weekly');
let stairsCalendarStairsAverageWeekly = document.querySelector('#stairs-calendar-stairs-average-weekly');
let stepsMainCard = document.querySelector('#steps-main-card');
let stepsInfoCard = document.querySelector('#steps-info-card');
let stepsFriendsCard = document.querySelector('#steps-friends-card');
let stepsTrendingCard = document.querySelector('#steps-trending-card');
let stepsCalendarCard = document.querySelector('#steps-calendar-card');
let stairsFriendFlightsAverageToday = document.querySelector('#stairs-friend-flights-average-today');
let stairsFriendsCard = document.querySelector('#stairs-friends-card');
let stairsInfoCard = document.querySelector('#stairs-info-card');
let stairsInfoFlightsToday = document.querySelector('#stairs-info-flights-today');
let stairsMainCard = document.querySelector('#stairs-main-card');
let stairsTrendingButton = document.querySelector('.stairs-trending-button');
let stairsTrendingCard = document.querySelector('#stairs-trending-card');
let stairsUserStairsToday = document.querySelector('#stairs-user-stairs-today');
let stepsCalendarTotalActiveMinutesWeekly = document.querySelector('#steps-calendar-total-active-minutes-weekly');
// let stepsCalendarTotalStepsWeekly = document.querySelector('#steps-calendar-total-steps-weekly');
// let stepsFriendAverageStepGoal = document.querySelector('#steps-friend-average-step-goal');
// let stepsInfoActiveMinutesToday = document.querySelector('#steps-info-active-minutes-today');
// let stepsInfoMilesWalkedToday = document.querySelector('#steps-info-miles-walked-today');
// let stepsFriendActiveMinutesAverageToday = document.querySelector('#steps-friend-active-minutes-average-today');
// let stepsFriendStepsAverageToday = document.querySelector('#steps-friend-steps-average-today');
// let stepsTrendingButton = document.querySelector('.steps-trending-button');
// let stepsUserStepsToday = document.querySelector('#steps-user-steps-today');
// let trendingStepsPhraseContainer = document.querySelector('.trending-steps-phrase-container');
// let trendingStairsPhraseContainer = document.querySelector('.trending-stairs-phrase-container');
// let userInfoDropdown = document.querySelector('#user-info-dropdown');


$('.new-info-container').on('click', function() {
  determineActvityType()
});
mainPage.addEventListener('click', showInfo);
profileButton.addEventListener('click', showDropdown);
$('#activity-button').on('click', function() {
  displayDropDown()
})
stairsTrendingButton.addEventListener('click', updateTrendingStairsDays);
$('.steps-trending-button').on('click', function() {
  updateTrendingStepDays()
});



function flipCard(cardToHide, cardToShow) {
  cardToHide.classList.add('hide');
  cardToShow.classList.remove('hide');
}

function showDropdown() {
  $('#user-info-dropdown').toggle('hide');
}
//buggy
function displayDropDown() {
  $('.new-activity-dropdown').toggle('hide')
}

//refactor
function showInfo() {
  if (event.target.classList.contains('steps-info-button')) {
    flipCard(stepsMainCard, stepsInfoCard);
  }
  if (event.target.classList.contains('steps-friends-button')) {
    flipCard(stepsMainCard, stepsFriendsCard);
  }
  if (event.target.classList.contains('steps-trending-button')) {
    flipCard(stepsMainCard, stepsTrendingCard);
  }
  if (event.target.classList.contains('steps-calendar-button')) {
    flipCard(stepsMainCard, stepsCalendarCard);
  }
  if (event.target.classList.contains('hydration-info-button')) {
    flipCard(hydrationMainCard, hydrationInfoCard);
  }
  if (event.target.classList.contains('hydration-friends-button')) {
    flipCard(hydrationMainCard, hydrationFriendsCard);
  }
  if (event.target.classList.contains('hydration-calendar-button')) {
    flipCard(hydrationMainCard, hydrationCalendarCard);
  }
  if (event.target.classList.contains('stairs-info-button')) {
    flipCard(stairsMainCard, stairsInfoCard);
  }
  if (event.target.classList.contains('stairs-friends-button')) {
    flipCard(stairsMainCard, stairsFriendsCard);
  }
  if (event.target.classList.contains('stairs-trending-button')) {
    flipCard(stairsMainCard, stairsTrendingCard);
  }
  if (event.target.classList.contains('stairs-calendar-button')) {
    flipCard(stairsMainCard, stairsCalendarCard);
  }
  if (event.target.classList.contains('sleep-info-button')) {
    flipCard(sleepMainCard, sleepInfoCard);
  }
  if (event.target.classList.contains('sleep-friends-button')) {
    flipCard(sleepMainCard, sleepFriendsCard);
  }
  if (event.target.classList.contains('sleep-calendar-button')) {
    flipCard(sleepMainCard, sleepCalendarCard);
  }
  if (event.target.classList.contains('steps-go-back-button')) {
    flipCard(event.target.parentNode, stepsMainCard);
  }
  if (event.target.classList.contains('hydration-go-back-button')) {
    flipCard(event.target.parentNode, hydrationMainCard);
  }
  if (event.target.classList.contains('stairs-go-back-button')) {
    flipCard(event.target.parentNode, stairsMainCard);
  }
  if (event.target.classList.contains('sleep-go-back-button')) {
    flipCard(event.target.parentNode, sleepMainCard);
  }
}
// refactor combine with updateTrendingStepDays
function updateTrendingStairsDays() {
  user.findTrendingStairsDays();
  $('.trending-stairs-phrase-container').html(`<p class='trend-line'>${user.trendingStairsDays[0]}</p>`);
}

function updateTrendingStepDays() {
  user.findTrendingStepDays();
  $('.trending-steps-phrase-container').html(`<p class='trend-line'>${user.trendingStepDays[0]}</p>`);
}

function displayAllInfo() {

  let sortedHydrationDataByDate = user.ouncesRecord.sort((a, b) => {
    if (Object.keys(a)[0] > Object.keys(b)[0]) {
      return -1;
    }
    if (Object.keys(a)[0] < Object.keys(b)[0]) {
      return 1;
    }
    return 0;
  });

  for (var i = 0; i < dailyOz.length; i++) {
    dailyOz[i].innerText = user.addDailyOunces(Object.keys(sortedHydrationDataByDate[i])[0])
  }

  dropdownGoal.innerText = `DAILY STEP GOAL | ${user.dailyStepGoal}`;

  dropdownEmail.innerText = `EMAIL | ${user.email}`;

  dropdownName.innerText = user.name.toUpperCase();

  headerName.innerText = `${user.getFirstName()}'S `;

  hydrationUserOuncesToday.innerText = hydrationData.find(hydration => {
    return hydration.userId === user.id && hydration.date === todayDate;
  }).ounces;

  hydrationFriendOuncesToday.innerText = userRepository.calculateAverageDailyWater(todayDate);

  hydrationInfoGlassesToday.innerText = hydrationData.find(hydration => {
    return hydration.userId === user.id && hydration.date === todayDate;
  }).ounces / 8;

  sleepCalendarHoursAverageWeekly.innerText = user.calculateAverageHoursThisWeek(todayDate);

  sleepCalendarQualityAverageWeekly.innerText = user.calculateAverageQualityThisWeek(todayDate);

  sleepFriendLongestSleeper.innerText = userRepository.users.find(user => {
    return user.id === userRepository.getLongestSleepers(todayDate)
  }).getFirstName();

  sleepFriendWorstSleeper.innerText = userRepository.users.find(user => {
    return user.id === userRepository.getWorstSleepers(todayDate)
  }).getFirstName();

  sleepInfoHoursAverageAlltime.innerText = user.hoursSleptAverage;

  $('#steps-info-miles-walked-today').text(user.activityRecord.find(activity => {
    return (activity.date === todayDate && activity.userId === user.id)
  }).calculateMiles(userRepository));

  sleepInfoQualityAverageAlltime.innerText = user.sleepQualityAverage;

  sleepInfoQualityToday.innerText = sleepData.find(sleep => {
    return sleep.userId === user.id && sleep.date === todayDate;
  }).sleepQuality;

  sleepUserHoursToday.innerText = sleepData.find(sleep => {
    return sleep.userId === user.id && sleep.date === todayDate;
  }).hoursSlept;

  stairsCalendarFlightsAverageWeekly.innerText = user.calculateAverageFlightsThisWeek(todayDate);

  stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);

  stairsFriendFlightsAverageToday.innerText = (userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1);

  stairsInfoFlightsToday.innerText = activityData.find(activity => {
    return activity.userId === user.id && activity.date === todayDate;
  }).flightsOfStairs;

  stairsUserStairsToday.innerText = activityData.find(activity => {
    return activity.userId === user.id && activity.date === todayDate;
  }).flightsOfStairs * 12;

  stairsCalendarFlightsAverageWeekly.innerText = user.calculateAverageFlightsThisWeek(todayDate);

  stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);

  stairsTrendingButton.addEventListener('click', function () {
    user.findTrendingStairsDays();
    $('.trending-stairs-phrase-container').html(`<p class='trend-line'>${user.trendingStairsDays[0]}</p>`);
  });

  stepsCalendarTotalActiveMinutesWeekly.innerText = user.calculateAverageMinutesActiveThisWeek(todayDate);

  $('#steps-calendar-total-steps-weekly').text(user.calculateAverageStepsThisWeek(todayDate));

  $('.steps-trending-button').on('click', function () {
    user.findTrendingStepDays();
    $('.trending-steps-phrase-container').html(`<p class='trend-line'>${user.trendingStepDays[0]}</p>`);
  });

  $('#steps-friend-active-minutes-average-today').text(userRepository.calculateAverageMinutesActive(todayDate));

  $('#steps-friend-average-step-goal').text(`${userRepository.calculateAverageStepGoal()}`);

  $('#steps-friend-steps-average-today').text(userRepository.calculateAverageSteps(todayDate));

  $('#steps-info-active-minutes-today').text(activityData.find(activity => {
    return activity.userId === user.id && activity.date === todayDate;
  }).minutesActive);
  $('#steps-user-steps-today').text(activityData.find(activity => {
    return activity.userId === user.id && activity.date === todayDate;
  }).steps);

  user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);

  user.friendsActivityRecords.forEach(friend => {
    dropdownFriendsStepsContainer.innerHTML += `
  <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>
  `;
  });

  let friendsStepsParagraphs = document.querySelectorAll('.friends-steps');

  friendsStepsParagraphs.forEach(paragraph => {
    if (friendsStepsParagraphs[0] === paragraph) {
      paragraph.classList.add('green-text');
    }
    if (friendsStepsParagraphs[friendsStepsParagraphs.length - 1] === paragraph) {
      paragraph.classList.add('red-text');
    }
    if (paragraph.innerText.includes('YOU')) {
      paragraph.classList.add('yellow-text');
    }
  });
}


function determineActvityType() {
  if (event.target.classList.contains('activity-tab')) {
    displayActivityForm()
  } else if (event.target.classList.contains('sleep-tab')) {
    displaySleepForm()
  } else {
    displayHydrationForm()
  }
}

function displayActivityForm() {
  clearDisplayForm();
  $('.display-form').html(
  `<section class='drop-down-form'>
        <legend for="activity-choices">Today's Activity</legend>
        <label class='steps-walked-title' for="steps-walked">Steps Walked Today</label>
        <input class='steps-walked-input' type="number" name="steps-walked"></input>
        <label class='activity-time-title' for="time-of-activity">How Long Did We Run?</label>
        <input class='activity-time-input' type="number" name='time-of-activity'></input>
        <label class='stair-amount-title' for="amount-of-stairs">Stair Count?</label>
        <input class='stair-amount-input' type="number" name='amount-of-stairs'></input>
        <input type='submit' class='submit-activity'></input>
  </section>`)
  $('.submit-activity').click(function() {
    let steps = parseInt($('.steps-walked-input').val())
    let time = parseInt($('.activity-time-input').val())
    let stairs = parseInt($('.stair-amount-input').val())
    addCompletedActivity(steps, time, stairs);
  })
}



let addCompletedActivity = (stepsWalked, activityTime, stairAmount) => {
  $('.new-activity-dropdown').toggle('hide');
fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    userID: user.id,
    date: "2019/09/22",
    numSteps: stepsWalked,
    minutesActive: activityTime,
    flightsOfStairs: stairAmount
  })
}).then(response => console.log(response.json()))
.catch(err => console.error(err))
}


function displayHydrationForm() {
  clearDisplayForm();
  $('.display-form').innerHTML =
  `<form class='drop-down-form'>
        <legend for="number-of-onces">Hydration!</legend>
        <label class='ounce-amount-title' for="ounces-drank">How Much Did We Drink Today?</label>
        <input class='ounce-amount-input' type="text" name="ounces-drank"></input>
        <input type='submit' class='submit-hydration'>
   </form>`
}

function displaySleepForm() {
  clearDisplayForm();
  $('.display-form').innerHTML =
  `<form class='drop-down-form'>
        <legend for="number-of-onces">SLEEP!</legend>
        <label class='sleep-amount-title' for="sleep-amount">How Much Did We Get?</label>
        <input class='sleep-amount-input' type="text" name="sleep-amount"></input>
        <label class='sleep-quality-title' for="sleep-quality">Quality of Sleep Between 1-5</label>
        <input class='sleep-quality-input' type="text" name="sleep-quality"></input>
        <input type='submit' class='submit-sleep'>
  </form>`
}

function clearDisplayForm() {
  $('.display-form').innerHTML = '';
}
