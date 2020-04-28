let form = document.forms[0];

form.addEventListener("submit", function(e){
  e.preventDefault();
  let description = document.querySelector('input[name="description"]').value;
  let location = document.querySelector('input[name="location"]').value;
  let full_time = document.querySelector('input[name="full_time"]').checked;
  full_time = full_time ? "on" : ""
  console.log(description, location, full_time)

  axios.get('https://still-spire-37210.herokuapp.com/positions.json', { params: { description: `${description}`, location: `${location}`, full_time: `${full_time}`  } })
    .then((res) => { console.table(res.data) })
    .catch((error) => { console.error(error) })

}, false)






