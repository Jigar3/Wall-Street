import React from "react"
import Autosuggest from 'react-autosuggest';

const symbols = require("../assets/sym.tsx");

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : symbols.symbol.filter(sym =>
        sym.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
    <div id="suggestion_box">
        {suggestion.name}
    </div>
);


class AutoCompleteInput extends React.Component {

    state = {
        value: '',
        suggestions: []
    }

    onChange = (event, { newValue }) => {
        this.setState({value: newValue})
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
            this.setState({
            suggestions: []
        });
    };
    
    

    render() {
        const { value, suggestions } = this.state;

        const inputProps = {
            placeholder: 'Enter a NASDAQ Stock Symbol(Ex.AAPL)',
            value,
            onChange: this.onChange
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
        )
    }
}

export default AutoCompleteInput