const submit = document.querySelector("#submit")
const timeslot = document.querySelector("#timeslot")
const radiobuttons = document.querySelectorAll(".datiobtn")
const radiolabels = document.querySelectorAll(".gender-select")

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

submit.addEventListener("click", e => {
  e.preventDefault()
  console.log(e)
})

function valFunction() {
  var name, email, text

  name = document.getElementById("name")
  pwd = document.getElementById("password")
  cpwd = document.getElementById("cpassword")
  email = document.getElementById("email")

  if (name.value.length > 26) {
    text = "Das ist vielleicht zu lang!"
  } else if (name.value.length >= 10 && name.value.length <= 16) {
    text = "Okay..."
  } else if (name.value.length >= 3 && name.value.length < 10) {
    text = "Schöner Name!"
  } else if (name.value.length < 3 && name.value.length > 0) {
    text = "Zu kurz!"
  } else if (name.value.length == 0) {
    text = "Pflichtfeld"
  } else {
    text = ""
  }
  name.nextElementSibling.innerHTML = text

  if (email.value.length == 0) {
    text = "Pflichtfeld"
  } else if (email.value.length > 0 && email.value.length < 9) {
    text = "..."
  } else if (/^(?=.*[@])/.test(email.value.toLowerCase()) == false) {
    text = "Wo ist das @?"
  } else if (
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email.value.toLowerCase()
    ) == false
  ) {
    text = "Das ist keine gültige Email!"
  } else {
    text = ""
  }
  email.nextElementSibling.innerHTML = text
}
