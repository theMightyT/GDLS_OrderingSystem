export default {
    name: "ThePartComponent",
    
    props: ['part'],

    template: `
    <section class="main-part">
        <span>{{part.Name}}</span><span>{{part.Surname}}</span><span>{{part.Age}}</span>
    </section>
    `,

    created: function() {
        console.log('created a part')
    }
}