const express = require("express");
const User = require("../models/User");

const Todorouter = express.Router();

Todorouter.post("/:userId/todos", async (req, res) => {
  const { userId } = req.params;
  const { content, description } = req.body;

  console.log(content, description);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newTodo = {
      content,
      description,
      status: "todo",
      createdAt: new Date(),
    };
    user.todos.push(newTodo);
    await user.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

Todorouter.get("/:userId/todos", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const todos = {
      todo: [],
      inProgress: [],
      done: [],
    };

    user.todos.forEach((todo) => {
      todos[todo.status].push(todo);
    });

    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

Todorouter.put("/:userId/todos/:todoId", async (req, res) => {
  const { userId, todoId } = req.params;
  const { content, description, status } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const todo = user.todos.id(todoId);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todo.content = content !== undefined ? content : todo.content;
    todo.description =
      description !== undefined ? description : todo.description;
    todo.status = status !== undefined ? status : todo.status;
    await user.save();
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

Todorouter.delete("/:userId/todos/:todoId", async (req, res) => {
  const { userId, todoId } = req.params;
  console.log(`UserId: ${userId}, TodoId: ${todoId}`);

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.todos = user.todos.filter((todo) => todo._id.toString() !== todoId);

    await user.save();

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = Todorouter;
