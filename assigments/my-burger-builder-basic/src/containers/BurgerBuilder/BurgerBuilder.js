import React, { Component } from 'react';

import Aux from '../../hoc/Auxillary/Auxillary'
import Burger from '../../components/Burger/Burger'
import BurgerControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'


const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.3,
    bacon: 0.7,
    cheese: 0.4,
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            bacon: 0,
            cheese: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        alert('Please continue!!!')
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
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal
                    display={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        price={this.state.totalPrice}
                        ingredients={this.state.ingredients}
                        cancel={this.purchaseCancelHandler}
                        continue={this.purchaseContinueHandler} />
                </Modal>
                <Burger
                    ingredients={this.state.ingredients} />
                <BurgerControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    purchasing={this.purchaseHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;