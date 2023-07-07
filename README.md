# BookChap
BookChap is a web application that allows users to rent books online.

```js
{
book: { type: Schema.Types.ObjectId, ref: 'Book' },
user: { type: Schema.Types.ObjectId, ref: 'user' },
rentalDate: Date,
returnDate: Date
}
```