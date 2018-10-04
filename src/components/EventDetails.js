import React from 'react'
import { Drawer, List, Divider, Button } from 'antd'
import DefaultCover from '../images/default-cover.jpeg';
import styled from 'styled-components';
import fetchData from '../util/fetchData';
import { addHttps } from '../util/util';
import { Link } from 'react-router-dom';


const Thumbnail = styled.img`
    max-width: 100%;
    display: block;
    margin: 0 auto;
`;

const EventsInfo = styled.div`
    h2 {
        font-size: 1.5rem;
    }
    
    p {
        font-size: 1rem;
    }
`;

class EventDetails extends React.Component {
    defaultState = {
        event: undefined,
        eventSpecification: undefined,
        drawer: true
    }
    constructor(props) {
        super(props);
        this.state = this.defaultState;
    }

    componentDidUpdate(prevProps) {
        if(prevProps.endpoint !== this.props.endpoint) {
            this.setState({ ...this.defaultState })
            this.getData();
        }
    }

    async getData() {
        const returnData = await fetchData(addHttps(this.props.endpoint));

        this.setState(() => {
            return {
                event: returnData.data.data.results[0],
                eventSpecification: [
                    {   
                        title: 'Issue Number',
                        value: returnData.data.data.results[0].issueNumber
                    },
                    {   
                        title: 'Total Page',
                        value: returnData.data.data.results[0].pageCount
                    },
                    {   
                        title: 'ISBN',
                        value: returnData.data.data.results[0].isbn
                    },
                    {   
                        title: 'Date',
                        value: returnData.data.data.results[0].dates && returnData.data.data.results[0].dates[0].date
                    },
                ]
            }
        })
    }

    parseID(str) {
        return str.match(/\d{3,}/).join('');
    }

    render() {
        return (
            <Drawer
                width={'70%'}
                placement="right"
                closable={true}
                onClose={this.props.closeDrawer}
                visible={this.props.visible}
            >
                <Thumbnail 
                    src={
                        this.state.event && 
                        this.state.event.thumbnail ? 
                        addHttps(`${this.state.event.thumbnail.path}/portrait_small.${this.state.event.thumbnail.extension}`) : 
                        DefaultCover
                    } 
                    alt={this.state.event && this.state.event.title}
                    />

                <EventsInfo>
                    <h2>{this.state.event && this.state.event.title}</h2>
                    <p>
                        {this.state.event && this.state.event.description}
                    </p>
                </EventsInfo>

                <Divider>Specification</Divider>

                <List
                    loading={!this.state.event}
                    bordered
                    dataSource={this.state.eventSpecification}
                    renderItem={item => (<List.Item>{item.title} : {item.value}</List.Item>)}
                />

                <Divider>Charecters ({this.state.event && this.state.event.characters.available})</Divider>

                <List
                    loading={!this.state.event}
                    bordered
                    dataSource={this.state.event && this.state.event.characters.items}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.name}
                            />
                            <Link to={`/hero/${
                                    this.state.event && this.parseID(item.resourceURI)}`}>
                                <Button 
                                    type="primary"
                                    onClick={this.props.closeDrawer}
                                    >
                                    View
                                </Button>
                            </Link>
                        </List.Item>
                    )}
                />
            </Drawer>
        )
    }
}

export default EventDetails
