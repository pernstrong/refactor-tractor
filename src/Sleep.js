import Fit from '../src/Fit';

class Sleep extends Fit {
  constructor(data, userRepository) {
    super(data, userRepository)
    this.hoursSlept = data.hoursSlept;
    this.sleepQuality = data.sleepQuality;
    this.sleep(userRepository);
  }

  sleep(userRepo) {
    var sleep = this;
    userRepo.users.find(function(user) {
      return user.id === sleep.userId;
    })
    // return currentUser.updateSleep(this.date, this.hoursSlept, this.sleepQuality);
  }

}

export default Sleep;
