module.exports = {
   app: [
      {
         name :'Ecommerce-front',
         script:'./pages/index.js',
         env: {
            MONGODB_URI="mongodb+srv://ecomerce:keme1234@cluster0.toglwwn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
            STRIPE_PK="pk_test_51PkgeXD63r53WU0AMvchjuyLlAVEhLOSYJvnyfgvrABF9DLybM06QpDGkHet1Gcti6JZcK3Bo5jdNaoVqZWj2mpz00lMwaEZOm",
            STRIPE_SK="sk_test_51PkgeXD63r53WU0A7AEa7JzcqFGIU1VZzkm14Ycnw2ywb5mmlwZ5wujAkDswZahF28qRpxbql3njwT1d4XrOGlnn00vdWzCG6y",
            PUBLIC_URL="http://localhost:4000",
            NEXT_PUBLIC_URL="http://localhost:4000",
            NEXTAUTH_URL="http://localhost:4000",
            GOOGLE_FRONT_ID="67034117616-m4m2c7malcvmu0e8h6o9cdjdm5jn75l5.apps.googleusercontent.com",
            GOOGLE_FRONT_SECRET="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",
         },
      },
   ],
};