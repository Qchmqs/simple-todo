const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use (cors());
app.use (express.json()); //req.body
//routes

//create a todo

app.post ("/todos", async (req, res) => {
    try {
        const { descreption } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (descreption) VALUES($1) RETURNING *", 
            [descreption]
        );

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// get all todos
app.get("/todos", async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM todo");
      res.json(allTodos.rows);     
    } catch (err) {
        console.error(err.message);
    }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

        res.json(todo.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});
//update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { descreption } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET descreption = $1 WHERE todo_id = $2", 
            [descreption, id]
        );

        res.json("todo was updated");
    } catch (err) {
        console.error(err.message);    
    }
});
//delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

        res.json("todo was deleted");

    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5000, () => {
    console.log("app has started at port 5000");
});

