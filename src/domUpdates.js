import $ from 'jQuery'

const domUpdates = {

  displayActivityForm() {
    this.clearDisplayForm();
    this.renderActivityDisplayForm();
  },

  displayHydrationForm() {
    this.clearDisplayForm();
    this.renderHydrationDisplayForm();
  },

  displaySleepForm() {
    this.clearDisplayForm();
    this.renderSleepDisplayForm();
  },

  displayAllInfo(user, userRepository, sleepData, activityData, hydrationData, todayDate, calculator) {
    this.manipulateActivity(user, userRepository, activityData, todayDate, calculator);
    this.manipulateHydration(user, hydrationData, todayDate, userRepository, calculator);
    this.manipulateSleep(user, userRepository, sleepData, todayDate, calculator);
  },

  renderActivityDisplayForm() {
    $('.display-form').html(
      `<section class='drop-down-form hide'>
        <legend for="activity-choices">Today's Activity</legend>
        <label class='steps-walked-title' for="steps-walked">Enter Steps Walked</label>
        <input class='steps-walked-input' type="number" name="steps-walked"></input>
        <label class='activity-time-title' for="time-of-activity">Enter Minutes Active</label>
        <input class='activity-time-input' type="number" name='time-of-activity'></input>
        <label class='stair-amount-title' for="amount-of-stairs">Enter Stairs Climbed</label>
        <input class='stair-amount-input' type="number" name='amount-of-stairs'></input>
        <input type='submit' class='submit-activity'></input>
  </section>`)
  },

  renderHydrationDisplayForm() {
    $('.display-form').html(
      `<section class='drop-down-form'>
          <legend for="number-of-onces">Hydration!</legend>
          <label class='ounce-amount-title' for="ounces-drank">Enter Ounces Drank</label>
          <input class='ounce-amount-input' type="text" name="ounces-drank"></input>
          <input type='submit' class='submit-hydration'></input>
     </section>`)
  },

  renderSleepDisplayForm() {
    $('.display-form').html(
      `<section class='drop-down-form'>
          <legend for="number-of-onces">SLEEP!</legend>
          <label class='sleep-amount-title' for="sleep-amount">Enter Hours Slept</label>
          <input class='sleep-amount-input' type="number" name="sleep-amount" required></input>
          <label class='sleep-quality-title' for="sleep-quality">Rate Sleep Quality(1-5)</label>
          <input class='sleep-quality-input' type="number" name="sleep-quality" max="5.0" required></input>
          <input type='submit' class='submit-sleep'></input>
    </section>`)
  },

  manipulateActivity(user, userRepository, activityData, todayDate, calculator) {
    $('#stairs-friend-flights-average-today').text((userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1));

    $('#stairs-info-flights-today').text(activityData.find(activity => {
      return activity.userId === user.id && activity.date === todayDate;
    }).flightsOfStairs);

    $('#stairs-calendar-flights-average-weekly').text(calculator.calculateAverageforWeek(todayDate, 1))

    $('#stairs-calendar-stairs-average-weekly').text((calculator.calculateAverageforWeek(todayDate, 1) * 12).toFixed(0))

    $('#stairs-user-stairs-today').text(activityData.find(activity => {
      return activity.userId === user.id && activity.date === todayDate;
    }).flightsOfStairs * 12);

    $('#steps-calendar-total-active-minutes-weekly').text(calculator.calculateAverageforWeek(todayDate, 3))

    $('#steps-calendar-total-steps-weekly').text(calculator.calculateAverageforWeek(todayDate, 2));

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
  },

  manipulateHydration(user, hydrationData, todayDate, userRepository) {
    let sortedHydrationDataByDate = user.ouncesRecord.sort((a, b) => {
      if (Object.keys(a)[0] > Object.keys(b)[0]) {
        return -1;
      }
      if (Object.keys(a)[0] < Object.keys(b)[0]) {
        return 1;
      }
      return 0;
    })

    for (var i = 0; i < $('.daily-oz').length; i++) {
      $('.daily-oz')[i].innerText = user.addDailyOunces(Object.keys(sortedHydrationDataByDate[i])[0])
    }

    $('#dropdown-goal').text(`DAILY STEP GOAL | ${user.dailyStepGoal}`);

    $('#dropdown-email').text(`EMAIL | ${user.email}`);

    $('#dropdown-name').text(user.name.toUpperCase());

    $('#header-name').prepend(`${user.getFirstName()}'S `);

    $('#hydration-user-ounces-today').text(function () {
      return hydrationData.find(hydration => {
        return hydration.userId === user.id && hydration.date === todayDate;
      }).ounces
    })

    $('#hydration-friend-ounces-today').text(userRepository.calculateAverageDailyWater(todayDate));

    $('#hydration-info-glasses-today').text(function () {
      return hydrationData.find(hydration => {
        return hydration.userId === user.id && hydration.date === todayDate;
      }).ounces / 8
    })
  },

  manipulateSleep(user, userRepository, sleepData, todayDate) {
    $('#sleep-calendar-hours-average-weekly').text(`${user.calculateAverageHoursThisWeek(todayDate)}`)

    $('#sleep-calendar-quality-average-weekly').text(`${user.calculateAverageQualityThisWeek(todayDate)}`)

    $('#sleep-friend-longest-sleeper').text(`${userRepository.users.find(user => {
      return user.id === userRepository.getLongestSleepers(todayDate, sleepData)
    }).getFirstName()}`)

    $('#sleep-friend-worst-sleeper').text(userRepository.users.find(user => {
      return user.id === userRepository.getWorstSleepers(todayDate, sleepData)
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
  },

  clearDisplayForm() {
    $('.display-form').text = '';
  },

  showDropdown() {
    $('#user-info-dropdown').toggle('hide');
  },

  showActivityDropDown() {
    $('.new-activity-dropdown').toggleClass('hide')
  },

  flipCard(showCard, hideCard) {
    $(showCard).toggleClass('hide')
    $(hideCard).toggleClass('hide')
  },

  updateStepsTrending(calculator) {
    $('.trending-steps-phrase-container').html(`<p class='trend-line'>${calculator.trendingStepDays[0]}</p>`);
  },

  updateStairsTrending(calculator) {
    $('.trending-stairs-phrase-container').html(`<p class='trend-line'>${calculator.trendingStairsDays[0]}</p>`);
  },

  clearDisplayActivityForm() {
    $('.new-activity-dropdown').addClass('hide')
  },

  clearSleepInputs() {
    $('.sleep-amount-input').val('')
    $('.sleep-quality-input').val('')
  },

  clearHydrationInputs() {
    $('.ounce-amount-input').val('')
  },

  clearActivityInputs() {
    $('.steps-walked-input').val('')
    $('.activity-time-input').val('')
    $('.stair-amount-input').val('')
  }
}
export default domUpdates
