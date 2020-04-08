import './css/base.scss';
import './css/styles.scss';
import $ from 'jQuery'
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
    if (newSleep.hoursSlept !== "" && newSleep.sleepQuality !== "") {
      sleepData.push(newSleep)
    }
  })
  console.log('sleep', sleepData.length)
  console.log('sleep', sleepData[sleepData.length - 1])
}

function createActivityInfo(activityInfo) {
  activityInfo.forEach(curActivity => {
    const newActivity = new Activity(curActivity, userRepository)
    activityData.push(newActivity)
  })
  console.log('activity', activityData.length)
  console.log('activity', activityData[activityData.length - 1])
}

function createHydrationInfo(hyrdrationInfo) {
  hyrdrationInfo.forEach(curHydration => {
    const newHydration = new Hydration(curHydration, userRepository)
    hydrationData.push(newHydration)
  })
  console.log('hydration', hydrationData.length)
  console.log('hydration', hydrationData[hydrationData.length - 1])
}


$('.new-info-container').on('click', function() {
  determineActvityType()
});

$('#profile-button').on('click', showDropdown);

$('#activity-button').on('click', function() {
  $('.new-activity-dropdown').toggleClass('hide')
})

$('.stairs-trending-button').on('click', updateTrendingStairsDays);

function showDropdown() {
  $('#user-info-dropdown').toggle('hide');
}
//buggy
function displayDropDown() {
  $('.new-activity-dropdown').toggle('hide')
}

$('.steps-info-button').on('click', function() {
  $('#steps-info-card').toggleClass('hide')
  $('#steps-main-card').toggleClass('hide')
})

$('.steps-friends-button').on('click', function() {
  $('#steps-friends-card').toggleClass('hide')
  $('#steps-main-card').toggleClass('hide')
})

$('.steps-calendar-button').on('click', function() {
  $('#steps-calendar-card').toggleClass('hide')
  $('#steps-main-card').toggleClass('hide')
})

$('.steps-trending-button').on('click', function() {
  user.findTrendingStepDays();
  $('#steps-trending-card').toggleClass('hide')
  $('#steps-main-card').toggleClass('hide')
  $('.trending-steps-phrase-container').html(`<p class='trend-line'>${user.trendingStepDays[0]}</p>`);
});

$('.hydration-info-button').on('click', function() {
  $('#hydration-info-card').toggleClass('hide')
  $('.hydration-info-button').parent().parent().toggleClass('hide')
})

$('.hydration-friends-button').on('click', function() {
  $('#hydration-friends-card').toggleClass('hide')
  $('.hydration-friends-button').parent().parent().toggleClass('hide')
})

// duplicate????
$('.hydration-calendar-button').on('click', function() {
  $('#hydration-calendar-card').toggleClass('hide')
  $('.hydration-calendar-button').parent().parent().toggleClass('hide')
})

$('.stairs-info-button').click(function() {
  $('#stairs-info-card').toggleClass('hide')
  $('#stairs-main-card').toggleClass('hide')
})

$('.stairs-friends-button').on('click', function() {
  $('#stairs-friends-card').toggleClass('hide')
  $('.stairs-friends-button').parent().parent().toggleClass('hide')
})

$('.stairs-calendar-button').on('click', function() {
  $('#stairs-calendar-card').toggleClass('hide')
  $('#stairs-main-card').toggleClass('hide')
})

$('.stairs-trending-button').click(function() {
  user.findTrendingStairsDays();
  $('.trending-stairs-phrase-container').html(`<p class='trend-line'>${user.trendingStairsDays[0]}</p>`);
  $('#stairs-main-card').toggleClass('hide')
  $('#stairs-trending-card').toggleClass('hide')
})

$('.sleep-info-button').on('click', function() {
  $('#sleep-info-card').toggleClass('hide')
  $('#sleep-main-card').toggleClass('hide')
})

$('.sleep-friends-button').on('click', function() {
  $('#sleep-friends-card').toggleClass('hide');
  $('#sleep-main-card').toggleClass('hide')
})

$('.sleep-calendar-button').on('click', function() {
  $('#sleep-calendar-card').toggleClass('hide');
  $('.sleep-calendar-button').parent().parent().toggleClass('hide')
})

// PARENT-NODE IF RE-FACTOR
$('.steps-go-back-button').on('click', function(event) {
  $('#steps-main-card').removeClass('hide')
  $(event.target.parentNode).addClass('hide')
})

$('.hydration-go-back-button').on('click', function(event) {
  $('#hydration-main-card').removeClass('hide')
  $(event.target.parentNode).addClass('hide')
})

$('.stairs-go-back-button').on('click', function(event) {
  $('#stairs-main-card').removeClass('hide')
  $(event.target.parentNode).addClass('hide')
})

