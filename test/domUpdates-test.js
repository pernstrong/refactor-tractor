import domUpdates from '../src/domUpdates';
const chai = require('chai')
  , spies = require('chai-spies');

chai.use(spies);

const should = chai.should()
  , expect = chai.expect;

describe('domUpdates', function () {

  afterEach(function() {
    chai.spy.restore(domUpdates) 
  });

  it('Invoke displayActivityForm, Spies: clearDisplayForm & renderActivityDisplayForm', function() {
    chai.spy.on(domUpdates, ['clearDisplayForm', 'renderActivityDisplayForm'], () => {});
    domUpdates.displayActivityForm()
    expect(domUpdates.clearDisplayForm).to.have.been.called(1);
    expect(domUpdates.clearDisplayForm).to.have.been.called(1);
  });

  it('Invoke displayHydrationForm, Spies: clearDisplayForm & renderHydrationDisplayForm', function() {
    chai.spy.on(domUpdates, ['clearDisplayForm', 'renderHydrationDisplayForm'], () => {});
    domUpdates.displayHydrationForm()
    expect(domUpdates.clearDisplayForm).to.have.been.called(1);
    expect(domUpdates.renderHydrationDisplayForm).to.have.been.called(1);
  });

  it('Invoke displaySleepForm, Spies: clearDisplayForm & renderSleepDisplayForm', function() {
    chai.spy.on(domUpdates, ['clearDisplayForm', 'renderSleepDisplayForm'], () => {});
    domUpdates.displaySleepForm()
    expect(domUpdates.clearDisplayForm).to.have.been.called(1);
    expect(domUpdates.renderSleepDisplayForm).to.have.been.called(1);
  });

})