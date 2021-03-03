/*
JavaScript has gone through many changes in its history.
Chief among these is how the language handles asynchronous code.
*/

// async code - code that we expect to complete in the future.

/*
The first phase of JavaScript async code was callbacks. We can think of this
as the "please call me" model. This style of coding is still prevalent in the
JavaScript ecosystem, and there is not necessarily anything wrong with it.
 */
$.get("/product/1234/summary", function (productData) {
    $(".result").html(productData)
    alert("Load was performed.")
})

/*
The issue comes when we want to perform multiple async operations at once.
For instance, we want to request a piece of data, and dependent on this data
we would like to make another request:
 */

$.get("/product/1234/summary", function (productData) {
    if (productData.status === "NEW") {
        $.get("/product/1234/warranty", function (warrantyInformation) {
            $(".result").html(productData)
        }).fail(error => console.log(error))
    }
}).fail(error => console.log(error))


/*
The second phase was Promises. A Promise is a box that may contain a
value in the future
 */
let promise = new Promise((resolve) => {
    setTimeout(() => {
        resolve('resolved')
    }, 4000)
})

console.log(promise) // Promise { < pending > }
promise.then(result => console.log(result))

fetch('/product/1234/summary')
    .then(productData => $(".result").html(productData))
    .catch(error => console.log(error))

function getValue() {
    return "some value";
}

async function getValueAsync() {
    const response = await fetch("/product/1234/summary");
    if (response.status === "NEW") {
        return await fetch("/product/1234/warranty")
    }
    return Error();
}

