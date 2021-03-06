// import Vue 
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';
import PartsComponent from './components/TheGenericPart.js';
import CustomerComponent from './components/TheCustomerComponent.js';
import PartForm from './components/TheAddPartForm.js';

(() => {
    let vm = new Vue({
        data: {
            message: "hello from Vue!",
            customers: [{name: "test", number: "001100"}],
            customer_name: "",
            customer_number: "",
            current_customer: undefined,
            show_new_part: false,

            // store will hold our data object (CSV file contents) when we load and retrieve via fetch
            datastore: {},
        },

        methods: {
            getPartsInventory() {
                const url = "/getParts";

                fetch(url)
                .then(res => res.json())
                .then(data => this.$set(this.datastore, 'parts', data))
                .catch((err) => console.error(err));
            },

            toggleNewPart() {
                // show / hide new part form
                this.show_new_part = this.show_new_part ? false : true;

            },

            setCurrentCustomer(customerNo) {
                this.current_customer = customerNo;
                
                this.getPartsInventory();
            },

            addCustomer() {
                let newCustomer = new FormData();

                newCustomer.append("name", this.customer_name);
                //newCustomer.append("customerID", this.generateSlug());

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
            customer: CustomerComponent,
            partform: PartForm
        }
    }).$mount("#app");
})()