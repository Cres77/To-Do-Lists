//Main Javascript file
//Controls the functionality of the Sidebar and Contains the look of each page

import "./style.css"
import {toDoFormCreator, tasksArray, formActive, tasksOnContent} from "./tasks.js"
const content = document.querySelector(".content")

//Calls all starting page content(To-Do list page)
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

        button.style.backgroundColor = "#FCA858"
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
            tasksPage()

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
tasksButton.style.backgroundColor = "#FCA858"

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



//Adds task page specific functionalities
function tasksPage(){

    tasksSorters()
    formButton()

}

//Creates Tasks sorters and contains their functionalities
function tasksSorters(){

    //Sorts tasks based off selection
    const contentSorter = document.createElement("div")
    contentSorter.classList.add("contentSorter")

    //Sorts by priority
    const prioritySort = document.createElement("button")
    const priorityImg = document.createElement("img")
    priorityImg.setAttribute("src","https://seekicon.com/free-icon-download/list-stars_1.svg")
    // prioritySort.addEventListener("click", sortingLogic.prioritySort)

    //Sorts alphabetically
    const alphabeticallySort = document.createElement("button")
    const alphabeticallyImg = document.createElement("img")
    alphabeticallyImg.setAttribute("src","https://seekicon.com/free-icon-download/ordered-list_3.svg")
    // alphabeticallySort.addEventListener("click", tasksOnContent.showDisplay)

    //Sorts by oldest
    const oldestSort = document.createElement("button")
    const oldestImg = document.createElement("img")
    oldestImg.setAttribute("src","https://static-00.iconduck.com/assets.00/sort-calendar-descending-icon-512x402-bgm72yjs.png")

    prioritySort.appendChild(priorityImg)
    alphabeticallySort.appendChild(alphabeticallyImg)
    oldestSort.appendChild(oldestImg)

    contentSorter.appendChild(prioritySort)
    contentSorter.appendChild(alphabeticallySort)
    contentSorter.appendChild(oldestSort)

    content.appendChild(contentSorter)
}

//////////////NOT YET WORKING/////////////////
//Sorts each task based on their respective sorting
const sortingLogic = (()=>{ 

    //Sorts based off of priority
    function prioritySort(){
        return;

        tasksOnContent.clearDisplay()
        
        //Places all high Priority tasks 
        for(let num = 0; num < tasksArray.length; ++num){

            if(tasksArray[num].taskPriority == "High" && tasksArray[num].taskPlaced == false){
                
                taskCreation(tasksArray[num])
            }
        }        
        
        //Places all high Priority tasks 
        for(let num = 0; num < tasksArray.length; ++num){

            if(tasksArray[num].taskPriority == "Medium" && tasksArray[num].taskPlaced == false){
                
                taskCreation(tasksArray[num])
            }
        }

        //Places all high Priority tasks 
        for(let num = 0; num < tasksArray.length; ++num){

            if(tasksArray[num].taskPriority == "Low" && tasksArray[num].taskPlaced == false){
                
                taskCreation(tasksArray[num])
            }
        }

    }

    return{
        prioritySort,
    }

})()
//////////////NOT YET WORKING/////////////////

//Creates form button for making new tasks
function formButton(){

    const formButton = document.createElement("button")
    formButton.textContent = "+"
    formButton.classList.add("formButton")

    //Determines if a form is active when button is clicked
    formButton.addEventListener("click",()=>{

        if(formActive==true) {

            return
        }
        else {

            toDoFormCreator()
        }    
    })

    content.appendChild(formButton)
}

