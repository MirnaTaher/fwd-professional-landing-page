//global variables
// const sections = document.getElementsByTagName("section");
let sections = document.querySelectorAll("section");
const nav = document.getElementById("navbar__list");
let navbar__items = nav.getElementsByTagName("li");
let anchors= document.getElementsByTagName("a")
let id = "section1";

//creating a fragment of navbar list
//making a li element and inside it an anchor element to link it to the corresponding section
let liFragment = document.createDocumentFragment();
for (let section of sections) {
  let li = document.createElement("li");
  let a = document.createElement("a");
  a.innerText = section.getAttribute("data-nav");
  a.setAttribute("active", false);
  a.setAttribute("href", `#${section.getAttribute("id")}`);
  li.addEventListener("click", addActiveClass);
  li.appendChild(a);
  liFragment.appendChild(li);
}
nav.appendChild(liFragment);

//event listener functions

//when we click on navbar items
//first we remove the state active from all navbar items then we added it to the one we just clicked
//we also remove the "your-active-class" from all sections then we added to the one linked to the ancor we clicked on
function addActiveClass() {
  for (let item of navbar__items) {
    item.getElementsByTagName("a")[0].setAttribute("active", false);
    document
      .querySelector(
        `${item.getElementsByTagName("a")[0].getAttribute("href")}`
      )
      .classList.remove("your-active-class");
  }
  this.getElementsByTagName("a")[0].setAttribute("active", true);
  document
    .querySelector(`${this.getElementsByTagName("a")[0].getAttribute("href")}`)
    .classList.add("your-active-class");
}
//adding scrollIntoView
for(let anchor of anchors){
  anchor.addEventListener("click", smoothScroll)
}
function smoothScroll(e){
  e.preventDefault()
  let id= e.target.getAttribute("href")
  document.querySelector(id).scrollIntoView({ 
    behavior: 'smooth' 
  })
}

//changing which section is highlighted when scrolling and the corresponding
//nav anchor as well
document.addEventListener("scroll", function (e) {
  // let ids=[];
  for (let section of sections) {
    if (elementInViewport2(section)) {
      //there could be more than one section in viewport, so we push the id to the array
      //so that we highlight the first one
      // ids.push(section.getAttribute("id"))
      id = section.getAttribute("id");
    }
    //removing previous styling
    for (let item of navbar__items) {
      item.getElementsByTagName("a")[0].setAttribute("active", false);
      document
        .querySelector(
          `${item.getElementsByTagName("a")[0].getAttribute("href")}`
        )
        .classList.remove("your-active-class");
      if (item.getElementsByTagName("a")[0].getAttribute("href") == `#${id}`) {
        item.getElementsByTagName("a")[0].setAttribute("active", true);
      }
    }

    //section highlight
    document.getElementById(id).classList.add("your-active-class");
    //navbar anchor highlight
    // console.log(document.querySelectorAll(`[href=${id}]`));
  }
});

//helper functions

//function to check if the element passed to it is in viewport or not
function elementInViewport2(el) {
  let sectionTop = el.getBoundingClientRect().top;
  let sectionBottom = el.getBoundingClientRect().bottom;
  if (sectionTop <= 60 && sectionBottom > 60) {
    return true;
  } else {
    return false;
  }
}
