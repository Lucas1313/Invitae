import React from 'react';
import SingleResult from './SingleResult'
import style from './css/geneResultTable.css';
import Arrow from './../images/sort_asc.png'
const GeneResultsTable = function (props) {
    const fieldsAll = [
        {name: 'accessionId', alias: 'Accession Id', sortOrder: 21},
        {name: 'acmgClassification', alias: 'ACGM Class', sortOrder: 22},
        {name: 'alias', alias: 'Alias', display: 'default', sortOrder: 4},
        {name: 'classification', alias: 'Classification', sortOrder: 9},
        {name: 'defaultNucleotideChange', alias: 'Default Nucleotide Change', sortOrder: 10},
        {name: 'description', alias: 'Description', sortOrder: 11},
        {name: 'gene', alias: 'Gene', display: 'default', sortOrder: 1},
        {name: 'id', alias: 'id', sortOrder: 13},
        {name: 'lastEvaluated', alias: 'Last Evaluated', display: 'default', sortOrder: 6},
        {name: 'lastUpdated', alias: 'Last Updated', display: 'default', sortOrder: 7},
        {name: 'nucleotideChanges', alias: 'Nucleotide Change', display: 'default', sortOrder: 2, type: 'Array'},
        {name: 'proteinChange', alias: 'Proteine Change', display: 'default', sortOrder: 3},
        {name: 'region', alias: 'Region', display: 'default', sortOrder: 5},
        {name: 'reportedClassification', alias: 'Reported Classification', display: 'default', sortOrder: 6},
        {name: 'source', alias: 'Source', sortOrder: 15},
        {name: 'submitter', alias: 'Submitter', sortOrder: 16},
        {name: 'submitterComment', alias: 'Submitter Comment', sortOrder: 17},
        {name: 'url', alias: 'More Info',  display: 'default', sortOrder: 8, type: 'href'},
        {name: 'variationId', alias: 'Variation ID', sortOrder: 19},
        {name: 'version', alias: 'Version', sortOrder: 20}
    ];

    function compare(a, b) {
        // Use toUpperCase() to ignore character casing
        const A = a.sortOrder;
        const B = b.sortOrder;

        let comparison = 0;
        if (A > B) {
            comparison = 1;
        } else if (A < B) {
            comparison = -1;
        }
        return comparison;
    }
    const fieldsSorted = fieldsAll.sort(compare);
    const fields = fieldsSorted.filter((field) => field.display && field.display === 'default')
    const header = fields.map((field, index)  => {
        return <th id={ 'header-' +field.name}
                   key={index}
                   data-type={field.name}
                   className={"tableHeader" + (typeof props.geneData[0][field.name] === 'string') ? 'sortable' : ''}
                   style={{'gridColumnStart': index+1}}
                   onClick={props.handleTableHeaderClick}>
                        {field.alias}{props.geneData[0] && (typeof props.geneData[0][field.name] === 'string') && <img className={"ascArrow asc"} src={Arrow}/> }
                    </th>;
    })
    return (
        <table className="genesTable" style={style}><tbody>
            <tr>{header}</tr>
            {props.geneData.map(function(geneData, index){
                return <SingleResult key={index} index={index} geneData={geneData} fields={fields} />;
            })}
        </tbody></table>
    );
};
export default GeneResultsTable;
