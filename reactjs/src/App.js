import React from 'react';
import logo from './logo.svg';
import './App.css';
import {environment} from "./environment";

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            productList: []
        }
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }

    forceUpdateHandler() {
        this.forceUpdate();
    };

    componentDidMount() {
        this.fetchData()
    }

    render() {
        const productList = this.state.productList.map((product) =>
            <div key="product.id" className="col-md-4" key={product.id}>
                <div className="card mb-4 shadow-sm">
                    <img alt="Card image cap"
                         className="card-img-top"
                         src="https://www.gannett-cdn.com/-mm-/ada32a4f5055f07292db9003891f8c154f8c42b1/c=0-109-2122-1303/local/-/media/2020/08/11/USATODAY/usatsports/MotleyFool-TMOT-deeef720-rental-home.jpg"/>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk
                            of the card's content.</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">type: {product.type}</li>
                        <li className="list-group-item">rooms: {product.attributes.rooms}</li>
                        <li className="list-group-item">area: {product.attributes.area} {product.attributes.unit}</li>
                        <li className="list-group-item">address: {product.attributes.address.city}
                            , {product.attributes.address.street} {product.attributes.address.house}
                            /{product.attributes.address.room}
                        </li>
                        <li className="list-group-item">
                            seller: {product.relationships.attributes.last_name} {product.relationships.attributes.first_name}
                        </li>
                    </ul>
                    <div className="card-body">
                        <button className={`btn btn-primary ${product.isFavorite ? 'bg-success' : '1'}`} type="button"
                                onClick={() => this.toggleFavorite(product)}>
                            {product.isFavorite ? "Disliked" : "Like"}
                        </button>
                    </div>
                </div>
            </div>
        );
        return (
            <div className="container">
                <div className="row">
                    {productList}
                </div>
            </div>
        );
    }

    fetchData() {
        fetch(environment.productUrl)
            .then(res => res.json())
            .then(res => {
                this.setState({productList: this.normalizeData(res.response)});
            })
    }

    normalizeData(dataIn) {
        let newProductList = dataIn.map((e) => {
            e.isFavorite = false
            return e
        })
        return newProductList
    }

    toggleFavorite(toggleProduct) {
        let newProductList = this.state.productList.map((e) => {
            if (e.id === toggleProduct.id) {
                e.isFavorite = !e.isFavorite
                return e
            } else {
                return e
            }
        })
        this.productList = newProductList
        this.forceUpdate();
    }
}

export default App;
