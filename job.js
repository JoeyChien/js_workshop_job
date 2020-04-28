let form = document.forms[0];
let page = 2;
let nextPage = document.querySelector('.pagination-next');
let description = form.elements.description.value;
let location = form.elements.location.value;
let full_time = form.elements.full_time.checked;


form.addEventListener("submit", function(e){
  e.preventDefault();
  document.querySelector('#job-pannel').innerHTML = "";  
  full_time = full_time ? "on" : ""  

  axios.get('https://still-spire-37210.herokuapp.com/positions.json', { params: { description: `${description}`, location: `${location}`, full_time: `${full_time}`  } })
    .then((res) => {     
      for(let i = 0; i < res.data.length; i++){
        document.querySelector('#job-pannel').innerHTML += addTemplate(res.data[i]);        
      }
      if(res.data.length == 50 ){
        document.querySelector('.pagination-next').removeAttribute('disabled');
      } 
    }) 
  }, false)

nextPage.addEventListener("click", function(e){
  e.preventDefault();
  axios.get('https://still-spire-37210.herokuapp.com/positions.json', { params: { description: `${description}`, location: `${location}`, full_time: `${full_time}`,page: `${page++}`} })
    .then((res) => {     
      for(let i = 0; i < res.data.length; i++){
        document.querySelector('#job-pannel').innerHTML += addTemplate(res.data[i]);        
      }
      if(res.data.length == 50 ){
        document.querySelector('.pagination-next').removeAttribute('disabled');
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


