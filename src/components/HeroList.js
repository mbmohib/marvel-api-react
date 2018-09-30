import React from 'react';
import { Row, Col } from 'antd';
import Hero from './Hero';
import records from '../data';
import Header from './Header';

class HeroList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.setState(() => {
            return {
                data: records
            }
        })
    }

    render() {
        return (
            <div>
                {/* Show Header for home page */}
                <Header homeView/>

                <div className="container">
                    <Row gutter={24}>
                        {this.state.data.map( hero => (
                            <Col key={hero.id} xs={12} sm={8} md={8} lg={6}>
                                <Hero hero={hero}/>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        )
    }
}

export default HeroList;