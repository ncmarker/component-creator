# 🧩 Component Creator

Component Creator is a React-based tool designed to help developers—especially beginners—easily build and reuse UI components without needing extensive coding knowledge. Originally built as my capstone project for an "Advanced Front-End" university course, this tool grew into something more: a platform to learn, create, and adopt best practices in component-based development.

## 🚀 Why I Built It

The goal was simple at first: demonstrate mastery of modern React techniques. But I’ve always been passionate about making tools that lower the barrier to entry for others. Reusable components are essential for scalable applications, yet the process of building them can be daunting for new developers. I wanted to make that easier—and more fun.

Component Creator is my attempt to bridge that gap: turning advanced front-end principles into something approachable and educational, while giving users the flexibility to explore and customize their work.

## ✨ Features

- 📦 Build and preview React components on the fly  
- 🎨 Customize component structure, props, and styles  
- 🔁 Save and reuse components from a mock database  
- 🧠 Learn React best practices through interactive use  

## 🛠 Tech Stack

- **React** for building the UI  
- **Tailwind CSS** for utility-first styling  
- **JSON Server** as a mock backend  

## 🧪 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ncmarker/component-creator.git
cd component-creator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Frontend

```bash
npm start
```

### 4. Run the Mock Database

In a separate terminal window (inside the same directory):

```bash
json-server --watch db.json
```

The app will now be running locally with a mock backend.

## 📁 Project Structure

```
component-creator/
├── public/
├── src/
│   ├── components/       # Core reusable components
│   ├── routes/           # Main views/pages
│   └── helper_function/  # Helper functions
├── db.json               # Mock database for component storage
├── tailwind.config.js
└── package.json
```

## 🧠 Lessons Learned

This project taught me the importance of balancing abstraction with usability. While powerful tools often require technical depth, I found joy in simplifying the experience without compromising capability—something I hope helps others get started with React confidently.

---

Thanks for checking out Component Creator! Contributions, feedback, or ideas are always welcome.
