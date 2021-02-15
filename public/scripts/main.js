// import Vue 
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';
import PartsComponent from './components/TheGenericPart.js';
import CustomerComponent from './components/TheCustomerComponent.js';

(() => {
    let vm = new Vue({
        data: {
            message: "hello from Vue!",
            customers: [{name: "test", number: "001100"}],
            customer_name: "",
            customer_number: "",
            current_customer: undefined,

            // store will hold our data object (CSV file contents) when we load and retrieve via fetch
            datastore: {},
        },

        methods: {
            testlogClick() {
                debugger;
            },

            getPartsInventory() {
                const url = "/getParts";

                fetch(url)
                .then(res => res.json())
                .then(data => this.$set(this.datastore.parts, data)
            },

            setCurrentCustomer(customerNo) {
                debugger;
                this.current_customer = customerNo;            
            },

            addCustomer() {
                let newCustomer = new FormData();

                newCustomer.append("name", this.customer_name);
                newCustomer.append("customerID", this.generateSlug());
                debugger;
                const url = "/addCustomer";

                fetch(url, {
                    method: "POST",
                    body: newCustomer
                })
                .then(res => res.json())
                .then(data => {
                    if (data.result == true) {
                        alert('added customer');
                    } else {
                        alert('add customer failed');
                    }
                })
            }
        },

        created: function() {
            console.log('works!');
            fetch("/getCustomers")
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.customers = data;
                })
            .catch(err => console.error(err));
        },

        components: {
            part: PartsComponent,
            customer: CustomerComponent
        }
    }).$mount("#app");
})()