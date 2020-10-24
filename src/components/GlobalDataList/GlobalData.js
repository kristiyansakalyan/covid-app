import React, { useEffect } from 'react';
import { shallowEqual, useSelector,useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import {GlobalDataTable} from './GlobalDataTable';
import {FETCH_DATA_REQUEST} from '../../actions/types';


export const GlobalData = () => {

    const {data} = useSelector(state => state.data, shallowEqual);
    const dispatch = useDispatch();


    useEffect(() => {
        if(!data) {
            dispatch({type: FETCH_DATA_REQUEST});
        }
    }, [dispatch, data]);

    if(!data) {
        return <div><CircularProgress/> </div>
    } 
    if(!data) {
        return <div>{data.error}</div>
    } 
    
    return (
        <div>
            <GlobalDataTable />
        </div>
    )
    

}