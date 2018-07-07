const fs = require('fs');
const axios = require('axios');
let term = process.argv[2];
let arr;

// read the data from data.json
fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return process.exit(1);
  }
  arr = JSON.parse(data); // arr is an array, at each index is an object full of data
  //console.log(arr);

  // filter out for ppl who live in SF, Seattle, or Portland
  // .filter(person) will return arr of anyone who matches certain criteria
  arr
    .filter(person => {
      return (
        person.city === 'San Francisco' ||
        person.city === 'Seattle' ||
        person.city === 'Portland'
      );
    })
    .forEach(person => {
      let firstName = person.firstName;
      let company = person.company;
      let email = person.email;
      let city = person.city;
      let boiler = '';
      // console.log(obj[0].firstName);
      // from that data we will need firstName, company, boiler plate text
      // most likely use writeFile
      if (company !== null) {
        boilerplate = `Hello ${firstName},
      
      I saw your experience at ${company} and thought you would be a great fit for us here at LinkedList. Let me know if you're interested in getting coffee or whatever recruiters say...
      
      Best,
      ${city}
      Randy Random
      LinkedList`;
      } else {
        boilerplate = `Hello ${firstName} come join our team`;
      }
      // in the write file loop over array and at each obj
      // write the email
      // data that we write how can it use a js file? or another type with variable inputs?

      fs.writeFile(`./emails/${email}.txt`, boilerplate, err => {
        if (err) {
          console.error(err);
          return process.exit(1);
        }
        console.log(`generated email for ${firstName}!!!`);
      });
    });
  // generate potential text
  // will need names, emails, and companies
  // if they live in california, wash, oregon and NOT in SF, seattle or portland OR city null
  //console.log(arr[0]);
  arr
    .filter(person => {
      return (
        (person.state === 'California' &&
          (person.city !== 'San Francisco' || person.city === null)) ||
        (person.state === 'Washington' &&
          (person.city !== 'Seattle' || person.city === null)) ||
        (person.state === 'Oregon' &&
          (person.city !== 'Portland' || person.city === null))
      );
    })
    .forEach(person => {
      let firstName = person.firstName;
      let lastName = person.lastName;
      let company = person.company;
      let email = person.email;
      let content = `${firstName} ${lastName},
           ${email},
           ${company}`;
      console.log(person);
      fs.appendFile('./potentials.txt', content, err => {
        if (err) {
          console.error(err);
          return process.exit(1);
        }
        console.log('saved potential canidates');
      });
    });
  console.log('test2');
});
