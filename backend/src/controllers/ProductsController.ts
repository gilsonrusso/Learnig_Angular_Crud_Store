import { Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";

interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  statusProduct: string;
}

const products: IProduct[] = [];

class ProductsController {
  async create(request: Request, response: Response) {
    const { name, description, price, statusProduct } = request.body;

    const productExists = products.find((product) => product.name === name);

    if (productExists) {
      return response.status(400).json({ error: "Product already exists!" });
    }

    const product = {
      id: uuidV4(),
      name,
      description,
      price,
      statusProduct
    };

    products.push(product);

    return response
      .status(201)
      .json({ message: "Product created with succeffuly" });
  }

  async update(request: Request, response: Response) {
    const {id } = request.params;
    const { name, description, price, statusProduct } = request.body;

    const productIndex = products.findIndex((product) => product.id === id);
    
    if (productIndex === -1) {
      return response.status(400).json({ error: "Product not be exists!" });
    }
    
    Object.assign(products[productIndex], {
      name,
      description,
      price,
      statusProduct
    })

    return response
      .status(201)
      .json({ message: "Product updated with succeffuly" });
  }

  list(request: Request, response: Response) {
    return response.status(200).json(products);
  }

  findOne(request: Request, response: Response) {
    const { id } = request.params;

    const productExists = products.find((product) => product.id === id);

    if (!productExists) {
      return response.status(400).json({ error: "Product not be exists!" });
    }

    return response.status(200).json(productExists);
  }
}

const productsController = new ProductsController();
export { productsController };
