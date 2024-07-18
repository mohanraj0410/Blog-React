import { MDBBadge } from 'mdb-react-ui-kit'
import React from 'react'

const Badge = ({ children, styleInfo }) => {

    const colorKey = {
        Travel: "primary",
        Fashion: "success",
        Fitness: "danger",
        sport: "warning",
        Food: "info",
        Tech: "dark"
    }

    return (
        <h5 style={styleInfo}>
            <MDBBadge color={colorKey[children]}>
                {children}
            </MDBBadge>
        </h5>
    )
}

export default Badge