import { Request, Response } from 'express';
import { Investment } from '../models/Investment';
import { insertInvestmentSchema, insertUserInvestmentSchema } from '../../shared/schema';
import { z } from 'zod';
import { storage } from '../storage';

export const getInvestments = async (req: Request, res: Response) => {
  try {
    const investments = await Investment.find({ isActive: true }).lean();
    
    res.json(investments);
  } catch (error) {
    console.error('Error fetching investments:', error);
    res.status(500).json({ message: 'Error fetching investments' });
  }
};

export const createInvestment = async (req: Request, res: Response) => {
  try {
    const validatedData = insertInvestmentSchema.parse(req.body);
    
    const newInvestment = new Investment(validatedData);
    await newInvestment.save();
    
    res.status(201).json(newInvestment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid investment data', errors: error.errors });
    }
    console.error('Error creating investment:', error);
    res.status(500).json({ message: 'Error creating investment' });
  }
};

export const getInvestmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const investment = await Investment.findById(id).lean();
    
    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }
    
    res.json(investment);
  } catch (error) {
    console.error('Error fetching investment:', error);
    res.status(500).json({ message: 'Error fetching investment' });
  }
};

export const getUserInvestments = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    if (!userId || isNaN(Number(userId))) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    
    const userInvestments = await storage.getUserInvestments(Number(userId));
    
    // Get full investment details for each user investment
    const completeUserInvestments = await Promise.all(
      userInvestments.map(async (userInvestment) => {
        const investment = await storage.getInvestmentById(userInvestment.investmentId);
        return {
          ...userInvestment,
          investment
        };
      })
    );
    
    res.json(completeUserInvestments);
  } catch (error) {
    console.error('Error fetching user investments:', error);
    res.status(500).json({ message: 'Error fetching user investments' });
  }
};

export const createUserInvestment = async (req: Request, res: Response) => {
  try {
    const validatedData = insertUserInvestmentSchema.parse(req.body);
    
    // Check if investment exists and has enough available shares
    const investment = await storage.getInvestmentById(validatedData.investmentId);
    
    if (!investment) {
      return res.status(404).json({ message: 'Investment not found' });
    }
    
    if (investment.availableShares < validatedData.shares) {
      return res.status(400).json({ message: 'Not enough shares available' });
    }
    
    // Update investment available shares
    await storage.updateInvestment(
      validatedData.investmentId, 
      { availableShares: investment.availableShares - validatedData.shares }
    );
    
    // Create user investment
    const newUserInvestment = await storage.createUserInvestment(validatedData);
    
    res.status(201).json(newUserInvestment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid user investment data', errors: error.errors });
    }
    console.error('Error creating user investment:', error);
    res.status(500).json({ message: 'Error creating user investment' });
  }
};
