import React, { useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
const { Client } = require("iexjs");

const client = new Client({ api_token: "Tpk_9798a473127d47489effffb395d3e420", version: "sandbox" });

function StockDetails() {

    const [form, setForm] = useState({})
    const [results, setResults] = useState([])
    const [validated, setValidated] = useState(false);
    const [customValidation, setCustomValidation] = useState(null);

    const setField = (field, value) => {
        setCustomValidation(null);

        setForm({
            ...form,
            [field]: value
        })
    }

    const getFormError = () => {
        const { symbol } = form

        // Symbol errors
        if (!symbol || symbol === '' ) {
            return 'Symbol is required!'
        } else if (customValidation) {
            return customValidation;
        }

        return null;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!getFormError()) {
            const { symbol } = form;

            // Check for duplicate symbol, bail if so
            if (results.some(e => e.symbol.toLowerCase() === symbol.toLowerCase())) {
                return;
            }

            client.quote(symbol).then((e) => {
                setResults(results => [...results, e]);
            }).catch((e) => {
                setCustomValidation(e.toString());
                console.log(e);
            })
        }
    };

    return (
        <>
            <Form noValidate onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group controlId="validationCustom01">
                        <Form.Label>Ticker symbol</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter ticker symbol" 
                            isInvalid={getFormError()}
                            onChange={e => setField('symbol', e.target.value)} />
                        { customValidation && 
                            <Form.Control.Feedback type="invalid">
                                { customValidation }
                            </Form.Control.Feedback>
                        }
                        <Form.Text className="text-muted">
                            Enter ticket symbol to add it to the table below
                        </Form.Text>
                    </Form.Group>
                </Form.Row>
                <Button type="buttom" disabled={getFormError()}>Submit</Button>
            </Form>

            { results.length > 0 &&
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
                            {results.map(e =>
                                <tr key={e.symbol}>
                                    <td>{e.symbol}</td>
                                    <td>{e.latestPrice}</td>
                                    <td>{e.change}</td>
                                    <td>{Math.round(((e.changePercent * 100) + Number.EPSILON) * 100) / 100} %</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            }
        </>
    );
}

export default StockDetails;
