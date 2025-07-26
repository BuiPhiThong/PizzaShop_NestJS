import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {

    private getDefaultMessage(message: string): string {
        switch (message) {
            case 'POST':
                return 'Tạo mới thành công';
            case 'PATCH':
                return 'Chỉnh sửa thành công';
            case 'DELETE':
                return 'Xóa thành công';
            case 'GET':
                return 'Lấy dữ liệu thành công';
            default:
                return 'Yêu cầu API thành công';
        }
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
        return next.handle().pipe(
            map(data => {
                Logger.log(data);

                const path = context.switchToHttp().getRequest().path;
                const method = context.switchToHttp().getRequest().method;

                const message = typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean'
                    ? String(data) // Dùng string làm message luôn
                    : data && typeof data === 'object' && 'message' in data
                        ? data.message
                        : this.getDefaultMessage(method);


                const unwrapData = (input: any): any => {
                    if (input && typeof input === 'object' && 'message' in input && Object.keys(input).length === 1) {
                        return undefined;
                    }

                    if (input && typeof input === 'object' && 'data' in input && (Object.keys(input).length === 1 || (Object.keys(input).length === 2 && 'message' in input))) {
                        return input.data;
                    }
                    if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean') {
                        return undefined;
                    }
                    return input;
                };

                const rawData = unwrapData(data);
                return {
                    success: true,
                    message: message,
                    data: rawData,
                    date: new Date(),
                    path: path
                };
            })
        );
    }


}
