'use strict'

$(init);

function init() {
    renderProjects()
}

function renderProjects() {
   const strHtml = `<a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
   <div class="portfolio-hover">
     <div class="portfolio-hover-content">
       <i class="fa fa-plus fa-3x"></i>
     </div>
   </div>
   <img class="img-fluid" src="img/portfolio/01-thumbnail.jpg" alt="">
 </a>
 <div class="portfolio-caption">
   <h4>Threads</h4>
   <p class="text-muted">Illustration</p>
 </div>
 `
    console.log(strHtml)
 $('.proj-list').html(strHtml)
}