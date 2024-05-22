//Creates projects 
//Controls project page and the assortment of projects

//Project Creator with tasks
//Project delete tasks
//View project contents
//Add Tasks in Project

import {addProjectSelectVisual} from "./index.js"
export {projectCreator, taskArrayLocation} 
export const projectArray = []
export let projectFormActive = false
const content = document.querySelector(".content")
let numProjects = 0

//Creates form to make projects
function projectCreator(){
    const projectForm = document.createElement("div")
    projectForm.id = "projectForm"

    const projectNameInput = document.createElement("input")
    projectNameInput.id = "projectNameInput"

    const projectCreateButton = document.createElement("button")
    projectCreateButton.textContent = "+"
    projectCreateButton.id = "projectCreateButton"
    projectCreateButton.addEventListener("click",(e)=>{

        e.stopImmediatePropagation()
        requireName()
    })

    projectForm.appendChild(projectCreateButton)
    projectForm.appendChild(projectNameInput)
    content.appendChild(projectForm)

}


//Requires name for project submission
function requireName(){

    const projectNameInput = document.getElementById("projectNameInput")
    if(projectNameInput.value == ""){
        projectNameInput.style.border = "solid 2px red"
    }
    else{
        projectNameInput.style.border = "none"
        let project = projectPlacing.projectContents(projectNameInput.value,numProjects)
        projectArray.push(project)
        projectPlacing.visibleProject()
        addProjectSelectVisual(projectArray[numProjects])
        ++numProjects 
    }
}

//Controls project creation and placing
const projectPlacing = (()=>{

    //Creates object with given project info
    function projectContents(name, num){

        let projectName = name
        let projectNum = num
        let projectPlaced = false
        let projectTasks = []

        return{
            projectName,
            projectPlaced,
            projectNum,
            projectTasks
        }
    }

    //Creates visible project under projects
    function visibleProject(){

        const projectDiv = document.querySelector(".projectDiv")
        for(let num = 0; num < projectArray.length; ++num){

            //Only creates project if it has not been placed
            let selectedProject = projectArray[num]
            if(selectedProject.projectPlaced == false){
                
                const project = document.createElement("button")
                
                project.classList.add("project")
                project.setAttribute("project-key", selectedProject.projectNum)

                const projectName = document.createElement("div")
                projectName.textContent = selectedProject.projectName

                project.appendChild(projectName)
                projectDiv.appendChild(project)

                projectViewing(selectedProject)
                selectedProject.projectPlaced = true
            }
        }   
    }

    return{
        visibleProject,
        projectContents
    }
})()


//Allows task within the project to be viewed by clearing away projects on screen
function projectViewing(project){ ///STILL NEEDS WORK

    const projects = document.querySelectorAll(".project")

    for(let num = 0; num < projectArray.length-1; ++num){

        if(projectArray[num].projectNum == project.projectNum){
            projects[num].addEventListener("click",()=>{
                
                displayProjectTasks.addTasks()
            })
        }
    }
}

//Decides which project task array the task goes into
function taskArrayLocation(task){
    
    const chosenProject = document.querySelector(".projectChosen")
    
    for(let projNum = 0; projNum < projectArray.length; ++projNum){
        if(chosenProject && (projectArray[projNum].projectNum == chosenProject.getAttribute("project-key"))){
            projectArray[projNum].projectTasks.push(task)
        }
    }
    
}



