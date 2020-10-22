import React, {useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { FETCH_ALLCOUNTRIES_REQUEST } from '../../actions/types';



const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },

    formControl: {
      margin: theme.spacing(1),
      minWidth: 180
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


export const ByCountryForm = (props) => {

    const classes = useStyles();

    const dispatch = useDispatch()

    const countries = useSelector(state => state.allCountries.data, shallowEqual);


    const [fromSelectedDate, setFromSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [toSelectedDate, setToSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    const [country, setCountry] = React.useState('');

    const handleFromDateChange = (date) => {
      setFromSelectedDate(date);
    };
    const handleToDateChange = (date) => {
        setToSelectedDate(date);
    };
    const handleChange = (event) => {
        setCountry(event.target.value);
    };


    useEffect(() => {
        dispatch({type: FETCH_ALLCOUNTRIES_REQUEST});
    }, [dispatch])

    if(!countries) return null;

    // TODO: SORT the countries in Form Select... Style everything

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="From"
                        value={fromSelectedDate}
                        onChange={handleFromDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                        <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="To"
                        value={toSelectedDate}
                        onChange={handleToDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        />
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Country</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={country}
                            onChange={handleChange}
                            >
                                {countries.map((country, index) => (
                                    <MenuItem key={index} value={index}>
                                        {country.Country}
                                    </MenuItem>
                                ))}
                                
                            </Select>
                        </FormControl>
                        <Button variant="contained" size="large" color="primary" className={classes.margin}>
                            GO
                        </Button>
                    </Grid>
                </MuiPickersUtilsProvider>
            </Container>
        </React.Fragment>
    );
};