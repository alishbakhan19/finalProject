const hamburgerMenu = document.getElementById('hamburger-menu');
const navbar = document.getElementById('navbar');

hamburgerMenu.addEventListener('click', () => {
    navbar.classList.toggle('active');
});


let cartCount = 0;

document.querySelectorAll('.product-card button').forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        document.querySelector('#cartCount').textContent = cartCount; 
    });
});



    // Get the current page's URL
    const currentPage = window.location.href;

    // Select all navigation links
    const navLinks = document.querySelectorAll("#navbar a");

    // Loop through each link to check its href
    navLinks.forEach(link => {
        if (link.href === currentPage) {
            link.classList.add("active"); // Add the active class to the matching link
        } else {
            link.classList.remove("active"); // Remove the active class from others
        }
    });




const searchBar = document.getElementById('searchBar');
const products = document.querySelectorAll('.product-card');

searchBar.addEventListener('input', () => {
  const searchText = searchBar.value.toLowerCase();  // Get the value from the search bar
  products.forEach((product) => {
    const productName = product.querySelector('h3').textContent.toLowerCase();  // Get the product name from <h3>
    if (productName.includes(searchText)) {
      product.style.display = 'block';  // Show the product
    } else {
      product.style.display = 'none';  // Hide the product
    }
  });
});

const carousel = document.querySelector('.product-carousel');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentSlide = 0;

prevBtn.addEventListener('click', () => {
    currentSlide = Math.max(currentSlide - 1, 0);
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    const maxSlide = carousel.children.length - 1;
    currentSlide = Math.min(currentSlide + 1, maxSlide);
    updateCarousel();
});

function updateCarousel() {
    const slideWidth = carousel.children[0].offsetWidth + 20; // 20px gap
    carousel.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
} 

document.addEventListener("DOMContentLoaded", () => {
   let cartItems = []; // Empty array to hold cart items
   

    document.querySelectorAll('.product-card button').forEach(button => {
        button.addEventListener('click', (event) => {
            // Get product details
            const productCard = event.target.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = parseFloat(productCard.querySelector('.product-price').textContent);

            // Add product to cart
            cartItems.push({ name: productName, price: productPrice });

            // Update cart count
            const cartCount = cartItems.length;
            document.querySelector('#cartCount').textContent = cartCount;

            // Optional: Log cart items for testing
            console.log(cartItems);
        });
    });
    const cartButton = document.getElementById("cartButton");
    const sideCart = document.getElementById("sideCart");
    const cartItemsContainer = document.getElementById("cartItems");
    const cartTotalElement = document.getElementById("cartTotal");
    const cartCountElement = document.getElementById("cartCount");

   

    // Function to calculate the total price
    function calculateTotal() {
        const total = cartItems.reduce((sum, item) => sum + item.price, 0);
        cartTotalElement.textContent = total.toFixed(2);
    }

    // Function to update cart count
    function updateCartCount() {
        cartCountElement.textContent = cartItems.length;
    }

    // Function to render cart items
    function renderCartItems() {
        cartItemsContainer.innerHTML = ""; // Clear current items
        cartItems.forEach(item => {
            const itemElement = document.createElement("div");
            itemElement.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    // Toggle side cart visibility
    cartButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default link behavior
        if (sideCart.style.right === "0px") {
            sideCart.style.right = "-100%";
        } else {
            renderCartItems();
            calculateTotal();
            updateCartCount();
            sideCart.style.right = "0";
        }
    });

    // Initialize the cart display
    updateCartCount();
    calculateTotal();
});

