 <template>
 <div>
     <h3>Reviews</h3>
     <p v-for="review in reviews">
     {{ review }}
     </p>
 </div>
 </template>

 <script>
 import './reviews.css';
 const allReviews = {
     porsche: ["So great", "Wonderful", "Works for me..."],
     fendt: ["Not my cup of tea..."],
     eicher: ["Just the best", "Give it a try!"],
 };  
 
 export default {
     props: ['sku'],
     computed: {
     reviews() {
         const sku = this.sku;
         const reviews = allReviews[sku] || allReviews.porsche;
         return reviews;
     },
     },
 };
 </script>