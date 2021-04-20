import React, {useMemo} from "react";
import {useTable, useSortBy, useFilters, usePagination} from "react-table"
import 'bootstrap/dist/css/bootstrap.min.css';
//import styled from 'styled-components'

// const Styles = styled.div`
//   padding: 1rem;

//   table {
//     border-spacing: 0;
//     border: 1px solid black;

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;

//       :last-child {
//         border-right: 0;
//       }
//     }
//   }
// `

function Table({columns, data}) {
  const defaultColumn = useMemo(
    () => ({
      Filter: TextFilter,
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
    state: {pageIndex, pageSize},
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    gotoPage,
    pageCount,
   } = useTable({columns, data, defaultColumn, initialState: {pageIndex:0, pageSize:2}}, useFilters,useSortBy, usePagination,);
  
   return (
    <div>
      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} 
                  style = {{
                    borderBottom: 'solid 2px green',
                    borderRight: 'solid 2px green',
                    borderLeft: 'solid 2px green',
                    borderTop: 'solid 2px green',
                    color: 'black',
                    fontWeight: 'bold',
                  }}>{column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}
                  style = {{
                    borderBottom: 'solid 1px black',
                    borderRight: 'solid 1px black',
                    borderLeft: 'solid 1px black',
                    color: 'black',
                  }}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="pagination">
        <li onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          <a className="page-link">{'<<'}</a>
        </li>{' '}
        <li className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
          <a className="page-link">{'<'}</a>
        </li>{' '}
        <li onClick={() => nextPage()} disabled={!canNextPage}>
          <a className="page-link">{'>'}</a>
        </li>{' '}
        <li onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          <a className="page-link">{'>>'}</a>
        </li>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{}

      </div>

    </div>
   )
}

function TextFilter({
  column: { filterValue, preFilteredRows, setFilter },
 }) {
  const count = preFilteredRows.length
 
  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
      placeholder={`Search ${count} records...`}
    />
  )
 }



export default function App() {
  const data = useMemo(() =>
  [
  {
  name: 'Kim Parrish',
  address: '4420 Valley Street, Garnerville, NY 10923',
  date: '07/11/2020',
  order: '87349585892118',
  },
  {
  name: 'Michele Castillo',
  address: '637 Kyle Street, Fullerton, NE 68638',
  date: '07/11/2020',
  order: '58418278790810',
  },
  {
  name: 'Eric Ferris',
  address: '906 Hart Country Lane, Toccoa, GA 30577',
  date: '07/10/2020',
  order: '81534454080477',
  },
  {
  name: 'Gloria Noble',
  address: '2403 Edgewood Avenue, Fresno, CA 93721',
  date: '07/09/2020',
  order: '20452221703743',
  },
  {
  name: 'Darren Daniels',
  address: '882 Hide A Way Road, Anaktuvuk Pass, AK 99721',
  date: '07/07/2020',
  order: '22906126785176',
  },
  {
  name: 'Ted McDonald',
  address: '796 Bryan Avenue, Minneapolis, MN 55406',
  date: '07/07/2020',
  order: '87574505851064',
  },
  ],
  []
 );
  const columns = useMemo(
    () => [
    {
    Header: 'User Info',
    columns: [
    {
    Header: 'Name',
    accessor: 'name',
    sortType: 'alphanumeric',
    },
    {
    Header: 'Address',
    accessor: 'address',
    sortType: 'alphanumeric',
    },
    ],
    },
    {
    Header: 'Order Info',
    columns: [
    {
    Header: 'Date',
    accessor: 'date',
    sortType: 'alphanumeric',
    },
    {
    Header: 'Order #',
    accessor: 'order',
    sortType: 'alphanumeric',
    },
    ],
    },
    ],
    []
    );

  return (
    <div>
      <Table columns={columns} data={data}/>
    </div>
  );
}