import React from 'react';
import {Tab as SemanticTab} from 'semantic-ui-react'
import {observer} from 'mobx-react'

const Tab = (props) => {
    return props.children;
};

const TabGroup = observer(({state, tabs}) => {
    const panes = tabs.map((tab, index) => ({
        menuItem: tab.props.title,
        render: () => <SemanticTab.Pane>{tabs[index]}</SemanticTab.Pane>
    }));

    const onTabChange = (event, data) => state.tab = data.activeIndex;

    return (
        <section>
            <SemanticTab activeIndex={state.tab} onTabChange={onTabChange} panes={panes}/>
        </section>
    );
});


export {Tab, TabGroup};