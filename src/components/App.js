import React from 'react';
import {GlobalData} from './GlobalDataList/GlobalData';
import {Router, Route, Switch} from 'react-router-dom';
import {Header} from './Header';
import history from '../history';
import { makeStyles } from '@material-ui/core/styles';
import { ByCountryForm } from './ByCountryData/ByCountryForm';
import { ByCountryData } from './ByCountryData/ByCountryData';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    }
}));


export default function App(props) {

    const classes = useStyles();

    return (
        
    <div className={classes.root}>
            <Router history={history}>
                <div className={classes.root}>
                    <Header />
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Switch>
                            <Route path="/" exact component={GlobalData} />
                            <Route path="/global" exact component={GlobalData} />
                            <Route path="/byCountry" exact component={ByCountryForm} />
                            <Route path="/byCountry/:country" exact component={ByCountryData} />
                        </Switch>
                    </main>
                </div>
            </Router>
        </div>
    );
}
