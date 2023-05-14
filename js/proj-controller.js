'use strict';

$(init);

function init() {
  renderGameProjects();
  renderFrontProjects();
  renderEndToEndProjects();
}

$('.submit-btn').click(onSubmitForm);

function renderGameProjects() {

 const gameProjects = getProjsForDisplay().slice(0,3);
 const strHtmls = gameProjects.map(proj => {
    return `
    <div class="col-md-4 col-sm-6 portfolio-item">  
      <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onclick="onOpenModal('${proj.id}')">
        <div class="portfolio-hover">
           <div class="portfolio-hover-content">
               <i class="fa fa-plus fa-3x"></i>
         </div>
        </div>
          <img class="img-fluid img-proj" src="img/portfolio/${proj.id}.jpg" alt="${proj.title}">
       </a>
      <div class="portfolio-caption">
        <h4 class="text-light">${proj.projName}</h4>
        <p class="text-light">${proj.title}</p>
      </div>
     </div>
  `;
  });
  $('.game-list').html(strHtmls.join(''));
}

function renderFrontProjects() {

  const frontProjects = getProjsForDisplay().slice(3,6)
  const strHtmls = frontProjects.map(proj => {
     return `
     <div class="col-md-4 col-sm-6 portfolio-item">  
       <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onclick="onOpenModal('${proj.id}')">
         <div class="portfolio-hover">
            <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
          </div>
         </div>
           <img class="img-fluid img-proj" src="img/portfolio/${proj.id}.jpg" alt="${proj.title}">
        </a>
       <div class="portfolio-caption">
         <h4 class="text-light">${proj.projName}</h4>
         <p class="text-light">${proj.title}</p>
       </div>
      </div>
   `;
   });
   $('.front-list').html(strHtmls.join(''));
 }

 function renderEndToEndProjects() {

  const endToEndProjects = getProjsForDisplay().slice(6,9)
  const strHtmls = endToEndProjects.map(proj => {
     return `
     <div class="col-md-4 col-sm-6 portfolio-item">  
       <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onclick="onOpenModal('${proj.id}')">
         <div class="portfolio-hover">
            <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
          </div>
         </div>
           <img class="img-fluid img-proj" src="img/portfolio/${proj.id}.jpg" alt="${proj.title}">
        </a>
       <div class="portfolio-caption">
         <h4 class="text-light">${proj.projName}</h4>
         <p class="text-light">${proj.title}</p>
       </div>
      </div>
   `;
   });
   $('.end-to-end-list').html(strHtmls.join(''));
 }




function onOpenModal(projId) {

  var proj = getProjById(projId)
  // const categories = proj.labels

  // const categories = proj.labels.map(category => {
    
  // })

  
  const strHTML = `<h2>${proj.projName}</h2>
  <p class="item-intro text-muted">${proj.title}</p>
  <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.id}.jpg" alt="${proj.title}">
  <button class="btn btn-success m-3" onclick="window.open('${proj.url}')">OPEN PROJECT</button>
  <ul class="list-inline">
    <li>Categories: ${proj.labels.join(', ')}</li>
  </ul>
  <button class="btn btn-primary" data-dismiss="modal" type="button">
    <i class="fa fa-times"></i>
    Close Project</button>`

    $('.proj-modal').html(strHTML)
}


function onSubmitForm(ev) {
  ev.preventDefault();

  const subjectVal = $('#subject').val();
  const messageVal = $('#message').val();

  submitForm(subjectVal, messageVal)
  
}