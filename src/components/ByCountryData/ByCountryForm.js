import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { FETCH_ALLCOUNTRIES_REQUEST } from '../../actions/types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import history from '../../history';
import { FETCH_BYCOUNTRY_DATA_REQUEST } from '../../actions/types';


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
    
    const newDate = new Date();
    newDate.setHours(0,0,0,0);

    const [fromSelectedDate, setFromSelectedDate] = React.useState(new Date('2020-03-01').toISOString());
    const [toSelectedDate, setToSelectedDate] = React.useState(newDate.toISOString());
    const [country, setCountry] = React.useState('');

    const handleFromDateChange = (date) => {  
        const newDate = new Date(date);
        newDate.setHours(0,0,0,0);
        setFromSelectedDate(newDate.toISOString());
    };
    const handleToDateChange = (date) => {
        const newDate = new Date(date);
        newDate.setHours(0,0,0,0);
        setToSelectedDate(newDate.toISOString());
    };
    const handleChange = (value) => {
        setCountry(value);
    };
    const handleOnFormSubmit = () => {
        if(!country) setCountry('Germany');
        const payload = {
            Country: country.Slug,
            from: fromSelectedDate,
            to: toSelectedDate
        }
        dispatch({type: FETCH_BYCOUNTRY_DATA_REQUEST, payload: payload});
        history.push(`/bycountry/${country.Slug}`);
    }


    useEffect(() => {
        if(!countries) {
            dispatch({type: FETCH_ALLCOUNTRIES_REQUEST});
        }
    }, [dispatch, countries])

    if(!countries) return null;
    
    countries.sort(function(a,b) {
        var x = a.Country.toLowerCase();
        var y = b.Country.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });

    // TODO: SORT the countries in Form Select... Style everything

    return (
        <React.Fragment>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container spacing={1} >
                        
                        <Grid item xs={2}>
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
                            minDate={new Date('2020-03-01')}
                            maxDate={new Date()}
                            />
                        </Grid>
                        <Grid item xs={2}>

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
                            minDate={new Date('2020-03-01')}
                            maxDate={new Date()}
                            />
                        </Grid>
                        <Grid item xs={3}>

                            <Autocomplete
                                id="country-combo-box"
                                options={countries}
                                getOptionLabel={(country) => country.Country}
                                fullWidth
                                style={{height: '100%'}}
                                renderInput={(params) => <TextField {...params} label="Country" variant="outlined" />}
                                onChange={(e,v) => handleChange(v)}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <Button fullWidth variant="contained" size="large" color="primary" className={classes.margin} onClick={() => handleOnFormSubmit()}>
                                GO
                            </Button>
                        </Grid>
                    </Grid>
                </MuiPickersUtilsProvider>
        </React.Fragment>
    );
};