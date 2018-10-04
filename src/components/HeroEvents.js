import React from 'react'
import HeroDetailsItem from './HeroDetailsItem';
import Heading from './Heading';
import styled from 'styled-components';
import { Row, Col, Skeleton, Divider, Button } from 'antd';
import fetchData from '../util/fetchData';
import { addHttps } from '../util/util';

const LoadMore = styled(Button)`
    margin: 30px auto 50px;
    display: block !important;
`;

class HeroEvents extends React.Component {
    defaultState = {
        eventDetails: [],
        loading: true,
        offset: 0,
    };

    constructor(props) {
        super(props);
        this.state = this.defaultState;
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    componentDidMount() {
        // Create placeholder loading effect while data being fetched
        this.createPlaceholderData(this.props.comics.available, this.state.eventDetails.length);
        this.getData();
    }
 
    componentDidUpdate(prevProps) {
        // Set initial state when collection URI changed
        if(prevProps.comics.collectionURI !== this.props.comics.collectionURI) {
            this.setState({ ...this.defaultState }, () => {
                this.createPlaceholderData(this.props.comics.available, this.state.eventDetails.length);
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
                eventDetails: prevState.eventDetails.concat(arr)
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

    async getData() {
        const returnData = await fetchData(addHttps(this.props.comics.collectionURI), 8, this.state.offset);

        const formatReturnData = returnData.data.data.results.map( data => {
            return {
                id: data.id,
                title: data.title,
                img: data.thumbnail && `${data.thumbnail.path}/portrait_small.${data.thumbnail.extension}`,
                description: data.description ? data.description : 'Sorry, No Description available.',
                url: data.resourceURI
            }
        })

        this.setState((prevState) => {
            // Delete fake data
            prevState.eventDetails.splice(prevState.eventDetails.length - formatReturnData.length, formatReturnData.length);
            return {
                eventDetails: prevState.eventDetails.concat(formatReturnData),
                loading: false,
                offset: prevState.eventDetails.length + formatReturnData.length,
            }
        });
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
                        this.state.eventDetails.map( (event, index) => (
                            <Col key={index} xs={24} sm={12} md={8} lg={6}>
                                <HeroDetailsItem
                                    handleDrawer={this.props.handleDrawer} 
                                    loading={this.state.loading} 
                                    event={event}
                                />
                            </Col>
                        ))
                    }
                </Row>
                {
                    this.props.comics.available > this.state.eventDetails.length && 
                    <LoadMore type="primary" onClick={this.handleLoadMore}>Load More</LoadMore>
                }
            </div>
        )
    }
}

export default HeroEvents;