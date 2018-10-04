import React from 'react'
import HeroDetailsItem from './HeroDetailsItem';
import Heading from './Heading';
import EventDetails from './EventDetails';
import styled from 'styled-components';
import { Row, Col, Skeleton, Divider, Button } from 'antd';
import fetchData from '../util/fetchData';
import { addHttps } from '../util/util';
import moment from 'moment';

const LoadMore = styled(Button)`
    margin: 30px auto 50px;
    display: block !important;
`;

class HeroEvents extends React.Component {
    defaultState = {
        events: [],
        loading: true,
        offset: 0,
        eventDetails: null
    };

    constructor(props) {
        super(props);
        this.state = this.defaultState;

        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    componentDidMount() {
        // Create placeholder loading effect while data being fetched
        this.createPlaceholderData(this.props.comics.available, this.state.events.length);
        this.getData();
    }
 
    componentDidUpdate(prevProps) {
        // Set initial state when collection URI changed
        if(prevProps.comics.collectionURI !== this.props.comics.collectionURI) {
            this.setState({ ...this.defaultState }, () => {
                this.createPlaceholderData(this.props.comics.available, this.state.events.length);
                this.getData();
            })
        };
    }

    createPlaceholderData(totalAvailable, offset) {
        let count;
        if (totalAvailable > 8 && offset === 0) {
            // Create 8 placeholder Check if total collection greater then 8
            // and request for first time
            count = 8;
        } else if (totalAvailable < (offset + 8)) {
            // If the next request will exceed the total
            count = totalAvailable - offset
        } else {
            count = 8;
        }

        // Fake data for placeholder 
        const arr = [];
        for(let i =0; i < count; i++) {
            arr.push({
                title: undefined,
                img: undefined,
                description: undefined
            })
        }

        this.setState((prevState) => {
            return {
                events: prevState.events.concat(arr)
            }
        })
    }

    handleLoadMore() {
        this.setState(() => {
            return {
                loading: true
            }
        }, () => {
            this.createPlaceholderData(this.props.comics.available, this.state.offset);
            this.getData();
        })

    }

    formatData(results) {
        return results.map( data => {
            return {
                id: data.id,
                title: data.title,
                img: data.thumbnail && `${data.thumbnail.path}/portrait_small.${data.thumbnail.extension}`,
                description: data.description ? data.description : 'Sorry, No Description available.',
                url: data.resourceURI,
                extraInfo: {
                    characters: data.characters,
                    thumbnail: data.thumbnail,
                    meta: [
                        { 
                            title: 'Issue No',
                            value: data.issueNumber || 'Not Available'
                        },
                        { 
                            title: 'ISBN',
                            value: data.isbn || 'Not Available'
                        },
                        { 
                            title: 'Date',
                            value: data.dates ? moment(data.dates[0].date).format('MMM Do YYYY') : 'Not Available'
                        }
                    ]
                }
            }
        })
    }

    async getData() {
        const returnData = await fetchData(addHttps(this.props.comics.collectionURI), 8, this.state.offset);

        const formatReturnData = this.formatData(returnData.data.data.results);

        this.setState((prevState) => {
            // Delete fake data
            prevState.events.splice(prevState.events.length - formatReturnData.length, formatReturnData.length);
            return {
                events: prevState.events.concat(formatReturnData),
                offset: prevState.events.length + formatReturnData.length,
                loading: false,
            }
        });
    }

    toggleDrawer(id) {
        // Add Event Detail when clicked
        const findEventDetails = this.state.events.find( event => event.id === parseInt(id, 10));

        this.setState((prevState) => {
            return {
                eventDetails: findEventDetails && findEventDetails.extraInfo
            }
        })
    }

    render() {
        return (
            <div>
                <Divider>
                    <Heading size="2rem">
                        <Skeleton
                            loading={!this.props.comics}
                            paragraph={false}
                            title={{ width: '100px' }}
                        >
                            {this.props.title}
                            ({this.props.comics.available})
                        </Skeleton>
                    </Heading>
                </Divider>

                <Row gutter={16}>
                    {
                        this.state.events.map( (event, index) => (
                            <Col key={index} xs={24} sm={12} md={8} lg={6}>
                                <HeroDetailsItem
                                    handleDrawer={this.toggleDrawer} 
                                    loading={this.state.loading} 
                                    event={event}
                                />
                            </Col>
                        ))
                    }
                </Row>
                {
                    this.props.comics.available > this.state.events.length && 
                    <LoadMore type="primary" onClick={this.handleLoadMore}>Load More</LoadMore>
                }

                {
                    this.state.eventDetails && 

                    <EventDetails 
                        toggleDrawer={this.toggleDrawer}
                        eventDetails={this.state.eventDetails}
                    />
                }
            </div>
        )
    }
}

export default HeroEvents;