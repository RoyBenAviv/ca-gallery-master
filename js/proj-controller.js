'use strict';

$(init);

function init() {
  renderProjects();
}

function renderProjects() {

 const projects = getProjsForDisplay();
console.log(projects)
 const strHtmls = projects.map(proj => {
    return `
    <div class="col-md-4 col-sm-6 portfolio-item">  
      <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onclick="onOpenModal('${proj.id}')">
        <div class="portfolio-hover">
           <div class="portfolio-hover-content">
               <i class="fa fa-plus fa-3x"></i>
         </div>
        </div>
          <img class="img-fluid" src="img/portfolio/${proj.id}.jpg" alt="${proj.title}">
       </a>
      <div class="portfolio-caption">
        <h4>${proj.projName}</h4>
        <p class="text-muted">${proj.title}</p>
      </div>
     </div>
  `;
  });
  $('.proj-list').html(strHtmls.join(''));
}


function onOpenModal(projId) {

  var proj = getProjById(projId)
  console.log(proj)
  const strHTML = `<h2>${proj.projName}</h2>
  <p class="item-intro text-muted">${proj.title}</p>
  <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.id}.jpg" alt="${proj.title}">
  <p>${proj.desc}</p>
  <ul class="list-inline">
    <button onclick="window.open('${proj.url}')">CLICK HERE TO OPEN THE PROJECT</button>
    <li>Created At: ${proj.publishedAt}</li>
    <li>Category: Illustration</li>
  </ul>
  <button class="btn btn-primary" data-dismiss="modal" type="button">
    <i class="fa fa-times"></i>
    Close Project</button>`

    $('.proj-modal').html(strHTML)
}



//             <!-- Project Details Go Here -->
//             <h2>Project Name</h2>
//             <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
//             <img class="img-fluid d-block mx-auto" src="img/portfolio/01-full.jpg" alt="">
//             <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est
//               blanditiis
//               dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae
//               cupiditate,
//               maiores repudiandae, nostrum, reiciendis facere nemo!</p>
//             <ul class="list-inline">
//               <li>Date: January 2017</li>
//               <li>Client: Threads</li>
//               <li>Category: Illustration</li>
//             </ul>
//             <button class="btn btn-primary" data-dismiss="modal" type="button">
//               <i class="fa fa-times"></i>
//               Close Project</button>
