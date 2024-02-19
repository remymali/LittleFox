import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import MockData from '../MOCK_DATA.json';
import COLUMNS from '../components/columns.jsx';
import './BasicTable.css';

const BasicTable = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MockData, []); // Use MockData instead of data
    console.log("data", data)
    const tableInstance = useTable({
        columns,
        data
    });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = tableInstance;

    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup, index) => (
                        <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, columnIndex) => (
                                <th key={columnIndex} {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, rowIndex) => {
                        prepareRow(row);
                        return (
                            <tr key={rowIndex} {...row.getRowProps()}>
                                {row.cells.map((cell, cellIndex) => (
                                    <td key={cellIndex} {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>

            </table>
        </div>
    );
};

export default BasicTable;
