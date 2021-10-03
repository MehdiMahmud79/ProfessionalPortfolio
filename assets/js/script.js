var projects = [];

const log = console.log;
var owner = "MehdiMahmud79";
const projectsUrl = `https://api.github.com/users/${owner}/repos`;

const fetchApi = async (url) => {
  try {
    let data = await fetch(url);
    data = await data.json();
    return data;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

const portfolioMaker = async (projectsUrl) => {
  const Data = await fetchApi(projectsUrl);
  projectsData = Data.sort((a, b) =>
    a.created_at < b.created_at ? 1 : b.created_at < a.created_at ? -1 : 0
  );
  // log("Your projects on Gitgub were \n", projectsData);
  projects = await projectsData.map(
    async ({
      name: projectName,
      owner,
      description,
      languages_url,
      homepage,
    }) => {
      if (!homepage)
        homepage = `https://${owner.login}.github.io/${projectName}/`;
      const gitHub_Url = `${owner.html_url}/${projectName}`;
      const project_img = `https://github.com/${owner.login}/${projectName}/blob/main/assets/screen.gif?raw=true`;

      const languages = await fetchApi(languages_url);

      return {
        projectName,
        gitHub_Url,
        homepage,
        description,
        project_img,
        languages,
      };
    }
  );

  projects = await Promise.all(projects);
  var totalSum = { JavaScript: 0, CSS: 0, Handlebars: 0, HTML: 0 };
  projects.map(({ languages }, index) => {
    let sum = 0;

    for (var i in languages) {
      if (i != "Shell") sum += languages[i];
      if (totalSum.hasOwnProperty(i)) totalSum[i] += languages[i];
    }
    for (var i in languages) {
      languages[i] = [languages[i], Math.round((languages[i] / sum) * 100)];
    }
  });
  log("Your projects data including language percent are  \n", projects);
  var allLanguages = 0;
  for (var i in totalSum) {
    allLanguages += totalSum[i];
  }
  for (var i in totalSum) {
    totalSum[i] = [totalSum[i], Math.round((totalSum[i] / allLanguages) * 100)];
  }

  // log(totalSum);

  generateProgressBars(totalSum);
  let favProject = projects.slice(0, 4);
  let oldProjects = projects.slice(4);
  creatCarousel(favProject);
  creatCards(oldProjects);
};

function generateProgressBars(totalSum) {
  //  to update the width of th eprogress bars
  $("#progressHTML").attr("style", `width: ${totalSum.HTML[1]}%`);
  $("#progressHTML span").text(`${totalSum.HTML[1]}%`);

  $("#progressCss").attr("style", `width: ${totalSum.CSS[1]}%`);
  $("#progressCss span").text(`${totalSum.CSS[1]}%`);

  $("#progressJs").attr("style", `width: ${totalSum.JavaScript[1]}%`);
  $("#progressJs span").text(`${totalSum.JavaScript[1]}%`);

  $("#progressHbs").attr("style", `width: ${totalSum.Handlebars[1]}%`);
  $("#progressHbs span").text(`${totalSum.Handlebars[1]}%`);

  localStorage.setItem(projects, JSON.stringify(projects));
}
// Creat cards and append it to the index page
function creatCards(oldProjects) {
  $(".project-fetched").empty();

  oldProjects.forEach((project, index) => {
    var css = "";
    var js = "";
    var html = "";
    var hbs = "";
    if (project.languages.HTML)
      html = `<div class="progress-bar bg-green-200 text-green-900" role="progressbar" style="width:${project.languages.HTML[1]}%">${project.languages.HTML[1]}%</div>`;
    if (project.languages.CSS)
      css = `<div class="progress-bar bg-red-200 text-red-900" role="progressbar" style="width:${project.languages.CSS[1]}%">${project.languages.CSS[1]}%</div>`;
    if (project.languages.JavaScript)
      js = `<div class="progress-bar bg-yellow-200 text-yellow-900" role="progressbar" style="width:${project.languages.JavaScript[1]}%">${project.languages.JavaScript[1]}%</div>`;
    if (project.languages.Handlebars)
      hbs = `<div class="progress-bar bg-purple-200 text-purple-900" role="progressbar" style="width:${project.languages.Handlebars[1]}%">${project.languages.Handlebars[1]}%</div>`;

    let mycard = `
    <div class="col-3 m-3  d-flex   align-items-stretch img-thumbnail shadow-lg bg-gray-100">
    <div class="  m-1">
      <img src="${project.project_img}" class="card-img-top " alt="project image "/>

      <div class="  bg-light d-flex justify-content-around">
        <a type="button" href="${project.gitHub_Url}" class="text-info text-decoration-none"><i class="fab fa-github-alt"></i> Github</a>
        <a type="button" href="${project.project_Url}" class="text-info text-decoration-none"><i class="fab fa-internet-explorer"></i> Live</a>
      </div>

      <div class="card-body">
        <h5 class="card-title">${project.projectName}</h5>
        <small class="card-text">${project.description}</small>
      </div>
      <div class="progress m-2 ">
      ${html}
      ${js}
      ${css}
      ${hbs}
      </div>
     <small class=" bg-gray-900 rounded-bottom text-center" ><span class="text-green-400">🟢HTML-</span><span class="text-red-400">🟠CSS-</span><span class="text-yellow-400">🟡JS-</span><span class="text-purple-400">🟣HBS</span></small>

    </div>

  </div>

  `;

    $(".project-fetched").append(mycard);
  });
}

portfolioMaker(projectsUrl);

var typed = new Typed(".skillTitle span", {
  strings: ["Web Developer...✔️", "Problem Solver...✔️", "Programmer...✔️"],
  typeSpeed: 60,
  backSpeed: 60,
  loop: true,
});

function creatCarousel(favProject) {
  favProject.forEach((project, index) => {
    if (index == 0) {
      $(".carousel-indicators").append(
        `<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>`
      );

      mycard = `

       <div class="carousel-item active">
       <div class="text-center my-1"> <h5 class="display-5  text-red-900 ">${project.projectName.toUpperCase()}</h5></div>

      <div class="d-flex align-items-center mx-5">
         <div class="mx-4">
             <img src="${
               project.project_img
             }" style="width:400px" alt="project image">
        </div
        <div class="">
           
            <h3 class="text-gray-500 ">${project.description}</h3>
        </div>
      </div>
    </div>
  `;

      $(".carousel-inner").append(mycard);
    } else if (index < 3) {
      $(".carousel-indicators").append(
        `<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${index}$" aria-current="true" aria-label="Slide  ${
          index + 1
        }"></button>`
      );

      mycard = `

       <div class="carousel-item ">
       <div class="text-center  my-1"> <h5 class="display-5 text-red-900 ">${project.projectName.toUpperCase()}</h5></div>

      <div class="d-flex align-items-center mx-5">
         <div class="mx-4">
             <img src="${
               project.project_img
             }" style="width:400px" alt="project image">
        </div
        <div class="">
           
            <h3 class="text-gray-500 ">${project.description}</h3>
        </div>
      </div>
    </div>
  `;

      $(".carousel-inner").append(mycard);
    }
  });
}
var typed = new Typed(".Myskills", {
  strings: [
    "HTML",
    "JavaScript",
    "JQuery",
    "MySQL",
    "Sequelize ORM",
    "Handlebars MVC",
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
