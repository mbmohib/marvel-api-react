import React from 'react'
import BannarHomeView from './BannarHomeView'
import BannarDetailsView from './BannarDetailsView'

const Bannar = props => (
    <div>
        {
            props.homeView ? 
            <BannarHomeView /> : 
            <BannarDetailsView hero={props.hero}/>
        }
    </div>
)

export default Bannar
