import React from 'react'

function Alert(props) {
    return (
        <div style={{height: '50px', width:'fit-content', float: 'right', marginRight:'10px'}} className='mt-2 '>
        {props.alert && <div className={`alert alert-${props.alert.type} float-right alert-dismissible fade show`} role="alert">
          {props.alert.msg} 
        </div>}
        </div>
    )
}

export default Alert