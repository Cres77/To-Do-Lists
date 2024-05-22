//Creates tasks
//Controls the tasks on To-Do
import { addYears, formatWithOptions } from "date-fns/fp";
import { taskArrayLocation} from "./projects.js"
export {toDoFormCreator, tasksOnContent}
export const tasksArray = []
export let formActive = false
let inView = false
let numTasks = 0
const content = document.querySelector(".content")

//Form Creator 
function toDoFormCreator(){
    formActive = true

    //Create Form
    const toDoForm = document.createElement("form")
    toDoForm.classList.add("toDoForm")

    //Name Field
    const nameDiv = document.createElement("fieldset")
    const taskNameLabel = document.createElement("label")
    taskNameLabel.textContent = "Task"
    taskNameLabel.color = "#B87333"
    //Name input
    const taskNameInput = document.createElement("input")
    taskNameInput.classList.add("taskName")

    //Desc Field
    const descDiv = document.createElement("fieldset")
    const taskDescLabel = document.createElement("label")
    taskDescLabel.textContent = "Description"
    taskDescLabel.color = "#B87333"
    //Desc input
    const taskDescInput = document.createElement("textArea")
    taskDescInput.style.height = "100px"
    taskDescInput.classList.add("taskDesc")

    //Priority & Date
    const prio_date = document.createElement("div")

    const prioDiv = document.createElement("div")
    prioDiv.id = "prioDiv"

    const prioTitle = document.createElement("h2")
    prioTitle.textContent = "Task Priority"

    const high = document.createElement("button")
    high.id = "high"
    high.textContent = "High"
    
    const medium = document.createElement("button")
    medium.id = "medium"
    medium.textContent = "Med"

    const low = document.createElement("button")
    low.id = "low"
    low.classList.add("chosenPriority")
    low.textContent = "Low"

    //Submit and Discard buttons
    const submit = document.createElement("button")
    submit.id = "submit"
    submit.textContent = "Submit"
    submit.addEventListener("click",(e)=>{

        e.preventDefault()
        requireName()
    })

    const discard = document.createElement("button")
    discard.id = "discard"
    discard.textContent = "Discard"
    discard.addEventListener("click",(e)=>{

        e.preventDefault()
        toDoFormRemover()
    })

    //Appendings
    prioDiv.appendChild(prioTitle)
    prioDiv.appendChild(high)
    prioDiv.appendChild(medium)
    prioDiv.appendChild(low)

    prio_date.appendChild(prioDiv)
    //prio_date.appendChild(prioDiv)

    nameDiv.appendChild(taskNameLabel)
    nameDiv.appendChild(taskNameInput)
    descDiv.appendChild(taskDescLabel)
    descDiv.appendChild(taskDescInput)

    toDoForm.appendChild(nameDiv)
    toDoForm.appendChild(descDiv)
    toDoForm.appendChild(prio_date)
    toDoForm.appendChild(submit)
    toDoForm.appendChild(discard)

    content.appendChild(toDoForm)

    priorityChooser.formPriority()

}

// Removes form
function toDoFormRemover(){
    formActive = false
    const form = document.querySelector("form").remove()
}

//Requires Task name before allowing a submission
function requireName(){ 
    const taskNameInput = document.querySelector(".taskName")
    const taskDescInput = document.querySelector(".taskDesc")

    if(taskNameInput.value == ""){

        taskNameInput.style.border = "solid 1px red"
    }
    else{
        let priority = document.querySelector(".chosenPriority").textContent
        let task = taskContents(taskNameInput.value, taskDescInput.value, numTasks, priority)
        tasksArray.push(task)

        taskArrayLocation()
        toDoFormRemover()
        addTaskToHtml() 
        ++numTasks
    } 
}

