//Creates tasks
//Controls the tasks on Today and Upcoming

export {toDoCreator, toDoFormCreator, toDoFormRemover, addTaskToHtml, tasksPage }
export const tasksArray = []
export let formActive = false
let inEdit = false
let inView = false
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
        let task = toDoCreator(taskNameInput.value, taskDescInput.value)
        tasksArray.push(task)
        addTaskToHtml()
        toDoFormRemover() 
        checklist()
        deleteTasks()
        showDelete()
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



//TaskCreator
function toDoCreator(name, desc){
    let taskName = name
    let taskDesc = desc

   
    return{
        taskName,
        taskDesc
    }
}

//Add task 
function addTaskToHtml(){
    const tasksArea = document.querySelector(".tasksArea")
    let numPlacement = tasksArray.length - 1

    const task = document.createElement("div")
    task.classList.add("task")
    task.setAttribute("data-key", numPlacement)

    const checkbox = document.createElement("button")
    checkbox.classList.add("checkbox")

    const taskName = document.createElement("h2")
    taskName.textContent = tasksArray[numPlacement].taskName

    const taskDesc = document.createElement("div")
    taskDesc.textContent = tasksArray[numPlacement].taskDesc


    //Delete button will appear when hovering
    const deleteTask = document.createElement("button")
    deleteTask.textContent = "X"
    deleteTask.classList.add("delete")
        
        
    task.appendChild(deleteTask)
    task.appendChild(checkbox)
    task.appendChild(taskName)
    //task.appendChild(taskDesc)//temporary
    tasksArea.appendChild(task)
    viewTasks()
        
}

// View full task
function viewTasks(){
    const tasks = document.querySelectorAll(".task")
    tasks.forEach(task => {
        //opens edit div
        task.addEventListener("click",(e)=>{
            if(e.target.closest == ".checkbox"){
                return
            }
            else if(e.target.closest == ".task"){
                return
            }
            else{
                let taskPlace = task.getAttribute("data-key")
                let currentTask = tasksArray[taskPlace]

                //gives class view to task and opens viewable div
                if(inView == false){
                    task.classList.add("inViewing")
                
                    createViewDiv(currentTask.taskName, currentTask.taskDesc)
                    
                    inView = true 
                }
            }
        })
    });
}

//Creates div that shows all info to user
function createViewDiv(taskName, taskDesc){
    const fullTask = document.createElement("div")
        fullTask.setAttribute("id", "viewBox")

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


//Remove viewing class
document.addEventListener("click",(e)=>{ 
    if(e.target.closest(".inViewing")){
        return
    }
    else if(e.target.closest(".toDoForm")){
        return
    }
    else if(e.target.closest("#viewBox")){
        return
    }
    else if(inView == true){
        //Removes viewBox
        const viewBox = document.getElementById("viewBox")
        viewBox.remove()
        //Removes inViewing class
        const tasks = document.querySelectorAll(".task")
        tasks.forEach(task =>{
            inView = false
            task.classList.remove("inViewing")
        })
    }
})

//checklist ability
function checklist(){
    const checkboxes = document.querySelectorAll(".checkbox")
    checkboxes.forEach(checkbox=>{
        checkbox.addEventListener("click",(e)=>{
            checkbox.classList.toggle("checked")
            e.stopImmediatePropagation()
        })
    })
}

//Adds task deletability
function deleteTasks(){

    //selects delete class
    const deleteButtons = document.querySelectorAll(".delete")      
    deleteButtons.forEach(dButton=>{
        dButton.addEventListener("click",()=>{
            
            let focusedTask = dButton.closest(".task")        
            let taskPlace = focusedTask.getAttribute("data-key")   

            //removes from array and from DOM
            tasksArray.splice(taskPlace,1)                          
            focusedTask.remove()
        }
    )})
}

//Shows and Hides delete button
function showDelete(){
    const tasks = document.querySelectorAll(".task")
    const deleteButtons = document.querySelectorAll(".delete")  
    tasks.forEach(task=>{

        //When hovering task grant visibility
        task.addEventListener("mouseover",()=>{
            deleteButtons.forEach(dButton=>{
                dButton.setAttribute("id","deleteVisible")
            })
        })

        //When not hovering task remove visibility
        task.addEventListener("mouseout",()=>{
            deleteButtons.forEach(dButton=>{
                dButton.removeAttribute("id","deleteVisible")
            })
        })
    })
}






