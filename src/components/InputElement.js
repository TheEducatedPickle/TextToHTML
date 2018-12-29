/*
Input element contains a single list item that takes user input via a text field
*/

import React from 'react';
import InputField from './InputTextField';
import InputDeleteButton from './InputDeleteButton';
import ListItem from '@material-ui/core/ListItem';
import InputTypeSelector from './InputTypeSelector';
import InputExtrasButton from './InputExtrasButton';

class InputElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: this.props.index,
            depth: this.props.element.getDepth(),
        }
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleAdd = () => {
        this.props.onAdd(this.state.depth+1, {parent: this.props.element})
    }

    handleTextChange(string) {
        this.props.onChange(string, this.state.index);
    }

    handleDelete = () => {
        this.props.onDelete(this.state.index);
    }

    handleSetType = (value) => {
        this.props.onTypeSelect(value, this.state.index);
    }

    render() {
        return (
            <ListItem style={{padding: 2, paddingLeft: (this.props.element.getDepth() - 1) * 25 }} disableGutters>
                <InputTypeSelector 
                    type={this.props.element.getType()} 
                    onChange={this.handleSetType}
                    label={'Block Type'}
                    options={[
                    {
                        label: 'Header',
                        value: 'h1',
                    },
                    {
                        label: 'Paragraph',
                        value: 'p'
                    },          
                    {
                        label: 'Div',
                        value: 'div',
                    },              
                    ]}
                />
                <InputField text={this.props.text} onChange={this.handleTextChange}/>
                <InputDeleteButton onClick={this.handleDelete}/>
                <InputExtrasButton onAdd={this.handleAdd}/>
            </ListItem>
        );
    }
}

export default InputElement;