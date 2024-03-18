const formBtn=document.querySelector(".form-btn")
const taskInput=document.querySelector('#input-task')
const taskContainer=document.querySelector('.tasks')
const taskbtn=document.querySelector('.task-btn')
const timeDetails=document.querySelector('#time-details')
const text=document.querySelector('.dummy-text')
const statusBtn=document.querySelectorAll('.status')
const taskComplete=document.querySelector('#task-incomplete')
const dropDownBtn=document.querySelector('#dropdownMenuLink')
const dropDown=document.querySelector('.dropdown-menu')
formBtn.addEventListener('click',addTask)

let ampm="AM"
const dayarr= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
timeDetails.innerHTML=`${dayarr[new Date().getDay()]} <span id="time" class="text-body-secondary ms-1">${gettime()}</span>`
let tasks=[];
let count=0;
//adding tasks
function addTask(){
    const taskvalue=taskInput.value.trim()
    const time=gettime()
    if(!taskvalue){
        alert('task should not be empty')
    }
   else{
    text.remove()
    tasks.push({taskvalue,time,status:"incomplete"})
    Uiupdate(tasks[tasks.length-1])
    taskCounter(true)
    //checkbox input functionality
    const statusButton=document.querySelectorAll('.status-btn')
    statusButton.forEach((btn)=>{
        btn.addEventListener('click',completionStatus)
    })
    taskInput.value=""
}
}
//displaying the tasks
function Uiupdate(obj){
    const html=
   `<div class="task shadow task-animation">
    <div class="task-description d-flex justify-content-center">
        <h5 class="my-auto inp">
            <input type="checkbox" class="me-4 status-btn">${obj.taskvalue}
        </h5>
        <span id="time" class="text-body-secondary ms-2 mt-2">${obj.time}</span>
    </div>
    <div class="controls d-flex justify-content-center align-items-center">
        <div class="status me-2 rounded">
            ${obj.status}
        </div>
        <button class="btn task-btn task-delete-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
            </svg>
        </button>
    </div>
</div>`
    timeDetails.innerHTML=`${dayarr[new Date().getDay()]} <span id="time" class="text-body-secondary ms-1">${gettime()}</span>`
    taskContainer.insertAdjacentHTML('beforeend',html)
}
document.addEventListener('click',function(e){
    const target=e.target.closest('.task-delete-btn')
if(target){
    removeTask(e)
}
})
//remove task
function removeTask(e){
const container=e.target.closest('.task')
container.classList.add('remove')
container.querySelector('.status').classList.contains('completed')?{}:taskCounter(false);
setTimeout(()=>{
    container.remove()
},200)

}

//time update
function gettime(){
    const date=new Date()
    let hours=date.getHours()
    const minutes=date.getMinutes()
    if(hours>12){
        hours-=12
        ampm="PM"
    }
    return(`${hours.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")} ${ampm}`)
}
timeDetails.innerHTML=`${dayarr[new Date().getDay()]} <span id="time" class="text-body-secondary ms-1">${gettime()}</span>`
//day details update
function completionStatus(){
    const status=this.closest('.task')
    const taskval=this.closest('.inp')
    status.querySelector('.status').classList.toggle('completed')
    const currentobjindex=tasks.findIndex(obj=>obj.taskvalue==taskval.textContent.trim())

  if(this.checked){
    tasks[currentobjindex].status="completed"
    status.style.opacity='.5'
    taskval.style.textDecoration="line-through"
    taskCounter(false)
    status.querySelector('.status').innerHTML="completed"
  }
  else{
    tasks[currentobjindex].status="incomplete"
    taskval.style.textDecoration="none"
    status.style.opacity='1'
    taskCounter(true)
    status.querySelector('.status').innerHTML="incomplete"
  }
}
//task counter and ui update
function taskCounter(incomplete){
    if(incomplete){
        count++;
    }
    else{
        count>0? count--:count=0;
    }
    taskComplete.textContent=count
}

