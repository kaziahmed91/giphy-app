import React from 'react';
import classes from './Result.scss'


const Result = (props) => {
    
    return (
        <img 
            className={classes.masonry_brick} 
            src={props.imgUrl} 
            id={props.id} alt="gif" 
            rating={props.rating}
            onClick={() => props.onClickHandler(props)}
        />
    );
};

export default Result;