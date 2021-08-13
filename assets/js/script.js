var projects = [];
var projects_lang = [];
var projObj={};
const log=console.log;
var cssCount=[];
var jsCount=[];
var htmlCount=[];
var cssCount1=""
var jsCount1=""
var htmlCount1=""

$(document).ready(function () {
getApi();

function getApi() {
  // replace `octocat` with anyone else's GitHub username
  username = "mehdimahmud79";
  var requestUrl = `https://api.github.com/users/${username}/repos`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // log(data)
      for (var i = 0; i < data.length; i++) {
        // var proj_name = `${data[i].full_name.split("/")[1]}`;
        var proj_name = data[i].name;
        projectUrl = `https://mehdimahmud79.github.io/${proj_name}/`;

         projObj= {
          projectName: proj_name,
          gitHub_Url: `${data[i].owner.html_url}/${proj_name}`,
          description: data[i].description,
          project_Url: projectUrl,
          project_img: `https://github.com/MehdiMahmud79/${proj_name}/blob/main/assets/screen.gif?raw=true`,
          lang_url : data[i].languages_url,
          lang:{}
        };
        // log("project_img", projObj);
        projects.push(projObj)
      }

    });
}

setTimeout(function () {

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
    // console.log(data2);

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
    }).catch(e => console.log(e));

  })
  

}, 200);

setTimeout(function () {
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

  var mycard = `
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

log(cssCount)
log(jsCount)
log(htmlCount)

const reducer = (accumulator, currentValue) => accumulator + currentValue;

var cssavg= cssCount.reduce(reducer);
var jsavg= jsCount.reduce(reducer);
var htmlavg= htmlCount.reduce(reducer);
var sumLang=cssavg +jsavg+htmlavg;
log(sumLang)
 cssCount1=`${Math.round(cssavg / sumLang * 100)}`
 jsCount1=`${Math.round(jsavg / sumLang * 100)}`
 htmlCount1=`${Math.round(htmlavg / sumLang * 100)}`
}, 500); //wait 2 seconds

setTimeout(function () {
log('hh',cssCount1,jsCount1,htmlCount1)

$('#progressHTML').attr("style", `width: ${htmlCount1}%`)
$('#progressHTML span').text( `${htmlCount1}%`)
$('#progressCss').attr("style", `width: ${cssCount1}%`)
$('#progressCss span').text( `${cssCount1}%`)
$('#progressJs').attr("style", `width: ${jsCount1}%`)
$('#progressJs span').text( `${jsCount1}%`)

},700)

// log(cssCount, jsCount, htmlCount)

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
window.onload = function() {
	if(!window.location.hash) {
		window.location = window.location + '#loaded';
		window.location.reload();
	}
}