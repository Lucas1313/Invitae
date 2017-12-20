import React, { Component } from 'react';
import ArrowImage from "./../images/expand_collapse-2x.png"

class ArrayItem extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            'listState': 'collapsed'
        };
    }

    onClickHandler = () => {
        const collapsed = this.state.listState === 'expanded' ? 'collapsed' : 'expanded';
        console.log("Click Handler " + this.state.listState);
        this.setState({listState: collapsed});
        return true;
    };

    render() {
        console.log("RENDERING ArrayItem")

        const image = <img className={'arrow ' +this.state.listState} src={ArrowImage} onClick={this.onClickHandler} />;

        const list = this.props.field.map((item, index) => {
                return   <div className={'arrayListItem '} key={index}>{item}</div>
            }
        );
        return <div className="collapsable-content" ><div className="arrow">{image}</div><section className={`arrayList ${this.state.listState}`}>{list}</section></div>;
    }
};

export default ArrayItem;