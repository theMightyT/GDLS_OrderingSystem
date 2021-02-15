export default {
    props: ['parts'],

    template: `
    <form @submit.prevent="createOrder">

    <input type="submit" value="Submit Order">

    </form>
    `
}