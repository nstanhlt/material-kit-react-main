/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Card, Space, Button } from 'antd';
import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    console.log(value);
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
  );
}
export default MyComponent;
