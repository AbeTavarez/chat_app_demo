const express = require("express");
const app = express();
const PORT = 300 || process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
