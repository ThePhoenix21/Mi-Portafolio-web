import React from 'react'

export const Background = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full">
            <video className="absolute top-0 left-0 w-full h-full object-cover" src="/programming.mp4" autoPlay loop muted></video>
            <div className="absolute inset-0 bg-black opacity-80"></div>
        </div>
    )
}
