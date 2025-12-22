import express from "express";

const app = express();
const PORT = 3000;

// In-memory storage (resets on restart)
let posts = [];

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Home – view & create posts
app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

// Create post
app.post("/posts", (req, res) => {
  const { title, content } = req.body;

  posts.push({
    id: Date.now().toString(),
    title,
    content
  });

  res.redirect("/");
});

// Edit post page
app.get("/posts/:id/edit", (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  res.render("edit.ejs", { post });
});

// Update post
app.post("/posts/:id", (req, res) => {
  const { title, content } = req.body;
  const post = posts.find(p => p.id === req.params.id);

  post.title = title;
  post.content = content;

  res.redirect("/");
});

// Delete post
app.post("/posts/:id/delete", (req, res) => {
  posts = posts.filter(p => p.id !== req.params.id);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
