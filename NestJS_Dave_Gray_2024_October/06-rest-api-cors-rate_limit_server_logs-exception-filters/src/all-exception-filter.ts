import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';
import { MyLoggerService } from './my-logger/my-logger.service';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

type TypeMyResponseObj = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
};

export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly myLoggerService = new MyLoggerService(
    AllExceptionsFilter.name, // gives the context
  );

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const myResponseObj: TypeMyResponseObj = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: '',
    };

    if (exception instanceof HttpException) {
      myResponseObj.statusCode = exception.getStatus();
      myResponseObj.response = exception.getResponse();
    } else if (exception instanceof PrismaClientValidationError) {
      myResponseObj.statusCode = 422;
      myResponseObj.response = exception.message.replaceAll(/\n/g, '');
    } else {
      myResponseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      myResponseObj.response = 'Sorry: Internal Server Error';
    }

    response.status(myResponseObj.statusCode).json(myResponseObj);
    this.myLoggerService.error(
      myResponseObj.response,
      AllExceptionsFilter.name,
    );
    super.catch(exception, host);
  }
}
