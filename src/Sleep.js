class Sleep { // instance for the user's sleep each day
  constructor(data, userRepository) {
    this.userId = data.userID;
    this.date = data.date;
    this.hoursSlept = data.hoursSlept;
    this.sleepQuality = data.sleepQuality;
    this.sleep(userRepository);
  }
  sleep(userRepo) {
    var sleep = this;
    console.log('userRepo:', userRepo.users);
    userRepo.users.find(function(user) {
      return user.id === sleep.userId;
    })
    // console.log(user);
    // .updateSleep(this.date, this.hoursSlept, this.sleepQuality);
  }
}

export default Sleep;
