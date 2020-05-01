let form = document.forms[0];
let page = 1;
let nextPage = document.querySelector('.pagination-next');

window.onload = function() {
  getaxios()
};

form.addEventListener("submit", function(e){
  //阻止超連結送出去，暫停在原地
  e.preventDefault();
  document.querySelector('#job-pannel').innerHTML = "";  
  getaxios()
}, false)

nextPage.addEventListener("click", function(e){
  //防止事件冒泡
  e.stopPropagation();
  getaxios()
}, false)

function getaxios(){
  let description = form.elements.description.value;
  let location = form.elements.location.value;
  let full_time = form.elements.full_time.checked;
  full_time = full_time ? "on" : ""  

  axios.get('https://still-spire-37210.herokuapp.com/positions.json', { params: { description: `${description}`, location: `${location}`, full_time: `${full_time}`, page: `${page++}`} })
    .then((res) => {     
      console.log(res.data.length)
      for(let i = 0; i < res.data.length; i++){
        document.querySelector('#job-pannel').innerHTML += addTemplate(res.data[i]);        
      }
      if(res.data.length === 50 ){
        document.querySelector('.pagination-next').removeAttribute("disabled");
      }else if(res.data.length < 50 ){
          document.querySelector('.pagination-next').setAttribute("disabled", true);
          page = 1;
        }
    }) 
}


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


