var projects = SavedProjects;
const log=console.log;
var cssCount=[];
var jsCount=[];
var htmlCount=[];
var cssCount1="";
var jsCount1="";
var htmlCount1="";
var owner = 'MehdiMahmud79';
var cssavg=0;
var jsavg=0;
var htmlavg=0;
var sumLang=0;
class project {
  constructor(projectName, gitHub_Url, project_Url, description,project_img,lang_url,commitCount,lang) {
    this.projectName = projectName;
    this.gitHub_Url = gitHub_Url;
    this.project_Url = project_Url;
    this.description = description;
    this.project_img = project_img;
    this.lang_url = lang_url;
    this.commitCount = commitCount;
    this.lang = lang;
  }
}
$(document).ready(function () {

getApi();

function getApi() {
  // replace `octocat` with anyone else's GitHub username
  var requestUrl = `https://api.github.com/users/${owner}/repos`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // cleaar saved projects to update it with the Githun Api
      projects=[];
      // this is just to update the id for recreated reposotory 
      data.find(obj => obj.name === "SimplePortfolio").id-= 15000000
      // sort the reposotories according to created date
      data.sort((a, b) => (a.id > b.id ? -1 : 1));
      data.forEach(proj=>{
        let projectName = proj.name;
        let project_Url = `https://${owner}.github.io/${projectName}/`;
        let  gitHub_Url= `${proj.owner.html_url}/${projectName}`;
        let  description= proj.description;
        let project_img=`https://github.com/${owner}/${projectName}/blob/main/assets/screen.gif?raw=true`;
        let lang_url = proj.languages_url;
        let lang={};
        let commitCount=0;// this can be generetaed from get_all_commits_count(owner, repo, sha) in the commit.js

        let projectObj= new project (projectName, gitHub_Url, project_Url, description, project_img, lang_url, commitCount, lang);
        projects.push(projectObj);
      })
      setTimeout( getLanguage() ,500);

    })
    .catch(err=>{
      creatCards() //initilize cards with the saved projects

      log('API error',err);
    });
}

// a function to make an Api request to Github to get the used languages in a project
function getLanguage(){

    projects.forEach(project=>{
  
    const lang_url =project.lang_url;
    async function myFetch() {
      let response = await fetch(lang_url);
      if (!response.ok) {
        throw new Error(`HTTP error for the language request! status: ${response.status}`);
      }
      return await response.json();
    
    }
    myFetch().then((data2) => {
 
      let sum1 = 0;
      let lanObj = {};
      if (data2.CSS) {sum1 += data2.CSS; cssCount.push(data2.CSS)};
      if (data2.HTML) {sum1 += data2.HTML; htmlCount.push(data2.HTML)};
      if (data2.JavaScript) {sum1 += data2.JavaScript; jsCount.push(data2.JavaScript)};
  
      if (data2.CSS)
        lanObj.CSS = `${Math.round((data2.CSS / sum1) * 100)}`;
      if (data2.HTML)
        lanObj.HTML = `${Math.round((data2.HTML / sum1) * 100)}`;
      if (data2.JavaScript)
        lanObj.JavaScript = `${Math.round(
          (data2.JavaScript / sum1) * 100)}`;
  
        project.lang=  lanObj;
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
  
        cssavg= cssCount.reduce(reducer);
        jsavg= jsCount.reduce(reducer);
        htmlavg= htmlCount.reduce(reducer);
        sumLang=cssavg +jsavg+htmlavg;
      }).catch(e => console.log(e));
  
    })
    
    setTimeout(creatCards, 1000); //wait 2 seconds

}

// Creat cards and append it to the index page
function creatCards() {
  $(".project-fetched").empty();
  projects.forEach(project => {
  
    var css=''
    var js=''
    var html=''
  // change the width of the progress bar to  make it visible for small values
    let htmlWidth=project.lang.HTML;
    if(htmlWidth<=20)htmlWidth=20;
    let cssWidth= project.lang.CSS;
    if(cssWidth<=20)cssWidth=20;
    let jsWidth= project.lang.JavaScript;
    if(jsWidth<=20)jsWidth=20; 
  
    if(project.lang.HTML) html=`<div class="progress-bar bg-success text-dark" role="progressbar" style="width:${htmlWidth}%"> HTML: ${project.lang.HTML}%</div>`;
    if(project.lang.JavaScript) js=`<div class="progress-bar bg-warning text-dark" role="progressbar" style="width:${jsWidth}%">Js: ${project.lang.JavaScript}%</div>`;
    if(project.lang.CSS) css=`<div class="progress-bar bg-danger text-dark" role="progressbar" style="width:${cssWidth}%">CSS: ${project.lang.CSS}%</div>`;
   
  
  
    let mycard = `
    <div class="col my-2 gradient-custom d-flex align-items-stretch card-container ">
    <div class="card border-warning m-2">
      <img src="${project.project_img}" class="card-img-top " alt="..."/>
  
      <div class="  bg-light d-flex justify-content-around">
        <a type="button" href="${project.gitHub_Url}" class="text-info text-decoration-none"><i class="fab fa-github-alt"></i> Github</a>
        <a type="button" href="${project.project_Url}" class="text-info text-decoration-none"><i class="fab fa-internet-explorer"></i> Live</a>
      </div>
  
      <div class="card-body">
        <h5 class="card-title">${project.projectName}</h5>
        <p class="card-text">${project.description}</p>
      </div>
      <div class="progress m-2 ">
      ${html}
      ${js}
      ${css}
      </div>
    </div>
    
  </div>
  
  `;
    $(".project-fetched").append(mycard);
  });
  
  // to find the percentage of the used languages

   cssCount1=`${Math.round(cssavg / sumLang * 100)}`
   jsCount1=`${Math.round(jsavg / sumLang * 100)}`
   htmlCount1=`${Math.round(htmlavg / sumLang * 100)}`

  setTimeout( generateProgressBars(),1500);
  

  }

//  creat Skills progressbar cards after 1.5 second

  function generateProgressBars() {

    //  to update the width of th eprogress bars
  $('#progressHTML').attr("style", `width: ${htmlCount1}%`)
  $('#progressHTML span').text( `${htmlCount1}%`)
  $('#progressCss').attr("style", `width: ${cssCount1}%`)
  $('#progressCss span').text( `${cssCount1}%`)
  $('#progressJs').attr("style", `width: ${jsCount1}%`)
  $('#progressJs span').text( `${jsCount1}%`)

  localStorage.setItem(projects, JSON.stringify(projects));

  } 

  // typing text animation script

  var typed = new Typed(".skillTitle span", {
    strings: ["WebDeveloper.", "WebDeveloper."],
    typeSpeed: 60,
    backSpeed: 60,
    loop: true,
  });

  var typed = new Typed(".Myskills", {
    strings: [
      "HTML",
      "JavaScript",
      "JQuery",
      "NodeJs",
      "Express", 
      "Git",           
      "CSS",
      "BootStrap",
      "Git",
      "Fortran",
      "Visual Basic",
      "Microsoft office",
      "Matlab",
      "Adobe Premier",

    ],
    typeSpeed: 50,
    backSpeed: 50,
    loop: true,
  });
});



    
    