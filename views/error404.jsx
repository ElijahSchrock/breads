const React = require('react');
const Default = require('./layouts/Default');

function error404 () {
    return (
        <Default>
            <main>
                <h1> 404: PAGE NOT FOUND -__-</h1>
                <p>Got Dammit, Randy lost this page again!</p>
            </main>
        </Default>
    )
}

module.exports = error404