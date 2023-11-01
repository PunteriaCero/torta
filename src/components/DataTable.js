import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

export default function CustomizedTables({
  showSections,
  sections,
  targets,
  selectedRow,
}) {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        style={{ backgroundColor: 'rgb(37, 36, 36)', borderRadius: '10px' }}
        aria-label="customized table"
      >
        <TableHead>
          {
            showSections ? (
              <TableRow>
                <StyledTableCell align="center" style={{ width: 50 }}>
                  Label
                </StyledTableCell>
                <StyledTableCell align="center" style={{ width: 50 }}>
                  Start Angle
                </StyledTableCell>
                <StyledTableCell align="center" style={{ width: 50 }}>
                  End Angle
                </StyledTableCell>
                <StyledTableCell align="center" style={{ width: 50 }}>
                  Inner Radius
                </StyledTableCell>
                <StyledTableCell align="center" style={{ width: 50 }}>
                  Outer Radius
                </StyledTableCell>
              </TableRow>
            ) : (
              <TableRow>
                <StyledTableCell align="center" style={{ width: 50 }}>Label</StyledTableCell>
                <StyledTableCell align="center" style={{ width: 50 }}>Angle</StyledTableCell>
                <StyledTableCell align="center" style={{ width: 50 }}>Radius</StyledTableCell>
              </TableRow>
            ) // Targets
          }
        </TableHead>
        <TableBody>
          {showSections
            ? sections.map((row) => (
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
            : targets.map((row) => (
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
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
