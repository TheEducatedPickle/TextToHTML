import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputList from './InputList'
import Output from './Output'
import AppBar from './MenuBar'
import HTMLElement from '../models/HTMLElement'

const styles = theme => ({
    input: {
        position: 'fixed',
        right: '2%',
        width: '44%',
        marginTop: '2%'
    },
    output: {
        position: 'fixed',
        left: 0,
        width: '50%',
        marginTop: '2%',
        margin: '2%',
    }
})

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            elementArray: [new HTMLElement(1)],
        };
        this.handleAddElement = this.handleAddElement.bind(this);
        this.handleRemoveElement = this.handleRemoveElement.bind(this);
        this.handleChangeElement = this.handleChangeElement.bind(this);
        this.handleSetType = this.handleSetType.bind(this);
    }

    //Adds an input element to the array
    handleAddElement(depth, childData) {
        if (childData !== undefined) {
            childData.parent.addChild(new HTMLElement(depth));
            this.forceUpdate();
            return;
        }
        //console.log(this.state.elementArray);
        this.setState(prevState => ({
            elementArray: prevState.elementArray.concat(new HTMLElement(depth)),
        }))
    }

    //Removes an element at a given index from the list
    handleRemoveElement(index) {
        //console.log('Deleting element at index ' + index);
        this.setState(prevState => ({
            elementArray: prevState.elementArray.slice(0, index).concat(prevState.elementArray.slice(index + 1))
        }))
    }

    handleChangeElement(string, index) {
        let stateCopy = Object.assign({}, this.state);
        stateCopy.elementArray = stateCopy.elementArray.slice();
        Object.assign({}, stateCopy.elementArray[index]);
        stateCopy.elementArray[index].setContent(string);
        this.setState(stateCopy);
    }

    handleSetType(value, index) {
        let stateCopy = Object.assign({}, this.state);
        stateCopy.elementArray = stateCopy.elementArray.slice();
        Object.assign({}, stateCopy.elementArray[index]);
        stateCopy.elementArray[index].setType(value);
        //console.log(index + " : " + stateCopy.elementArray[index].type);
        this.setState(stateCopy);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className='container'>
                <AppBar />
                <div className={classes.output}>
                    <Output elementArray={this.state.elementArray} />
                </div>
                <div className={classes.input}>
                    <InputList
                        elementArray={this.state.elementArray}
                        handleAddElement={this.handleAddElement}
                        handleChangeElement={this.handleChangeElement}
                        handleRemoveElement={this.handleRemoveElement}
                        handleSetType={this.handleSetType}
                    />
                </div>
            </div>
        );
    }
}


App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);