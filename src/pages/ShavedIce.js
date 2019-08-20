import React, { Component } from "react";
import"./ShavedIce.css"
import logo from "../logo.svg";
import _ from 'lodash';
import { connect } from "react-redux";
import {
  withStyles,
  Button
} from "@material-ui/core";

const styles = theme => ({
  root: {
  }
});

/* GOALS:
 * When a user clicks on a shaved ice option, add the selection to the rendered purchases
 * A purchased flavor's background color should be a combination of the colors in that flavor's recipe
 * Refactor purchased items into their own component
 *  * display the item with its color, name, and ingredients
 * */

class ShavedIce extends Component {
    state = { purchasedFlavors: [] };

    getPurchasedFlavors = () => {
        return this.state.purchasedFlavors.map(flavor => {
            return <img key={Math.random()} src={logo} style={{background: this.getFlavorColor(flavor)}} />
        })
    }

    getRandomColor = () => {
        return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    }

    getFlavorColor = (flavor) => {
        const color = this.getColorAverage([this.getRandomColor(), this.getRandomColor(), this.getRandomColor()]);
        console.log('c', color)
        return color;
    }

    getColorAverage = colors => {
        return "#" + (_.sumBy(colors, color => parseInt(color.replace("#", ""), 16)) / colors.length).toString(16).split('.')[0];
    }

    getMenuOptions = () => {
        return this.props.shavedIceOptions.map(item => (
            <Button key={item} onClick={() => this.orderShavedIce(item)}>{item}</Button>
        ));
    };

    orderShavedIce = (flavor) => {
        this.setState({ purchasedFlavors: [flavor]})
    }

    render() {
        return (
            <div>
                <div className="vending-machine">
                    <div className="left-panel">

                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo" />
                            <h1 className="App-title">Heavenly Shaved Ice</h1>
                        </header>
                    </div>
                    <div className="right-menu">
                        <div className="menu-options">
                            {this.getMenuOptions()}
                        </div>
                    </div>
                    <div className="purchased-flavors">
                        {this.getPurchasedFlavors()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    shavedIceOptions: state.shavedIceOptions
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(ShavedIce));