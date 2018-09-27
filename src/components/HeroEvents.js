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
    constructor(props) {
        super(props);
        this.state = {
            eventDetails: [],
            loading: true,
            offset: 0,
        }
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    createPlaceholderData() {
        const arr = [];
        for(let i =0; i<8; i++) {
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

    componentDidMount() {
        this.createPlaceholderData();
        this.getData();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.comics.collectionURI !== this.props.comics.collectionURI) {

            this.setState(() => {
                return {
                    eventDetails: [],
                    loading: true,
                    offset: 0,
                }
            }, () => {
                this.createPlaceholderData();
                this.getData();
            })
        };
    }

    handleLoadMore() {
        this.createPlaceholderData();
        this.setState(prevState => {
            return {
                offset: prevState.offset + prevState.eventDetails.length,
                loading: true
            }
        })

        this.getData();
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
            prevState.eventDetails.splice(prevState.eventDetails.length - formatReturnData.length, formatReturnData.length);
            return {
                eventDetails: prevState.eventDetails.concat(formatReturnData),
                loading: false
            }
        });
    }


    render() {
        return (
            <div>
                <Divider>
                    <Heading size="2rem">
                        <Skeleton
                            loading={this.state.loading}
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
                            <Col key={index} span={6}>
                                <HeroDetailsItem
                                    handleDrawer={this.props.handleDrawer} 
                                    loading={this.state.loading} 
                                    event={event}
                                />
                            </Col>
                        ))
                    }
                </Row>

                <LoadMore type="primary" onClick={this.handleLoadMore}>Load More</LoadMore>
            </div>
        )
    }
}

export default HeroEvents;
