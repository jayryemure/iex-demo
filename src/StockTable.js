import React from 'react';
import { Table, Button } from 'react-bootstrap';
//const { Client } = require("iexjs");

//const client = new Client({ api_token: "Tpk_9798a473127d47489effffb395d3e420", version: "sandbox" });

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
                    </tr>
                </thead>
                <tbody>
                    {props.stocks.map(e =>
                        <tr key={e.symbol}>
                            <td>{e.symbol}</td>
                            <td>{e.latestPrice}</td>
                            <td>{e.change}</td>
                            <td>{Math.round(((e.changePercent * 100) + Number.EPSILON) * 100) / 100} %</td>
                            <td><Button variant="info" onClick={() => props.onRefresh(e)}>Refresh</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default StockTable;