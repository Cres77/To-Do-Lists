//Creates tasks
//Controls the tasks on Today and Upcoming

export {toDoFormCreator, toDoFormRemover, addTaskToHtml, tasksPage }
export const tasksArray = []
export let formActive = false
let inEdit = false
let inView = false
let numTasks = 0
const tasksArea = document.querySelector(".tasksArea")
const content = document.querySelector(".content")

//Adds task page specific functionalities
function tasksPage(){

    tasksSorters()
    formButton()

}

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
    //Name input
    const taskNameInput = document.createElement("input")
    taskNameInput.classList.add("taskName")

    //Desc Field
    const descDiv = document.createElement("fieldset")
    const taskDescLabel = document.createElement("label")
    taskDescLabel.textContent = "Description"
    //Desc input
    const taskDescInput = document.createElement("textArea")
    taskDescInput.style.height = "100px"
    taskDescInput.classList.add("taskDesc")
    
    const submit = document.createElement("button")
    submit.addEventListener("click",(e)=>{
        e.preventDefault()
        requireName()
    })
    submit.textContent = "submit"

    nameDiv.appendChild(taskNameLabel)
    nameDiv.appendChild(taskNameInput)
    descDiv.appendChild(taskDescLabel)
    descDiv.appendChild(taskDescInput)

    toDoForm.appendChild(nameDiv)
    toDoForm.appendChild(descDiv)
    toDoForm.appendChild(submit)

    content.appendChild(toDoForm)

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
        
        let task = taskContents(taskNameInput.value, taskDescInput.value, numTasks)
        tasksArray.push(task)
        toDoFormRemover() 
        

        addTaskToHtml()
        checklist()
        deleteTasks(numTasks)
        showDelete(numTasks)

        ++numTasks
    } 
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

    //Sorts alphabetically
    const alphabeticallySort = document.createElement("button")
    const alphabeticallyImg = document.createElement("img")
    alphabeticallyImg.setAttribute("src","https://seekicon.com/free-icon-download/ordered-list_3.svg")

    //Sorts by oldest
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

    content.appendChild(contentSorter)
}

//Creates form button for making new tasks
function formButton(){

    const formButton = document.createElement("button")
    formButton.textContent = "+"
    formButton.classList.add("formButton")

    //Determines if a form is active when button is clicked
    formButton.addEventListener("click",()=>{
        if(formActive==true){
            return
        }
        else{
            toDoFormCreator()
               
        }    
    })

    content.appendChild(formButton)
}



//Creates object with given task info
function taskContents(name, desc, num){

    let taskName = name
    let taskDesc = desc
    let taskNum = num
    let taskPlaced = false

    return{
        taskName,
        taskDesc,
        taskNum,
        taskPlaced
    }
}

//Displays tasks to content area
function tasksDisplay(){
    
    const tasksArea = document.querySelector(".tasksArea")
    const task = document.createElement("div")
    for(let task = 0; task < tasksArray.length; ++task){
        task.appendChild(deleteTasks)
        task.appendChild(checkbox)
        task.appendChild(taskName)
        //task.appendChild(taskDesc)//temporary
        tasksArea.appendChild(task)
        viewTasks()
    }

}


//Creates visible task with its element's properties
function addTaskToHtml(){

    const tasksArea = document.querySelector(".tasksArea")
    for(let num = 0; num < tasksArray.length; ++num){

        //Only creates task if it has not been placed
        let selectedTask = tasksArray[num]
        if(selectedTask.taskPlaced == false){

            //Creates task with identifier
            const task = document.createElement("div")
            task.classList.add("task")
            let numPlacement = selectedTask.taskNum
            task.setAttribute("data-key", numPlacement)
            
            //Task info in HTML
            const checkbox = document.createElement("button")
            checkbox.classList.add("checkbox")

            const taskName = document.createElement("h2")
            taskName.textContent = selectedTask.taskName

            const taskDesc = document.createElement("div")
            taskDesc.textContent = selectedTask.taskDesc

            //Delete button will appear when hovering
            const deleteTask = document.createElement("button")
            deleteTask.textContent = "X"
            deleteTask.classList.add("delete")
                
            task.appendChild(deleteTask)
            task.appendChild(checkbox)
            task.appendChild(taskName)
            //task.appendChild(taskDesc)//temporary
            tasksArea.appendChild(task)
            
            viewTasks(selectedTask)
            selectedTask.taskPlaced = true

        }
    }      
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
    fullTask.setAttribute("id", "viewBox")
    fullTask.setAttribute("viewBox-key", taskNum)

    const viewTitle = document.createElement("h2")
    viewTitle.setAttribute("id","viewTitle")
    viewTitle.setAttribute("contenteditable","true")
    viewTitle.textContent = taskName

    const viewDesc = document.createElement("div")
    viewDesc.setAttribute("id","viewDesc")
    viewDesc.setAttribute("contenteditable","true")
    viewDesc.textContent = taskDesc

        
    fullTask.appendChild(viewTitle)
    fullTask.appendChild(viewDesc)
    content.appendChild(fullTask)
}

//Gives edited task data to the 
function applyEdit(){

}


//Remove viewing class
document.addEventListener("click",(e)=>{ 

    if(e.target.closest(".inViewing")){

        return
    }
    else if(e.target.closest("#viewBox")){

        return
    }
    else if( inView == true ) {
            
        removeViewDiv()
    }
})

//Removes view div and class
function removeViewDiv(){
        
    //removes viewBox from HTML
    const viewBox = document.getElementById("viewBox")
    viewBox.remove()

    //removes inViewing class
    const tasks = document.querySelectorAll(".task")
    tasks.forEach(task => {
        task.classList.remove("inViewing")
    })
    inView = false
}

//Checklist ability
function checklist(){

    const checkboxes = document.querySelectorAll(".checkbox")
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("click",(e)=>{

            checkbox.classList.toggle("checked")
            e.stopImmediatePropagation()
        })

    })
}

//Adds task deletability
function deleteTasks(taskNumber){

    //finds task in DOM and in tasks array
    for(let num = 0; num < tasksArray.length; ++num){

        if(tasksArray[num].taskNum == taskNumber){

            const deleteButtons = document.querySelectorAll(".delete")  
            deleteButtons[num].addEventListener("click",()=>{
                
                //removes from array and from DOM
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
    








