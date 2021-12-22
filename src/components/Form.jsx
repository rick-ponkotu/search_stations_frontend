import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            results:[],
            lists:[],
            limit_distance:"",
            lon:"",
            lat:"",
        }
    }

    render() {
        return (
            <div className="App">
            <p>探索範囲(km)</p>
            <input type="text" name="limit_distance" onChange={this.handleChange} value={this.state.limit_distance}/>
            <p>経度</p>
            <input type="text" name="lon" onChange={this.handleChange} value={this.state.lon}/>
            <p>緯度</p>
            <input type="text" name="lat" onChange={this.handleChange} value={this.state.lat}/>
            <button onClick={this.handleSubmit}>
                検索
            </button>

            {this.state.results.map((result)=>(
                <div key={result.id}>
                    <p>駅名:{result.station_name}</p>
                    <p>路線名:{result.line_name}</p>
                    <p>距離:{result.distance}km</p>
                    <p>----------------------</p>
                </div>
            ))}
        </div>
        );
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            limit_distance:this.state.limit_distance - 0,
            lon:this.state.lon - 0,
            lat: this.state.lat - 0,
        };
        console.log(data)
        axios.post("http://localhost:8080/stations", data)
            .then(res => {
                this.setState({results: res.data.selected_stations})
                console.log(res);
                console.log(res.data);
                console.log(res.data.selected_stations);
            })

        this.setState({
            lists: [
                ...this.state.lists,
                {
                    limit_distance: this.state.limit_distance,
                    lon: this.state.lon,
                    lat: this.state.lat,
                }],
            limit_distance:"",
            lon:"",
            lat:"",
        });
    }}
export default Form;