let tableBody = document.getElementById('table-body');

/*part 1: sync GET*/
let studentsArray = [
  {
    "name":"Wow! Here we are",
    "grade":10
  },
  {
    "name":"Hello",
    "grade":8
  },
  {
    "name":"test This is not a test",
    "grade":14
  },
  {
    "name":"testtest123",
    "grade":3
  },
  {
    "name":"test213",
    "grade":7
  }
];

function init() {
  for (let student of studentsArray) {
    addElement(student.name,student.grade);
  }
}
window.onload = init;

let baseURL = 'http://localhost:3000';

/*part 2: async GET*/
fetch(baseURL + '/users')
  .then(promise => promise.json())
  .then(obj => {
    for (value of obj) {
      addElement(value.name, value.grade);
    }
  });


/*part 3: POST*/
document.getElementById('form').addEventListener('submit', (event) => {
  event.preventDefault();
  fetch(baseURL + '/users', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "name":event.srcElement[0].value,
        "grade":event.srcElement[1].value
    })
  }).then(r => r.json()).then(res => addElement(res.name, res.grade));
});


function addElement(name, grade) {
  tableBody.innerHTML += `<tr><td>${name}</td><td>${grade}</td></tr>`;
}
