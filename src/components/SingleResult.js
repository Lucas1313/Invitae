import React from 'react';
import ArrayItem from "./ArrayItem"

const SingleResult = function(props) {
    const className = (props.index % 2 === 0 && 'even') || 'odd';

    return (
            <tr key={props.index} className={className}>
                {
                    props.fields.map( (field, index) => {
                        if (field.type) {
                            switch (field.type) {
                                case 'Array':
                                    if (props.geneData[field.name].length === 1 && props.geneData[field.name][0] === '') return <dt>-</dt>;
                                    return (<td id={ field.name + '-' + props.index} key={index} className="collapsable collapsed" >
                                        <ArrayItem key={index} field={props.geneData[field.name]} index={index}/>
                                    </td>);
                                case 'href':
                                    return <td key={index} ><a href={props.geneData[field.name]} id={ field.name + '-' + props.index} key={index}>ClinVar</a></td>;
                            }
                        }

                        return <td id={ field.name + '-' + props.index} key={index}> {`${props.geneData[field.name]}`}</td>;
                    })
                }

            </tr>
        )
};
export default SingleResult;