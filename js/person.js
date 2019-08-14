class Person {

  constructor() {
    driverList = [];
    passengerList = [];
  }

  function addPerson(label, id, location, seats) {
    // Driver is true, passenger is false
    // this.label = label;
    this.id = id;
    this.location = location;
    // Will be empty for all passengers
    this.connections = [];
    // Will be zero for all passengers
    this.seats = seats;
    this.flag = null;

    if (label) {
      driverList.push(this);
    } else {
      passengerList.push(this);
    }

    return this;
  }

  function getDrivers() {
    return driverList;
  }

  function getPassengers() {
    return passengerList;
  }
}
