import domUpdates from '../src/domUpdates';
const chai = require('chai'),
  spies = require('chai-spies');

chai.use(spies);

const should = chai.should(),
  expect = chai.expect;

describe('domUpdates', function () {

  let user;
  let userRepository;
  let sleepData;
  let activityData;
  let hydrationData;
  let todayDate;
  let calculator;
  let showCard;
  let hideCard;

  this.beforeEach(function () {
    user = {};
    userRepository = [];
    sleepData = {};
    activityData = {};
    hydrationData = {};
    todayDate = "2019/09/22";
    calculator = {};
    showCard = 'element';
    hideCard = 'element'
  })

  afterEach(function () {
    chai.spy.restore(domUpdates)
  });

  it('Should test if renderActivityDisplayForm was invoked', function () {
    chai.spy.on(domUpdates, 'renderActivityDisplayForm', () => {});
    domUpdates.renderActivityDisplayForm();
    expect(domUpdates.renderActivityDisplayForm).to.have.been.called(1);
  });

  it('Should test if renderHydrationDisplayForm was invoked', function () {
    chai.spy.on(domUpdates, 'renderHydrationDisplayForm', () => {});
    domUpdates.renderHydrationDisplayForm();
    expect(domUpdates.renderHydrationDisplayForm).to.have.been.called(1);
  });

  it('Should test if renderSleepDisplayForm was invoked', function () {
    chai.spy.on(domUpdates, 'renderSleepDisplayForm', () => {});
    domUpdates.renderSleepDisplayForm();
    expect(domUpdates.renderSleepDisplayForm).to.have.been.called(1);
  });

  it('Should test if manipulateActivity was invoked and its parameters', function () {
    chai.spy.on(domUpdates, 'manipulateActivity', () => {});
    domUpdates.manipulateActivity(user, userRepository, activityData, todayDate, calculator);
    expect(domUpdates.manipulateActivity).to.have.been.called(1);
    expect(domUpdates.manipulateActivity).to.have.been.called.with.exactly(user, userRepository, activityData, todayDate, calculator);
  });

  it('Should test if manipulateHydration was invoked', function () {
    chai.spy.on(domUpdates, 'manipulateHydration', () => {});
    domUpdates.manipulateHydration(user, hydrationData, todayDate, userRepository, calculator);
    expect(domUpdates.manipulateHydration).to.have.been.called(1);
    expect(domUpdates.manipulateHydration).to.have.been.called.with.exactly(user, hydrationData, todayDate, userRepository, calculator);
  });

  it('Should test if manipulateSleep was invoked and it parameters', function () {
    chai.spy.on(domUpdates, 'manipulateSleep', () => {});
    domUpdates.manipulateSleep(user, userRepository, sleepData, todayDate, calculator);
    expect(domUpdates.manipulateSleep).to.have.been.called(1);
    expect(domUpdates.manipulateSleep).to.have.been.called.with.exactly(user, userRepository, sleepData, todayDate, calculator);
  });

  it('Should test if clearDisplayForm was invoked', function () {
    chai.spy.on(domUpdates, 'clearDisplayForm', () => {});
    domUpdates.clearDisplayForm();
    expect(domUpdates.clearDisplayForm).to.have.been.called(1);
  });

  it('Should test if showDropdown was invoked', function () {
    chai.spy.on(domUpdates, 'showDropdown', () => {});
    domUpdates.showDropdown();
    expect(domUpdates.showDropdown).to.have.been.called(1);
  });

  it('Should test if showActivityDropDown was invoked', function () {
    chai.spy.on(domUpdates, 'showActivityDropDown', () => {});
    domUpdates.showActivityDropDown();
    expect(domUpdates.showActivityDropDown).to.have.been.called(1);
  });

  it('Should test if flipCard was invoked and it parameters', function () {
    chai.spy.on(domUpdates, 'flipCard', () => {});
    domUpdates.flipCard(showCard, hideCard);
    expect(domUpdates.flipCard).to.have.been.called(1);
    expect(domUpdates.flipCard).to.have.been.called.with.exactly(showCard, hideCard);
  });

  it('Should test if updateStepsTrending was invoked and it parameters', function () {
    chai.spy.on(domUpdates, 'updateStepsTrending', () => {});
    domUpdates.updateStepsTrending(user);
    expect(domUpdates.updateStepsTrending).to.have.been.called(1);
    expect(domUpdates.updateStepsTrending).to.have.been.called.with.exactly(user);
  });

  it('Should test if updateStairsTrending was invoked and it parameters', function () {
    chai.spy.on(domUpdates, 'updateStairsTrending', () => {});
    domUpdates.updateStairsTrending(user);
    expect(domUpdates.updateStairsTrending).to.have.been.called(1);
    expect(domUpdates.updateStairsTrending).to.have.been.called.with.exactly(user);
  });

  it('Should test if clearDisplayActivityForm was invoked', function () {
    chai.spy.on(domUpdates, 'clearDisplayActivityForm', () => {});
    domUpdates.clearDisplayActivityForm();
    expect(domUpdates.clearDisplayActivityForm).to.have.been.called(1);
  });

  it('Should test if clearSleepInputs was invoked', function () {
    chai.spy.on(domUpdates, 'clearSleepInputs', () => {});
    domUpdates.clearSleepInputs();
    expect(domUpdates.clearSleepInputs).to.have.been.called(1);
  });

  it('Should test if clearHydrationInputs was invoked', function () {
    chai.spy.on(domUpdates, 'clearHydrationInputs', () => {});
    domUpdates.clearHydrationInputs();
    expect(domUpdates.clearHydrationInputs).to.have.been.called(1);
  });

  it('Should test if clearActivityInputs was invoked', function () {
    chai.spy.on(domUpdates, 'clearActivityInputs', () => {});
    domUpdates.clearActivityInputs();
    expect(domUpdates.clearActivityInputs).to.have.been.called(1);
  });

  it('Invoke displayActivityForm, Spies: clearDisplayForm & renderActivityDisplayForm', function () {
    chai.spy.on(domUpdates, ['clearDisplayForm', 'renderActivityDisplayForm'], () => {});
    domUpdates.displayActivityForm()
    expect(domUpdates.clearDisplayForm).to.have.been.called(1);
    expect(domUpdates.renderActivityDisplayForm).to.have.been.called(1);
  });

  it('Invoke displayHydrationForm, Spies: clearDisplayForm & renderHydrationDisplayForm', function () {
    chai.spy.on(domUpdates, ['clearDisplayForm', 'renderHydrationDisplayForm'], () => {});
    domUpdates.displayHydrationForm()
    expect(domUpdates.clearDisplayForm).to.have.been.called(1);
    expect(domUpdates.renderHydrationDisplayForm).to.have.been.called(1);
  });

  it('Invoke displaySleepForm, Spies: clearDisplayForm & renderSleepDisplayForm', function () {
    chai.spy.on(domUpdates, ['clearDisplayForm', 'renderSleepDisplayForm'], () => {});
    domUpdates.displaySleepForm()
    expect(domUpdates.clearDisplayForm).to.have.been.called(1);
    expect(domUpdates.renderSleepDisplayForm).to.have.been.called(1);
  });

  it('Should test displayAllInfo, its parameters and nested methods', function () {
    chai.spy.on(domUpdates, ['manipulateActivity', 
      'manipulateHydration', 'manipulateSleep'], () => {});
    domUpdates.displayAllInfo(user, userRepository, sleepData, activityData, hydrationData, todayDate, calculator);
    expect(domUpdates.manipulateActivity).to.have.been.called(1);
    expect(domUpdates.manipulateHydration).to.have.been.called(1);
    expect(domUpdates.manipulateSleep).to.have.been.called(1);
  });

})