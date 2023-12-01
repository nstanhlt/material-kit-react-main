import { PagedResultTotalDto } from '../dto/pagedResultTotalDto';
import http from '../httpService';
import { ViewNote } from './dto/ViewNote';

class NoteServices {
    public async getAll(): Promise<PagedResultTotalDto<ViewNote>> {
        const result = await http.get('api/services/app/Todo/GetAll');
        return result.data.result;
    }   
}

export default new NoteServices();
