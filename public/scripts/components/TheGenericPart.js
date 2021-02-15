export default {
    name: "ThePartComponent",
    
    props: ['part'],

    template: `
    <li class="main-part">
        <span>Part ID:</span> {{part.PartID}} <span>Part Name:</span> {{part.PartName}}  <span>Qty Available:</span> {{part.PartQuantity}} <div class="order-qty"><span>Add Qty:</span> <input type="number"></div>
    </li>
    `,

    created: function() {
        console.log('created a part')
    }
}