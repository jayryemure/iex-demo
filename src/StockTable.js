import React from 'react';
import { Table, Button } from 'react-bootstrap';

function StockTable(props) {

    return (
        <div className='App-table'>
            <Table striped bordered hover  variant="dark">
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Latest Price</th>
                        <th>Change</th>
                        <th>Change Percent</th>
                        <th>Company Name</th>
                    </tr>
                </thead>
                <tbody>
                    {props.stocks.map(e =>
                        <tr key={e.symbol}>
                            <td>{e.symbol}</td>
                            <td>{e.latestPrice}</td>
                            <td>{e.change}</td>
                            <td>{Math.round(((e.changePercent * 100) + Number.EPSILON) * 100) / 100} %</td>
                            <td className="Cell-left-align" >{e.companyName}</td>
                            <td><Button variant="info" onClick={() => props.onRefresh(e)}>Refresh</Button></td>
                            <td><Button variant="danger" onClick={() => props.onRemove(e)}>x</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default StockTable;
