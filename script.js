
    
    const products = [
      
      {id:1, name:"Wireless Headphones", price:89.99, category:"electronics", image:"blue.jpeg"},
      {id:2, name:"Smart Watch", price:199.99, category:"electronics", image:"wat.jpeg"},
      {id:3, name:"Bluetooth Speaker", price:79.99, category:"electronics", image:"bl.jpeg"},
      
      {id:4, name:"Cotton T-Shirt", price:24.99, category:"clothing", image:"t.jpeg"},
      {id:5, name:"Designer Jeans", price:59.99, category:"clothing", image:"jean.jpeg"},
      {id:6, name:"Running Shoes", price:129.99, category:"clothing", image:"shoe.jpeg"},
     
      {id:7, name:"Coffee Maker", price:49.99, category:"home", image:"coffe.jpeg"},
      {id:8, name:"Kitchen Knife Set", price:89.99, category:"home", image:"knife.jpeg"},
      {id:9, name:"Ceramic Dinnerware", price:39.99, category:"home", image:"dish.jpeg"},
      
      {id:10, name:"Football", price:29.99, category:"sports", image:"ball.jpeg"},
      {id:11, name:"Yoga Mat", price:19.99, category:"sports", image:"mat.jpeg"},
      {id:12, name:"Face Cream", price:15.99, category:"beauty", image:"face.jpeg"},
      {id:13, name:"Lipstick Set", price:22.99, category:"beauty", image:"lip.jpeg"},
      
      {id:14, name:"The Great Gatsby", price:12.99, category:"books", image:"gate.jpeg"},
      {id:15, name:"Atomic Habits", price:14.99, category:"books", image:"hab.jpeg"},
    ];
    
    let currentPage = "home";
    let currentCategory = "all";
    let searchQuery = "";

    
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const categoriesNav = document.getElementById('categoriesNav');
    const categoriesList = document.getElementById('categoriesList');
    const searchInput = document.getElementById('searchInput');
    const navHome = document.getElementById('navHome');
    const navSearch = document.getElementById('navSearch');
    const navOffers = document.getElementById('navOffers');
    const navHelp = document.getElementById('navHelp');
    const pageHome = document.getElementById('pageHome');
    const pageSearch = document.getElementById('pageSearch');
    const pageOffers = document.getElementById('pageOffers');
    const pageHelp = document.getElementById('pageHelp');
    const pageCategory = document.getElementById('pageCategory');
    const categoryTitle = document.getElementById('categoryTitle');
    const productGridHome = document.getElementById('productGridHome');
    const productGridSearch = document.getElementById('productGridSearch');
    const productGridOffers = document.getElementById('productGridOffers');
    const productGridCategory = document.getElementById('productGridCategory');
    const profileBtn = document.getElementById('profileBtn');
    const profileOverlay = document.getElementById('profileOverlay');
    const closeProfileBtn = document.getElementById('closeProfileBtn');

    
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('expanded');
    });

    
    categoriesNav.addEventListener('click', () => {
      categoriesList.style.display = categoriesList.style.display === 'block' ? 'none' : 'block';
    });

    
    function setActivePage(page) {
      currentPage = page;
      
      pageHome.classList.remove('active');
      pageSearch.classList.remove('active');
      pageOffers.classList.remove('active');
      pageHelp.classList.remove('active');
      pageCategory.classList.remove('active');
      
      [navHome, navSearch, navOffers, navHelp].forEach(nav => nav.classList.remove('active'));
     
      if(page === "home") {
        navHome.classList.add('active');
        pageHome.classList.add('active');
        renderProducts(productGridHome, products);
      }
      if(page === "search") {
        navSearch.classList.add('active');
        pageSearch.classList.add('active');
        renderProducts(productGridSearch, filterProducts());
      }
      if(page === "offers") {
        navOffers.classList.add('active');
        pageOffers.classList.add('active');
        renderProducts(productGridOffers, products.filter(p => p.price < 30));
      }
      if(page === "help") {
        navHelp.classList.add('active');
        pageHelp.classList.add('active');
      }
      if(page === "category") {
        pageCategory.classList.add('active');
        renderProducts(productGridCategory, products.filter(p => p.category === currentCategory));
      }
      categoriesList.style.display = 'none';
    }

    navHome.addEventListener('click', () => { currentCategory = "all"; searchQuery = ""; searchInput.value = ""; setActivePage("home"); });
    navSearch.addEventListener('click', () => { setActivePage("search"); searchInput.focus(); });
    navOffers.addEventListener('click', () => { setActivePage("offers"); });
    navHelp.addEventListener('click', () => { setActivePage("help"); });

  
    categoriesList.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', e => {
        e.stopPropagation();
        currentCategory = item.dataset.category;
        searchQuery = "";
        searchInput.value = "";
        categoryTitle.textContent = capitalize(item.querySelector('.nav-label').textContent);
        setActivePage("category");
      });
    });

    
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value.trim().toLowerCase();
      setActivePage("search");
    });

    
    profileBtn.addEventListener('click', () => {
      profileOverlay.classList.add('open');
    });
    closeProfileBtn.addEventListener('click', () => {
      profileOverlay.classList.remove('open');
    });
    profileOverlay.addEventListener('click', e => {
      if(e.target === profileOverlay) profileOverlay.classList.remove('open');
    });

   
    function renderProducts(grid, list) {
      grid.innerHTML = list.length ? list.map(product => `
        <div class="product-card">
          <img class="product-img" src="${product.image}" alt="${product.name}">
          <div class="product-info">
            <div class="product-title">${product.name}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <div class="product-category">${capitalize(product.category)}</div>
            <button class="add-to-cart" onclick="alert('Added to cart: ${product.name}')">Add to Cart</button>
          </div>
        </div>
      `).join('') : `<div style="padding:2rem;">No products found.</div>`;
    }
    function filterProducts() {
      if(!searchQuery) return products;
      return products.filter(p => p.name.toLowerCase().includes(searchQuery) || p.category.toLowerCase().includes(searchQuery));
    }
    function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

    
    setActivePage("home");

    
    window.addEventListener('keydown', e => {
      if(e.key === 'Escape') profileOverlay.classList.remove('open');
    });
