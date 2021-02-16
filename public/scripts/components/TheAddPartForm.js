export default {
    name: "TheNewPartForm",

    template: `
    <section id="new-part-form">
        <h2>Please Enter Part Info</h2>
        <form @submit.prevent="savePart">
            <input type="text" name="partID" placeholder="Part ID (max 6 characters)">
            <input type="text" name="partName" placeholder="Part Name (max 20 characters)">

            <label for="partQty">Enter Qty:</label>
            <input type="number" name="partQty" id="partQty">

            <input type="submit" value="Save Part">
        </form>
    </section>
    `,

    methods: {
        savePart() {
            //fetch call to API here
            fetch("/addPart")
            .then(res => res.json())
            .then(data => console.log(data))
            .catch((err) => console.error(err));
        }
    },


}