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
                <Header homeView={true}/>

                <div className="container">
                    <Row gutter={24}>
                        {this.state.data.map( hero => (
                            <Col key={hero.id} span={6}>
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