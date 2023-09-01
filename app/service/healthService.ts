import { Request, Response } from 'express';

export const getHealth = async (req: Request, res: Response) => {
  res.status(200).send({ message: 'Template Service is up and running.' });
};
