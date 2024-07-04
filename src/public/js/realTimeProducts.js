const customSocket = io()

// Receive products and display them
customSocket.on('products', data =>{
    const productsContainer = document.querySelector('#products')
    let productsHTML = ''
    data.docs.forEach(product => {
        productsHTML += `
        <li class="flex justify-between">
            <div>
                <p class="font-semibold text-lg">${product.title}</p>
                <p class="font-bold text-xl text-green-600 text-justify">$ ${product.price}</p>
                <p class="max-w-lg my-2">${product.description}</p>
                <p class="">ID: ${product.id}</p>
                <p class="">CODE: ${product.code}</p>
                <p class="">STATUS: ${product.status}</p>
                <p class="">STOCK: ${product.stock}</p>
                <p class="">CATEGORY: ${product.category}</p>
                <p class="max-w-lg">THUMBNAILS: ${product.thumbnails.length}</p>
                <button id="${product._id}" class="mt-3 bg-red-700 hover:bg-red-500 text-white font-medium uppercase py-1 px-2 rounded cursor-pointer deleteButton">DELETE</button>
            </div>
            <div class="grid grid-cols-3">
                ${product.thumbnails.map(thumbnail => `<img class="h-40" src="${thumbnail}" alt="Product image">`).join('')}
            </div>
        </li>
        <hr class="my-5 border-gray-600">`
    })
    productsContainer.innerHTML = productsHTML

    // Delete products
    const deleteButtons = document.querySelectorAll('.deleteButton')
    deleteButtons.forEach(button => {
        button.addEventListener("click", event => {
            const productId = event.target.id
            customSocket.emit('deleteProduct', productId)
        })
    })
})

// Add products
const productForm = document.querySelector('#form')
productForm.addEventListener('submit', event => {
    event.preventDefault()

    const thumbnailsTextArea = productForm.elements.thumbnails.value
    const thumbnailsArray = thumbnailsTextArea.split(",").map(element => element.trim())

    const product = {
        title: productForm.elements.title.value,
        description: productForm.elements.description.value,
        code: productForm.elements.code.value,
        price: productForm.elements.price.value,
        stock: productForm.elements.stock.value,
        category: productForm.elements.category.value,
        thumbnails: thumbnailsArray
    }

    if (product.title && product.description && product.code && product.price && product.stock && product.category && product.thumbnails.length > 0) {
        customSocket.emit('addProduct', product)
    }

    productForm.reset()
})