export {toDoCreator, toDoFormCreator, toDoFormRemover, addTaskToHtml }
export const tasksArray = []
export let formActive = false
let inEdit = false
const tasksArea = document.querySelector(".tasksArea")
const content = document.querySelector(".content")


//Form Creator
function toDoFormCreator(){
    formActive = true
    const toDoForm = document.createElement("form")
    toDoForm.classList.add("toDoForm")

    const nameDiv = document.createElement("fieldset")
    const taskNameLabel = document.createElement("label")
    taskNameLabel.textContent = "Task"
    const taskNameInput = document.createElement("input")
    taskNameInput.classList.add("taskName")

    const descDiv = document.createElement("fieldset")
    const taskDescLabel = document.createElement("label")
    taskDescLabel.classList.add("taskDesc")
    taskDescLabel.textContent = "Description"
    const taskDescInput = document.createElement("textarea")
    taskDescInput.style.height = "100px"
    
    const submit = document.createElement("button")
    submit.addEventListener("click",(e)=>{
        e.preventDefault()
        requireName()
    })
    submit.textContent = "Submit"

    nameDiv.appendChild(taskNameLabel)
    nameDiv.appendChild(taskNameInput)
    descDiv.appendChild(taskDescLabel)
    descDiv.appendChild(taskDescInput)

    toDoForm.appendChild(nameDiv)
    toDoForm.appendChild(descDiv)
    toDoForm.appendChild(submit)

    content.appendChild(toDoForm)

}
function toDoFormRemover(){
    formActive = false
    const form = document.querySelector("form").remove()
}
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
    } 
}



//TaskCreator
const toDoCreator = (taskName, desc) => {
    
    return{
        taskName,
        desc
    }
}

function addTaskToHtml(){
    const tasksArea = document.querySelector(".tasksArea")
    let numPlacement = tasksArray.length
        const task = document.createElement("div")
        task.classList.add("task")
        task.setAttribute("data-key", numPlacement)

        const checkbox = document.createElement("button")
        checkbox.classList.add("checkbox")

        const taskName = document.createElement("h2")
        taskName.textContent = tasksArray[numPlacement-1].taskName


        //Delete button will appear when hovering
        const deleteTask = document.createElement("div")
        deleteTask.classList.add("delete")
        
        task.appendChild(deleteTask)
        task.appendChild(checkbox)
        task.appendChild(taskName)
        tasksArea.appendChild(task)
        editTasks()
}

function editTasks(){
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
                let taskplace = task.getAttribute("data-key")

                if(inEdit == false){
                    task.classList.add("inEditing")
                    
                    inEdit =true
                }
            }
        })
    });
}


document.addEventListener("click",(e)=>{
    if(e.target.closest(".inEditing")){
        return
    }
    else if(e.target.closest(".toDoForm")){
        return
    }
    else{
        const tasks = document.querySelectorAll(".task")
        tasks.forEach(task =>{
            inEdit = false
            task.classList.remove("inEditing")
    }) 
    }
})

function checklist(){
    const checkboxes = document.querySelectorAll(".checkbox")
    checkboxes.forEach(checkbox=>{
        checkbox.addEventListener("click",(e)=>{
            checkbox.classList.toggle("checked")
            e.stopImmediatePropagation()
        })
    })
}
