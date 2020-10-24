import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import {FETCH_BYCOUNTRY_DATA_REQUEST} from '../../actions/types';
import { EventTracker } from '@devexpress/dx-react-chart';

export const ByCountryData = (props) => {

    const [targetItem, setTargetItem] = useState('');

    const data = useSelector(state => state.byCountryData.data,shallowEqual);
    const loading = useSelector(state => state.byCountryData.loading,shallowEqual);

    const dispatch = useDispatch();
    
    if(!loading) {
      if(!data) {
        dispatch({type: FETCH_BYCOUNTRY_DATA_REQUEST, payload: {
          Country: props.match.params.country,
          from: '2020-03-01T00:00:00Z', 
          to: new Date().toISOString()
        }});
        
        return <div> No Data! </div>
      }
      if(data && data.config.url !== `/country/${props.match.params.country}`) {
        console.log('First log: ' + data.config.url)
        console.log(`Second log: /country/${props.match.params.country}`)
        dispatch({type: FETCH_BYCOUNTRY_DATA_REQUEST, payload: {
          Country: props.match.params.country,
          from: '2020-03-01T00:00:00Z', 
          to: new Date().toISOString()
        }});
        return <div> Loading... </div>
      }
  
        
    }
    

    if(loading) {
      return <div> Loading... </div>
    }

    const newData = data.data.map((country) => {
        const date =  new Date(country.Date);
        return {
            Date: date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear(),
            Confirmed: country.Confirmed
        }
    });



    console.log(`Third log: /country/${props.match.params.country}`)
    console.log('Fourth log: ' + data.config.url)
    return (
        <Paper>
        <Chart
          data={newData}
        >
          {newData.length > 15 ? null : <ArgumentAxis />}
          <ValueAxis />

          <BarSeries
            valueField="Confirmed"
            argumentField="Date"
          />
          <Title
            text={`Confirmed cases in ${data.data[0].Country}`}
          />
          <EventTracker />
          <Tooltip targetItem={targetItem} onTargetItemChange={(target) => setTargetItem(target)} />
        </Chart>
      </Paper>
    );
}