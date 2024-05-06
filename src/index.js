//Main Javascript file
//Controls the functionality of the Sidebar and calls for the display of pages

import "./style.css"
import {toDoCreator, toDoFormCreator, toDoFormRemover, tasksArray, formActive, addTaskToHtml, tasksPage} from "./tasks.js"

let tasks = []



tasksPage()

//Creates the sidebar functionality for color and title change. Also controls current page and its contents
const sidebar = document.querySelector(".sidebar")
const pageSelector = (()=>{
    
    //denotes which section is chosen on sidebar
    function buttonSelectorVisuals(button){
        const sidebarChildren = sidebar.getElementsByTagName("button");

        for(var i = 0; i<sidebarChildren.length; i++) {
            sidebarChildren[i].style.backgroundColor = "";
            sidebarChildren[i].classList.remove("contentTitleChosen")
        }

        button.style.backgroundColor = "rgb(236, 152, 152)"
        button.classList.add("contentTitleChosen")
    }

    //Denotes current page title on content area
    function tabTextChange(){

        const contentTitleChosen = document.querySelector(".contentTitleChosen")
        contentTitle.textContent = contentTitleChosen.textContent
        
    }

    //Chooses page content based on currently selected page
    function pageContent(){

        tabTextChange()

        if(contentTitle.textContent == "To-Do"){
            // tasksPage()

        }
        else if(contentTitle.textContent == "Habits"){

        }
        else{

        }
    }

    return{
        buttonSelectorVisuals,
        pageContent

    }
})()



//Sidebar buttons (This changes the look of the current tab and assigns which is the current tab)
const tasksButton = document.querySelector(".tasksButton")
tasksButton.addEventListener("click",()=>{
    pageSelector.buttonSelectorVisuals(tasksButton)
    pageSelector.pageContent()
})
tasksButton.style.backgroundColor = "rgb(236, 152, 152)"

const habitsButton = document.querySelector(".habitsButton")
habitsButton.addEventListener("click", ()=>{
    pageSelector.buttonSelectorVisuals(habitsButton)
    pageSelector.pageContent()

})    

const projectsButton = document.querySelector(".projectsButton")
projectsButton.addEventListener("click", ()=>{
    pageSelector.buttonSelectorVisuals(projectsButton)
    pageSelector.pageContent()

})


//Content current title appended to content
const contentTitle = document.querySelector(".contentTitle")
contentTitle.textContent = "To-Do"







