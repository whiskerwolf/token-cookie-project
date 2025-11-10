
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// In-memory users (passwords will be hashed)
let users = [
  { id: 1, email: 'admin@test.com', password: '', firstName: 'Admin', role: 'admin' },
  { id: 2, email: 'user@test.com', password: '', firstName: 'User', role: 'user' }
];

// In-memory tasks
let tasks = [
  { id: 1, userId: 1, title: 'Admin Task', description: 'Admin only task', completed: false },
  { id: 2, userId: 2, title: 'User Task', description: 'Regular user task', completed: false }
];

// Hash the passwords initially
const hashPasswords = async () => {
  users = await Promise.all(
    users.map(async (user) => ({
      ...user,
      password: await bcrypt.hash('password123', 10)
    }))
  );
};
hashPasswords();

app.post('/register', async (req, res) => {
  const { email, password, firstName, role } = req.body;

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length + 1,
    email,
    password: hashedPassword,
    firstName,
    role: role || 'user'
  };
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully', newUser });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) return res.status(400).json({ message: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.cookie('token', token, {
    httpOnly: true,
    secure: false, // true in production
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000
  });

  res.json({ message: 'Login successful', user: { id: user.id, email: user.email, role: user.role } });
});

app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // store user info in request
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

app.get('/profile', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  res.json({ user });
});

// Get all tasks of logged-in user
app.get('/tasks', authMiddleware, (req, res) => {
  const userTasks = tasks.filter(t => t.userId === req.user.id);
  res.json({ tasks: userTasks });
});

// Add a task
app.post('/tasks', authMiddleware, (req, res) => {
  const { title, description } = req.body;
  const newTask = {
    id: tasks.length + 1,
    userId: req.user.id,
    title,
    description,
    completed: false,
    createdAt: new Date()
  };
  tasks.push(newTask);
  res.status(201).json({ message: 'Task added', task: newTask });
});

// Delete a task
app.delete('/tasks/:id', authMiddleware, (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id && t.userId === req.user.id);

  if (!task) return res.status(404).json({ message: 'Task not found or not authorized' });

  tasks = tasks.filter(t => t.id !== id);
  res.json({ message: 'Task deleted successfully' });
});

const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

// Get all users (admin only)
app.get('/admin/users', authMiddleware, adminOnly, (req, res) => {
  res.json({ users });
});

// Get all tasks (admin only)
app.get('/admin/tasks', authMiddleware, adminOnly, (req, res) => {
  res.json({ tasks });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

export default app;