//Gives priority buttons in form and in visible tasks functionality
const priorityChooser = (()=>{

    //Gives form the ability to choose priority
    function formPriority(){
        const high = document.getElementById("high")
        const med = document.getElementById("medium")
        const low = document.getElementById("low")
        high.addEventListener("click",(e)=>{

            e.preventDefault()
            removeChosen()
            high.classList.add("chosenPriority")
        })
        med.addEventListener("click",(e)=>{

            e.preventDefault()
            removeChosen()
            med.classList.add("chosenPriority")
        })
        low.addEventListener("click",(e)=>{

            e.preventDefault()
            removeChosen()
            low.classList.add("chosenPriority")
        })  
    }   

    //Gives button ability to decide task priority
    function removeChosen(){

        const prioDiv = document.getElementById("prioDiv")
        for(let x = 0; x < prioDiv.length; ++x){
            prioDiv[x].classList.remove("chosenPriority")
        }
    }

    //Gives task priority to visible task
    function priorityView(taskNumber){

        const tasks = document.querySelectorAll(".task")
        for(let num = 0; num < tasksArray.length; ++num){
    
            if(tasksArray[num].taskNum == taskNumber){

                let priorityChosen = tasksArray[num].taskPriority
                if(priorityChosen == "High"){

                    tasks[num].childNodes[0].classList.add("high")
                }
                else if(priorityChosen == "Med"){

                    tasks[num].childNodes[0].classList.add("medium")
                }
                else if(priorityChosen == "Low"){

                    tasks[num].childNodes[0].classList.add("low")
                }
            }
        }
    }

    return{
        formPriority,
        priorityView
    }
})()


//Creates object with given task info
function taskContents(name, desc, num, priority){

    let taskName = name
    let taskDesc = desc
    let taskNum = num
    let taskPlaced = false
    let taskPriority = priority

    return{
        taskName,
        taskDesc,
        taskNum,
        taskPlaced,
        taskPriority
    }
}


const tasksOnContent = (()=>{

    //Displays tasks to content area
    function showDisplay(){
        
        for(let num = 0; num < tasksArray.length; ++num){

            addTaskToHtml()
        }
    }

    function clearDisplay(){
        const tasks = document.querySelectorAll(".task")
        for(let num = 0; num < tasksArray.length; ++num){

            tasksArray[num].taskPlaced = false
            tasks[num].remove()
        }
    }

    return{

        showDisplay,
        clearDisplay
    }

})()


//Logic for basic task creation(aka the next task after submission)
function addTaskToHtml(){

    for(let num = 0; num < tasksArray.length; ++num){

        //Only creates task if it has not been placed
        let selectedTask = tasksArray[num]
        if(selectedTask.taskPlaced == false){

            taskCreation(selectedTask)
        }
    }      
}

//Does DOM manipulation of task creation
function taskCreation(selectedTask){

    const tasksArea = document.querySelector(".tasksArea")

    //Creates task with identifier
    const task = document.createElement("div")
    task.classList.add("task")
    let numPlacement = selectedTask.taskNum
    task.setAttribute("data-key", numPlacement)
      
    //Task info in HTML
    const checkbox = document.createElement("button")
    checkbox.classList.add("checkbox")

    const priorityBar = document.createElement("div")
    priorityBar.classList.add("priorityBar")

    const taskName = document.createElement("h2")
    taskName.textContent = selectedTask.taskName

    const taskDesc = document.createElement("div")
    taskDesc.textContent = selectedTask.taskDesc

    //Delete button will appear when hovering
    const deleteTask = document.createElement("button")
    deleteTask.textContent = "X"
    deleteTask.classList.add("delete")
      
    task.appendChild(priorityBar)
    task.appendChild(deleteTask)
    task.appendChild(checkbox)
    task.appendChild(taskName)
    tasksArea.appendChild(task)

    //Task feature activations
    viewTasks(selectedTask)
    checklist(numPlacement)
    deleteTasks(numPlacement)
    showDelete(numPlacement)
    priorityChooser.priorityView(numPlacement)
    selectedTask.taskPlaced = true
      
}

//Gives view full task ability to task
function viewTasks(selectedTask){
    
    const tasks = document.querySelectorAll(".task")

    //loops through and finds current task
    for(let num = 0; num < tasks.length; ++num){

        let task = tasks[num]
        let selectedObject = selectedTask

        //Chooses task with selected object task num
        if(task.getAttribute("data-key") == selectedObject.taskNum){

            //Gives task the event listener for viewbox
            task.addEventListener("click",(e)=>{

                if(e.target.closest == ".checkbox"){

                    return
                }
                else if(e.target.closest == ".inViewing"){

                    return
                }
                else{
                    
                    for(let num = 0; num < tasksArray.length; ++num){

                        let taskPlace = task.getAttribute("data-key")

                        //gives class view to task and opens viewable div
                        if(inView == false && taskPlace == tasksArray[num].taskNum){
                            let currentTask = tasksArray[num] 
                            task.classList.add("inViewing")
                        
                            createViewDiv(currentTask.taskName, currentTask.taskDesc, currentTask.taskNum)
                            
                            inView = true 
                        }
                    }
                }
            })
        }
    }
}

