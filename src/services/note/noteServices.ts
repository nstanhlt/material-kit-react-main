import { PagedResultTotalDto } from '../dto/pagedResultTotalDto';
import http from '../httpService';
import { ViewNote } from './dto/ViewNote';

class NoteServices {
    public async getAll(): Promise<PagedResultTotalDto<ViewNote>> {
        const result = await http.get('api/services/app/NoteAppservice/GetAll');
        return result.data.result;
    }
    public async create(noiDung: string): Promise<boolean> {
        const result = await http.post('api/services/app/NoteAppservice/Create', { noiDung: noiDung });
        return result.data.result;
    }
    public async edit(id: number, noiDung: string): Promise<boolean> {
        const result = await http.post('api/services/app/NoteAppservice/Edit', { id: id, noiDung: noiDung });
        return result.data.result;
    }
    public async delete(id: number): Promise<boolean> {
        const result = await http.delete('api/services/app/NoteAppservice/Edit', { params: { id: id } });
        return result.data.result;
    }
}

export default new NoteServices();
