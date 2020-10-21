import React, { useEffect } from 'react';
import { shallowEqual, useSelector,useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import {GlobalDataTable} from './GlobalDataTable';


export const GlobalData = () => {

    const {data} = useSelector(state => state.data, shallowEqual);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch({type: 'FETCH_DATA_REQUESTED'});
    }, [dispatch]);

    if(data.loading) {
        return <div><CircularProgress/> </div>
    } 
    else if(data.error) {
        return <div>{data.error}</div>
    } 
    else {
        return (
            <div>
                <GlobalDataTable />
            </div>
        )
    }

}