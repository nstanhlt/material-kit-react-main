import { Button, Card, Modal, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { ViewNote } from '../../services/note/dto/ViewNote';
import ReactQuill from 'react-quill';
import axios from 'axios';

interface INhapMau {
    onDone: () => void;
    onCancel: () => void;
    selectedRow: ViewNote | undefined;
    isEdit?: boolean;
    visible: boolean;
}

const DialogNewNote: React.FC<INhapMau> = ({ onDone, onCancel, selectedRow, isEdit= false ,visible}) => {
    const [value, setValue] = useState('');
    const [saveValue, setSaveValue] = useState(false);
    const [open, setOpen] = useState(false);
  

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
      ];
      
      const modules = {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['clean'],
        ],
      };

      useEffect(() => {
       
          setOpen(visible);
       
      }, [visible]);

      useEffect(() => {
        if (!isEdit && selectedRow) {
          setValue(selectedRow.noiDung!);
        }
      }, [isEdit]);

    useEffect(() => {
        if (saveValue) {
          (async function run() {
            try {
              const response = await axios.post(
                'http://localhost:44311/api/services/app/Todo/Create',
                null,
                { params: { text: value } }
              );
              return response.data;
            } catch (error) {
              console.error(error);
              return null;
            }
          })();
        }
      }, [value, saveValue]);
      
    return (

        <Modal
          title="Nhập note"
          open={open}
          width={'90%'}
          onOk={() => {                   
                  if (onDone) {
          onDone();
          }
          onCancel();                
          }}
          onCancel={() => onCancel()}>
          <Card>
      <Space direction="vertical">
        <h3>WEEKLY Notes</h3>
      </Space>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
      />
      {saveValue ? (
        <Button
          type="primary"
          onClick={() => {
            setValue('');
            setSaveValue(false);
          }}
        >
          Tạo mới
        </Button>
      ) : (
        <Button type="primary" onClick={() => setSaveValue(true)}>
          Lưu
        </Button>
      )}
    </Card>
            </Modal>
     
    );
};
export default DialogNewNote;
