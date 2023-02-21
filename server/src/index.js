const express = require("express");
require("dotenv").config();
const cors = require("cors");

const v1ItemRouter = require("./v1/routes/itemRoutes");
const v1RecipeRouter = require("./v1/routes/recipeRoutes");
const v1UserRouter = require("./v1/routes/userRoutes");
const v1ListRouter = require("./v1/routes/listRoutes");

const app = express();
const PORT = process.env.APP_PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/v1/items", v1ItemRouter);
app.use("/api/v1/recipes", v1RecipeRouter);
app.use("/api/v1/users", v1UserRouter);
app.use("/api/v1/lists", v1ListRouter);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});

