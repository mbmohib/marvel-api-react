import React from 'react'
import { Drawer, List, Divider, Button } from 'antd'
import DefaultCover from '../images/default-cover.jpeg';
import styled from 'styled-components';
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

const parseID = (str) => {
    return str.match(/\d{3,}/).join('');
}

const EventDetails = props => (
    <Drawer
        width={'70%'}
        placement="right"
        closable={true}
        onClose={props.toggleDrawer}
        visible={!!props.eventDetails}
    >
        <Thumbnail 
            src={
                props.eventDetails.thumbnail ? 
                addHttps(`${props.eventDetails.thumbnail.path}/portrait_small.${props.eventDetails.thumbnail.extension}`) : 
                DefaultCover
            } 
            alt={props.eventDetails && props.eventDetails.title}
            />

        <EventsInfo>
            <h2>{props.eventDetails && props.eventDetails.title}</h2>
            <p>
                {props.eventDetails && props.eventDetails.description}
            </p>
        </EventsInfo>

        <Divider>Specification</Divider>

        <List
            bordered
            dataSource={props.eventDetails.meta}
            renderItem={item => (<List.Item>{item.title} : {item.value}</List.Item>)}
        />

        <Divider>Charecters ({props.eventDetails && props.eventDetails.characters.available})</Divider>

        <List
            loading={!props.eventDetails}
            bordered
            dataSource={props.eventDetails && props.eventDetails.characters.items}
            renderItem={item => (
                <List.Item>
                    <List.Item.Meta
                        title={item.name}
                    />
                    <Link to={`/hero/${
                            props.eventDetails && parseID(item.resourceURI)}`}>
                        <Button 
                            type="primary"
                            onClick={props.toggleDrawer}
                            >
                            View
                        </Button>
                    </Link>
                </List.Item>
            )}
        />
    </Drawer>
)

export default EventDetails
