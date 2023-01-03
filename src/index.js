const tutorialPb = require("./protogen/tutorial_pb");
const { Timestamp } = require("google-protobuf/google/protobuf/timestamp_pb");

var person = new tutorialPb.Person();

person.setName("ray");
person.setEmail("walrusray811@gmail.com");
person.setId(1);
var a = new tutorialPb.A();
a.setA("123");
person.setA(a);

var phone = new tutorialPb.Person.PhoneNumber();
phone.setNumber("010-1111-1234");
phone.setType(0);

person.addPhones(phone);

person.setLastUpdated(Timestamp.fromDate(new Date()));
console.log(person.getLastUpdated().toDate().toLocaleString());
console.log(person.toObject());
const personBinary = person.serializeBinary();

const deserialized = tutorialPb.Person.deserializeBinary(personBinary);

console.log(deserialized.hasA(), deserialized.hasB());
console.log(tutorialPb.Person.deserializeBinary(personBinary).toObject());
