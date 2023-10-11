import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDataSelector, useItemSelector } from '../../redux/hooks/dataHooks';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const dataHook = useDataSelector();
  const selectedRow = useItemSelector();
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 700 }}
        style={{ backgroundColor: 'rgb(37, 36, 36)', borderRadius: '10px' }}
        aria-label="customized table"
      >
        <TableHead>
          {
            //Sections
            dataHook?.sections?.length ? (
              <TableRow>
                <StyledTableCell align="center">Label</StyledTableCell>
                <StyledTableCell align="center">Start Angle</StyledTableCell>
                <StyledTableCell align="center">End Angle</StyledTableCell>
                <StyledTableCell align="center">Inner Radius</StyledTableCell>
                <StyledTableCell align="center">Outer Radius</StyledTableCell>
              </TableRow>
            ) : (
              //Targets
              <TableRow>
                <StyledTableCell align="center">Label</StyledTableCell>
                <StyledTableCell align="center">Angle</StyledTableCell>
                <StyledTableCell align="center">Radius</StyledTableCell>
              </TableRow>
            )
          }
        </TableHead>
        <TableBody>
          {
            //Sections
            dataHook?.sections?.length
              ? dataHook.sections.map((row) => (
                  <StyledTableRow
                    key={row.label}
                    style={{
                      backgroundColor:
                        selectedRow?.label === row.label
                          ? 'rgb(0, 189, 88)'
                          : 'rgb(82, 82, 82)',
                    }}
                  >
                    <StyledTableCell style={{ color: 'white' }} align="center">
                      {row.label}
                    </StyledTableCell>
                    <StyledTableCell style={{ color: 'white' }} align="center">
                      {row.startAngle}
                    </StyledTableCell>
                    <StyledTableCell style={{ color: 'white' }} align="center">
                      {row.endAngle}
                    </StyledTableCell>
                    <StyledTableCell style={{ color: 'white' }} align="center">
                      {Math.trunc(row.innerRadius * 100)}
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ color: 'white' }}>
                      {Math.trunc(row.outerRadius * 100)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : //Targets
                dataHook.targets.map((row) => (
                  <StyledTableRow
                    key={row.label}
                    style={{
                      backgroundColor:
                        selectedRow?.label === row.label
                          ? 'rgb(0, 189, 88)'
                          : 'rgb(82, 82, 82)',
                    }}
                  >
                    <StyledTableCell style={{ color: 'white' }} align="center">
                      {row.label}
                    </StyledTableCell>
                    <StyledTableCell style={{ color: 'white' }} align="center">
                      {row.angle}
                    </StyledTableCell>
                    <StyledTableCell style={{ color: 'white' }} align="center">
                      {Math.round(row.radius * 100)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
