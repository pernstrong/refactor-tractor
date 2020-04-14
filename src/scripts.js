import './css/base.scss';
import './css/styles.scss';
import $ from 'jQuery'
import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import Calculator from './Calculator'
import domUpdates from './domUpdates';
let userRepository = new UserRepository();
let calculator;
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
  createCalculator()
  domUpdates.displayAllInfo(user, userRepository, sleepData, activityData, hydrationData, todayDate, calculator)
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
  // user = userRepository.users[12]
}

function createSleepInfo(sleepInfo) {
  sleepInfo.forEach(curSleep => {
    const newSleep = new Sleep(curSleep, userRepository)
    if (newSleep.hoursSlept !== "" && newSleep.sleepQuality !== "") {
      sleepData.push(newSleep)
    }
  })
  console.log(sleepData[0])
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

function createCalculator() {
  calculator = new Calculator(user, sleepData, activityData, hydrationData, todayDate);
}

$('.new-info-container').on('click', function(event) {
  determineActvityType(event)
});

$('#profile-button').on('click', domUpdates.showDropdown);

$('#activity-button').on('click', domUpdates.showActivityDropDown)

$('.steps-info-button').on('click', function() {
  domUpdates.flipCard('#steps-info-card', '#steps-main-card');
})

$('.steps-friends-button').on('click', function() {
  domUpdates.flipCard('#steps-friends-card', '#steps-main-card');
})

$('.steps-calendar-button').on('click', function() {
  domUpdates.flipCard('#steps-calendar-card', '#steps-main-card')
})

$('.hydration-info-button').on('click', function() {
  domUpdates.flipCard('#hydration-info-card', '#hydration-main-card')
})

$('.hydration-friends-button').on('click', function() {
  domUpdates.flipCard('#hydration-friends-card', '#hydration-main-card')
})

$('.hydration-calendar-button').on('click', function() {
  domUpdates.flipCard('#hydration-calendar-card', '#hydration-main-card')
})

$('.stairs-info-button').click(function() {
  domUpdates.flipCard('#stairs-info-card', '#stairs-main-card')
})

$('.stairs-friends-button').on('click', function() {
  domUpdates.flipCard('#stairs-friends-card', '#stairs-main-card')
})

$('.stairs-calendar-button').on('click', function() {
  domUpdates.flipCard('#stairs-calendar-card', '#stairs-main-card')
})

$('.sleep-info-button').on('click', function() {
  domUpdates.flipCard('#sleep-info-card', '#sleep-main-card')
})

$('.sleep-friends-button').on('click', function() {
  domUpdates.flipCard('#sleep-friends-card', '#sleep-main-card')
})

$('.sleep-calendar-button').on('click', function() {
  domUpdates.flipCard('#sleep-calendar-card', '#sleep-main-card')
})

$('.steps-trending-button').on('click', function() {
  calculator.findTrendingDays(2);
  domUpdates.flipCard('#steps-trending-card', '#steps-main-card')
  domUpdates.updateStepsTrending(calculator);
});

$('.stairs-trending-button').click(function() {
  calculator.findTrendingDays(1);
  domUpdates.flipCard('#stairs-trending-card', '#stairs-main-card')
  domUpdates.updateStairsTrending(calculator);
})

// PARENT-NODE IF RE-FACTOR
$('.steps-go-back-button').on('click', function(event) {
  domUpdates.flipCard('#steps-main-card', event.target.parentNode)
})

$('.hydration-go-back-button').on('click', function(event) {
  domUpdates.flipCard('#hydration-main-card', event.target.parentNode)
})

$('.stairs-go-back-button').on('click', function(event) {
  domUpdates.flipCard('#stairs-main-card', event.target.parentNode)
})

$('.sleep-go-back-button').on('click', function(event) {
  domUpdates.flipCard('#sleep-main-card', event.target.parentNode)
})

// CHANGE TO JQUERY
function determineActvityType(event) {
  if ($(event.target).hasClass('activity-tab')) {
    domUpdates.displayActivityForm()
    getActivityInputs()
  } else if ($(event.target).hasClass('sleep-tab')) {
    domUpdates.displaySleepForm()
    getSleepInputs()
  } else {
    domUpdates.displayHydrationForm()
    getHydrationInputs()
  }
}

function getActivityInputs() {
  $('.submit-activity').click(function() {
    let steps = parseInt($('.steps-walked-input').val())
    let time = parseInt($('.activity-time-input').val())
    let stairs = parseInt($('.stair-amount-input').val())
    addCompletedActivity(steps, time, stairs);
  })
}

function getHydrationInputs() {
  $('.submit-hydration').on('click', function() {
    let hydration = parseInt($('.ounce-amount-input').val())
    postHydration(hydration)
  })
}

function getSleepInputs() {
  $('.submit-sleep').on('click', function() {
    postNewSleep()
  })
}

let addCompletedActivity = (stepsWalked, activityTime, stairAmount) => {
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
  domUpdates.clearDisplayActivityForm()
  domUpdates.clearActivityInputs()
}

const postHydration = (hydration) => {
  fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userID: user.id,
      date: todayDate,
      numOunces: hydration
    })
  })
    .then(response => response.json())
    .catch(err => console.error(err))
  domUpdates.clearDisplayActivityForm()
  domUpdates.clearHydrationInputs()
}

function postNewSleep() {
  let sleepAmount = parseInt($('.sleep-amount-input').val())
  let sleepQuality = parseInt($('.sleep-quality-input').val())
  if (sleepAmount > 0 && sleepQuality > 0 && sleepQuality >= 1.0 && sleepQuality < 5.001) {
    fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID: user.id,
        date: todayDate,
        hoursSlept: sleepAmount,
        sleepQuality: sleepQuality
      })
    })
      .then(response => response.json())
      .catch(err => console.error(err))
  } else {
    window.alert('Please enter Hours Slept and Quality of Sleep (between 1-5)')
  }
  domUpdates.clearDisplayActivityForm()
  domUpdates.clearSleepInputs()
}
