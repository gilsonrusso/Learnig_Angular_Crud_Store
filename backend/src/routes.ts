import { Router } from "express";
import { productsController } from "./controllers/ProductsController";

const router = Router();

router.get("/products", productsController.list);
router.post("/products", productsController.create);
router.put("/products/:id", productsController.update);
router.get("/products/:id", productsController.findOne);

export { router };
