import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import GeneResultsTable from './components/GeneResultsTable';
import Logo from './images/logo-light-2x.png';


import Autosuggest from 'react-autosuggest';

// Imagine you have a list of genes that you'd like to autosuggest.
let genes = [
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : genes.filter(lang =>
        lang.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => {
    console.log('SUGGESTIONS ',suggestion)
    return suggestion;
}

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
        {suggestion}
    </div>
);

const onSuggestionHighlighted = ({ suggestion }) => {
    console.log(suggestion);
}

class App extends React.Component {
    constructor() {
        super();

        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
            value: '',
            suggestions: [],
            specificGenes: []
        };
    }
    getData = function (newValue) {
        var that = this;
        console.log(newValue);
        var url = 'http://clinvitae.invitae.com/api/v1/suggest?genes=' + newValue;

        fetch(url)
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(data) {
                that.setState({ suggestions: data });
                if (data.length === 1) {
                    console.log('HIT!!! ', data);
                    that.getGenesFromApi(data);
                    that.onSuggestionsClearRequested ();
                }
            });
    };

    getGenesFromApi = function (gene) {
        var that = this;
        console.log('getGenesFromApi = ' + this.state.specificGenes.length);
        var url = 'http://clinvitae.invitae.com/api/v1/variants?q=' + gene;

        fetch(url)
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(data) {

                console.log('Received data ', data);
                if (data.length === 1) {
                    console.log('HIT!!! ', data);
                    that.onSuggestionsClearRequested();

                }
                that.setState({ specificGenes: data });
            });
    }

    onChange = (event, { newValue }) => {
        console.log('ON change called >>>>>>>');
        this.onSuggestionsClearRequested ();
        this.setState({
            value: newValue
        });
        this.getData(newValue);
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {

        console.log('onSuggestionsFetchRequested ', value);

        if (this.state.suggestions.length === 1) return;
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    sortDataAscending = (geneData, sortBy) => geneData.sort((a, b) => (typeof a[sortBy] === 'string' && typeof b[sortBy] === 'string') && a[sortBy].localeCompare(b[sortBy]));
    sortDataDescending = (geneData, sortBy) => geneData.sort((a, b) => (typeof a[sortBy] === 'string' && typeof b[sortBy] === 'string') && b[sortBy].localeCompare(a[sortBy]));


    handleTableHeaderClick = (event) => {
        console.log('handleTableHeaderClick', event);
        const sortBy = event.target.dataset.type;
        event.target.dataset.sort = (event.target.dataset.sort === 'descending' || !event.target.dataset.sort) ? 'ascending' : 'descending';
        const geneData = this.state.specificGenes;

        const sorted =  ((event.target.dataset.sort === 'ascending') && this.sortDataAscending(geneData, sortBy))
                        ||
                        this.sortDataDescending(geneData, sortBy);

        sorted && this.setState({specificGenes: sorted});
    };
    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Enter Gene',
            value,
            onChange: this.onChange
        };

        // Finally, render it!
        return (
            <section>
                <img id="logoInvitae" src={Logo} />
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    onSuggestionHighlighted={onSuggestionHighlighted}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
                <GeneResultsTable
                    geneData={this.state.specificGenes}
                    handleTableHeaderClick={this.handleTableHeaderClick}
                />
            </section>

        );
    }
}

export default App;
