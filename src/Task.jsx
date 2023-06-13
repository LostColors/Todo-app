import { useState } from 'react'
import './style.css'



const Task = ({task, ...props}) => {

  const DoneBtn = () =>
  <div style={{cursor:'pointer'}}>
    {!task.done
    ? <p onClick={props.doneTask}><span className='not-done'/></p>
    : <p onClick={props.noDoneTask}><span className='done' style={{userSelect:"none"}}>✔</span></p>}
  </div>

const [DeleteBtnClass, setDeleteBtnClass] = useState('DeleteBtn')
const enterDBC = () => {
  setDeleteBtnClass('DeleteBtn active')
}

const leaveDBC = () => {
  setDeleteBtnClass('DeleteBtn')
}
const DeleteBtn = () => {
  return(
    <span style={{cursor:'pointer'}} onClick={props.deleteTask} className={DeleteBtnClass}>✖</span>
  )
}



  const ClassName = 'item ' + (task.done? 'task-done' : '')

  return(
    <li className={ClassName} onMouseEnter={enterDBC} onMouseLeave={leaveDBC}>
      <DoneBtn/>
      <p style={{cursor:'text', userSelect:'none'}}
        className={'title ' + (task.changing? 'active' : '')}
        onClick={props.aditor}
      >
        {task.title}
      </p>
      <input 
        id={`id${task.id}`}
        autoFocus
        ref={props.useref}
        onKeyDown={props.aditATask}
        className={'input ' + (task.changing? 'active' : '')}
        type="text"
        value={props.valueEdit} 
        onChange={props.aditATaskChange}
      /> 
      <DeleteBtn/>
    </li>
    
  )
}



export default Task