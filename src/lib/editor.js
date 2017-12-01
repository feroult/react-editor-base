import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Handler from './handler/handler';
import Grid from './grid';
import {Tab, TabGroup} from './tabs';

class Editor extends Component {

    static childContextTypes = {
        handler: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.handler = new Handler(props.value);
        this.initChildren();
    }

    initChildren() {
        let all = React.Children.toArray(this.props.children);
        const tabs = [];
        const other = [];
        all.forEach(child => {
            if (child.type === Tab) {
                tabs.push(child);
            } else {
                other.push(child);
            }
        });

        this.children = other;

        if (tabs.length > 0) {
            this.children.push(<TabGroup key="tab-group" tabs={tabs}/>);
        }
    }

    getChildContext() {
        return {handler: this.handler};
    }

    render() {
        return (
            <section onFocus={this.handler.onFocus} onBlur={this.handler.onBlur}>
                {this.children}
            </section>
        );
    }

}

Object.assign(Editor, {Grid, Tab});
export default Editor;
export {Grid, Tab};
