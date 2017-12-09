import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import RenderUtil from '../util/render-util';

class Fuselage extends Component {
    constructor(props) {
        super(props);
        this._initChildren();
    }

    _initChildren() {
        let children = RenderUtil.splitChildren(this.props.children, {pages: Page});
        this.children = children.other;
        if ('pages' in children) {
            this.children.push(<PageGroup key="page-group" pages={children.pages}/>);
        }
    }

    render() {
        return (
            <BrowserRouter>
                <section>
                    {this.children}
                </section>
            </BrowserRouter>
        );
    }

}

const PageGroup = (props) => {
    console.log('pages', props.pages);
    return props.pages;
};

const Page = (props) => {
    return (
        <Route
            {...props}
            component={props.component}
        />);

};

Object.assign(Fuselage, {Page});
export default Fuselage;
export {Page};