const submit = document.querySelector("#submit")

// get info from dates.json file
const fetchDates = fetch("./dates.json")
fetchDates
  .then(response => {
    return response.json()
  })
  .then(times => {
    timeslot.innerHTML = timeMaps(times.result)
  })
