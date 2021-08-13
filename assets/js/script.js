var projects = [];
var projects_lang = [];
var projObj={};
const log=console.log;
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

 


        // fetch(lang_url)
        //   .then(function (response2) {
        //     return response2.json();
        //   })
        //   .then(function (data2) {
        //     console.log(data2);
        //     let sum1 = 0;
        //     let lanObj = { url: proj_name };
        //     if (data2.CSS) sum1 += data2.CSS;
        //     if (data2.HTML) sum1 += data2.HTML;
        //     if (data2.JavaScript) sum1 += data2.JavaScript;

        //     if (data2.CSS)
        //       lanObj.CSS = `${Math.round((data2.CSS / sum1) * 100)} %`;
        //     if (data2.HTML)
        //       lanObj.HTML = `${Math.round((data2.HTML / sum1) * 100)} %`;
        //     if (data2.JavaScript)
        //       lanObj.JavaScript = `${Math.round(
        //         (data2.JavaScript / sum1) * 100
        //       )} %`;
        //     projects_lang.push(lanObj);

        //     // if(data2.CSS)console.log(`CSS: ${projObj.CSS}`);
        //     // if(data2.HTML)console.log(`HTML: ${projObj.HTML}`);
        //     // if(data2.JavaScript)console.log(`JavaScript: ${projObj.JavaScript}`);
        //   });
      }
      
      // for (var i = 0; i < data.length; i++) {
      // //   var listItem = document.createElement('li');
      // //   listItem.textContent = data[i].html_url;
      // //   repoList.appendChild(listItem);
      // console.log(data[i].html_url)
      // }
    });
}
// function myFunction() {
//   var dots = document.getElementById("dots");
//   var moreText = document.getElementById("more");
//   var btnText = document.getElementById("myBtn");

//   if (dots.style.display === "none") {
//     dots.style.display = "inline";
//     btnText.innerHTML = "Read more";
//     moreText.style.display = "none";
//   } else {
//     dots.style.display = "none";
//     btnText.innerHTML = "Read less";
//     moreText.style.display = "inline";
//   }
// }
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
    if (data2.CSS) sum1 += data2.CSS;
    if (data2.HTML) sum1 += data2.HTML;
    if (data2.JavaScript) sum1 += data2.JavaScript;

    if (data2.CSS)
      lanObj.CSS = `${Math.round((data2.CSS / sum1) * 100)} %`;
    if (data2.HTML)
      lanObj.HTML = `${Math.round((data2.HTML / sum1) * 100)} %`;
    if (data2.JavaScript)
      lanObj.JavaScript = `${Math.round(
        (data2.JavaScript / sum1) * 100
      )} %`;

      project.lang=  lanObj;
      // projects.push(projObj);
// log(lanObj)
    // projects_lang.push(lanObj);
  }).catch(e => console.log(e));

  // projObj= {
  //   projectName: proj_name,
  //   gitHub_Url: `${data[i].owner.html_url}/${proj_name}`,
  //   description: data[i].description,
  //   project_Url: projectUrl,
  //   project_img: `https://github.com/MehdiMahmud79/${proj_name}/blob/main/assets/screen.gif?raw=true`,
  //   lang_url : data[i].languages_url,
  //   lang:{}
  // };

  var mycard = `
  <div class="col my-3 gradient-custom d-flex align-items-stretch card-container ">
  <div class="card border-warning m-2">
    <img src="${project.project_img}" class="card-img-top " alt="..."/>
    <div class="  bg-dark d-flex justify-content-around">
      <a type="button" href="${project.gitHub_Url}" class="text-info text-decoration-none"><i class="fab fa-github-alt"></i> Github</a>
      <a type="button" href="${project.description}" class="text-info text-decoration-none"><i class="fab fa-internet-explorer"></i> Live</a>
    </div>

    <div class="card-body">
      <h5 class="card-title">${project.projectName}</h5>
      <p class="card-text">${project.project_Url}</p>
    </div>
    <div class="progress m-2">
    <div class="progress-bar bg-success text-dark" role="progressbar" style="width: 60%" >60%</div>
    <div class="progress-bar bg-warning" role="progressbar" style="width: 50%" >50%</div>
    <div class="progress-bar bg-danger" role="progressbar" style="width: 30%">30%</div>
    </div>
  </div>

  
</div>

`;
  $(".project-fetched").append(mycard);
  })
        

  
 
  // console.log("projects lang", projects_lang);
  // console.log("projects", projects);
  // console.log("projects length", projects.length, projects_lang.length);
  // projects.forEach((item,index)=>{
  //     console.log(item,index);
  //     // item.pushed=projects_lang[index];

  // })

  //   var  mycard=`
  //   <div class="flex flex-grow items-stretch m-4 p-1 transform scale-110 filter active">
  //   <figure class="code-card ">
  //   <h2 class="card-header">${projects[0].projectName}</h2>
  //   <div class="catagories ">
  //   <p class="desc">${projects[0].description.slice(0,60)}<span id="dots">...</span><span id="more">${projects[0].description.slice(60,projects[0].description.length)}</span></p>

  //   <button class="readmore" id="myBtn" onclick="myFunction()">Read more</button>

  //   <div class="image">
  //           <p>
  //           <a href="${projects[0].projectUrl}" target="_blank">

  //           <img src="https://github.com/MehdiMahmud79/${projects[0].projectName}/blob/main/assets/screen.gif?raw=true" alt="horision website"></a>

  //           </p>
  //       </div>
  //       <div class="flex flex-col justify-around">
  //        <a  href="${projects[0].project_Url}"><i class="text-red-900 fab fa-internet-explorer"> </i>Deployed</a>
  //        <a href="${projects[0].gitHub_Url}"><i class="text-red-900 fab fa-github "></i>Git Hub</a>
  //       </div>

  //   </div>
  //   <div class="progress">
  //   <div class="progress-bar bg-warning text-dark" role="progressbar" style="width: 60%" >60%</div>
  //   <div class="progress-bar bg-success" role="progressbar" style="width: 50%" >50%</div>
  //   <div class="progress-bar bg-danger" role="progressbar" style="width: 30%">30%</div>
  // </div>
  // <p class="fs-6"> Javascript: 60%  CSS: 20% HTML: 10%  </p>
  // </figure>
  // </div>




}, 200); //wait 2 seconds
log(projects)

// function closemenue() {
//   var mybox = document.getElementById("menulist");
//   if (mybox.style.display == "none") {
//     mybox.style.display = "inline-block";
//   } else {
//     mybox.style.display = "none";
//   }
// }

$(document).ready(function () {
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
