import { useEffect, useRef, useState } from "react";
import Task from "./Task";




const App = () => {
  let [tasks, setTasks] = useState(
    localStorage.list !== undefined
      ? JSON.parse(localStorage.getItem("list"))
      : [ {id:0, title:"add a task", done:false, changing: false} ]
  )

    const activeTasks = tasks.filter(tasks => !tasks.done)
    const doneTasks = tasks.filter(tasks => tasks.done)

    const doneTask = (id) => {
      setTasks(tasks.map(task => {
        if (task.id === id) {
          return {
            ...task,
            done: true
          }
        } else {
          return task;
        }
      }))
    }

    useEffect(()=> {
      localStorage.setItem('list', JSON.stringify(tasks))
      console.log(tasks)
    }, [tasks])

    const noDoneTask = (id) => {
      setTasks(tasks.map(task => {
        if (task.id === id) {
          return {
            ...task,
            done: false
          }
        } else {
          return task;
        }
      }))
    }

    
    const deleteTask = (id) => {
      setTasks(tasks.filter(task =>
        task.id !== id
      ))
    }




    const [valueEdit, setValueEdit] = useState('')
    const aditATask = (id, event) => {

        if(event.key === 'Enter') {
          setTargetItemRClass('targetItemR')
          setTasks(tasks.map(task => {
              if (task.id === id) {
                return {
                  ...task,
                  title: valueEdit
                  ? valueEdit
                  : '...',
                  changing: false
                }
              } else {
                return task;
              }
            }        
            ))
            setValueEdit('')
        }
    }


    const ref = useRef(null)

    const aditor = (id) => {
      InputR()
      const inputAditor = document.getElementById(`id${id}`)
      setTasks(tasks.map(task => {
        if (task.id === id) {
          return {
            ...task,
            changing: true
          }
          
        } else {
          return task;
        }
      }))

      setTimeout(()=>{
        inputAditor.focus()
      })
    }




// логика поля ввода, ответственного за создание задач



const [inputClass, setInputClass] = useState('input-create')
const [targetItemClass, setTargetItemClass] = useState('targetItem')
const [targetItemRClass, setTargetItemRClass] = useState('targetItemR')

const [placeholderValue, setPlaceholderValue] = useState('what are we planning to do ?')
const [value, setValue] = useState('')




const onInputClick = () => {
  setTargetItemClass('targetItem active')
  console.log("1")
  setInputClass('input-create active')
  setPlaceholderValue('')
}


const CreateATask = () => {
  if(event.key === 'Enter') {
    if(value)
    {
      const task = {
        id: tasks.length !== 0 ? tasks.length : 0,
        title: value,
        done:false,
        changing: false
      }
      setTasks([...tasks, task])
      setValue('')
    }
  }
}

const closeInput = () => {
  setInputClass('input-create')
  setTargetItemClass('targetItemR')
  setPlaceholderValue('what are we planning to do ?')
  setValue('')
}


// ---------------------------------------------------

const InputR = () => {
  setTargetItemRClass('targetItemR active')
}
const closeInputR = () => {
  setTargetItemRClass('targetItemR')
  setTasks(tasks.map(task => {
    return {
      ...task,
      changing: false
    }
}))
setValueEdit('')
}


// ---------Btn-tools-----------------------------------
const [all, setAll] = useState(true)
const [active, setActive] = useState('')


const allBtnClick = () => {
  setAll(true) 
  setActive(false)
}

const activeBtnClick = () => {
  setActive(true)
  setAll(false)

}

const completedBtnClick = () => {
  setAll(false)
  setActive(false)

}


const deleteDone = () => {
  setTasks(tasks.filter(task =>
    task.done !== true
  ))
  console.log(tasks)
}





  return (
    <>
      <div className="todo-app">
        <div className="todo-w">
          <div
            className={targetItemClass}
            onClick={closeInput}
          />
          <div
            className={targetItemRClass}
            onClick={closeInputR}
          />
          <div className="title-app">Todos list</div>
          <div className="todos">
            <div  className={`item create-todo`}>
              <input
                className={inputClass}
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                onClick={onInputClick}
                placeholder={placeholderValue}
                onKeyDown={() => CreateATask(event)}
              />
            </div>
            <ul className="todo-list">
                {all
                  ? [...activeTasks, ...doneTasks].map((task) => {
                    return (
                      <Task
                        noDoneTask={() => noDoneTask(task.id)}
                        task={task}
                        key={task.id}
                        doneTask={() =>  doneTask(task.id)}
                        deleteTask={() => deleteTask(task.id)}
                        aditATask={() => aditATask(task.id, event)}
                        valueEdit={valueEdit}
                        aditATaskChange={e => setValueEdit(e.target.value)}
                        aditor={() => aditor(task.id)}
                        useref={ref}
                        onfocus={onfocus}
                      />
                    )
                    }
                  )
                  : active
                  ? [...activeTasks].map((task) => {
                    return (
                      <Task
                        noDoneTask={() => noDoneTask(task.id)}
                        task={task}
                        key={task.id}
                        doneTask={() =>  doneTask(task.id)}
                        deleteTask={() => deleteTask(task.id)}
                        aditATask={() => aditATask(task.id, event)}
                        valueEdit={valueEdit}
                        aditATaskChange={e => setValueEdit(e.target.value)}
                        aditor={() => aditor(task.id)}
                        useref={ref}
                        onfocus={onfocus}
                      />
                    )
                    }
                  )
                  : [...doneTasks].map((task) => {
                    return (
                      <Task
                        noDoneTask={() => noDoneTask(task.id)}
                        task={task}
                        key={task.id}
                        doneTask={() =>  doneTask(task.id)}
                        deleteTask={() => deleteTask(task.id)}
                        aditATask={() => aditATask(task.id, event)}
                        valueEdit={valueEdit}
                        aditATaskChange={e => setValueEdit(e.target.value)}
                        aditor={() => aditor(task.id)}
                        useref={ref}
                        onfocus={onfocus}
                      />
                    )
                    }
                  )
                }
            </ul>
            <div className="bottom-tools" style={{userSelect:'none'}}>
              <div>
                { activeTasks.length !== 0
                  ?  activeTasks.length + " to do tasks left"
                  :  "there are no tasks left"                         
                }
              </div>
              {
                [...doneTasks].length !== 0
                  ? <span className="btnDelete" onClick={deleteDone}>clear</span> 
                  : undefined
              }
              <div className="center-group">
                <span className="allBtn" onClick={allBtnClick}>
                  All
                </span>
                <span className="activeBtn" onClick={activeBtnClick}>
                  Active
                </span>
                <span className="completedBtn" onClick={completedBtnClick}>
                  Completed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