//Creates div that shows all info to user
function createViewDiv(taskName, taskDesc, taskNum){
    
    const fullTask = document.createElement("div")
    fullTask.id = "viewBox"
    fullTask.setAttribute("viewBox-key", taskNum)

    const viewTitle = document.createElement("h2")
    viewTitle.id = "viewTitle"
    viewTitle.setAttribute("contentEditable",true)
    viewTitle.textContent = taskName

    const viewDesc = document.createElement("div")
    viewDesc.id = "viewDesc"
    viewDesc.setAttribute("contentEditable",true)
    viewDesc.textContent = taskDesc
        
    fullTask.appendChild(viewTitle)
    fullTask.appendChild(viewDesc)
    content.appendChild(fullTask)

}

//Changes task data
function applyEdit(taskID){

    const tasks = document.querySelectorAll(".task")
    const viewTitle = document.getElementById("viewTitle").textContent
    const viewDesc = document.getElementById("viewDesc").textContent
    
    for(let num = 0; num < tasksArray.length; ++num){
        
        //Changes content of task within html and task array
        if(tasksArray[num].taskNum == taskID){

            tasksArray[num].taskName = viewTitle
            tasksArray[num].taskDesc = viewDesc

            tasks[num].childNodes[3].textContent = viewTitle
        }
    }
}

//Remove viewing class
document.addEventListener("click",(e)=>{ 

    if(e.target.closest(".inViewing")){

        return
    }
    else if(e.target.closest("#viewBox")){

        return
    }
    else if( inView == true && tasksArray.length > 0) {
            
        removeViewDiv()
    }
})

//Removes view div and class
function removeViewDiv(){
        
    //removes viewBox from HTML
    const viewBox = document.getElementById("viewBox")
    let taskID = viewBox.getAttribute("viewBox-key")
    applyEdit(taskID)
    viewBox.remove()

    //removes inViewing class
    const tasks = document.querySelectorAll(".task")
    tasks.forEach(task => {
        task.classList.remove("inViewing")
    })
    inView = false

}

//Checklist ability
function checklist(taskNumber){

    const checkboxes = document.querySelectorAll(".checkbox")
    const tasks = document.querySelectorAll(".task")
    for(let num = 0; num < tasksArray.length; ++num){

        if(tasksArray[num].taskNum == taskNumber){

            checkboxes[num].addEventListener("click",(e)=>{
                tasks[num].classList.toggle("checkedTask")
                checkboxes[num].classList.toggle("checked")

                // const checkMark = document.createElement("img")
                // checkMark.setAttribute("src","https://banner2.cleanpng.com/20180605/uhx/kisspng-stock-photography-check-mark-right-sign-5b163039852792.1370523815281807935454.jpg")
                // checkMark.classList.toggle("checkMark")

                e.stopImmediatePropagation()
            })
        }
    }
}

//Adds task deletability
function deleteTasks(taskNumber){

    //finds task in DOM and in tasks array
    for(let num = 0; num < tasksArray.length; ++num){

        if(tasksArray[num].taskNum == taskNumber){

            const deleteButtons = document.querySelectorAll(".delete")  
            deleteButtons[num].addEventListener("click",(e)=>{
                
                //removes from array and from DOM
                e.stopImmediatePropagation()
                let focusedTask = deleteButtons[num].closest(".task")
    
                tasksArray.splice(num,1)      
                focusedTask.remove()

                //removes viewbox if it matches task
                if(inView == true){
                    let viewBoxID = document.querySelector("#viewBox").getAttribute("viewBox-key")
                    if(taskNumber == viewBoxID){
                        removeViewDiv()
                    }     
                }
                
            })
        }
    }
}

//Shows and Hides delete button
function showDelete(taskNumber){

    const tasks = document.querySelectorAll(".task")
    const deleteButtons = document.querySelectorAll(".delete")  
    for(let num = 0; num < tasksArray.length; ++num){

        if(tasksArray[num].taskNum == taskNumber){

            //removes from array and from DOM
            tasks[num].addEventListener("mouseover",()=>{

                deleteButtons[num].setAttribute("id","deleteVisible")
            })

            //When not hovering task remove visibility
            tasks[num].addEventListener("mouseout",()=>{

                deleteButtons[num].removeAttribute("id","deleteVisible")
            })

        }
    }
}
    








