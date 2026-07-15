const express = require('express')
const app = express()
const port = 3000

// Middleware
app.use(express.urlencoded({ extended: true })) // form data read korbe
app.use(express.static('public')) // css er jonno
app.set('view engine', 'ejs') // ejs use korbo

// Temporary database = array
let todos = [
  { id: 1, task: "Express JS sekha", completed: false },
  { id: 2, task: "Todo App banano", completed: false }
]

// 1. Home Page - Sob Todo dekhabe
app.get('/', (req, res) => {
  res.render('index', { todos: todos })
})

// 2. New Todo Add kora
app.post('/add', (req, res) => {
  const newTask = req.body.task
  todos.push({ id: Date.now(), task: newTask, completed: false })
  res.redirect('/')
})

// 3. Delete kora
app.get('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id)
  todos = todos.filter(todo => todo.id !== id)
  res.redirect('/')
})

// 4. Complete/Incomplete kora
app.get('/toggle/:id', (req, res) => {
  const id = parseInt(req.params.id)
  todos = todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  )
  res.redirect('/')
})

app.listen(port, () => {
  console.log("Server running on http: 3000 ")
})