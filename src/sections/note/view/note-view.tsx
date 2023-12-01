import { Table, Button, Col, Row } from 'antd';
import React, { useState, useEffect } from 'react';
import noteServices from '../../../services/note/noteServices';
import { ViewNote } from '../../../services/note/dto/ViewNote';
import { PagedResultTotalDto } from '../../../services/dto/pagedResultTotalDto';
import columns from '../columns';
import DialogNewNote from '../DialogNewNote';
import { useNavigate  } from 'react-router-dom';

function ListNotes() {
  const [listNote, setListNote] = useState<PagedResultTotalDto<ViewNote>>();
  const [isLoadding, setIsLoadding] = useState(false);
  const [visibleDialogNewNote, setVisibleDialogNewNote] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ViewNote>();
  const navigate = useNavigate ();

  useEffect(() => {
    (async function run() {
      setIsLoadding(true);
      try {        
        const viewNotes = await noteServices.getAll();
        setListNote(viewNotes);
        setIsLoadding(false);
      } catch (error) {
        setIsLoadding(false);
        console.error(error);
      }
      setIsLoadding(false);
    })();
  }, []);

  return (
    <>
<Row>


    <Col span={12}><h3>NOTES</h3></Col>
    <Col span={12} style={{textAlign: "right"}}><Button
     type='primary'
     onClick={()=> navigate('/WeeklyNotes')}
     >New Note</Button></Col>

    <Col span={24}>
      <Table
        rowKey="id"
        bordered={true}
        pagination={false}
        columns={[
          ...columns,
          {
            title: '',
            dataIndex: 'action',
            key: 'action',
            width: 50,
            render: (text, record) => (
                <Button
                  type="link"
                  onClick={() => {
                    if (record !== undefined) {
                      navigate('/WeeklyNotes')
                      setSelectedRow(record);
                      setVisibleDialogNewNote(false);
                    }
                  }}
                >
                  xem
                </Button>
            ),
          },
        ]}
        loading={isLoadding}
        dataSource={listNote === undefined ? [] : listNote.items}
      />
    </Col>
  </Row>

    <DialogNewNote
    onDone={function (): void {
     setSelectedRow(undefined);
     setVisibleDialogNewNote(false);
    } }
    onCancel={function (): void {
      setSelectedRow(undefined)
      setVisibleDialogNewNote(false);
    } } 
     selectedRow={selectedRow}
     visible={visibleDialogNewNote}
     />
  
    </>
  );
}
export default ListNotes;
