import React from 'react';

function FeedbackRow(props) {

  return(
    <tr className={props.rowClass}>
      <td className="text-left">
        {props.label}
        <button 
          type="button" 
          id={`${props.buttonID}Button`}
          className="btn btn-outline-secondary ml-1 py-0 px-1 border-0" 
          data-toggle="tooltip" 
          data-trigger="focus"  
          data-placement="top"
          data-container={`#${props.buttonID}Button`}
          data-template='<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner text-left"></div></div>'
          title={props.tooltip}
          style={{height: '1.75rem'}}
        >
          <i className={props.iconStyles}></i>
        </button> 
      </td>
      <td className={props.valueClass}>{props.value}</td>
    </tr>
  );
}

FeedbackRow.defaultProps = {
  rowClass: '',
}

export default FeedbackRow;