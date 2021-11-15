import { Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";

interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
}

const products: IProduct[] = [];

class ProductsController {
  async create(request: Request, response: Response) {
    const { name, description, price } = request.body;

    const productExists = products.find((product) => product.name === name);

    if (productExists) {
      return response.status(400).json({ error: "Product already exists!" });
    }

    const product = {
      id: uuidV4(),
      name,
      description,
      price,
    };

    products.push(product);

    return response
      .status(201)
      .json({ message: "Product created with succeffuly" });
  }

  list(request: Request, response: Response) {
    return response.status(200).json(products);
  }
}

const productsController = new ProductsController();
export { productsController };
