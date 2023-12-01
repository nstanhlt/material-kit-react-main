import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Card, Space, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import noteServices from '../../../services/note/noteServices';
import { useLocation } from 'react-router-dom';

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

function MyComponent() {
  const [value, setValue] = useState('');
  const [saveValue, setSaveValue] = useState(false);

  const location = useLocation();
  const noteExits = location.state?.note;

  useEffect(() => {
    if (noteExits) {
      setValue(noteExits.noiDung);
    }
  }, []);

  useEffect(() => {
    if (saveValue) {
      (async function run() {
        try {
          if (noteExits) {
            const response = await noteServices.edit(noteExits.id, value);
          } else {
            const response = await noteServices.create(value);
          }
          return response.data;
        } catch (error) {
          console.error(error);
          return null;
        }
      })();
    }
  }, [value, saveValue]);

  return (
    <Card>
      <Space direction="vertical">
        <h3>Create Notes</h3>
      </Space>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={(value) => setValue(value)}
        modules={modules}
        formats={formats}
      />
      {saveValue ? (
        <Button
          style={{ marginTop: 20 }}
          type="primary"
          onClick={() => {
            setValue('');
            setSaveValue(false);
          }}
        >
          Tạo mới
        </Button>
      ) : (
        <Button style={{ marginTop: 20 }} type="primary" onClick={() => setSaveValue(true)}>
          Lưu
        </Button>
      )}
    </Card>
  );
}
export default MyComponent;
