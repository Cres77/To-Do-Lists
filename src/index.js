import "./style.css"
import {toDoCreator, toDoFormCreator, toDoFormRemover, tasksArray, formActive, addTaskToHtml} from "./today.js"

let tasks = []

const sidebar = document.querySelector(".sidebar")
const pageSelector = (()=>{
    function buttonSelectorVisuals(button){
        const sidebarChildren = sidebar.getElementsByTagName("button");
            for(var i=0; i<sidebarChildren.length; i++) {
                sidebarChildren[i].style.backgroundColor = "";
                sidebarChildren[i].classList.remove("contentTitleChosen")
            }
        button.style.backgroundColor = "rgb(236, 152, 152)"
        button.classList.add("contentTitleChosen")
    }

    function tabChange(){
        const contentTitleChosen = document.querySelector(".contentTitleChosen")
        contentTitle.textContent = contentTitleChosen.textContent
    }
    return{
        buttonSelectorVisuals,
        tabChange
    }
})()



const todayButton = document.querySelector(".todayButton")
    todayButton.addEventListener("click",()=>{
        pageSelector.buttonSelectorVisuals(todayButton)
        pageSelector.tabChange()
    })
    todayButton.style.backgroundColor = "rgb(236, 152, 152)"

const upcomingButton = document.querySelector(".upcomingButton")
    upcomingButton.addEventListener("click", ()=>{
        pageSelector.buttonSelectorVisuals(upcomingButton)
        pageSelector.tabChange()
    })

const accomplishedButton = document.querySelector(".accomplishedButton")
    accomplishedButton.addEventListener("click", ()=>{
        pageSelector.buttonSelectorVisuals(accomplishedButton)
        pageSelector.tabChange()
    })    

const projectsButton = document.querySelector(".projectsButton")
    projectsButton.addEventListener("click", ()=>{
        pageSelector.buttonSelectorVisuals(projectsButton)
        pageSelector.tabChange()
    })




const content = document.querySelector(".content")

const contentSorter = document.createElement("div")
contentSorter.classList.add("contentSorter")

    const prioritySort = document.createElement("button")
    const priorityImg = document.createElement("img")
    priorityImg.setAttribute("src","https://seekicon.com/free-icon-download/list-stars_1.svg")

    const alphabeticallySort = document.createElement("button")
    const alphabeticallyImg = document.createElement("img")
    alphabeticallyImg.setAttribute("src","https://seekicon.com/free-icon-download/ordered-list_3.svg")

    const oldestSort = document.createElement("button")
    const oldestImg = document.createElement("img")
    oldestImg.setAttribute("src","https://static-00.iconduck.com/assets.00/sort-calendar-descending-icon-512x402-bgm72yjs.png")
    //const oldestSort = document.createElement("button")

prioritySort.appendChild(priorityImg)
alphabeticallySort.appendChild(alphabeticallyImg)
oldestSort.appendChild(oldestImg)

contentSorter.appendChild(prioritySort)
contentSorter.appendChild(alphabeticallySort)
contentSorter.appendChild(oldestSort)

const formButton = document.createElement("button")
formButton.textContent = "+"
formButton.classList.add("formButton")

formButton.addEventListener("click",()=>{
    if(formActive==true){
        return
    }
    else{
        toDoFormCreator()
               
    }    
})




content.appendChild(formButton)
const contentTitle = document.querySelector(".contentTitle")
contentTitle.textContent = "Today"

content.appendChild(contentSorter)





