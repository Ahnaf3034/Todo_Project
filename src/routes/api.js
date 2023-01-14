// Import Express
const express=require('express');

//Import ProfileController
const ProfileController=require("../controllers/ProfileController")

//Import Todo List Controller
const TodoListController=require("../controllers/TodoListController")

// Import Authentication Middleware
const AuthVerifyMiddleware=require("../middleware/AuthVerifyMiddleware")

// Call Router from express
const router=express.Router();

//Profile
// Create Profile Routing
router.post("/create-profile",ProfileController.CreateProfile)
// Login Profile Routing
router.post("/Log-in",ProfileController.LoginProfile)
// Select Profile Routing
router.get("/Select-profile",AuthVerifyMiddleware,ProfileController.SelectProfile) //Authentication complete and select profile
// Update Profile Routing
router.put("/Update-profile",AuthVerifyMiddleware,ProfileController.UpdateProfile) //Authentication complete and Update profile

//Todo list
// Create Todo Routing
router.post("/create-todo",AuthVerifyMiddleware,TodoListController.CreateTodo); //Authentication complete and Create New ToDo
router.get("/Select-todo",AuthVerifyMiddleware,TodoListController.SelectTodo); //Authentication complete and Select ToDo
router.put("/Update-todo",AuthVerifyMiddleware,TodoListController.UpdateTodo); //Authentication complete and Update ToDo
router.put("/Update-todo-Status",AuthVerifyMiddleware,TodoListController.UpdateStatusTodo); //Authentication complete and Update ToDo
router.delete("/delete-todo",AuthVerifyMiddleware,TodoListController.RemoveTodo); //Remove todo
router.get("/Select-todo-By-Status",AuthVerifyMiddleware,TodoListController.SelectTodoStatus); //Select Todo By Status
router.get("/Select-todo-By-Date",AuthVerifyMiddleware,TodoListController.SelectTodo); 


//Export Router 
module.exports=router;
