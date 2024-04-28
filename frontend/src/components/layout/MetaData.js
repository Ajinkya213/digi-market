import React from 'react'
import { Helmet } from 'react-helmet'

const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{`${title} - Farmer's Market`}</title>
        </Helmet>
    )
}

export default MetaData
