let form = document.forms[0];

form.addEventListener("submit", function(e){
  e.preventDefault();
  document.querySelector('#job-pannel').innerHTML = "";
  let description = document.querySelector('input[name="description"]').value;
  let location = document.querySelector('input[name="location"]').value;
  let full_time = document.querySelector('input[name="full_time"]').checked;
  full_time = full_time ? "on" : ""  

  axios.get('https://still-spire-37210.herokuapp.com/positions.json', { params: { description: `${description}`, location: `${location}`, full_time: `${full_time}`  } })
    .then((res) => {     
      for(let i = 0; i < res.data.length; i++){
        document.querySelector('#job-pannel').innerHTML += addTemplate(res.data[i]);  
      }
     })

}, false)

function addTemplate(data){
  return `<tr>
  <td>
    <h4><a href="${data.url}"> ${data.title}</a></h4>
    <p class="source">
    <a class="company" href="${data.company_url}">${data.company}</a>
    –
    <strong class="fulltime">${data.type}</strong>
    </p>
  </td>
  <td class="meta">
    <span class="location">${data.location}</span>
  </td>
</tr>`;
  
}


