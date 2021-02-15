export default {
    props: ['customer'],
    
    template: `
    <section class="customer">
        <h2 class="cust-name">{{customer.CustomerName}}</h2><span @click="setActiveCustomer" class="cust-select">Select</span>
    </section>
    `,

    methods: {
        setActiveCustomer() {
            this.$emit('setactivecustomer', this.customer.number);
        }
    }
}