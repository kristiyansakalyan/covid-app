import React from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage'

const useStyles = makeStyles({
  table: {
    minWidth: 650,

  },
});

const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }));


function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onChangePage(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onChangePage(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onChangePage(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
  
  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };
  


/*
 under data.Global =>  {NewConfirmed, NewDeaths, NewRecovered, TotalConfirmed, TotalDeaths,TotalRecovered}
 under data.Countries => [] of Countries => 
    {
        Country: "Afghanistan"
        CountryCode: "AF"
        Date: "2020-10-21T14:57:08Z"
        NewConfirmed: 70
        NewDeaths: 2
        NewRecovered: 30
        Premium: {}
        Slug: "afghanistan"
        TotalConfirmed: 40357
        TotalDeaths: 1499
        TotalRecovered: 33790
    }
*/


export const GlobalDataTable = () => {

    const classes = useStyles();
    

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
 //   const [selected, setSelection] = React.useState(undefined);
  
   
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const data = useSelector(state => state.data, shallowEqual);
    
    // Use Grid from M-UI
    //TODO: refactor if statement and use pagination for the table...
    //TODO: sorting, filter by new Cases, search by country name, fitler by {this day, this week, this month}, menu on the side details..(timeline or chart)
    
    if(!data.loading) {
    

 /*    const newData = data.data.Countries.map((country, index) => {
      return {
        id: index,
        Country: country.Country,
        TotalConfirmed: country.TotalConfirmed,
        TotalRecovered: country.TotalRecovered,
        TotalDeaths: country.TotalDeaths,
        NewConfirmed: country.NewConfirmed,
        NewRecovered: country.NewRecovered,
        NewDeaths: country.NewDeaths
      }
    });

    const columns = [
      {field: 'Country', headerName: 'Country', width: 150},
      {field: 'TotalConfirmed', headerName: 'Total Confirmed', width: 150},
      {field: 'TotalRecovered', headerName: 'Total Recovered', width: 150},
      {field: 'TotalDeaths', headerName: 'Total Deaths', width: 150},
      {field: 'NewConfirmed', headerName: 'New Confirmed', width: 150},
      {field: 'NewRecovered', headerName: 'New Recovered', width: 150},
      {field: 'NewDeaths', headerName: 'New Deaths', width: 150},
    ]
 */
    
/*
--------------------NOTE: If you want to add an empty row with the corresponding height:---------------

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.data.Countries.length - page * rowsPerPage);
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                            </TableRow>
                        )}
*/
        return (
            <div>
              
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="custom pagination table">
                        <TableHead>
                        <TableRow>
                            <TableCell component="th" scope="th">Country</TableCell>
                            <TableCell style={{ width: 160 }} align="right">Total cases</TableCell>
                            <TableCell style={{ width: 160 }} align="right">Total deaths</TableCell>
                            <TableCell style={{ width: 160 }} align="right">Total recovered</TableCell>
                            <TableCell style={{ width: 160 }} align="right">New cases</TableCell>
                            <TableCell style={{ width: 160 }} align="right">New deaths</TableCell>
                            <TableCell style={{ width: 160 }} align="right">New recovered</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={'World'}>
                                <TableCell component="th" scope="th"><b>World</b></TableCell>
                                <TableCell style={{ width: 160 }} align="right">{data.data.Global.TotalConfirmed}</TableCell>
                                <TableCell style={{ width: 160 }} align="right">{data.data.Global.TotalRecovered}</TableCell>
                                <TableCell style={{ width: 160 }} align="right">{data.data.Global.NewConfirmed}</TableCell>
                                <TableCell style={{ width: 160 }} align="right">{data.data.Global.TotalDeaths}</TableCell>
                                <TableCell style={{ width: 160 }} align="right">{data.data.Global.NewDeaths}</TableCell>
                                <TableCell style={{ width: 160 }} align="right">{data.data.Global.NewRecovered}</TableCell>
                            </TableRow>
                        {(rowsPerPage > 0
                            ? data.data.Countries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : data.data.Countries
                        ).map((row) => (
                            <TableRow key={row.Country}>
                            <TableCell component="th" scope="row">
                                <Link onClick={() => console.log('test')} to={`byCountry/${row.Slug}`}>
                                    {row.Country}
                                </Link>  
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.TotalConfirmed}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.TotalDeaths}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.TotalRecovered}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.NewConfirmed}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.NewDeaths}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.NewRecovered}
                            </TableCell>
                            </TableRow>
                        ))}

                        </TableBody>
                        <TableFooter>
                        <TableRow>
                            <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={7}
                            count={data.data.Countries.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
        
            </div>
        ) 
    } else {
        return <div><CircularProgress/> </div>
    }
};

