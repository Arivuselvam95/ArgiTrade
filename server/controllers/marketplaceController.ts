import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { insertProductSchema } from '../../shared/schema';
import { z } from 'zod';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, minPrice, maxPrice, location } = req.query;
    
    let query: any = { isAvailable: true };
    
    if (category && category !== 'All Categories') {
      query.category = category;
    }
    
    if (minPrice && !isNaN(Number(minPrice))) {
      query.price = { $gte: Number(minPrice) };
    }
    
    if (maxPrice && !isNaN(Number(maxPrice))) {
      if (query.price) {
        query.price.$lte = Number(maxPrice);
      } else {
        query.price = { $lte: Number(maxPrice) };
      }
    }
    
    if (location && location !== 'All Locations') {
      // This would need a more complex geospatial query in a real application
      // Simplified for this example
      query.location = location;
    }
    
    const products = await Product.find(query).lean();
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const validatedData = insertProductSchema.parse(req.body);
    
    const newProduct = new Product(validatedData);
    await newProduct.save();
    
    res.status(201).json(newProduct);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid product data', errors: error.errors });
    }
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findById(id).lean();
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Update product fields
    Object.assign(product, req.body);
    
    await product.save();
    
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    await product.deleteOne();
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};
