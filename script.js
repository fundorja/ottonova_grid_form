const form = document.querySelector("form")
const submit = document.querySelector("#submit")
const timeslot = document.querySelector("#timeslot")
const nameField = document.querySelector("#name")
const emailField = document.querySelector("#email")
const radios = document.querySelectorAll(".radiobtn")
const radiolabels = document.querySelector(".gender-container")
const contact = document.querySelector("#contact")

// get info from dates.json file
const fetchDates = fetch("./dates.json")
fetchDates
  .then(response => {
    return response.json()
  })
  .then(times => {
    timeslot.innerHTML = timeMaps(times.result)
  })

// get every timeslot
function timeMaps(times) {
  let startzeit = times.map(slot => {
    // customize start date
    const startDate = new Date(slot.start)
    const startZeit = startDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
    const startDatum = startDate.toLocaleDateString([], {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    })
    const start = `${startDatum} von ${startZeit}`

    // customize end time
    const endZeit = new Date(slot.end).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })

    // add options into dropdown
    const dateTimes = `<option value="${slot.start}">${start} bis ${endZeit} Uhr</option>`
    return `<select>${dateTimes}</select>`
  })
  return startzeit
}

// Form validation
let formError = [false]

function checkName(e) {
  if (nameField.value.length == 0) {
    errorStyles(nameField)
    nameField.nextElementSibling.innerHTML = "Pflichtfeld"
  } else {
    nameField.previousElementSibling.style.color = "white"
    nameField.classList.remove("error")
    formError.push(false)
    nameField.nextElementSibling.innerHTML = ""
  }
}

// email check if empty
function checkMail(e) {
  if (emailField.value.length == 0) {
    errorStyles(emailField)
    emailField.nextElementSibling.innerHTML = "Pflichtfeld"
  } else {
    emailField.previousElementSibling.style.color = "white"
    emailField.classList.remove("error")
    formError.push(false)
    emailField.nextElementSibling.innerHTML = ""
  }
}
// email check if correct
function checkMailDetails(e) {
  if (emailField.value.length == 0) {
    errorStyles(emailField)
    emailField.nextElementSibling.innerHTML = "Pflichtfeld"
  } else if (/^(?=.*[@])/.test(emailField.value.toLowerCase()) == false) {
    errorStyles(emailField)
    emailField.nextElementSibling.innerHTML = "Das @ fehlt"
  } else if (
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      emailField.value.toLowerCase()
    ) == false
  ) {
    errorStyles(emailField)
    emailField.nextElementSibling.innerHTML = "Das ist keine gültige Emailadresse"
  } else {
    emailField.previousElementSibling.style.color = "white"
    emailField.nextElementSibling.innerHTML = ""
    emailField.classList.remove("error")
    formError.push(false)
  }
}

// check if radiobutton checked
function checkRadio(e) {
  const radiochecked = [...radios]
  if (radiochecked.some(radio => radio.checked)) {
    radiolabels.querySelector(".fake-label").style.color = "white"
    radiolabels.querySelector(".hint").innerHTML = ""
    radios.forEach(radio => {
      radio.nextElementSibling.classList.remove("error")
    })
    formError.push(false)
  } else {
    radiolabels.querySelector(".fake-label").style.color = "#cf1170"
    radiolabels.querySelector(".hint").innerHTML = "Pflichtfeld"
    radios.forEach(radio => {
      radio.nextElementSibling.classList.add("error")
    })
    formError.push(true)
  }
}

// check if checkbox checked
function checkContact(e) {
  if (contact.checked === false) {
    contact.parentElement.previousElementSibling.style.color = "#cf1170"
    contact.parentElement.nextElementSibling.innerHTML = "Pflichtfeld"
    contact.nextElementSibling.classList.add("error")
    formError.push(true)
  } else {
    contact.parentElement.previousElementSibling.style.color = "white"
    contact.parentElement.nextElementSibling.innerHTML = ""
    contact.nextElementSibling.classList.remove("error")
    formError.push(false)
  }
}

//error styles
function errorStyles(element) {
  element.previousElementSibling.style.color = "#cf1170"
  element.classList.add("error")
  formError.push(true)
}

// Eventlisteners
submit.addEventListener("click", e => {
  formError = []
  checkName()
  checkMail()
  checkMailDetails()
  checkRadio()
  checkContact()
  if (formError.some(err => err === true)) {
    e.preventDefault()
  }
  console.log(formError)
})
form.addEventListener("submit", e => {
  formError = []
  checkName()
  checkMail()
  checkMailDetails()
  checkRadio()
  checkContact()
  if (formError === true) {
    e.preventDefault()
  }
})
// name check if empty
nameField.addEventListener("focus", e => {
  checkName(e)
})
nameField.addEventListener("input", e => {
  checkName(e)
})
// email check
emailField.addEventListener("focus", e => {
  checkMail(e)
})
emailField.addEventListener("input", e => {
  checkMail(e)
})
// gender check
radios.forEach(radio => {
  radio.addEventListener("input", e => {
    checkRadio(e)
  })
})
// contact check
contact.addEventListener("input", e => {
  checkContact(e)
})
