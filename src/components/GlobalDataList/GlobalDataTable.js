import React from 'react';
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
import {Link} from 'react-router-dom';

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


export const GlobalDataTable = () => {

    const classes = useStyles();
    
    const data = useSelector(state => state.data, shallowEqual);
    
    // Use Grid from M-UI
    //TODO: refactor if statement and use pagination for the table...
    //TODO: sorting, filter by new Cases, search by country name, fitler by {this day, this week, this month}, menu on the side details..(timeline or chart)
    
    if(!data.loading) {
        return (
            <div>
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">Country</TableCell>
                        <TableCell align="center">Total cases</TableCell>
                        <TableCell align="center">Total deaths</TableCell>
                        <TableCell align="center">Total recovered</TableCell>
                        <TableCell align="center">New cases</TableCell>
                        <TableCell align="center">New deaths</TableCell>
                        <TableCell align="center">New recovered</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={'World'}>
                            <TableCell align="center"><b>World</b></TableCell>
                            <TableCell align="center">{data.data.Global.TotalConfirmed}</TableCell>
                            <TableCell align="center">{data.data.Global.TotalDeaths}</TableCell>
                            <TableCell align="center">{data.data.Global.TotalRecovered}</TableCell>
                            <TableCell align="center">{data.data.Global.NewConfirmed}</TableCell>
                            <TableCell align="center">{data.data.Global.NewDeaths}</TableCell>
                            <TableCell align="center">{data.data.Global.NewRecovered}</TableCell>
                        </TableRow>
                    {data.data.Countries.map((country) => (
                        <TableRow key={country.Country}>
                            <TableCell align="center">
                                <Link to={`byCountry/${country.Slug}`}>
                                    {country.Country}
                                </Link>    
                            </TableCell>
                            <TableCell align="center">{country.TotalConfirmed}</TableCell>
                            <TableCell align="center">{country.TotalDeaths}</TableCell>
                            <TableCell align="center">{country.TotalRecovered}</TableCell>
                            <TableCell align="center">{country.NewConfirmed}</TableCell>
                            <TableCell align="center">{country.NewDeaths}</TableCell>
                            <TableCell align="center">{country.NewRecovered}</TableCell>
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

