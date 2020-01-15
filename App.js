import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import CardSelector from "./components/CardSelector";
import {isEmpty, onlyNumbers} from "./utils/formValidation";
import {getCardType, isCardValid} from "./utils/creditCardUtils";

class App extends Component {
    _processingPaymentSubscription = null;
    state = {
        cardNumber: '',
        expirationDate: '',
        securityCode: '',
        cardholderName: '',
        error: '',
        processing: false,
    };

    componentWillUnmount() {
        this._processingPaymentSubscription && clearTimeout(this._processingPaymentSubscription);
    }

    handleOnChangeCardNumber = cardNumber => {
        this.setState({cardNumber: cardNumber});
    };

    handleOnChangeExpirationDate = expirationDate => {
        if (expirationDate.length === 2 && this.state.expirationDate.length < 2 && !expirationDate.includes('/')) {
            expirationDate = expirationDate + '/';
        }
        this.setState({expirationDate: expirationDate});
    };

    handlerOnChangeSecurityCode = securityCode => {
        this.setState({securityCode: securityCode});
    };

    handleOnChangeCardholderName = cardholderName => {
        this.setState({cardholderName: cardholderName});
    };

    handleOnClickPayButton = () => {
        let errors = this.validateFields();

        if (errors.length === 0) {
            this.setState({
                cardNumber: '',
                expirationDate: '',
                securityCode: '',
                cardholderName: '',
                error: '',
                processing: true,
            });
            this._processingPaymentSubscription = setTimeout(() => {
                this.setState({processing: false});
            }, 5000);
        } else {
            this.setState({error: errors[0]});
        }
    };

    validateFields = () => {
        let errors = [];

        if (isEmpty(this.state.cardNumber)) {
            errors.push('Card number is required');
        } else if (!isCardValid(this.state.cardNumber.replace(' ', ''))) {
            errors.push('Invalid card number');
        }

        if (isEmpty(this.state.expirationDate)) {
            errors.push('Expiration date is required');
        } else if (!(/\d{2}\/\d{2}/.test(this.state.expirationDate))) {
            errors.push('Invalid expiration date');
        } else {
            let monthAndYear = (this.state.expirationDate + '').split('/').map(value => parseInt(value));
            let month = monthAndYear[0];
            let year = monthAndYear[1];
            if (month < 1 || month > 12) {
                errors.push('Invalid month');
            }
            if (year < 20 || year > 99) {
                errors.push('Invalid year');
            }
        }

        if (isEmpty(this.state.securityCode)) {
            errors.push('Security code is required');
        } else if (!onlyNumbers(this.state.securityCode)) {
            errors.push('Security code should only contain numbers');
        }

        if (isEmpty(this.state.cardholderName)) {
            errors.push('Card holder name is required');
        }

        return errors;
    };

    render() {
        if (this.state.processing) {
            return (
                <View style={styles.container}>
                    <View style={styles.loadingMessageWrapper}>
                        <Text style={styles.loadingMessage}>Processing Payment...</Text>
                    </View>
                    <View style={styles.loadingIconWrapper}>
                        <ActivityIndicator size="large" color="#000000" />
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>PAYMENT GATEWAY</Text>
                    </View>
                    <View style={styles.paymentDetailsContainer}>
                        <View style={styles.cardSelectorWrapper}>
                            <CardSelector selectedCard={getCardType(this.state.cardNumber.replace(' ', ''))}/>
                        </View>
                        <View style={styles.paymentDetail}>
                            <View style={styles.labelWrapper}>
                                <Text style={styles.label}>* Card Number</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Card Number"
                                    keyboardType="number-pad"
                                    autoCompleteType="cc-number"
                                    onChangeText={this.handleOnChangeCardNumber}
                                    value={this.state.cardNumber}
                                />
                            </View>
                        </View>
                        <View style={styles.paymentDetail}>
                            <View style={styles.labelWrapper}>
                                <Text style={styles.label}>* Expiration Date</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="MM / YY"
                                    maxLength={5}
                                    keyboardType="number-pad"
                                    autoCompleteType="cc-exp"
                                    onChangeText={this.handleOnChangeExpirationDate}
                                    value={this.state.expirationDate}
                                />
                            </View>
                        </View>
                        <View style={styles.paymentDetail}>
                            <View style={styles.labelWrapper}>
                                <Text style={styles.label}>* Security Code</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="XXX"
                                    maxLength={3}
                                    keyboardType="number-pad"
                                    autoCompleteType="cc-csc"
                                    onChangeText={this.handlerOnChangeSecurityCode}
                                    value={this.state.securityCode}
                                />
                            </View>
                        </View>
                        <View style={styles.paymentDetail}>
                            <View style={styles.labelWrapper}>
                                <Text style={styles.label}>* Card Holder Name</Text>
                            </View>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Card Holder Name"
                                    onChangeText={this.handleOnChangeCardholderName}
                                    value={this.state.cardholderName}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        {
                            this.state.error
                                ? <View style={styles.errorWrapper}>
                                    <Text style={styles.error}>{this.state.error}</Text>
                                </View>
                                : null
                        }
                        <View style={styles.buttonWrapper}>
                            <Button style={styles.button} title="PAY" onPress={this.handleOnClickPayButton} />
                        </View>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    header: {
        backgroundColor: '#E1E1E1',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#000000',
        fontWeight: 'bold',
    },
    paymentDetailsContainer: {
        padding: 20,
    },
    cardSelectorWrapper: {
        marginVertical: 5,
        alignItems: 'center',
    },
    paymentDetail: {
        marginVertical: 10,
    },
    labelWrapper: {

    },
    label: {

    },
    inputWrapper: {

    },
    input: {

    },
    footer: {
        backgroundColor: '#E1E1E1',
        padding: 10,
        alignItems: 'center',
    },
    errorWrapper: {
        marginBottom: 5,
    },
    error: {
        color: 'red',
    },
    buttonWrapper: {
        width: '50%',
    },
    button: {

    },
    loadingMessageWrapper: {
        alignItems: 'center',
    },
    loadingMessage: {

    },
    loadingIconWrapper: {
        alignItems: 'center',
        marginTop: 20,
    },
});

export default App;
