import { expect } from 'chai';
import Calculator from '../src/Calculator'
const chai = require('chai')
 , spies = require('chai-spies')
chai.use(spies);

describe('Calculator', function() {

  let calculator;

  beforeEach(function() {
    calculator = new Calculator({id: 1, name: 'Luisa Hane'}, [{userId: 1, date: '2019/06/15', hoursSlept: 6.1, sleepQuality: 2.2}], [{userID:1, date: '2019/06/15', numSteps: 3577, minutesActive: 140, flightsOfStairs: 16}], [{userID: 1, date: '2019/06/15', numOunces: 37}])

    // chai.spy.on(calculator.calculateAverageforWeek, 'findActivityTypeAvg', () => {})
})

 it('should be a function', function() {
   expect(Calculator).to.be.a('function')
 })

 it('should have a user', function() {
   expect(calculator.user.name).to.equal('Luisa Hane')
 })

 it('should hold sleep data', function() {
   expect(calculator.sleepData[0].hoursSlept).to.equal(6.1)
 })

 it('should hold activity data', function() {
   expect(calculator.activityData[0].minutesActive).to.equal(140)
 })

 it('should hold hydration data', function() {
   expect(calculator.hydrationData[0].numOunces).to.equal(37)
 })
 it('should have a default value of [] for trendingStepDays', function() {
   expect(calculator.trendingStepDays).to.deep.equal([]);
 });

 it('should have a default value of [] for trendingStairsDays', function() {
   expect(calculator.trendingStairsDays).to.deep.equal([]);
 });

 it('should have a method that return the highest climbing record', function() {
   calculator.activityRecord = [{flightsOfStairs: 10}, {flightsOfStairs: 15}, {flightsOfStairs: 17}]
   expect(calculator.findClimbingRecord()).to.equal(17)
 });

 it('should calculate the average minutes active', function() {
   calculator.activityRecord = [{date: "2019/09/18", minutesActive: 78}, {date: "2019/09/17", minutesActive: 100}, {date: "2019/09/16", minutesActive: 20}, {date: "2019/09/15", minutesActive: 21}, {date: "2019/09/14", minutesActive: 35}, {date: "2019/09/13", minutesActive: 37}, {date: "2019/06/12", minutesActive: 42}, {date: "2019/09/11", minutesActive: 18}, {date: "2019/09/10", minutesActive: 16}, {date: "2019/09/09", minutesActive: 81}];
   expect(calculator.calculateAverageforWeek("2019/09/17", 3)).to.equal('39.0')
 });
 it('should calculate the average steps taken in a given week', function() {
   calculator.activityRecord = [{date: "2019/09/18", steps: 1178}, {date: "2019/09/17", steps: 1080}, {date: "2019/09/16", steps: 120}, {date: "2019/09/15", steps: 891}, {date: "2019/09/14", steps: 380}, {date: "2019/09/13", steps: 3234}, {date: "2019/06/12", steps: 1111}, {date: "2019/09/11", steps: 18}, {date: "2019/09/10", steps: 345}, {date: "2019/09/09", steps: 81}];
   expect(calculator.calculateAverageforWeek("2019/09/17", 2)).to.equal('976.3')
 });
 it('should calculate the average flights of stairs taken in a given week', function() {
   calculator.activityRecord = [{date: "2019/09/18", flightsOfStairs: 4}, {date: "2019/09/17", flightsOfStairs: 6}, {date: "2019/09/16", flightsOfStairs: 1}, {date: "2019/09/15", flightsOfStairs: 2}, {date: "2019/09/14", flightsOfStairs: 12}, {date: "2019/09/13", flightsOfStairs: 21}, {date: "2019/06/12", flightsOfStairs: 3}, {date: "2019/09/11", flightsOfStairs: 14}, {date: "2019/09/10", flightsOfStairs: 2}, {date: "2019/09/09", flightsOfStairs: 8}];
   expect(calculator.calculateAverageforWeek("2019/09/17", 1)).to.equal('8.4')
 });

 it.skip('should call findActivityTypeAvg when calculateAverageforWeek is called', function() {
   console.log(Calculator);
   calculator.activityRecord = [{date: "2019/09/18", flightsOfStairs: 4}, {date: "2019/09/17", flightsOfStairs: 6}, {date: "2019/09/16", flightsOfStairs: 1}, {date: "2019/09/15", flightsOfStairs: 2}, {date: "2019/09/14", flightsOfStairs: 12}, {date: "2019/09/13", flightsOfStairs: 21}, {date: "2019/06/12", flightsOfStairs: 3}, {date: "2019/09/11", flightsOfStairs: 14}, {date: "2019/09/10", flightsOfStairs: 2}, {date: "2019/09/09", flightsOfStairs: 8}];
   chai.spy.on(calculator, ['calculateAverageforWeek', 'findActivityTypeAvg'], () => {})
   calculator.calculateAverageforWeek("2019/09/17", 1)
   expect(calculator.findActivityTypeAvg).to.have.been.called(1)
 })
 it('should find 3+ days with positive trend', function() {
   calculator.activityRecord = [{
   "date": "2019/06/29", "steps": 2},
   {"date": "2019/06/28", "steps": 1},
   {"date": "2019/06/27", "steps": 4},
   {"date": "2019/06/26", "steps": 3},
   {"date": "2019/06/25", "steps": 1},
   {"date": "2019/06/24", "steps": 12},
   {"date": "2019/06/23", "steps": 11},
   {"date": "2019/06/22", "steps": 10},
   {"date": "2019/06/21", "steps": 9},
   {"date": "2019/06/20", "steps": 8},
   {"date": "2019/06/19", "steps": 11},
   {"date": "2019/06/18", "steps": 10}];
   calculator.findTrendingDays(2)
   expect(calculator.trendingStepDays).to.deep.equal(['Your most recent positive step streak was 2019/06/26 - 2019/06/29!', 'Your most recent positive step streak was 2019/06/21 - 2019/06/24!']);
 });
 it('findTrendingStairsDays should find 3+ days with positive trend', function() {
   calculator.activityRecord = [{
   "date": "2019/06/29", "flightsOfStairs": 4},
   {"date": "2019/06/28", "flightsOfStairs": 1},
   {"date": "2019/06/27", "flightsOfStairs": 16},
   {"date": "2019/06/26", "flightsOfStairs": 15},
   {"date": "2019/06/25", "flightsOfStairs": 1},
   {"date": "2019/06/24", "flightsOfStairs": 9},
   {"date": "2019/06/23", "flightsOfStairs": 3},
   {"date": "2019/06/22", "flightsOfStairs": 10},
   {"date": "2019/06/21", "flightsOfStairs": 4},
   {"date": "2019/06/20", "flightsOfStairs": 3},
   {"date": "2019/06/19", "flightsOfStairs": 2},
   {"date": "2019/06/18", "flightsOfStairs": 1}];
   calculator.findTrendingDays(1)
   expect(calculator.trendingStairsDays).to.deep.equal(['Your most recent positive climbing streak was 2019/06/26 - 2019/06/29!', 'Your most recent positive climbing streak was 2019/06/19 - 2019/06/24!']);
 });
 // helper functions
 it('should find activity type based on numType switch', function() {
   expect(calculator.findActivityTypeAvg({"date": "2019/06/28", "flightsOfStairs": 1}, 1)).to.equal(1)
 })

 it('should check the activity based on numType switch', function() {
   calculator.activityRecord = [{
   "date": "2019/06/29", "steps": 2},
   {"date": "2019/06/28", "steps": 1},
   {"date": "2019/06/27", "steps": 4},
   {"date": "2019/06/26", "steps": 3},
   {"date": "2019/06/25", "steps": 1},
   {"date": "2019/06/24", "steps": 12},
   {"date": "2019/06/23", "steps": 11},
   {"date": "2019/06/22", "steps": 10},
   {"date": "2019/06/21", "steps": 9},
   {"date": "2019/06/20", "steps": 8},
   {"date": "2019/06/19", "steps": 11},
   {"date": "2019/06/18", "steps": 10}];
   expect(calculator.checkActivity({"date": "2019/06/23", "steps": 11}, 0, 2)).to.equal(true)
 })

 it('should find trending days type based on numType switch', function() {
   expect(calculator.trendingDays(2)).to.deep.equal([])
 })

 it('should find activity type based on numType', function() {

   expect(calculator.activityType(1)).to.equal('climbing')
 })
})
