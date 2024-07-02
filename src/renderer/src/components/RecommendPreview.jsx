import React, { useState, useEffect } from 'react'

export const RecommendPreview = ({gender}) => {


    return (
        <div className="w-full h-full flex justify-center items-center text-4xl">
            {gender}
        </div>
    )
}

export default RecommendPreview