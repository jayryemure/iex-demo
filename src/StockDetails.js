import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import StockTable from './StockTable';
const { Client } = require("iexjs");

const client = new Client({ api_token: "Tpk_9798a473127d47489effffb395d3e420", version: "sandbox" });

// Adds extra loading time to simulate longer network requests
function simulateNetworkRequest(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
};

function StockDetails() {

    const [form, setForm] = useState({})
    const [isLoading, setLoading] = useState(false);
    const [results, setResults] = useState([])
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
        if (!symbol || symbol === '') {
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

            setLoading(true);
            simulateNetworkRequest(500).then(() => {
                client.quote(symbol).then((e) => {
                    setLoading(false);
                    setResults(results => [...results, e]);
                }).catch((e) => {
                    setCustomValidation(e.toString());
                    console.log(e);
                })
            });
        }
    };

    const handleRefresh = (stock) => {
        client.quote(stock.symbol).then((e) => {
            const updateResults = [...results];
            updateResults[updateResults.findIndex(x => x.symbol === stock.symbol)] = e
            setResults(updateResults);
        }).catch((e) => {
            console.log(e);
        })
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
                        {customValidation &&
                            <Form.Control.Feedback type="invalid">
                                {customValidation}
                            </Form.Control.Feedback>
                        }
                        <Form.Text className="text-muted">
                            Enter ticker symbol to add it to the table below
                        </Form.Text>
                    </Form.Group>
                </Form.Row>
                <Button
                    type="buttom"
                    disabled={isLoading || getFormError()}>
                    {isLoading ? 'Loading…' : 'Submit'}
                </Button>
            </Form>

            { results.length > 0 &&
                <StockTable stocks={results} onRefresh={(e) => handleRefresh(e)} />
            }
        </>
    );
}

export default StockDetails;
