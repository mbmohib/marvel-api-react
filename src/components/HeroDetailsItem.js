import React from 'react';
import { Skeleton, Button } from 'antd';
import styled from 'styled-components';
import { addHttps, truncateString } from '../util/util';
import DefaultCover from '../images/default-cover.jpeg';

const Card = styled.div`
    background: #fff;
    color: #666;
    box-shadow: 0 5px 15px rgba(0,0,0,.08);
    margin-bottom: 20px;
`;

const CardHeader = styled.header`
    padding: 30px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    
    h2 {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    img {
        margin-right: 15px;
        width: 50px;
        height: auto;
    }
`;

const CardArticle = styled.main`
    padding: 30px;
    border-bottom: 1px solid #e5e5e5;
    height: 150px;
`;

const CardFooter = styled.footer`
    padding: 30px;
`;

class HeroDetailsItem extends React.Component {
    render() {
        return (
                <Card>
                    <CardHeader>
                        <Skeleton 
                            loading={this.props.loading && !this.props.event.title}
                            active 
                            avatar={{shape: 'square'}} 
                            paragraph={false}
                            title={{ width: '130px' }}
                        >
                            <img src={this.props.event.img ? addHttps(this.props.event.img) : DefaultCover} alt={this.props.event && this.props.event.title}/>
                            <h2>{this.props.event && this.props.event.title}</h2>
                        </Skeleton>
                    </CardHeader>
    
                    <CardArticle>
                        <Skeleton
                            loading={this.props.loading && !this.props.event.description}
                            active 
                            title={false}
                            paragraph={{ rows: 3}}
                        >
                            {this.props.event.description && truncateString(this.props.event.description)}
                        </Skeleton>
                    </CardArticle>
    
                    <CardFooter>
                        <Skeleton 
                            loading={this.props.loading && !this.props.event.url}
                            active
                            paragraph={false}
                            title={{ width: '50px' }}
                        >
                            <Button 
                                onClick={() => this.props.handleDrawer(this.props.event.url)} 
                                type="dashed"
                            >
                                See Details
                            </Button>
                        </Skeleton>
                    </CardFooter>
                </Card>
        )
    }
    
};

export default HeroDetailsItem;
