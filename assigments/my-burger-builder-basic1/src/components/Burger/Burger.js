import React from 'react'

import styles from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = props => {

    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => [...Array(props.ingredients[igKey])]
            .map((v, index) => <BurgerIngredient key={igKey + index} type={igKey} />))
        .reduce((oldEle, newEle) => oldEle.concat(newEle), []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add ingredients here!!</p>
    }

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default Burger;