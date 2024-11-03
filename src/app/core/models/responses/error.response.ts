import { HttpErrorResponse } from '@angular/common/http';

export type ValidationError = {
  field: string;
  message: string;
};

export type ErrorResponse = {
  status: number;
  title: string;
  details: string;
  errors?: ValidationError[];
};

export const GetErrorResponse = (error: HttpErrorResponse): ErrorResponse => {
  const errorResponse: ErrorResponse = {
    status: error.error.status,
    title: error.error.title,
    details: error.error.details,
  };

  if (error.error.errors) {
    errorResponse.errors = error.error.errors;
  }

  return errorResponse;
};
