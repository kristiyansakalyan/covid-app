import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


export const GlobalDataTable = () => {

    const classes = useStyles();
    
    const data = useSelector(state => state.data, shallowEqual);

    if(!data.loading) {
        console.log(data);
        return (
            <div>
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Country</TableCell>
                        <TableCell align="right">Total cases</TableCell>
                        <TableCell align="right">Total deaths</TableCell>
                        <TableCell align="right">Total recovered</TableCell>
                        <TableCell align="right">New cases</TableCell>
                        <TableCell align="right">New deaths</TableCell>
                        <TableCell align="right">New recovered</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={'World'}>
                            <TableCell align="right"><b>World</b></TableCell>
                            <TableCell align="right">{data.data.Global.TotalConfirmed}</TableCell>
                            <TableCell align="right">{data.data.Global.TotalDeaths}</TableCell>
                            <TableCell align="right">{data.data.Global.TotalRecovered}</TableCell>
                            <TableCell align="right">{data.data.Global.NewConfirmed}</TableCell>
                            <TableCell align="right">{data.data.Global.NewDeaths}</TableCell>
                            <TableCell align="right">{data.data.Global.NewRecovered}</TableCell>
                        </TableRow>
                    {data.data.Countries.map((country) => (
                        <TableRow key={country.Country}>
                            <TableCell align="right">{country.Country}</TableCell>
                            <TableCell align="right">{country.TotalConfirmed}</TableCell>
                            <TableCell align="right">{country.TotalDeaths}</TableCell>
                            <TableCell align="right">{country.TotalRecovered}</TableCell>
                            <TableCell align="right">{country.NewConfirmed}</TableCell>
                            <TableCell align="right">{country.NewDeaths}</TableCell>
                            <TableCell align="right">{country.NewRecovered}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </div>
        ) 
    } else {
        return <div><CircularProgress/> </div>
    }
};

