import * as React from 'react';
import moment from 'moment';
import html2text from '../../utils/html2text';
import { Typography } from 'antd';
const { Text  } = Typography;

const EllipsisMiddle: React.FC<{ suffixCount: number; children: string }> = ({
  suffixCount,
  children,
}) => {
  const start = children.slice(0, children.length - suffixCount).trim();
  const suffix = children.slice(-suffixCount).trim();
  return (
    <Text style={{ maxWidth: '80%' }} ellipsis={{ suffix }}>
      {start}
    </Text>
  );
};


const columns = [
  {
    title: 'Thời gian tạo',
    dataIndex: 'thoiGianTao',
    key: 'thoiGianTao',
    width: 100,
    render: (value: string) => <div>{value ? moment(value).format("DD/MM/YYYY") : ""}</div>,
  },
  {
    title: 'Nội dung',
    dataIndex: 'noiDung',
    key: 'noiDung',
    // width: 200,  
    render: (value: string) =>
    <EllipsisMiddle suffixCount={15}>
  {html2text(value)}
  </EllipsisMiddle>
    ,
  },
];

export default columns;
