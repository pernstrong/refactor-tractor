class Calculator {
  constructor(user, sleepData, activityData, hydrationData) {
    this.user = user;
    this.sleepData = sleepData;
    this.activityData = activityData;
    this.hydrationData = hydrationData;
  }

  calculateAverageHoursThisWeek(todayDate) {
    return (this.user.sleepHoursRecord.reduce((sum, sleepAct) => {
      let index = this.user.sleepHoursRecord.indexOf(this.user.sleepHoursRecord.find(sleep => sleep.date === todayDate));
      if (index <= this.user.sleepHoursRecord.indexOf(sleepAct) && this.user.sleepHoursRecord.indexOf(sleepAct) <= (index + 6)) {
        sum += sleepAct.hours;
      }
      return sum;
    }, 0) / 7).toFixed(1);
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

  console() {
    console.log(this.user.friendsActivityRecords[1])
  }

}



export default Calculator;
