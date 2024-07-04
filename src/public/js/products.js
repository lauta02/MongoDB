const CustomToast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
});

const cartButtons = document.querySelectorAll('.addToCart');
cartButtons.forEach(button => {
    button.addEventListener("click", event => {
        CustomToast.fire({
            icon: 'success',
            title: 'Product added to your cart!'
        });
    });
});