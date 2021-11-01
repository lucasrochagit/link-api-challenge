import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const { ENV } = process.env;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const generic_exception_body = {
      message: 'An internal error occurred while making the request.',
      description:
        'Please check the submitted data in request or try again later.',
      request: {
        method: request.method,
        path: request.url,
        params: request.params,
        body: request.body,
      },
      details: exception.toString(),
    };

    const generic_exception = new InternalServerErrorException(
      generic_exception_body,
    );

    const [exception_status, exception_body] =
      exception instanceof HttpException
        ? [exception.getStatus(), exception.getResponse()]
        : [generic_exception.getStatus(), generic_exception.getResponse()];

    if (ENV === 'prod') {
      delete exception_body['details'];
      delete exception_body['request'];
    }

    response.status(exception_status).json(exception_body);
  }
}
