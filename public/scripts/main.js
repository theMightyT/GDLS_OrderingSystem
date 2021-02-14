// import Vue 
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';
import PartsComponent from './components/TheGenericPart.js';
import TestComponent from './components/TestComponent.js';

(() => {
    let vm = new Vue({
        data: {
            message: "hello from Vue!",

            // store will hold our data object (CSV file contents) when we load and retrieve via fetch
            datastore: {},
        },

        methods: {
            testlogClick() {
                debugger;
            }
        },

        created: function() {
            console.log('works!');
            // go get the datastore
            // fetch("/csv")
            //     .then(res => res.json())
            //     .then(data => {
            //         console.log(data);
            //         this.$set(this.datastore, 'parts', data);
            //     })
            // .catch(err => console.error(err));
        },

        components: {
            part: PartsComponent,
            test: TestComponent
        }
    }).$mount("#app");
})()