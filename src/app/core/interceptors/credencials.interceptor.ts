import { HttpInterceptorFn } from '@angular/common/http';

export const CredentialsInterceptor: HttpInterceptorFn = (req, next) => {
    const modifiedReq = req.clone({
        withCredentials: true,
    });
    return next(modifiedReq);
};
