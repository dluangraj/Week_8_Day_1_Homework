import React, { useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, GridSelectionModel } from '@mui/x-data-grid';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { CarForm } from '../../components';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'make',
    headerName: 'Make',
    width: 150,
    editable: true,
  },
  {
    field: 'model',
    headerName: 'Model',
    width: 150,
    editable: true,
  },
  {
    field: 'year',
    headerName: 'Year',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'color',
    headerName: 'Color',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 150,
    editable: true,
  }
];

interface gridData{
    data:{
        id?:string;
    }
}
export const DataTable = () => {
    let { carData, getData } = useGetData();
    let [open, setOpen] = useState(false);
    let [gridData, setData] = useState<GridSelectionModel>([])

    let handleOpen = () => {
        setOpen(true);
    }
    let handleClose = () => {
        setOpen(false);
    }

    let deleteData = async () => {
        await serverCalls.delete(`${gridData[0]}`)
        getData();
    }

    console.log(gridData) // a list of ID's from checked rows

    return (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={carData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={newSelectionModel => setData(newSelectionModel)}
            {...carData}
          />
          <Button onClick={handleOpen} color='primary'>Update</Button>
          <Button onClick={deleteData} color='warning'>Delete</Button>
          {/* Dialog Popup */}
          <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
              <DialogTitle id='form-dialog-title'>Update a Car</DialogTitle>
              <DialogContent>
                  <DialogContentText>Car ID: {gridData[0]}</DialogContentText>
                  <CarForm id={`${gridData[0]}`}/>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
              </DialogActions>
          </Dialog>
        </div>
      );
  }