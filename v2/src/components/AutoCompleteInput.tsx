import React from "react"
import Autosuggest from 'react-autosuggest';
import store from "../reduxStore/store"

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : store.getState().symbol.filter(sym => {
            return sym.toLowerCase().slice(0, inputLength) === inputValue
        } 
    ).slice(0, 5);
};

const getSuggestionValue = suggestion => suggestion;

const renderSuggestion = suggestion => (
    <div>
        {suggestion}
    </div>
);


class AutoCompleteInput extends React.Component<any> {

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
            placeholder: this.props.placeholder,
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