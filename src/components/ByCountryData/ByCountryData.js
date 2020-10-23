import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';

import { EventTracker } from '@devexpress/dx-react-chart';

export const ByCountryData = (props) => {

    const [targetItem, setTargetItem] = useState('');

    const data = useSelector(state => state.byCountryData.data,shallowEqual);
    const loading = useSelector(state => state.byCountryData.loading,shallowEqual);

    if(!data && !loading) {
        return <div>Go to By Country Page!</div>
    }
    
    if(!data && loading) {
        return <div> Loading... </div>
    }
/*
    const compare = data.data[0]

    if(data && data.data[0].Slug !== props.match.params.country) {
        return <div> Go to By Country Page!</div>
    }
*/

    const newData = data.data.map((country) => {
        const date =  new Date(country.Date);
        return {
            Date: date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear(),
            Confirmed: country.Confirmed
        }
    })

    return (
        <Paper>
        <Chart
          data={newData}
        >
          <ArgumentAxis />
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