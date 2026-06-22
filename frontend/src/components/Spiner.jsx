import React from 'react'

const Spiner = ({ className = '' }) => {
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className={`${className} border-TEXT border-t-transparent rounded-full animate-spin`} />
        </div>
    )
}

export default Spiner