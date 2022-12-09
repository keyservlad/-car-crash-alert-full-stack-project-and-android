import { ErrorRequestHandler } from 'express';
import { Prisma } from '@prisma/client';
import SimpleError from './simple';

const types = {
  SIMPLE: 'SIMPLE',
  DB_OPERATION: 'DB_OPERATION',
  UNHANDLED_ERROR: 'UNHANDLED_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
};

const errorHandler: ErrorRequestHandler = async (error, req?, res?, next?) => {


  // Simple error
  if (error instanceof SimpleError) {
    return res.status(error.status).json({
      _type: types.SIMPLE,
      detail: error.detail,
    });
  }


  // Prisma error
  if (error instanceof Prisma.PrismaClientKnownRequestError) {

    return res.status(500).json({
      _type: types.DB_OPERATION,
      detail: 'Unhandled error',
      error: JSON.stringify(error),
    });
  }

  return res.status(500).json({
    _type: types.UNHANDLED_ERROR,
    detail: 'Unhandled error',
    error: JSON.stringify(error)
  });
};

export default errorHandler;