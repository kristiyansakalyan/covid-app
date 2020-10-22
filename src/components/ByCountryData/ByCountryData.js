import React from 'react';

export const ByCountryData = (props) => {

    return (
        <div>
            Show data for: {props.match.params.country}
        </div>
    );
}