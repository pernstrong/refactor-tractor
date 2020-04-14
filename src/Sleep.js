import Fit from '../src/Fit';

class Sleep extends Fit{
  constructor(data, userRepository) {
    super(data, userRepository)
    this.userId = data.userID;
    this.date = data.date;
    this.hoursSlept = data.hoursSlept;
    this.sleepQuality = data.sleepQuality;
    this.sleep(userRepository);
  }
  sleep(userRepo) {
    var sleep = this;
    let currentUser = userRepo.users.find(function(user) {
      return user.id === sleep.userId;
    })
    console.log(currentUser);
    return currentUser.updateSleep(this.date, this.hoursSlept, this.sleepQuality);
  }

}

export default Sleep;
