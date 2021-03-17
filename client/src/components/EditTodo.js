import React, { Fragment, useState } from "react";


const EditTodo = ({ todo }) => {
const [descreption , setDescreption] = useState(todo.descreption);

const editDescreption = async(e) => {

    try {
        const body = { descreption };
    
     const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
        });

        window.location = "/";
    } catch (err) {
        console.error(err.message);
    };
};

    return ( <Fragment>
    <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
      Edit
    </button>
    
 
    <div class="modal" id={`id${todo.todo_id}`} onClick={() => setDescreption(todo.descreption)}>
      <div class="modal-dialog">
        <div class="modal-content">
    
         
          <div class="modal-header">
            <h4 class="modal-title">Edit Todo</h4>
            <button type="button" class="close" data-dismiss="modal" onClick = {() => setDescreption(todo.descreption)} >&times;</button>
          </div>
    
         
          <div class="modal-body">
            <input type="text" className="form-control" value={descreption} onChange={e => setDescreption(e.target.value)} />
          </div>
    
        
          <div class="modal-footer">
          <button type="button" class="btn btn-warning" 
          data-dismiss="modal" onClick = {e => editDescreption(e)}>Edit</button>

            <button type="button" class="btn btn-danger" data-dismiss="modal" onClick = {() => setDescreption(todo.descreption)} >Close</button>
          </div>
    
        </div>
      </div>
    </div>
    </Fragment>
    );
};


export default EditTodo;