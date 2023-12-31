export {toDoCreator, toDoFormCreator, toDoFormRemover, addTaskToHtml }
export const tasksArray = []
export let formActive = false
let inEdit = false
let inView = false
const tasksArea = document.querySelector(".tasksArea")
const content = document.querySelector(".content")


//Form Creator
function toDoFormCreator(){
    formActive = true
    const toDoForm = document.createElement("form")//Create Form
    toDoForm.classList.add("toDoForm")

    const nameDiv = document.createElement("fieldset")//Name Field
    const taskNameLabel = document.createElement("label")
    taskNameLabel.textContent = "Task"
    const taskNameInput = document.createElement("input")//Name input
    taskNameInput.classList.add("taskName")

    const descDiv = document.createElement("fieldset")//Desc Field
    const taskDescLabel = document.createElement("label")
    taskDescLabel.textContent = "Description"
    const taskDescInput = document.createElement("textArea")//Desc input
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
function toDoFormRemover(){// Removes form
    formActive = false
    const form = document.querySelector("form").remove()
}
function requireName(){ //Requires Task name before allowing a submission
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



//TaskCreator
function toDoCreator(name, desc){
    let taskName = name
    let taskDesc = desc

   
    return{
        taskName,
        taskDesc
    }
}

function addTaskToHtml(){// add task
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

function viewTasks(){// View full task
    const tasks = document.querySelectorAll(".task")
    tasks.forEach(task => {
        task.addEventListener("click",(e)=>{//open edit div
            if(e.target.closest == ".checkbox"){
                return
            }
            else if(e.target.closest == ".task"){
                return
            }
            else{
                let taskPlace = task.getAttribute("data-key")
                let currentTask = tasksArray[taskPlace]

                if(inView == false){//gives class view to task and opens view div
                    task.classList.add("inViewing")
                
                    createViewDiv(currentTask.taskName, currentTask.taskDesc)
                    
                    inView = true 
                }
            }
        })
    });
}

function createViewDiv(taskName, taskDesc){//Creates div that shows all info in html
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



document.addEventListener("click",(e)=>{ //Remove viewing
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
        const viewBox = document.getElementById("viewBox")//Removes viewBox
        viewBox.remove()
        const tasks = document.querySelectorAll(".task")//Removes inViewing class
        tasks.forEach(task =>{
            inView = false
            task.classList.remove("inViewing")
        })
    }
})

function checklist(){//checklist ability
    const checkboxes = document.querySelectorAll(".checkbox")
    checkboxes.forEach(checkbox=>{
        checkbox.addEventListener("click",(e)=>{
            checkbox.classList.toggle("checked")
            e.stopImmediatePropagation()
        })
    })
}



function deleteTasks(){//Deletes Task
    const deleteButtons = document.querySelectorAll(".delete")      //selects delete class
    deleteButtons.forEach(dButton=>{
        dButton.addEventListener("click",()=>{
            
            let focusedTask = dButton.closest(".task")        
            let taskPlace = focusedTask.getAttribute("data-key")    

            tasksArray.splice(taskPlace,1)                          //removes from array and from DOM
            focusedTask.remove()
        }
    )}
    )
}

function showDelete(){//Shows and Hides delete button
    const tasks = document.querySelectorAll(".task")
    const deleteButtons = document.querySelectorAll(".delete")  
        tasks.forEach(task=>{
            task.addEventListener("mouseover",()=>{//When hovering task grant visibility
                deleteButtons.forEach(dButton=>{
                    dButton.setAttribute("id","deleteVisible")
                })
            })
            task.addEventListener("mouseout",()=>{//When not hovering task remove visibility
                deleteButtons.forEach(dButton=>{
                    dButton.removeAttribute("id","deleteVisible")
                })
            })
        })
}

