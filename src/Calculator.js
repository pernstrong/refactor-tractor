class Calculator {
  constructor(user, sleepData, activityData, hydrationData, userRepo) {
    this.user = user;
    this.sleepData = sleepData;
    this.activityData = activityData;
    this.hydrationData = hydrationData;
    this.userRepo = userRepo
  }

  findFriendsTotalStepsForWeek(user, date) {
    this.user.friends.map(friend => {
      let matchedFriend = this.userRepo.users.find(user => user.id === friend);
      this.calculateTotalStepsThisWeek(date);
      this.user.friendsActivityRecords.push(
        {
          'id': matchedFriend.id,
          'firstName': matchedFriend.name.toUpperCase().split(' ')[0],
          'totalWeeklySteps': matchedFriend.totalStepsThisWeek
        })
    })
    this.calculateTotalStepsThisWeek(date);
    this.user.friendsActivityRecords.push({
      'id': this.id,
      'firstName': 'YOU',
      'totalWeeklySteps': this.totalStepsThisWeek
    });
    this.user.friendsActivityRecords = this.user.friendsActivityRecords.sort((a, b) => b.totalWeeklySteps - a.totalWeeklySteps);
  }

  calculateTotalStepsThisWeek(todayDate) {
    this.user.totalStepsThisWeek = (this.user.activityRecord.reduce((sum, activity) => {
      let index = this.user.activityRecord.indexOf(this.user.activityRecord.find(activity => activity.date === todayDate));
      if (index <= this.user.activityRecord.indexOf(activity) && this.user.activityRecord.indexOf(activity) <= (index + 6)) {
        sum += activity.steps;
      }
      return sum;
    }, 0));
  }

  console() {
    console.log(this.user.friendsActivityRecords[1])
  }

}



export default Calculator;
