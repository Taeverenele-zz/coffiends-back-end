import express from "express";
import {
  getCoffees,
  createCoffee,
  deleteCoffee,
} from "../controllers/coffees.js";

const router = express.Router();

router.get("/", getCoffees);
router.post("/", createCoffee);
router.delete("/:id", deleteCoffee);

export default router;
