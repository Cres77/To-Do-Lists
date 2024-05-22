//Main Javascript file
//Controls the functionality of the Sidebar and Contains the look of each page

import "./style.css"
import {toDoFormCreator, tasksArray, formActive, tasksOnContent} from "./tasks.js"
import {projectCreator} from "./projects.js"
export {addProjectSelectVisual}
const content = document.querySelector(".content")


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
        pageSelector.pageContent()
    }

    //denotes current project selection
    function projectSelectorVisuals(button){
        console.log("no")
        const projects = document.querySelectorAll(".project");

        //Removes the projectChosen class from all projects
        for(var i = 0; i<projects.length; i++) {
            projects[i].style.backgroundColor = "";
            projects[i].classList.remove("projectChosen")
        }
        
        //Gives projectChosen class and changes background of chosen project
        for(var num = 0; num < projects.length; ++num){
            if(projects[num].getAttribute("project-key") == button.getAttribute("project-key")){
                button.style.backgroundColor = "#FCA858"
                button.classList.add("projectChosen")
            }
        }

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

            visibleProjectBar()
            tasksPage.show()
            addProjectsButton.remove()
        }
        else if(contentTitle.textContent == "Habits"){//NOT ACTIVE YET

            // tasksPage.clear()
            // tasksOnContent.clearDisplay()
        }
        else if(contentTitle.textContent == "Projects"){

            visibleProjectBar()
            tasksOnContent.clearDisplay()
            tasksPage.clear() 
            addProjectsButton.add()
        }
    }

    //Hides projects when project page is not selected
    function visibleProjectBar(){
        if(contentTitle.textContent == "Projects"){
            document.querySelector(".projectDiv").style.visibility = "visible"
        }
        else{
            document.querySelector(".projectDiv").style.visibility = "hidden"
        }
    }

    return{
        buttonSelectorVisuals,
        pageContent,
        projectSelectorVisuals

    }
})()



//Sidebar buttons (This changes the look of the current tab and assigns which is the current tab)
const tasksButton = document.querySelector(".tasksButton")
tasksButton.addEventListener("click",()=>{

    pageSelector.buttonSelectorVisuals(tasksButton)
})
tasksButton.style.backgroundColor = "#FCA858"

const habitsButton = document.querySelector(".habitsButton")
habitsButton.addEventListener("click", ()=>{

    pageSelector.buttonSelectorVisuals(habitsButton)
})    

const projectsButton = document.querySelector(".projectsButton")
projectsButton.addEventListener("click", ()=>{

    pageSelector.buttonSelectorVisuals(projectsButton)
})

//Adds the ability to visibly see the selction of the current project
function addProjectSelectVisual(selectedProject){
    const projectButs = document.querySelectorAll(".project")

    for(let num = 0; num < projectButs.length; ++num){
        if(selectedProject.projectNum == projectButs[num].getAttribute("project-key")){

            projectButs[num].addEventListener("click", ()=>{
                pageSelector.projectSelectorVisuals(projectButs[num])
            }
            )
        }
    }
}

//Adds task page specific functionalities
const tasksPage = (()=>{
    
    //Shows content sorter and form button
    function show(){

        if(!document.querySelector(".contentSorter") && !document.querySelector(".formButton")){
            tasksSorters()
            taskFormButton()
            tasksOnContent.showDisplay()
        }
    }

    //Clears content sorter and form button
    function clear(){

        if(document.querySelector(".contentSorter") && document.querySelector(".formButton")){
            document.querySelector(".contentSorter").remove()
            document.querySelector(".formButton").remove()
        }
    }

    return{
        show,
        clear
    }
})()

//Controls whether projects page content is visible
const addProjectsButton = (()=>{

    //Shows content sorter and form button
    function add(){
        if(!document.getElementById("projectForm")){
            
            projectCreator()    
        }
    }

    //Clears project form 
    function remove(){

        if(document.getElementById("projectForm")){
            const projectForm = document.getElementById("projectForm")
            projectForm.remove()
        }
        
    }
    return{
        add,
        remove
    }
})()

//Creates form button for making new tasks
function taskFormButton(){

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

//Calls all starting page content(To-Do list page)
tasksPage.show()
const contentTitle = document.querySelector(".contentTitle")
contentTitle.textContent = "To-Do"
