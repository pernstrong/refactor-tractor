class Calculator {
  constructor(user, sleepData, activityData, hydrationData, todayDate) {
    this.user = user;
    this.sleepData = sleepData;
    this.activityData = activityData;
    this.hydrationData = hydrationData;
    this.todayDate = todayDate

    this.activityRecord = user.activityRecord
    this.trendingStepDays = [];
    this.trendingStairsDays = [];
    // this.sleepQualityRecord = [];


  }

  findClimbingRecord() {
    return this.activityRecord.sort((a, b) => {
      return b.flightsOfStairs - a.flightsOfStairs;
    })[0].flightsOfStairs;
  }

  calculateAverageforWeek(todayDate, numType) {
    return (this.activityRecord.reduce((sum, activity) => {
      let index = this.activityRecord.indexOf(this.activityRecord.find(activity => activity.date === todayDate));
      if (index <= this.activityRecord.indexOf(activity) && this.activityRecord.indexOf(activity) <= (index + 6)) {
        sum += this.findActivityTypeAvg(activity, numType)
      }
      return sum;
    }, 0) / 7).toFixed(1);
  }


  findActivityTypeAvg(activity, numType) {
    if (numType === 1) {
      return activity.flightsOfStairs;
    } else if (numType === 2) {
      return activity.steps;
    } else {
      return activity.minutesActive;
    }
  }

  findTrendingDays(numType) {
    let positiveDays = []
    this.activityRecord.forEach((activity, i) => {
      if (this.checkActivity(activity, i, numType)) {
        positiveDays.unshift(activity.date);
      } else if (positiveDays.length > 2) {
        this.trendingDays(numType).push(`Your most recent positive ${this.activityType(numType)} streak was ${positiveDays[0]} - ${positiveDays[positiveDays.length - 1]}!`);
        positiveDays = [];
      }
    })
  }

  checkActivity(activity, i, numType) {
    if (numType === 1) {
    return (this.activityRecord[i + 1] && activity.flightsOfStairs > this.activityRecord[i + 1].flightsOfStairs)
  } else {
    return (this.activityRecord[i + 1] && activity.steps > this.activityRecord[i + 1].steps)
    }
  }

  trendingDays(numType) {
    if (numType === 1) {
      return this.trendingStairsDays
    } else {
      return this.trendingStepDays
    }
  }

  activityType(numType) {
    if (numType === 1) {
      return 'climbing'
    } else {
      return 'step'
    }
  }
  calculateAverageQualityThisWeek(todayDate) {
    return (this.user.sleepQualityRecord.reduce((sum, sleepAct) => {
    let index = this.user.sleepQualityRecord.indexOf(this.user.sleepQualityRecord.find(sleep => sleep.date === todayDate));
    if (index <= this.user.sleepQualityRecord.indexOf(sleepAct) && this.user.sleepQualityRecord.indexOf(sleepAct) <= (index + 6)) {
      sum += sleepAct.quality;
    }
      return sum;
    }, 0) / 7).toFixed(1);
  }

}



export default Calculator;
