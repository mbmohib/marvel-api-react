import React from 'react';
import Header from './Header';
import HeroEvents from './HeroEvents';
import fetchData from '../util/fetchData';
import config from '../config';
import { addHttps } from '../util/util';
import EventDetails from './EventDetails';

class HeroDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: undefined,
            showDrawer: false,
            eventDetailsEndpoint: undefined
        }
        this.handleDrawer = this.handleDrawer.bind(this);
        this.showDrawer = this.showDrawer.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState(() => {
                return {
                    results: undefined,
                }
            })
            this.getData();
        }
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        // Build URL
        const url = addHttps(config.charactersUrl + '/' + this.props.match.params.id);
        const returnData = await fetchData(url);

        this.setState(() => {
            return {
                results: returnData.data.data.results[0]
            }
        })
    }

    showDrawer(endpoint) {

        this.setState(() => {
            return {
                eventDetailsEndpoint: endpoint && endpoint,
                showDrawer: true
            }
        })
    }

    handleDrawer() {
        this.setState(() => {
            return {
                showDrawer: false
            }
        })
    }

    render() {
        return (
            <div>
                <Header homeView={false} hero={this.state.results}/>

                <div className="container">
                    {   
                        this.state.results &&
                        this.state.results.comics.available > 0 &&

                        <HeroEvents
                            title="Comics"
                            comics={this.state.results.comics}
                            handleDrawer={this.showDrawer}
                        />
                    }

                    {   
                        this.state.results &&
                        this.state.results.series.available > 0 &&

                        <HeroEvents
                            title="Series"
                            comics={this.state.results.series}
                            handleDrawer={this.showDrawer}
                        />
                    }

                    {   
                        this.state.results &&
                        this.state.results.events.available > 0 &&

                        <HeroEvents
                            title="Events"
                            comics={this.state.results.events}
                            handleDrawer={this.showDrawer}
                        />
                    }

                    {   
                        this.state.results &&
                        this.state.results.stories.available > 0 &&

                        <HeroEvents
                            title="Stories"
                            comics={this.state.results.stories}
                            handleDrawer={this.showDrawer}
                        />
                    }
                </div>

                
                <EventDetails 
                    handleDrawer={this.handleDrawer} 
                    visible={this.state.showDrawer}
                    endpoint={this.state.eventDetailsEndpoint}    
                    />
            </div>
        )
    }
} 

export default HeroDetails;