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
                const Path = context.switchToHttp().getRequest().path;
                const method = context.switchToHttp().getRequest().method;
                if (data && typeof data === 'object' && 'success' in data && 'message' in data) {
                    return data as ApiResponse<T>;
                }
                const customMessage = data && typeof data === 'object' && 'message' in data ? data.message : this.getDefaultMessage(method);
                const customData = data && typeof data === 'object' ? data.data : data;
                return {
                    success: true,
                    message: customMessage,
                    data: customData,
                    date: new Date(),
                    path: Path
                };
            })
        );
    }
}
