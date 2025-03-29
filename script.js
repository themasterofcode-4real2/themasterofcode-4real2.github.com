const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = "data.json";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Load initial data
let data = { likes: 0, comments: [] };
if (fs.existsSync(path)) {
    data = JSON.parse(fs.readFileSync(path));
}

// Save data to file
function saveData() {
    fs.writeFileSync(path, JSON.stringify(data));
}

// Serve likes and comments
app.get("/data", (req, res) => {
    res.json(data);
});

// Handle likes (one per IP)
const likedIPs = new Set();
app.post("/like", (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    if (!likedIPs.has(ip)) {
        likedIPs.add(ip);
        data.likes++;
        saveData();
    }
    res.sendStatus(200);
});

// Handle comments
app.post("/comment", (req, res) => {
    const { comment } = req.body;
    if (comment) {
        data.comments.push(comment);
        saveData();
    }
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
