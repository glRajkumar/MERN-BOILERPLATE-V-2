import React from 'react'

function ProgressBar({progress}) {
    return (
        <div className="container mb-4">
        <div className="progress">
            <div 
             className="progress-bar progress-bar-striped progress-bar-animated"
             role="progressbar"
             aria-valuenow={progress}
             aria-valuemin="0"
             aria-valuemax="100"
             style={{ width : progress + "%" }}
            >
                {progress} %
            </div>
        </div>
        </div>
    )
}

export default ProgressBar