$('.sleep-go-back-button').on('click', function(event) {
  $('#sleep-main-card').removeClass('hide')
  $(event.target.parentNode).addClass('hide')
})

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

  for (var i = 0; i < $('.daily-oz').length; i++) {
    $('.daily-oz')[i].innerText = user.addDailyOunces(Object.keys(sortedHydrationDataByDate[i])[0])
  }

  $('#dropdown-goal').text(`DAILY STEP GOAL | ${user.dailyStepGoal}`);

  $('#dropdown-email').text(`EMAIL | ${user.email}`);

  $('#dropdown-name').text(user.name.toUpperCase());

  $('#header-name').prepend(`${user.getFirstName()}'S `)

  $('#hydration-user-ounces-today').text(function() {
    return hydrationData.find(hydration => {
      return hydration.userId === user.id && hydration.date === todayDate;
    }).ounces;
  })

  $('#hydration-friend-ounces-today').text(userRepository.calculateAverageDailyWater(todayDate));

  $('#hydration-info-glasses-today').text(function() {
    return hydrationData.find(hydration => {
      return hydration.userId === user.id && hydration.date === todayDate;
    }).ounces / 8
  })

  $('#sleep-calendar-hours-average-weekly').text(`${user.calculateAverageHoursThisWeek(todayDate)}`)

  $('#sleep-calendar-quality-average-weekly').text(`${user.calculateAverageQualityThisWeek(todayDate)}`)

  $('#sleep-friend-longest-sleeper').text(`${userRepository.users.find(user => {
    return user.id === userRepository.getLongestSleepers(todayDate)
  }).getFirstName()}`)

  $('#sleep-friend-worst-sleeper').text(userRepository.users.find(user => {
    return user.id === userRepository.getWorstSleepers(todayDate)
  }).getFirstName())

  $('#sleep-info-hours-average-alltime').text(user.hoursSleptAverage)

  $('#steps-info-miles-walked-today').text(user.activityRecord.find(activity => {
    return (activity.date === todayDate && activity.userId === user.id)
  }).calculateMiles(userRepository));

  $('#sleep-info-quality-average-alltime').text(user.sleepQualityAverage)

  $('#sleep-info-quality-today').text(sleepData.find(sleep => {
    return sleep.userId === user.id && sleep.date === todayDate;
  }).sleepQuality)

  $('#sleep-user-hours-today').text(sleepData.find(sleep => {
    return sleep.userId === user.id && sleep.date === todayDate;
  }).hoursSlept)

  $('#stairs-calendar-flights-average-weekly').text(user.calculateAverageFlightsThisWeek(todayDate))

  $('#stairs-calendar-stairs-average-weekly').text((user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0))

  $('#stairs-friend-flights-average-today').text((userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1));

  $('#stairs-info-flights-today').text(activityData.find(activity => {
    return activity.userId === user.id && activity.date === todayDate;
  }).flightsOfStairs);

  $('#stairs-user-stairs-today').text(activityData.find(activity => {
    return activity.userId === user.id && activity.date === todayDate;
  }).flightsOfStairs * 12);


  $('#stairs-calendar-flights-average-weekly').text(user.calculateAverageFlightsThisWeek(todayDate))

  $('#stairs-calendar-stairs-average-weekly').text((user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0))

  $('#steps-calendar-total-active-minutes-weekly').text(user.calculateAverageMinutesActiveThisWeek(todayDate))

  $('#steps-calendar-total-steps-weekly').text(user.calculateAverageStepsThisWeek(todayDate));

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
    $('#dropdown-friends-steps-container').append(`
  <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>
  `);
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

// CHANGE TO JQUERY
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
    `<section class='drop-down-form hide'>
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
  clearDisplayActivityForm()
  clearActivityInputs()
}

function displayHydrationForm() {
  clearDisplayForm();
  $('.display-form').html(
    `<section class='drop-down-form'>
        <legend for="number-of-onces">Hydration!</legend>
        <label class='ounce-amount-title' for="ounces-drank">How Much Did We Drink Today?</label>
        <input class='ounce-amount-input' type="text" name="ounces-drank"></input>
        <input type='submit' class='submit-hydration'></input>
   </section>`)
  $('.submit-hydration').on('click', function() {
    let hydration = parseInt($('.ounce-amount-input').val())
    postHydration(hydration)
  })
}

function displaySleepForm() {
  clearDisplayForm();
  $('.display-form').html(
    `<section class='drop-down-form'>
        <legend for="number-of-onces">SLEEP!</legend>
        <label class='sleep-amount-title' for="sleep-amount">How Much Did We Get?</label>
        <input class='sleep-amount-input' type="number" name="sleep-amount" required></input>
        <label class='sleep-quality-title' for="sleep-quality">Quality of Sleep (1-5)</label>
        <input class='sleep-quality-input' type="number" name="sleep-quality" max="5.0" required></input>
        <input type='submit' class='submit-sleep'></input>
  </section>`
  )
  $('.submit-sleep').on('click', function() {
    postNewSleep()
  })
}

function clearDisplayForm() {
  $('.display-form').innerHTML = '';
}

const postHydration = (hydration) => {

  fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: user.id,
        date: todayDate,
        ounces: hydration
      })
    })
    .then(resolved => resolved.json())
    .catch(err => console.error(err))
  clearDisplayActivityForm()
  clearHydrationInputs()
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
  clearDisplayActivityForm()
  clearSleepInputs()
}

const clearDisplayActivityForm = () => {
  $('.new-activity-dropdown').addClass('hide')
}

const clearSleepInputs = () => {
  $('.sleep-amount-input').val('')
  $('.sleep-quality-input').val('')
}

const clearHydrationInputs = () => {
  $('.ounce-amount-input').val('')
}

const clearActivityInputs = () => {
  $('.steps-walked-input').val('')
  $('.activity-time-input').val('')
  $('.stair-amount-input').val('')
}
