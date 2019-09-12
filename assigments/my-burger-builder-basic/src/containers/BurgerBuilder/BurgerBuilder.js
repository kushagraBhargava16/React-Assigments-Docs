import React, { Component } from 'react';

import axios from '../../axios-orders'

import Aux from '../../hoc/Auxillary/Auxillary'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.3,
    bacon: 0.7,
    cheese: 0.4,
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    };

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
                this.updatePurchaseState(response.data);
            })
            .catch(error => {
                this.setState({ error: true });
            })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
            customer: {
                name: 'Kushagra Bhargava',
                address: {
                    street: 'Test street',
                    zipcode: '12344',
                    country: 'India'
                },
                email: 'kush@gmail.com'
            },
            deliveryMode: 'Fastest'
        }

        axios
            .post('/orders.json', order)
            .then(res => {
                console.log(res);
                this.setState({ loading: false, purchasing: false });
            })
            .catch(err => {
                console.log(err);
                this.setState({ loading: false, purchasing: false });
            })
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, ele) => sum + ele, 0);
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const oldPrice = this.state.totalPrice;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = oldCount + 1;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: oldPrice + INGREDIENT_PRICES[type]
        })

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const oldPrice = this.state.totalPrice;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = oldCount - 1;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: oldPrice - INGREDIENT_PRICES[type]
        })
        this.updatePurchaseState(updatedIngredients);
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };
        // eslint-disable-next-line no-unused-vars
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummery = null;
        let burger = this.state.error ? <p>Ingredients cant be loaded</p> : <Spinner />

        if (this.state.ingredients) {
            burger = <Aux>
                <Burger
                    ingredients={this.state.ingredients} />
                <BurgerControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    purchasing={this.purchaseHandler} />
            </Aux>;

            orderSummery = <OrderSummary
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
                cancel={this.purchaseCancelHandler}
                continue={this.purchaseContinueHandler} />
        }

        if (this.state.loading) {
            orderSummery = <Spinner />
        }

        return (
            <Aux>
                <Modal
                    display={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummery}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);