import React from 'react';
import Header from './Header';
import HeroEvents from './HeroEvents';
import fetchData from '../util/fetchData';
import config from '../config';
import { addHttps } from '../util/util';
import { Alert } from 'antd';

class HeroDetails extends React.Component {
    
    // Default State
    defaultState = {
        results: null,
        error: null,
    }

    constructor(props) {
        super(props);
        this.state = this.defaultState;
    }

    componentDidUpdate(prevProps) {
        // Clear all data and re-fetch if id changed
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({ ...this.defaultState });
            this.getData();
        }
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        // Build URL
        const url = addHttps(config.charactersUrl + '/' + this.props.match.params.id);
        
        try {
            const returnData = await fetchData(url);
            // console.log(returnData.data.data.results[0]);
    
            this.setState(() => {
                return {
                    results: returnData.data.data.results[0]
                }
            })
        } catch(error) {
            this.setState(() => {
                return {
                    error: error
                }
            })
        }

    }

    render() {
        return (
            <div>
                {
                    this.state.error && 
                    <Alert message="Warning Text" type="warning" />
                }
                <Header homeView={false} hero={this.state.results}/>

                <div className="container">
                    {   
                        this.state.results &&
                        this.state.results.comics.available > 0 &&

                        <HeroEvents
                            title="Comics"
                            comics={this.state.results.comics}
                        />
                    }

                    {   
                        this.state.results &&
                        this.state.results.series.available > 0 &&

                        <HeroEvents
                            title="Series"
                            comics={this.state.results.series}
                        />
                    }

                    {   
                        this.state.results &&
                        this.state.results.events.available > 0 &&

                        <HeroEvents
                            title="Events"
                            comics={this.state.results.events}
                        />
                    }

                    {   
                        this.state.results &&
                        this.state.results.stories.available > 0 &&

                        <HeroEvents
                            title="Stories"
                            comics={this.state.results.stories}
                        />
                    }
                </div>
            </div>
        )
    }
} 

export default HeroDetails;