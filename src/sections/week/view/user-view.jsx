import React from 'react';
import { Col, Row, Card, Badge, Space, Input, Calendar, Descriptions } from 'antd';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
      ];
      break;
    case 10:
      listData = [
        { type: 'warning', content: 'This is warning event.' },
        { type: 'success', content: 'This is usual event.' },
        { type: 'error', content: 'This is error event.' },
      ];
      break;
    case 15:
      listData = [
        { type: 'warning', content: 'This is warning event' },
        { type: 'success', content: 'This is very long usual event......' },
        { type: 'error', content: 'This is error event 1.' },
        { type: 'error', content: 'This is error event 2.' },
        { type: 'error', content: 'This is error event 3.' },
        { type: 'error', content: 'This is error event 4.' },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
  return null;
};

const App = () => {
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return (
    <Space direction="vertical">
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Button variant="contained" color="inherit">
          Week
        </Button>
      </Stack>

      <Row gutter={20}>
        <Col span={12}>
          <Card>
            <h3>This month will be:</h3>
            <Input style={{ border: 'none', borderBottom: '2px solid green', borderRadius: 0 }} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Row>
              <Col span={6}>
                <h3>
                  GOALDS <br /> of the month:
                </h3>
              </Col>
              <Col span={18}>
                <Row direction="vertical">
                  <Input
                    prefix="1."
                    style={{ border: 'none', borderBottom: '2px solid green', borderRadius: 0 }}
                  />
                  <Input
                    prefix="2."
                    style={{ border: 'none', borderBottom: '2px solid green', borderRadius: 0 }}
                  />
                  <Input
                    prefix="3."
                    style={{ border: 'none', borderBottom: '2px solid green', borderRadius: 0 }}
                  />
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row gutter={5}>
        <Col span={4}>
          <Card>
            <Descriptions title="Note">
              <Descriptions.Item>Coding</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={20}>
          <Card>
            <Calendar cellRender={cellRender} />
          </Card>
        </Col>
      </Row>
    </Space>
  );
};

export default App;
